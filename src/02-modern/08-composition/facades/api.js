/**
 * API Facade Module
 *
 * This module demonstrates the Facade pattern in ES Modules, providing a
 * simplified interface to a complex subsystem. It combines multiple
 * specialized modules into a unified, easy-to-use API.
 *
 * The Facade pattern is particularly useful when:
 * 1. You need to provide a simple interface to complex logic
 * 2. You want to decouple client code from subsystem implementation
 * 3. You need to layer your subsystems
 */

// Import specialized modules
import { HttpClient } from './http-client.js';   // Network requests
import { Cache } from './cache.js';              // Data caching
import { RateLimiter } from './rate-limiter.js'; // Request throttling

/**
 * Internal Service Instances
 * 
 * These are hidden from the outside world, allowing us to change
 * their implementation without affecting client code.
 */
const http = new HttpClient();        // Handles HTTP requests
const cache = new Cache();            // Manages data caching
const rateLimiter = new RateLimiter(); // Controls request rates

/**
 * Fetch Data with Caching and Rate Limiting
 *
 * This method encapsulates a complex workflow:
 * 1. Check cache for existing data
 * 2. Enforce rate limiting
 * 3. Make HTTP request if needed
 * 4. Update cache with new data
 *
 * @param {string} url - The URL to fetch data from
 * @returns {Promise<any>} The requested data
 */
export async function fetchData(url) {
    // Step 1: Check cache for existing data
    const cached = cache.get(url);
    if (cached) return cached;

    // Step 2: Ensure we're not exceeding rate limits
    await rateLimiter.checkLimit(url);

    // Step 3: Fetch fresh data and update cache
    const data = await http.get(url);
    cache.set(url, data);
    
    return data;
}

/**
 * Post Data with Error Handling
 *
 * Provides a simplified interface for posting data while still
 * maintaining rate limiting and proper error handling.
 *
 * @param {string} url - The target URL
 * @param {any} data - The data to post
 * @returns {Promise<any>} The server response
 */
export async function postData(url, data) {
    try {
        await rateLimiter.checkLimit(url);  // Respect rate limits
        return await http.post(url, data);   // Send data
    } catch (error) {
        // Wrap low-level errors in a more user-friendly format
        throw new Error(`Failed to post data: ${error.message}`);
    }
}

/**
 * Clear System State
 *
 * Provides a single method to reset all subsystems, hiding the
 * complexity of managing multiple internal services.
 */
export function clearCache() {
    cache.clear();         // Clear cached data
    rateLimiter.reset();   // Reset rate limiting counters
}

/**
 * Benefits of this Facade:
 * 
 * 1. Simplification
 *    - Complex operations reduced to single method calls
 *    - Implementation details hidden from clients
 *
 * 2. Decoupling
 *    - Clients don't need to know about subsystems
 *    - Can change implementations without affecting clients
 *
 * 3. Better Maintainability
 *    - Centralized point for subsystem coordination
 *    - Easier to modify behavior in one place
 *
 * 4. Enhanced Security
 *    - Control access to subsystem components
 *    - Enforce consistent security policies
 */
