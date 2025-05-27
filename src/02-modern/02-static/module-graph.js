// Module graph analysis

// 1. Direct dependencies
import { helper } from './helper.js';
import { format } from './format.js';

// 2. Re-exports create edges in the graph
export { helper };  // Creates a direct edge
export * from './utils.js';  // Creates multiple edges

// 3. Circular dependencies
import { value } from './circular.js';
export const localValue = value + 1;

// 4. Side effects in graph
import './side-effects.js';  // Must be included due to side effects

// 5. Dynamic imports
const dynamicEdge = import('./dynamic.js');  // Creates a dynamic edge

// 6. Conditional imports
if (process.env.NODE_ENV === 'development') {
    await import('./debug.js');  // Conditional edge
}

// 7. Type-only imports (TypeScript)
// import type { User } from './types';  // No runtime dependency

// 8. Weak dependencies
const optionalModule = await import('./optional.js').catch(() => null);

// 9. Module boundaries
const internal = 'Not exported';  // Not part of the public API

// 10. Strong connections
import { 
    CONFIG,
    initialize,
    cleanup
} from './core.js';  // Strong coupling

// Build tools can analyze this graph to:
// - Determine build order
// - Find unused modules
// - Create chunks
// - Optimize dependencies
// - Detect problems
// - Generate source maps
