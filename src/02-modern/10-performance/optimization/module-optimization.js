/**
 * Module Optimization Patterns
 *
 * This module demonstrates best practices and patterns for optimizing
 * JavaScript modules. These patterns focus on performance, maintainability,
 * and bundle size optimization.
 */

/**
 * 1. Selective Imports
 * 
 * Import only what you need to reduce bundle size and improve
 * tree-shaking effectiveness.
 */
// ❌ Bad: Imports entire library, bloating bundle
import _ from 'lodash';

// ✅ Good: Cherry-pick only needed functions
import { map, filter } from 'lodash-es';

/**
 * 2. Path Optimization
 * 
 * Use path aliases to improve maintainability and avoid
 * deep relative paths.
 */
// ❌ Bad: Deep relative paths are fragile
import { utils } from '../../../shared/utils.js';

// ✅ Good: Path aliases are maintainable
import { utils } from '#shared/utils.js';

/**
 * 3. Module Consolidation
 * 
 * Balance between file size and logical grouping.
 * Too many small files increase HTTP requests.
 */
// ❌ Bad: Too many small modules
import { validateEmail } from './validators/email.js';
import { validatePhone } from './validators/phone.js';
import { validateAddress } from './validators/address.js';

// ✅ Good: Consolidated related functionality
import { validateEmail, validatePhone, validateAddress } from './validators.js';

/**
 * 4. Circular Dependency Prevention
 * 
 * Avoid circular dependencies through proper architecture.
 * Use interface segregation and shared modules.
 */
// ❌ Bad: Circular dependencies
// a.js -> b.js -> a.js (creates loading issues)

// ✅ Good: Hierarchical dependencies
// shared.js <- a.js
//        ^--- b.js

/**
 * 5. Static Analysis Optimization
 * 
 * Use patterns that enable static analysis for better
 * optimization and tree-shaking.
 */
// ❌ Bad: Dynamic imports prevent static analysis
const moduleName = getModuleName();
import(`./features/${moduleName}.js`);

// ✅ Good: Static analysis friendly imports
const moduleMap = {
    feature1: () => import('./features/feature1.js'),
    feature2: () => import('./features/feature2.js')
};

/**
 * 6. Tree-Shaking Optimization
 * 
 * Use export patterns that enable effective tree-shaking
 * by build tools.
 */
// ❌ Bad: Default exports can't be tree-shaken effectively
export default {
    helper1,
    helper2
};

// ✅ Good: Named exports enable granular tree-shaking
export { helper1, helper2 };

/**
 * 7. Controlled Initialization
 * 
 * Avoid side effects during module load. Use explicit
 * initialization instead.
 */
// ❌ Bad: Side effects during module load
console.log('Module loaded');
doSomething();

// ✅ Good: Controlled initialization
export function initialize() {
    console.log('Module initialized');
    doSomething();
}

/**
 * 8. Lazy Evaluation
 * 
 * Defer expensive computations until needed to improve
 * initial load performance.
 */
// ❌ Bad: Eager computation slows module load
export const expensiveValue = computeExpensiveValue();

// ✅ Good: Compute only when needed
export function getExpensiveValue() {
    return computeExpensiveValue();
}

/**
 * 9. Clean Module Interface
 * 
 * Hide implementation details and expose a clean,
 * minimal public interface.
 */
// ❌ Bad: Exposing internal implementation
export const internalState = {};
export function internalHelper() {}

// ✅ Good: Clean, encapsulated interface
export class API {
    constructor() {
        this.state = {};
    }
    
    publicMethod() {
        this.internalHelper();
    }
}

/**
 * 10. Resource Management
 * 
 * Properly manage resources with clear lifecycle
 * methods for cleanup.
 */
// ❌ Bad: Unmanaged global resources
const globalConnection = createConnection();

// ✅ Good: Managed resource lifecycle
let managedConnection;
export function connect() {
    managedConnection = createConnection();
}
export function disconnect() {
    managedConnection?.close();
}

/**
 * Key Benefits of These Patterns:
 *
 * 1. Performance
 *    - Faster initial load times
 *    - Better caching
 *    - Reduced memory usage
 *
 * 2. Maintainability
 *    - Clearer dependencies
 *    - Better encapsulation
 *    - Easier testing
 *
 * 3. Bundle Optimization
 *    - Smaller bundle sizes
 *    - Better tree-shaking
 *    - More efficient code splitting
 */
