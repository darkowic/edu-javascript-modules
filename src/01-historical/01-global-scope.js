// Example of problems with global scope (pre-modules era)
var userCount = 0;  // Global variable

function addUser(name) {
    userCount++;
    console.log(`Added user ${name}. Total users: ${userCount}`);
}

function removeUser(name) {
    userCount--;
    console.log(`Removed user ${name}. Total users: ${userCount}`);
}

// In another part of the application (imagine this is a different file)
var userCount = 42;  // Oops! Variable collision in global scope

addUser("Alice");  // Output will be incorrect because userCount was overwritten
removeUser("Bob"); // The global state is now unpredictable

// This is why we needed modules - to avoid global scope pollution
// and create proper encapsulation
