/**
 * Main Thread Integration with Module Workers
 *
 * This module demonstrates how to create, communicate with, and manage
 * different types of module-based workers from the main thread.
 * It shows the integration of dedicated workers, shared workers,
 * and worklets using ES Modules.
 */

// 1. Dedicated Worker
// Create a worker that runs in its own thread and is exclusive to this page
const worker = new Worker('./worker.js', {
    type: 'module'  // Enable ES Module support in the worker
});

/**
 * Dedicated Worker Message Handler
 * 
 * Processes messages from the dedicated worker, handling both
 * successful results and errors using a structured message format.
 */
worker.onmessage = function(e) {
    if (e.data.type === 'success') {
        console.log('Worker result:', e.data.data);
    } else if (e.data.type === 'error') {
        console.error('Worker error:', e.data.error);
    }
};

// 2. Shared Worker
// Create a worker that can be shared between multiple pages/tabs
const sharedWorker = new SharedWorker('./shared-worker.js', {
    type: 'module'  // Enable ES Module support in the shared worker
});

/**
 * Shared Worker Message Handler
 * 
 * Handles messages from the shared worker, which can include
 * results, errors, and notifications from other connected clients.
 */
sharedWorker.port.onmessage = function(e) {
    if (e.data.type === 'success') {
        console.log('Shared worker result:', e.data.data);
    } else if (e.data.type === 'error') {
        console.error('Shared worker error:', e.data.error);
    } else if (e.data.type === 'notification') {
        console.log('Notification:', e.data.message);
    }
};

// Initialize the shared worker connection
sharedWorker.port.start();

// 3. Paint Worklet
// Register a CSS Paint Worklet for custom rendering
CSS.paintWorklet.addModule('./paint-worklet.js')
    .then(() => console.log('Paint worklet registered'))
    .catch(error => console.error('Paint worklet error:', error));

/**
 * Example: Prime Number Calculation
 * 
 * Demonstrates parallel processing using both dedicated and shared workers.
 * The work is split between workers to maximize CPU utilization.
 */
function calculatePrimes() {
    // Task 1: Use dedicated worker for first range
    worker.postMessage({
        start: 1,        // Start of range
        end: 100000      // End of range
    });
    
    // Task 2: Use shared worker for second range
    sharedWorker.port.postMessage({
        id: Date.now(),  // Unique task ID
        start: 100001,   // Start of range
        end: 200000      // End of range
    });
}

// Make the function available globally for HTML interaction
window.calculatePrimes = calculatePrimes;

/**
 * Worker Types and Use Cases:
 *
 * 1. Dedicated Workers
 *    - Single page/context
 *    - Heavy computations
 *    - Data processing
 *    - Independent tasks
 *
 * 2. Shared Workers
 *    - Cross-page communication
 *    - Shared state management
 *    - Resource pooling
 *    - Coordinated tasks
 *
 * 3. Worklets
 *    - Custom rendering
 *    - CSS extensions
 *    - Animation handling
 *    - Layout calculations
 */
