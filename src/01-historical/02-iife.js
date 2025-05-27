// Example of IIFE (Immediately Invoked Function Expression)
// This was one of the first patterns to simulate modules

// Imagine these are in different files:

// validators.js - creates a validator module
const ValidatorModule = (function () {
  return {
    isValidUsername: function (name) {
      return typeof name === "string" && name.length >= 3;
    },
  };
})();

// users.js - creates a user module with dependency injection
const UserModule = (function (validator) {
  // Validate dependencies
  if (!validator) throw new Error("Validator module is required!");

  // Private state
  let userCount = 0;

  // Public interface
  return {
    addUser: function (name) {
      if (!validator.isValidUsername(name)) {
        throw new Error("Invalid username!");
      }
      userCount++;
      console.log(`Added user ${name}. Total users: ${userCount}`);
    },

    removeUser: function (name) {
      userCount--;
      console.log(`Removed user ${name}. Total users: ${userCount}`);
    },

    getUserCount: function () {
      return userCount;
    },
  };
})(ValidatorModule); // Pass the ValidatorModule as a dependency

// Usage - notice the manual dependency management and order importance
UserModule.addUser("Alice"); // Works: Added user Alice. Total users: 1
try {
  UserModule.addUser("Bo"); // Throws: Invalid username!
} catch (err) {
  console.error("Expected error", err);
}
console.log(UserModule.getUserCount()); // 1
try {
  console.log(userCount); // undefined - the variable is private!
} catch (err) {
  console.error("Expected error", err);
}

// Problems with this approach:
// 1. Manual dependency management (must ensure ValidatorModule loads first)
// 2. No standardized way to express dependencies
// 3. Global namespace still polluted with module names
// 4. Can't load modules asynchronously
// 5. No built-in mechanism for circular dependencies
// 6. No standard way to handle errors in module loading
