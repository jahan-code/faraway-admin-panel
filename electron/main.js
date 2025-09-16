const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');
const BackendServer = require('./backend-server');

// Load environment variables for Electron
require('dotenv').config({ path: path.join(__dirname, '..', '.env.electron') });

/**
 * Create the main application window
 */
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:3000';

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open external links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith('http')) return { action: 'deny' };
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.loadURL(startUrl);
}

/**
 * Simple waiter for a URL to respond with any status code
 */
function waitForUrl(url, { timeoutMs = 30000, intervalMs = 300 } = {}) {
  const startedAt = Date.now();
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      const request = http.get(url, () => {
        request.destroy();
        resolve(true);
      });
      request.on('error', () => {
        if (Date.now() - startedAt > timeoutMs) {
          reject(new Error(`Timed out waiting for ${url}`));
          return;
        }
        setTimeout(tryOnce, intervalMs);
      });
    };
    tryOnce();
  });
}

let nextServerProcess = null;
let backendServer = null;

async function ensureNextServerStarted() {
  // In dev we rely on external Next server (ELECTRON_START_URL is set by scripts)
  if (process.env.ELECTRON_START_URL) return;

  const appPath = app.isPackaged ? path.join(process.resourcesPath, 'app') : process.cwd();
  const standaloneDir = path.join(appPath, '.next', 'standalone');
  const serverScript = path.join(standaloneDir, 'server.js');

  // Spawn Next standalone server
  nextServerProcess = spawn(process.execPath, [serverScript], {
    cwd: standaloneDir,
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: '3000'
    },
    stdio: 'inherit'
  });

  // Wait until it is reachable
  await waitForUrl('http://localhost:3000');
}

app.whenReady().then(async () => {
  try {
    // Start backend server first
    backendServer = new BackendServer();
    await backendServer.start();
    
    // Then start Next.js server
    await ensureNextServerStarted();
  } catch (error) {
    console.error('Failed to start servers:', error);
  }

  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', async () => {
  // Stop backend server
  if (backendServer) {
    try {
      await backendServer.stop();
    } catch {}
    backendServer = null;
  }
  
  // Stop Next.js server
  if (nextServerProcess) {
    try {
      nextServerProcess.kill();
    } catch {}
    nextServerProcess = null;
  }
});


