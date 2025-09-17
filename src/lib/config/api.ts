// API configuration for Web and Tauri environments

const isTauri = () => {
  if (typeof window === 'undefined') return false;
  return typeof (window as unknown as { __TAURI__?: unknown }).__TAURI__ !== 'undefined';
};

// const isDevelopment = process.env.NODE_ENV === 'development';

// API Base URLs
const REMOTE_API_URL = 'https://faraway.thedevapp.online';
const LOCAL_API_URL = 'http://localhost:8100';

// Determine which API URL to use
export const getApiUrl = (): string => {
  // In Tauri desktop, use local API (parity with previous Electron behavior)
  if (isTauri()) {
    console.log('🖥️ Running in Tauri - using local API:', LOCAL_API_URL);
    return LOCAL_API_URL;
  }

  // If in development and not Tauri, you may still want local API
  // Uncomment if desired:
  // if (isDevelopment) return LOCAL_API_URL;

  // Default to remote API for web deployment
  console.log('🌐 Running in browser - using remote API:', REMOTE_API_URL);
  return REMOTE_API_URL;
};

export const API_URL = getApiUrl();

// Export both URLs for flexibility
export { REMOTE_API_URL, LOCAL_API_URL };