const { contextBridge } = require('electron');

// Expose a minimal, secure API
contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  platform: process.platform,
  versions: process.versions
});


