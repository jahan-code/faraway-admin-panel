const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

class BackendServer {
  constructor() {
    this.process = null;
    this.port = process.env.BACKEND_PORT || 8100; // Use 8100 to match backend's default
  }

  /**
   * Wait for the backend server to be ready
   */
  waitForServer(url, { timeoutMs = 30000, intervalMs = 300 } = {}) {
    const startedAt = Date.now();
    return new Promise((resolve, reject) => {
      const tryOnce = () => {
        const request = http.get(url, (res) => {
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

  /**
   * Start the backend server
   */
  async start() {
    return new Promise((resolve, reject) => {
      const appPath = path.join(__dirname, '..', 'backend');
      const backendEntry = path.join(appPath, 'index.js');

      // Set environment variables for the backend
      const env = {
        ...process.env,
        NODE_ENV: 'production',
        PORT: this.port,
        // Backend specific environment variables
        MONGO_URI: process.env.MONGO_URI,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASS: process.env.SMTP_PASS,
        SENDER_EMAIL: process.env.SENDER_EMAIL,
        JWT_SECRET: process.env.JWT_SECRET,
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_REGION: process.env.AWS_REGION,
        AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME
      };

      console.log('Starting backend server...');
      
      this.process = spawn(process.execPath, [backendEntry], {
        cwd: appPath,
        env: env,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      this.process.stdout.on('data', (data) => {
        console.log(`Backend: ${data.toString().trim()}`);
      });

      this.process.stderr.on('data', (data) => {
        console.error(`Backend Error: ${data.toString().trim()}`);
      });

      this.process.on('error', (error) => {
        console.error('Failed to start backend:', error);
        reject(error);
      });

      this.process.on('exit', (code) => {
        console.log(`Backend process exited with code ${code}`);
      });

      // Wait for the server to be ready
      setTimeout(async () => {
        try {
          await this.waitForServer(`http://localhost:${this.port}/health`);
          console.log(`Backend server is ready on port ${this.port}`);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 2000);
    });
  }

  /**
   * Stop the backend server
   */
  stop() {
    return new Promise((resolve) => {
      if (this.process) {
        this.process.kill('SIGTERM');
        this.process.on('exit', () => {
          console.log('Backend server stopped');
          this.process = null;
          resolve();
        });
        
        // Force kill after 5 seconds if it doesn't stop gracefully
        setTimeout(() => {
          if (this.process) {
            this.process.kill('SIGKILL');
            this.process = null;
            resolve();
          }
        }, 5000);
      } else {
        resolve();
      }
    });
  }
}

module.exports = BackendServer;