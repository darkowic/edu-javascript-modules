/**
 * Parallel Data Loading with Top-level await
 *
 * This module demonstrates how to efficiently load multiple resources
 * in parallel while using top-level await. Even though the module
 * itself is async, we can still optimize the loading process.
 *
 * Performance Benefits:
 * 1. Both API requests start simultaneously
 * 2. Response processing happens in parallel
 * 3. No unnecessary sequential waiting
 */

// Step 1: Fetch data in parallel
// Promise.all allows multiple fetches to happen concurrently
// This is much faster than sequential fetches
const [userResponse, orderResponse] = await Promise.all([
    fetch('https://api.example.com/users'),    // Starts immediately
    fetch('https://api.example.com/orders')    // Starts immediately
]);

// Step 2: Process responses in parallel
// Once we have the responses, we can also parse them concurrently
// This is especially important for large JSON payloads
const [users, orders] = await Promise.all([
    userResponse.json(),    // Parse user data
    orderResponse.json()    // Parse order data
]);

// Step 3: Export the processed data
// Both datasets are now ready to use
export { users, orders };

/**
 * Loading Behavior
 *
 * 1. When this module is imported, both fetches begin immediately
 * 2. The module waits for both fetches to complete
 * 3. JSON parsing happens in parallel for both responses
 * 4. The module completes only when all data is ready
 * 5. Importing modules get fully processed data
 *
 * This pattern is ideal when you need multiple independent
 * resources and want to load them as efficiently as possible.
 */
