// Cyclic dependency example - Module A

import { getB } from './cyclic-b.js';

// 1. Export function that uses B
export function getA() {
    return 'A' + getB();  // Can call B's function
}

// 2. Export value that B tries to use
export const valueA = 'ValueA';

// 3. This works because of how ES modules handle cycles:
// - Module records are created first
// - Then modules are evaluated in order
// - Live bindings allow circular references
console.log('Module A initialized');

// 4. But be careful with initialization order
export const computedA = getB();  // This might not work as expected
