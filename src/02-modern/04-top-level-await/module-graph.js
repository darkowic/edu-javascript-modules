/**
 * Module Graph Dependencies with Top-level await
 *
 * This module demonstrates how top-level await affects the module graph
 * and execution order. When a module uses top-level await, it becomes
 * part of an asynchronous dependency chain that influences how and when
 * other modules execute.
 */

// Import modules that use top-level await
// Each of these modules may pause execution at the top level
import { config } from './config.js';       // Waits for config fetch
import { query } from './database.js';      // Waits for config
import { users, orders } from './parallel.js';  // Parallel fetches
import { DEV_TOOLS } from './lazy-load.js';    // Conditional load
import { data } from './fallback.js';          // Primary/backup strategy

/**
 * Module Execution Guarantee
 * 
 * This code won't execute until ALL imported modules have fully initialized.
 * This includes waiting for any top-level await operations to complete.
 */
console.log('All dependencies loaded:', {
    hasConfig: !!config,          // Config is loaded
    hasDatabase: !!query,         // Database is initialized
    userCount: users.length,      // User data is fetched
    orderCount: orders.length,    // Order data is fetched
    devTools: !!DEV_TOOLS,       // Dev tools are conditionally loaded
    data: !!data                 // Primary or backup data is available
});

/**
 * Module Exports
 * 
 * When this module is imported elsewhere, the importing module will
 * wait for this entire dependency chain to resolve before executing.
 */
export const ready = {
    config,      // Configuration settings
    query,       // Database query function
    users,       // User data
    orders,      // Order data
    DEV_TOOLS,   // Development tools
    data         // Application data
};

/**
 * Module Graph Execution Order
 * 
 * The execution of modules forms a directed acyclic graph (DAG)
 * where async operations can pause execution:
 * 
 * 1. config.js - Starts first, pauses to fetch configuration
 * 2. database.js - Waits for config.js to fully initialize
 * 3. parallel.js - Makes multiple fetches concurrently
 * 4. lazy-load.js - May dynamically import based on conditions
 * 5. fallback.js - Attempts primary source, falls back if needed
 * 6. This module - Waits for entire dependency tree
 * 
 * This demonstrates how top-level await enables complex async
 * initialization patterns while maintaining predictable loading.
 */
