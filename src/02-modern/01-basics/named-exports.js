/**
 * Named Exports in ES Modules
 * 
 * This file demonstrates various ways to use named exports, which allow
 * multiple values to be exported from a module. Named exports are useful
 * for libraries and utilities where multiple related items need to be exported.
 */

// 1. Direct named exports
// The 'export' keyword can be used directly with declarations.
// These create individual bindings that can be imported by name.
export const PI = 3.14159;        // Constant value
export let counter = 0;           // Mutable value
export function increment() {      // Function declaration
    return ++counter;
}

// 2. Class export
// Classes can be exported directly, making them available for inheritance
// and instantiation in other modules.
export class Calculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
}

// 3. Object destructuring export
// You can export individual properties from objects using destructuring.
// This is useful when working with existing objects or APIs.
const utils = {
    random() { return Math.random(); },
    timestamp() { return Date.now(); }
};
export const { random, timestamp } = utils;

// 4. Rename exports
// The 'as' keyword allows you to export items with different names.
// This is useful for avoiding naming conflicts or providing clearer names.
function helperFunction() { return 'helper'; }
export { helperFunction as helper };

// 5. Re-export from another module
// You can re-export items from other modules, optionally renaming them.
// This is useful for creating module aggregators or facades.
export { format as formatDate } from './date-utils.js';

// 6. Export list
// Multiple items can be exported in a single statement.
// This is useful when exporting multiple existing declarations.
const min = Math.min;
const max = Math.max;
export { min, max };

/**
 * Live Bindings
 * 
 * Named exports create 'live bindings', meaning the importing module
 * sees the current value of the exported binding, not a copy.
 * When the exported value changes, all importing modules see the new value.
 */
setInterval(() => {
    counter++;  // All importing modules will see this change in real-time
}, 1000);
