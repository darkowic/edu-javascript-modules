// Build optimization opportunities

// 1. Constant folding
export const VERSION = '1.0.0';
export const API_URL = 'https://api.example.com';
export const TIMEOUT = 1000 * 60;  // Can be computed at build time

// 2. Dead branch elimination
if (process.env.NODE_ENV === 'development') {
    console.log('Debug mode');
} else {
    console.log('Production mode');
}

// 3. Module hoisting
import { helper } from './helper.js';
const result = helper();  // Can be hoisted and inlined

// 4. Export optimization
export { helper as utilHelper };  // Can be renamed/mangled

// 5. Pure computation
export const PRIMES = Array.from({ length: 100 }, (_, i) => {
    if (i < 2) return false;
    for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) return false;
    }
    return true;
}).map((isPrime, num) => isPrime ? num : null)
  .filter(Boolean);  // Can be computed at build time

// 6. Import path optimization
import { format } from '../../../utils/format.js';  // Can be simplified

// 7. Module concatenation
const privateFunction = () => 'internal';  // Can be merged with other modules

// 8. Symbol minification
export class VeryLongClassName {
    veryLongMethodName() {
        return 'Can be minified';
    }
}

// 9. Import elision
import { unused } from './module.js';  // Can be removed

// 10. Static evaluation
export const CONFIG = {
    debug: process.env.NODE_ENV === 'development',
    features: {
        newUI: true,
        experimental: process.env.EXPERIMENTAL === 'true'
    }
};
