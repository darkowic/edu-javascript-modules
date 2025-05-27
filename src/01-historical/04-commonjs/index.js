// Main application using CommonJS modules
const UserModule = require('./user');

try {
    // Notice how we don't need any configuration or async handling
    UserModule.addUser("Alice");    // Works: Added user Alice. Total users: 1
    UserModule.addUser("Bo");       // Should throw: Invalid username!
    console.log(UserModule.getUserCount());  // 1
} catch (error) {
    console.log('Error:', error.message);
}

// Demonstrating module caching
const UserModule2 = require('./user');
console.log('Same instance?', UserModule === UserModule2);  // true

// Trying to access private state
console.log('Private state accessible?', typeof userCount === 'undefined');  // true

// CommonJS became popular because:
// 1. Node.js adopted it as its module system
// 2. Simple, synchronous nature suited server-side code
// 3. npm ecosystem grew around it
// 4. Build tools made it work in browsers
// 5. Influenced ES Modules design
