/**
 * Module Scope in ES Modules
 * 
 * ES Modules provide a clean, isolated scope for each module file.
 * This helps prevent global namespace pollution and provides better
 * encapsulation for module internals.
 */

// 1. Module scope is isolated
// Variables declared in a module are scoped to that module only
const privateVariable = 'This is not accessible outside';
let internalCounter = 0;

// 2. Strict mode by default
// All modules run in strict mode without needing 'use strict'
// Uncomment to see error:
// mistypeVariable = 'error';  // Would throw ReferenceError

// 3. Module-level 'this' is undefined
// Unlike scripts, top-level 'this' in modules is undefined
console.log(this);  // undefined

// 4. No global scope pollution
// Module variables don't automatically attach to window/global
const notGlobal = 42;
console.log(window.notGlobal);  // undefined

// 5. Module state isolation
// Each module maintains its own state
export function getCounter() {
    return internalCounter++;
}

// 6. Singleton pattern
// Modules are only executed once, state is shared between imports
export function getCounterValue() {
    return internalCounter;
}

// 7. Private by default
// Functions and variables are private unless explicitly exported
function helperFunction() {
    return 'Not exported - only available within this module';
}

// 8. Selective exposure
// You can use private functions within exported ones
export function publicFunction() {
    return helperFunction();  // Private function used in public API
}

// 9. Single initialization
// Module code runs exactly once when first imported
console.log('Module initialized');

/**
 * 10. Clean namespace
 * 
 * Modules can safely declare variables that might conflict in global scope.
 * Each module gets its own scope, so this doesn't affect other modules
 * or the global scope.
 */
const Array = 'Not the global Array';  // Safe, doesn't affect other modules
