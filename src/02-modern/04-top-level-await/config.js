/**
 * Configuration Loading with Top-level await
 *
 * This module demonstrates using top-level await for configuration loading.
 * Before top-level await, this would require wrapping in an async function
 * or using a promise-based initialization pattern.
 *
 * Benefits:
 * 1. Simpler code - no need for async IIFE or complex initialization
 * 2. Guaranteed config - importing modules can't execute before config loads
 * 3. Error handling - failed config load prevents dependent modules from running
 */

// Fetch configuration directly at module level
const response = await fetch('https://api.example.com/config');

// Parse and export the configuration
export const config = await response.json();

/**
 * Module Loading Behavior
 *
 * 1. When this module is imported, the JS runtime waits for the fetch
 * 2. The fetch completes and the response is received
 * 3. The JSON is parsed and assigned to 'config'
 * 4. Only then will the module finish loading
 * 5. Importing modules will then receive the ready-to-use config
 *
 * Error Handling:
 * If either the fetch or JSON parsing fails, the error propagates
 * to importing modules, preventing them from running with invalid config.
 */
