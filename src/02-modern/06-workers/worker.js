/**
 * Dedicated Worker with ES Modules Support
 *
 * This worker demonstrates how to use ES Modules in Web Workers,
 * enabling better code organization, module reuse, and maintainability
 * in background processing tasks.
 */

// Import required functionality from other modules
import { calculatePrimes } from './math.js';     // Computation logic
import { formatResult } from './format.js';      // Result formatting

/**
 * Worker Message Handler
 * 
 * Processes messages from the main thread. The worker can use
 * all ES Module features while running in a separate thread.
 *
 * Message Format:
 * {
 *   start: number,  // Start of range for prime calculation
 *   end: number     // End of range for prime calculation
 * }
 */
self.onmessage = async function(e) {
    // Extract range from message data
    const { start, end } = e.data;
    
    try {
        // Step 1: Calculate primes using imported function
        // This runs in a separate thread, not blocking the main thread
        const primes = await calculatePrimes(start, end);
        
        // Step 2: Format the results
        // Demonstrate using multiple imported modules
        const result = formatResult(primes);
        
        // Step 3: Send successful result back to main thread
        self.postMessage({
            type: 'success',
            data: result
        });
    } catch (error) {
        // Error handling: Send error back to main thread
        self.postMessage({
            type: 'error',
            error: error.message
        });
    }
};

/**
 * Module Worker Benefits:
 * 
 * 1. Code Organization
 *    - Split worker code into modules
 *    - Reuse modules between workers
 *    - Better maintainability
 *
 * 2. Feature Support
 *    - Use import/export
 *    - Async/await support
 *    - Modern JS features
 *
 * 3. Performance
 *    - Run CPU-intensive tasks
 *    - Non-blocking operations
 *    - Parallel processing
 *
 * 4. Error Handling
 *    - Structured error handling
 *    - Error propagation
 *    - Clean error reporting
 */
