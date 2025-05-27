// AMD User Module with dependency
define(['validator'], function(validator) {
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
});

// Key improvements over IIFE:
// 1. Dependencies are declared explicitly in the array
// 2. Modules are loaded asynchronously
// 3. No need to ensure correct script loading order in HTML
// 4. Better error handling for missing dependencies
// 5. Standardized module format

// Limitations that still existed:
// 1. Complex configuration needed (requirejs.config)
// 2. Callback hell with deeply nested dependencies
// 3. No static analysis possible (dependencies are strings)
// 4. Browser-only solution (Node.js used CommonJS)
