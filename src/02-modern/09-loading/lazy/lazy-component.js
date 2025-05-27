/**
 * Lazy Loading Component Pattern
 *
 * This module implements a wrapper for lazy-loaded components using
 * dynamic imports. It provides a clean interface for loading components
 * on demand, with proper loading state management and error handling.
 *
 * Key features:
 * - Deferred loading until first use
 * - Loading state management
 * - Error handling
 * - Singleton instance per component
 * - Request coalescing
 */

export class LazyComponent {
    /**
     * Create a new lazy-loaded component
     * @param {() => Promise<any>} importFn - Dynamic import function
     */
    constructor(importFn) {
        this.importFn = importFn;      // Dynamic import function
        this.component = null;         // Cached component instance
        this.loading = false;          // Loading state flag
        this.error = null;             // Last error if any
        this.onLoad = null;            // Load completion callback
    }

    /**
     * Load the component if not already loaded
     * 
     * This method handles:
     * 1. Caching - Returns existing component if already loaded
     * 2. Coalescing - Returns same promise for concurrent requests
     * 3. Error handling - Captures and propagates errors
     * 
     * @returns {Promise<any>} The loaded component
     */
    async load() {
        // Return cached component if available
        if (this.component) return this.component;

        // Return existing load promise if already loading
        if (this.loading) return new Promise(resolve => {
            this.onLoad = resolve;  // Queue this request
        });

        this.loading = true;

        try {
            // Dynamically import the component
            const module = await this.importFn();
            this.component = module.default;

            // Notify any queued requests
            this.onLoad?.(this.component);
            return this.component;
        } catch (error) {
            this.error = error;
            throw error;  // Propagate error to caller
        } finally {
            this.loading = false;
        }
    }

    /**
     * Render the component with given arguments
     * 
     * This is a convenience method that ensures the component
     * is loaded before attempting to render it.
     *
     * @param {...any} args - Arguments to pass to component's render
     * @returns {Promise<any>} The render result
     */
    async render(...args) {
        const component = await this.load();
        return component.render(...args);
    }
}

/**
 * Example Usage
 * 
 * Create lazy-loaded components that are only imported
 * when first used. This helps with:
 * - Initial bundle size reduction
 * - Faster page loads
 * - Better resource utilization
 */

// Rich text editor - Only loaded when editing starts
export const LazyEditor = new LazyComponent(
    () => import('./features/editor.js')
);

// Data visualization - Only loaded when charts are needed
export const LazyChart = new LazyComponent(
    () => import('./features/chart.js')
);

/**
 * Usage in application:
 * ```javascript
 * // Component only loads when render is called
 * const editor = await LazyEditor.render({ 
 *     content: 'Edit me'
 * });
 *
 * // Second render uses cached component
 * const chart = await LazyChart.render({
 *     data: [1, 2, 3]
 * });
 * ```
 */
