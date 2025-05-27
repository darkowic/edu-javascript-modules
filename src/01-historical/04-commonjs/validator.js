// CommonJS Validator Module
// Note the simpler syntax compared to AMD

// Module implementation
module.exports = {
    isValidUsername: function(name) {
        return typeof name === 'string' && name.length >= 3;
    }
};

// Key differences from AMD:
// 1. Synchronous loading - suitable for server-side
// 2. No wrapper function needed
// 3. module.exports instead of return
// 4. No configuration required
// 5. Simple require() function for dependencies
