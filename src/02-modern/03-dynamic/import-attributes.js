// Import attributes

// 1. JSON modules
const config = await import('./config.json', {
    with: { type: 'json' }
});

// 2. CSS modules
const styles = await import('./styles.css', {
    with: { type: 'css' }
});

// 3. WebAssembly modules
const wasm = await import('./module.wasm', {
    with: { type: 'webassembly' }
});

// 4. Multiple attributes
const module = await import('./module.js', {
    with: {
        type: 'javascript',
        integrity: 'sha384-...'
    }
});

// 5. Worker modules
const worker = await import('./worker.js', {
    with: { type: 'worker' }
});

// 6. Conditional attributes
const devModule = await import('./module.js', {
    with: {
        type: 'javascript',
        environment: process.env.NODE_ENV
    }
});

// 7. Resource hints with attributes
function preloadWithType(path, type) {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = path;
    link.setAttribute('as', type);
    document.head.appendChild(link);
}

// 8. Error handling for assertions
async function safeImportWithType(path, type) {
    try {
        return await import(path, { with: { type } });
    } catch (error) {
        if (error.code === 'ERR_IMPORT_ATTRIBUTE_TYPE_MISSING') {
            console.error(`Module ${path} doesn't support type: ${type}`);
        }
        throw error;
    }
}

// 9. Dynamic attributes
function loadResource(path, attributes) {
    return import(path, {
        with: {
            type: attributes.type,
            ...attributes.extra
        }
    });
}

// 10. Module types
const modules = {
    json: (path) => import(path, { with: { type: 'json' } }),
    css: (path) => import(path, { with: { type: 'css' } }),
    wasm: (path) => import(path, { with: { type: 'webassembly' } })
};

// Usage examples:
async function demo() {
    // Load JSON configuration
    const { default: settings } = await import('./settings.json', {
        with: { type: 'json' }
    });
    
    // Load CSS module
    const { default: styles } = await import('./styles.css', {
        with: { type: 'css' }
    });
    
    // Safe loading with type
    try {
        const mod = await safeImportWithType('./module.wasm', 'webassembly');
    } catch (error) {
        console.error('Failed to load WebAssembly module:', error);
    }
    
    // Dynamic resource loading
    const resource = await loadResource('./data.json', {
        type: 'json',
        extra: {
            integrity: 'sha384-...'
        }
    });
}
