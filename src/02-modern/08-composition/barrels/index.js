/**
 * Barrel Module Pattern
 *
 * This module demonstrates the barrel pattern, which is used to roll up exports
 * from several modules into a single convenient module. This simplifies imports
 * for consumers and provides a single entry point for a group of related functionality.
 */

// 1. Direct Re-exports
// Collect related components and re-export them together
// This allows consumers to import multiple components from a single path
export { Button, Input, Select } from './components/form.js';
export { Table, Pagination } from './components/table.js';
export { Card, Modal } from './components/containers.js';

// 2. Default Export Re-exports
// Re-export a default export with a new name
// This is useful when collecting multiple default exports
export { default as Form } from './components/Form.js';

// 3. Renamed Exports
// Change the export name during re-export
// Useful for avoiding naming conflicts or providing better names
export { Layout as default } from './components/Layout.js';

// 4. Namespace Re-exports
// Re-export entire modules as namespaces
// Provides organized access to groups of related functionality
export * as utils from './utils/index.js';    // Access as utils.someFunction()
export * as hooks from './hooks/index.js';     // Access as hooks.useEffect()

// 6. Conditional Exports
// Export different implementations based on environment
// Useful for development vs production code paths
export const components = 
    process.env.NODE_ENV === 'development' 
        ? require('./components/dev.js')      // Development version
        : require('./components/prod.js');    // Production version

/**
 * Benefits of Barrel Pattern:
 *
 * 1. Import Simplification
 *    - Reduce number of import statements
 *    - Centralize import paths
 *    - Better organization of large codebases
 *
 * 2. Encapsulation
 *    - Hide internal file structure
 *    - Control what gets exposed
 *    - Easy to change implementation details
 *
 * 3. Maintainability
 *    - Single point of change for exports
 *    - Easy to add/remove features
 *    - Better dependency management
 *
 * Example Usage:
 * ```javascript
 * // Instead of multiple imports:
 * import { Button } from './components/form.js';
 * import { Table } from './components/table.js';
 *
 * // Single import:
 * import { Button, Table, utils } from './index.js';
 * ```
 */
