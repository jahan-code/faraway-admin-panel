// API Configuration for Electron and Web environments

const isElectron = () => {
  // Check multiple ways to detect Electron
  if (typeof window !== 'undefined') {
    // Check for electronAPI exposed by preload script
    if ((window as unknown as { electronAPI?: { isElectron: boolean } }).electronAPI?.isElectron) {
      return true;
    }
    // Check for electron in user agent
    if (navigator.userAgent.toLowerCase().indexOf('electron') > -1) {
      return true;
    }
    // Check for electron in window object
    if ((window as unknown as { require?: unknown }).require) {
      return true;
    }
    // Check process
    if (window.process && (window.process as unknown as { type?: string }).type) {
      return true;
    }
  }
  return false;
};

// const isDevelopment = process.env.NODE_ENV === 'development';

// API Base URLs
const REMOTE_API_URL = 'https://faraway.thedevapp.online';
const LOCAL_API_URL = 'http://localhost:8100';

// Determine which API URL to use
export const getApiUrl = (): string => {
  // If running in Electron, use local API
  if (isElectron()) {
    console.log('🖥️ Running in Electron - using local API:', LOCAL_API_URL);
    return LOCAL_API_URL;
  }
  
  // If in development and not Electron, you might want to use local API too
  // Uncomment the line below if you want to use local API in web development
  // if (isDevelopment) return LOCAL_API_URL;
  
  // Default to remote API for web deployment
  console.log('🌐 Running in browser - using remote API:', REMOTE_API_URL);
  return REMOTE_API_URL;
};

export const API_URL = getApiUrl();

// Export both URLs for flexibility
export { REMOTE_API_URL, LOCAL_API_URL };