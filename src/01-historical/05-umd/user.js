;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['./validator'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('./validator'));
    } else {
        // Browser globals (root is window)
        root.User = factory(root.Validator);
    }
}(typeof self !== 'undefined' ? self : this, function(validator) {
    // Module private state
    var userCount = 0;

    // Module implementation
    return {
        addUser: function(name) {
            if (!validator.isValidUsername(name)) {
                throw new Error('Invalid username!');
            }
            userCount++;
            console.log(`Added user ${name}. Total users: ${userCount}`);
        },
        
        removeUser: function(name) {
            userCount--;
            console.log(`Removed user ${name}. Total users: ${userCount}`);
        },
        
        getUserCount: function() {
            return userCount;
        }
    };
}));

// Key features demonstrated:
// 1. Dependency handling in all environments
// 2. Private state through closure
// 3. Consistent API across environments
// 4. No global scope pollution unless fallback
// 5. Works with both sync and async loading
