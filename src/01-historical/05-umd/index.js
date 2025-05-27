// Testing UMD in Node.js (CommonJS) environment
const UserModule = require('./user');

console.log('=== CommonJS Loading ===');
try {
    UserModule.addUser("Alice");    // Works: Added user Alice. Total users: 1
    UserModule.addUser("Bo");       // Should throw: Invalid username!
} catch (error) {
    console.log('Error:', error.message);
}

// UMD allows the same code to work in:
// 1. AMD (RequireJS) - see index.html
// 2. CommonJS (Node.js) - this file
// 3. Global scope (browser) - see index.html
//
// This was crucial for library authors who wanted to
// support all popular module systems with a single build.
