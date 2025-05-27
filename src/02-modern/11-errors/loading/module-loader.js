/**
 * Module Loading Error Handler
 *
 * This class provides robust error handling for dynamic module imports,
 * including retries, timeouts, caching, and fallback mechanisms.
 *
 * Features:
 * - Automatic retries for network errors
 * - Timeout handling
 * - Module caching
 * - Fallback implementations
 * - Configurable retry delays
 */
class ModuleLoader {
    constructor() {
        // Progressive retry delays (1s, 2s, 5s)
        this.retryDelays = [1000, 2000, 5000];  // Exponential backoff
        this.cache = new Map();                  // Module cache
    }

    /**
     * Load a module with comprehensive error handling
     *
     * @param {string} path - Path to the module
     * @param {object} options - Loading options
     * @param {number} options.retries - Number of retry attempts
     * @param {function|any} options.fallback - Fallback if module fails
     * @param {number} options.timeout - Timeout in milliseconds
     * @returns {Promise<any>} The loaded module
     */
    async loadModule(path, options = {}) {
        const {
            retries = this.retryDelays.length,  // Default to max retries
            fallback = null,                    // No fallback by default
            timeout = 10000                     // 10 second timeout
        } = options;

        try {
            // Step 1: Check cache
            if (this.cache.has(path)) {
                return this.cache.get(path);  // Return cached module
            }

            // Step 2: Attempt load with timeout
            const module = await this.loadWithTimeout(path, timeout);
            this.cache.set(path, module);     // Cache successful load
            return module;

        } catch (error) {
            // Step 3: Error-specific handling
            if (error.name === 'TimeoutError') {
                console.warn(`Module ${path} load timed out`);
                return this.handleTimeout(path, retries);
            }

            if (error instanceof TypeError) {
                console.error(`Module ${path} syntax error:`, error);
                return this.handleSyntaxError(fallback);
            }

            if (error.name === 'NetworkError') {
                console.warn(`Network error loading ${path}`);
                return this.handleNetworkError(path, retries);
            }

            // Step 4: Unhandled error
            console.error(`Failed to load module ${path}:`, error);
            throw error;  // Re-throw unhandled errors
        }
    }

    /**
     * Load a module with timeout protection
     * 
     * Uses Promise.race to implement timeout behavior
     */
    async loadWithTimeout(path, timeout) {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('TimeoutError'));
            }, timeout);
        });

        return Promise.race([
            import(path),         // Actual module load
            timeoutPromise        // Timeout counter
        ]);
    }

    /**
     * Handle timeout errors with retry logic
     * 
     * Implements exponential backoff using retryDelays
     */
    async handleTimeout(path, retriesLeft) {
        if (retriesLeft <= 0) {
            throw new Error(`Module ${path} load timeout after retries`);
        }

        // Calculate delay for this retry attempt
        const delay = this.retryDelays[this.retryDelays.length - retriesLeft];
        await new Promise(resolve => setTimeout(resolve, delay));

        // Retry with one less attempt
        return this.loadModule(path, { retries: retriesLeft - 1 });
    }

    /**
     * Handle syntax errors by providing fallback
     * 
     * Supports both function and value fallbacks
     */
    async handleSyntaxError(fallback) {
        if (typeof fallback === 'function') {
            return { default: fallback };  // Function fallback
        }
        if (fallback) {
            return { default: fallback };   // Value fallback
        }
        throw new Error('Module syntax error and no fallback provided');
    }

    /**
     * Handle network errors with retry logic
     * 
     * Similar to timeout handling but specific to network issues
     */
    async handleNetworkError(path, retriesLeft) {
        if (retriesLeft <= 0) {
            throw new Error(`Module ${path} network error after retries`);
        }

        // Use same delay strategy as timeout handling
        const delay = this.retryDelays[this.retryDelays.length - retriesLeft];
        await new Promise(resolve => setTimeout(resolve, delay));

        return this.loadModule(path, { retries: retriesLeft - 1 });
    }

    /**
     * Clear the module cache
     * 
     * Useful when needing to reload modules or free memory
     */
    clearCache() {
        this.cache.clear();
    }
}

/**
 * Example Usage
 * 
 * This demonstrates a typical use case with:
 * - Multiple retry attempts
 * - Fallback function
 * - Custom timeout
 * - Error handling
 */
const loader = new ModuleLoader();

try {
    const module = await loader.loadModule('./feature.js', {
        retries: 3,                                    // Try 3 times
        fallback: () => console.log('Fallback feature'), // Fallback function
        timeout: 5000                                  // 5 second timeout
    });
    module.default();  // Use the loaded module
} catch (error) {
    console.error('Final error:', error);  // Handle unrecoverable error
}

/**
 * Error Handling Strategy:
 *
 * 1. Timeout Errors
 *    - Occur when module takes too long to load
 *    - Retry with exponential backoff
 *    - Give up after max retries
 *
 * 2. Syntax Errors
 *    - Invalid module code
 *    - Use fallback if provided
 *    - No retries (code won't fix itself)
 *
 * 3. Network Errors
 *    - Connection issues
 *    - Retry with exponential backoff
 *    - Give up after max retries
 *
 * 4. Other Errors
 *    - Unhandled error types
 *    - Log and propagate
 *    - No automatic recovery
 */
