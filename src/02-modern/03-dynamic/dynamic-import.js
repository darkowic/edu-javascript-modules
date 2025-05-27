/**
 * Dynamic Import Patterns and Features
 *
 * This module demonstrates various patterns and techniques for using
 * dynamic imports in ES Modules. Dynamic imports allow for code-splitting,
 * lazy loading, and conditional loading of modules.
 */

// 1. Basic dynamic import
// The import() function returns a promise that resolves to the module namespace object
async function loadModule() {
    const module = await import('./feature.js');
    return module.default;  // Access the default export
}

// 2. Conditional loading
// Load modules only when needed, great for polyfills and feature detection
async function loadPolyfill() {
    if (!window.fetch) {
        const { fetch } = await import('whatwg-fetch');
        window.fetch = fetch;  // Apply polyfill only if needed
    }
}

// 3. Error handling
// Handle various module loading errors gracefully
async function safeImport(modulePath) {
    try {
        return await import(modulePath);
    } catch (error) {
        if (error.code === 'ERR_MODULE_NOT_FOUND') {
            console.warn(`Module ${modulePath} not found`);
        } else {
            console.error('Import error:', error);
        }
        return null;  // Return null instead of throwing
    }
}

// 4. Dynamic module specifiers
// Use template literals to construct module paths dynamically
function loadLocale(locale) {
    return import(`./locales/${locale}.js`);  // Dynamic path based on locale
}

// 5. Import attributes
// Specify how to interpret and load different types of modules
const jsonModule = await import('./data.json', {
    assert: { type: 'json' }  // Tell the runtime this is JSON
});

// 6. Multiple parallel imports
// Load multiple modules concurrently for better performance
async function loadFeatures() {
    const [moduleA, moduleB] = await Promise.all([
        import('./feature-a.js'),
        import('./feature-b.js')
    ]);
    return { moduleA, moduleB };
}

// 7. Import with side effects
// Sometimes you only need the module's side effects (initialization)
async function initializeFeature() {
    await import('./initialize.js');  // Module is executed but exports aren't used
}

// 8. Dynamic import in expressions
// import() can be used in expressions for dynamic loading decisions
const lazyModule = condition 
    ? import('./feature-a.js')
    : import('./feature-b.js');

// 9. Module loading events
// Track the loading state of modules
const modulePromise = import('./module.js');
modulePromise.then(
    module => console.log('Loaded:', module),
    error => console.error('Failed:', error)
);

// 10. Import metadata
// Access information about the current module
console.log(import.meta.url);  // Get the URL of the current module

// 11. Dynamic imports with destructuring
// Directly access named exports from dynamically imported modules
const { feature1, feature2 } = await import('./features.js');

// 12. Lazy loading components
// Load component implementations only when needed
class LazyComponent {
    async initialize() {
        const { render } = await import('./renderer.js');
        this.render = render;  // Attach loaded implementation
    }
}

// 13. Module loading states
// Handle loading states for better user experience
function showLoadingState(promise) {
    loading.show();  // Show loading indicator
    promise
        .then(module => {
            loading.hide();  // Hide on success
            return module;
        })
        .catch(error => {
            loading.error(error);  // Show error state
            throw error;
        });
}

// 14. Dynamic import with timeout
// Add timeout to module loading for better reliability
async function importWithTimeout(modulePath, timeout) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Import timeout')), timeout);
    });
    
    return Promise.race([
        import(modulePath),
        timeoutPromise
    ]);
}

// 15. Module preloading
// Hint to the browser to preload modules for better performance
function preloadModule(path) {
    const link = document.createElement('link');
    link.rel = 'modulepreload';  // Browser will preload the module
    link.href = path;
    document.head.appendChild(link);
}

/**
 * Practical Usage Examples
 * 
 * This demo shows how to combine various dynamic import patterns
 * for real-world scenarios.
 */
async function demo() {
    // Basic module loading
    const module = await loadModule();
    
    // Feature-based loading
    if (needsFeature) {
        const { feature } = await import('./feature.js');
        feature();
    }
    
    // Efficient parallel loading
    const features = await loadFeatures();
    
    // Graceful error handling
    const optionalModule = await safeImport('./optional.js');
    
    // Performance optimization
    preloadModule('./heavy-module.js');  // Preload first
    // Use when needed
    const heavyModule = await import('./heavy-module.js');
}
