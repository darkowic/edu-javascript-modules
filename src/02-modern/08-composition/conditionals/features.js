/**
 * Conditional Feature Exports
 *
 * This module demonstrates different patterns for conditional exports
 * in ES Modules, including feature flags, environment detection,
 * and platform-specific implementations.
 */

// Import configuration that controls feature availability
import config from './config.js';

/**
 * Basic Feature
 * Always available, serves as a fallback or core functionality
 */
export function basicFeature() {
    return 'Basic feature';
}

/**
 * Experimental Feature
 * 
 * Conditionally exposed based on feature flag. When disabled,
 * attempts to use this feature will throw an error.
 *
 * Usage:
 * ```javascript
 * try {
 *     const result = experimentalFeature();
 * } catch (e) {
 *     // Handle feature not available
 * }
 * ```
 */
export const experimentalFeature = config.features.experimental
    ? () => 'Experimental feature'          // Feature enabled
    : () => {
        throw new Error('Experimental feature not available');
    };

/**
 * Debug Utilities
 * 
 * Environment-aware debugging tools that are active in debug mode
 * but become no-ops in production, ensuring no performance impact.
 *
 * In debug mode: Full console access
 * In production: Silent no-op functions
 */
export const debug = config.debug
    ? {
        // Debug mode: Direct console access
        log: console.log.bind(console),     // Normal logs
        warn: console.warn.bind(console),   // Warnings
        error: console.error.bind(console)  // Errors
    }
    : {
        // Production mode: Silent no-ops
        log: () => {},    // No logging
        warn: () => {},   // No warnings
        error: () => {}   // No errors
    };

/**
 * Platform-Specific Storage
 * 
 * Provides a unified storage API that automatically adapts to the
 * current runtime environment (browser vs Node.js).
 *
 * Browser: Uses localStorage
 * Node.js: Uses process.env
 *
 * Usage:
 * ```javascript
 * storage.set('key', 'value');
 * const value = storage.get('key');
 * ```
 */
export const storage = typeof window !== 'undefined'
    ? {
        // Browser: localStorage Implementation
        get: key => localStorage.getItem(key),           // Read from localStorage
        set: (key, value) => localStorage.setItem(key, value)  // Write to localStorage
    }
    : {
        // Node.js: Environment Variables
        get: key => process.env[key],                   // Read from env
        set: (key, value) => process.env[key] = value   // Write to env
    };

/**
 * Conditional Export Patterns Demonstrated:
 *
 * 1. Feature Flags
 *    - Use configuration to control feature availability
 *    - Provide graceful fallbacks
 *    - Enable A/B testing or gradual rollouts
 *
 * 2. Environment Detection
 *    - Adapt behavior based on runtime environment
 *    - Provide environment-specific implementations
 *    - Maintain consistent APIs across platforms
 *
 * 3. Debug vs Production
 *    - Different behavior in development and production
 *    - Zero overhead in production
 *    - Enhanced debugging capabilities when needed
 */
