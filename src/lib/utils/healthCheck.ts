// Health check utility for backend connectivity

export const checkBackendHealth = async (apiUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(`${apiUrl}/health`, {
      method: 'GET',
      timeout: 5000, // 5 second timeout
    } as RequestInit & { timeout?: number });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend health check passed:', data);
      return true;
    }
    
    console.warn('⚠️ Backend health check failed - bad response:', response.status);
    return false;
  } catch (error) {
    console.error('❌ Backend health check failed:', error);
    return false;
  }
};

export const waitForBackend = async (
  apiUrl: string, 
  maxAttempts: number = 10, 
  delayMs: number = 1000
): Promise<boolean> => {
  console.log(`🔄 Waiting for backend at ${apiUrl}...`);
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`Attempt ${attempt}/${maxAttempts}`);
    
    const isHealthy = await checkBackendHealth(apiUrl);
    if (isHealthy) {
      console.log('✅ Backend is ready!');
      return true;
    }
    
    if (attempt < maxAttempts) {
      console.log(`⏳ Waiting ${delayMs}ms before next attempt...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  
  console.error('❌ Backend failed to start after all attempts');
  return false;
};