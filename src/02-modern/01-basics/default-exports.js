/**
 * Default Exports in ES Modules
 * 
 * Default exports provide a way to export a single main value from a module.
 * They are useful when a module has a clear primary export, like a class
 * or main function. Unlike named exports, you can only have one default
 * export per module.
 *
 * Importing modules can choose any name for the default import:
 * import anyName from './module.js';
 */

// 1. Direct default export of a value
// Simple values can be exported directly. This is common for configuration
// or constant modules.
export default 42;

// 2. Default export of a function
// Uncomment to try: Functions can be exported anonymously
/*
export default function() {  // Anonymous function
    return 'Hello, World!';
}
*/

// 3. Default export of a class
// Uncomment to try: Classes can also be exported anonymously
/*
export default class {  // Anonymous class
    constructor() {
        this.name = 'Default';
    }
}
*/

// 4. Default export of an object
// Uncomment to try: Objects can be exported as a default
/*
export default {
    name: 'Default Object',
    method() { return this.name; }
};
*/

// 5. Named function as default
// Uncomment to try: You can export named declarations as default
/*
function namedFunction() {
    return 'I have a name';
}
export default namedFunction;
*/

/**
 * Important Notes:
 * 
 * 1. Only one default export per module
 * 2. Default exports can be anonymous (unlike named exports)
 * 3. Importing modules can rename the default export freely
 * 4. Default exports are useful for modules with a single main feature
 * 
 * Try each example by uncommenting one section at a time!
 */
