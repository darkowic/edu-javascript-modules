// AMD Module - Utility Helpers
define([], function() {
  return {
    // Generate a unique ID
    generateId: function() {
      return Math.random().toString(36).substring(2, 15) + 
             Math.random().toString(36).substring(2, 15);
    },
    
    // Deep clone an object
    deepClone: function(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    
    // Debounce function to limit how often a function can be called
    debounce: function(func, delay) {
      let timeoutId;
      return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    
    // Throttle function to limit how often a function can be called
    throttle: function(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },
    
    // Simple storage wrapper
    storage: {
      set: function(key, value) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (e) {
          console.error('Storage error:', e);
          return false;
        }
      },
      
      get: function(key) {
        try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        } catch (e) {
          console.error('Storage error:', e);
          return null;
        }
      }
    },
    
    name: "Utility Helpers (AMD Module)"
  };
});
