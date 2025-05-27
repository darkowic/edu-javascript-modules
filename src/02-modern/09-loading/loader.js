// Module loading orchestrator
import { router } from './core/router.js';
import { store } from './core/store.js';

// Module cache
const moduleCache = new Map();

// Loading states
const loadingStates = new Set();

// Show loading indicator
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

// Hide loading indicator
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Load a module with loading state
async function loadModule(name) {
    if (loadingStates.has(name)) {
        return moduleCache.get(name);
    }

    loadingStates.add(name);
    showLoading();

    try {
        const module = await import(`./routes/${name}.js`);
        moduleCache.set(name, module);
        return module;
    } finally {
        loadingStates.delete(name);
        if (loadingStates.size === 0) {
            hideLoading();
        }
    }
}

// Progressive loading with dependencies
async function loadFeature(name, dependencies = []) {
    // Load dependencies first
    await Promise.all(dependencies.map(dep => loadModule(dep)));
    
    // Then load the feature
    return loadModule(name);
}

// Initialize the loader
export function initLoader() {
    // Handle route changes
    router.onNavigate(async (route) => {
        const module = await loadModule(route);
        module.render();
    });

    // Handle feature buttons
    document.getElementById('load-comments').onclick = async () => {
        const { Comments } = await loadFeature('comments', ['user']);
        new Comments().mount('#app');
    };

    document.getElementById('load-search').onclick = async () => {
        const { Search } = await loadFeature('search', ['api']);
        new Search().mount('#app');
    };
}

// Export loading utilities
export { loadModule, loadFeature };
