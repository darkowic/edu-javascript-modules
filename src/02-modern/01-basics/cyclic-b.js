// Cyclic dependency example - Module B

import { getA, valueA } from './cyclic-a.js';

// 1. Export function that uses A
export function getB() {
    return 'B' + getA();  // Can call A's function
}

// 2. This works - valueA is available through live binding
console.log('Value from A:', valueA);

// 3. Module initialization order is depth-first
console.log('Module B initialized');

// 4. But initialization can be tricky
export const computedB = getA();  // This might cause issues

// Understanding the initialization order:
// 1. A starts loading
// 2. A imports B
// 3. B starts loading
// 4. B imports A (cycle detected)
// 5. B continues executing with partially initialized A
// 6. B finishes
// 7. A continues
// 8. A finishes
