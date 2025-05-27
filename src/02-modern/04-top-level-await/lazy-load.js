// Lazy loading with top-level await

// Only load heavy dependencies when needed
const heavyDep = await (async () => {
    if (process.env.NODE_ENV === 'development') {
        const { devDependency } = await import('./dev-dependency.js');
        return devDependency;
    }
    return null;
})();

export const DEV_TOOLS = heavyDep ? await heavyDep.initialize() : null;

// Module initialization is blocked, but dependency is loaded conditionally
