// CommonJS User Module
const validator = require('./validator');  // Synchronous, blocking import

// Module private state - stays private to this module
let userCount = 0;

// Export the public interface
module.exports = {
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

// Key benefits of CommonJS:
// 1. Simple, synchronous require() function
// 2. Modules are cached after first load
// 3. Circular dependencies are handled
// 4. Files are loaded relative to current file
// 5. Node.js native support

// Limitations:
// 1. Synchronous loading (blocking)
// 2. Not suitable for browsers without bundling
// 3. No static analysis of dependencies
// 4. Single export object (no named exports)
