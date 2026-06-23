module.exports = {
  // Read speed from environment variable (default: 'normal')
  speed: process.env.TEST_SPEED === 'slow' ? 'slow' : 'normal',
  
  // Read timeout from environment variable (default: 60000ms)
  timeout: parseInt(process.env.TEST_TIMEOUT) || 60000,
  
  // Other config options
  url: process.env.TEST_URL || "http://localhost:5173",
  
  // Wait times
  wait: {
    element: 2000,
    pageLoad: 5000,
    scroll: 1000,
    action: process.env.TEST_SPEED === 'slow' ? 1500 : 300
  }
};