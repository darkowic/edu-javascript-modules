/**
 * JSON Modules with Import Attributes
 *
 * This module demonstrates the use of Import Attributes to load JSON files
 * as ES modules. This is a more powerful alternative to require() or
 * dynamic JSON loading, providing better static analysis and type safety.
 *
 * Import Attributes tell the JavaScript runtime how to interpret the
 * imported file, in this case as a JSON module.
 */

// JSON Module Import
// The 'with' syntax specifies this is a JSON module
// This is statically analyzable and can be optimized by build tools
import config from './data/config.json' with { type: 'json' };

// Direct Usage
// The imported JSON is already parsed and ready to use
// No need for JSON.parse() or async loading
console.log('App name:', config.name);
console.log('API URL:', config.api.url);

/**
 * Config Validation
 * 
 * With JSON modules, we can validate the structure at build/load time
 * rather than waiting until runtime to discover issues.
 */
function validateConfig(config) {
    if (!config.name || !config.version || !config.api) {
        throw new Error('Invalid config format');
    }
    return true;
}

/**
 * Enhanced Configuration
 * 
 * We can process and enhance the imported JSON data,
 * adding computed properties and validations.
 */
export const processedConfig = {
    ...config,                                        // Original config
    isValid: validateConfig(config),                  // Validation state
    isProduction: config.api.url.includes('production'), // Environment check
    hasAnalytics: config.features.analytics           // Feature flag
};

/**
 * Benefits of JSON Modules:
 * 
 * 1. Static Analysis
 *    - Imports can be analyzed at build time
 *    - Dead code elimination works with JSON imports
 *    - Build tools can optimize JSON loading
 * 
 * 2. Build-time Validation
 *    - JSON syntax is validated during build
 *    - Type checking can be applied to JSON structure
 *    - Early error detection for malformed JSON
 * 
 * 3. Tree-shaking
 *    - Unused JSON properties can be removed
 *    - Bundle size optimization for JSON data
 *    - More efficient than dynamic JSON loading
 * 
 * 4. Type Safety
 *    - TypeScript can validate JSON structure
 *    - IDE support for JSON property access
 *    - Autocomplete for JSON properties
 * 
 * 5. Error Handling
 *    - Clear error messages for JSON issues
 *    - Build-time catching of JSON problems
 *    - Better debugging experience
 */
