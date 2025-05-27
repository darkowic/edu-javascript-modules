;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.Validator = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {
    // Module implementation
    return {
        isValidUsername: function(name) {
            return typeof name === 'string' && name.length >= 3;
        }
    };
}));

// Key features of UMD:
// 1. Works in AMD (RequireJS) environments
// 2. Works in CommonJS (Node.js) environments
// 3. Falls back to global scope if neither exists
// 4. Self-contained wrapper pattern
// 5. No external dependencies needed
