// UMD Module - Text Formatter
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.textFormatter = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  // Formatter module functionality
  return {
    formatName: function(name) {
      if (!name) return '';
      
      // Format name to title case (each word capitalized)
      return name.toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
    
    formatDate: function(date) {
      if (!date) return '';
      
      const d = new Date(date);
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      
      return d.toLocaleDateString(undefined, options);
    },
    
    formatCurrency: function(amount, currency = 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(amount);
    },
    
    formatPhoneNumber: function(phone) {
      if (!phone) return '';
      
      // Simple US phone number formatting
      const cleaned = ('' + phone).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      
      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
      }
      
      return phone;
    },
    
    name: "Text Formatter (UMD Module)"
  };
}));
