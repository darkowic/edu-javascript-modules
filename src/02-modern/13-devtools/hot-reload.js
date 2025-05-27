// Hot module reloading for development

// Module cache for HMR
const moduleCache = new Map();

// Module dependencies
const moduleDependencies = new Map();

// Track module updates
const moduleUpdates = new Set();

// HMR API
export const hot = {
    // Accept module updates
    accept(dependencies, callback) {
        const module = getCurrentModule();
        dependencies.forEach(dep => {
            const deps = moduleDependencies.get(dep) || new Set();
            deps.add(module);
            moduleDependencies.set(dep, deps);
        });
        
        if (callback) {
            module.hot.dispose(callback);
        }
    },
    
    // Cleanup before update
    dispose(callback) {
        const module = getCurrentModule();
        module.disposeCallback = callback;
    },
    
    // Invalidate module
    invalidate() {
        const module = getCurrentModule();
        invalidateModule(module);
    }
};

// Update module
async function updateModule(modulePath) {
    const module = moduleCache.get(modulePath);
    if (!module) return;
    
    // Run dispose handlers
    if (module.disposeCallback) {
        module.disposeCallback();
    }
    
    try {
        // Re-import module
        const newModule = await import(modulePath + '?t=' + Date.now());
        moduleCache.set(modulePath, newModule);
        
        // Update dependents
        const dependents = moduleDependencies.get(modulePath);
        if (dependents) {
            for (const dependent of dependents) {
                await updateModule(dependent);
            }
        }
        
        console.log(`[HMR] Module ${modulePath} updated`);
    } catch (error) {
        console.error(`[HMR] Failed to update ${modulePath}:`, error);
    }
}

// Invalidate module and dependencies
function invalidateModule(modulePath) {
    if (moduleUpdates.has(modulePath)) return;
    moduleUpdates.add(modulePath);
    
    const dependents = moduleDependencies.get(modulePath);
    if (dependents) {
        dependents.forEach(invalidateModule);
    }
}

// Get current module
function getCurrentModule() {
    // This would be provided by the bundler
    return {
        id: 'current-module',
        hot
    };
}

// Watch for file changes
if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
        updateModule(import.meta.url);
    });
}

// Example usage
export function setupHMR(modulePath) {
    hot.accept([modulePath], () => {
        console.log(`Module ${modulePath} updated, reloading...`);
        location.reload();
    });
}
