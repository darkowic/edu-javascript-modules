// ES Module - User
import { isValidUsername } from './validator.js';  // Note the .js extension required in browsers

// Module private state - stays private to this module
let userCount = 0;

// Named exports
export function addUser(name) {
    if (!isValidUsername(name)) {
        throw new Error('Invalid username!');
    }
    userCount++;
    console.log(`Added user ${name}. Total users: ${userCount}`);
}

export function removeUser(name) {
    userCount--;
    console.log(`Removed user ${name}. Total users: ${userCount}`);
}

export function getUserCount() {
    return userCount;
}

// We could also use default export:
// export default { addUser, removeUser, getUserCount };

// Key improvements over CommonJS:
// 1. Static analysis possible (imports are declarative)
// 2. Named exports (no single exports object)
// 3. Live bindings (exports are references, not copies)
// 4. Asynchronous loading in browsers
// 5. Better circular dependency handling
// 6. Tree shaking possible (dead code elimination)
