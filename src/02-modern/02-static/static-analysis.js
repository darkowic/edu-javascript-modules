// Static analysis features

// 1. Import/Export must be at top level
// This is invalid:
// if (condition) {
//     export const x = 1;  // SyntaxError
// }

// 2. Static module structure
const condition = Math.random() > 0.5;

// This is invalid:
// if (condition) {
//     import './module.js';  // SyntaxError
// }

// Instead, use dynamic import
if (condition) {
    import('./module.js').then(module => {
        // Use module
    });
}

// 3. Static names
const exportName = 'myExport';
// This is invalid:
// export { someValue as exportName };  // Must be literal

// 4. Static specifiers
const modulePath = './module.js';
// This is invalid:
// import { something } from modulePath;  // Must be string literal

// 5. Const bindings
export let mutable = 1;      // Value can change
export const immutable = 1;  // Value cannot change
// But both create immutable bindings:
// import { mutable } from './module.js';
// mutable = 2;  // TypeError: Assignment to constant variable

// 6. Static dependency graph
import { value } from './values.js';  // Must be before usage
console.log(value);  // Static guarantee that value exists

// 7. Type information preservation
export class User {
    constructor(name) {
        this.name = name;
    }
}
// TypeScript can track this type through modules

// 8. Dead code detection
export function deadCode() {
    return 'Never used';
    console.log('Unreachable');  // Static analysis can detect this
}

// 9. Constant folding opportunity
export const MAGIC = 42;
export const DOUBLE_MAGIC = MAGIC * 2;  // Can be computed at build time

// 10. Side effect detection
export const pure = x => x + 1;  // No side effects
export const impure = x => {
    console.log(x);  // Side effect detected
    return x + 1;
};
