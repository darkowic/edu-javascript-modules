// AMD Validator Module
define([], function() {
    // Module implementation
    return {
        isValidUsername: function(name) {
            return typeof name === 'string' && name.length >= 3;
        }
    };
});

// Key differences from IIFE:
// 1. Uses define() instead of IIFE
// 2. Dependencies are explicitly declared in the array
// 3. Module is loaded asynchronously
// 4. No global variables created
