// Module loading events and lifecycle

// 1. Module loading states
const STATES = {
    PENDING: 'pending',
    LOADING: 'loading',
    LOADED: 'loaded',
    ERROR: 'error'
};

class ModuleLoader {
    #state = STATES.PENDING;
    #module = null;
    #error = null;
    #listeners = new Set();

    async load(modulePath) {
        this.#setState(STATES.LOADING);
        
        try {
            this.#module = await import(modulePath);
            this.#setState(STATES.LOADED);
            return this.#module;
        } catch (error) {
            this.#error = error;
            this.#setState(STATES.ERROR);
            throw error;
        }
    }

    #setState(state) {
        this.#state = state;
        this.#notifyListeners();
    }

    #notifyListeners() {
        for (const listener of this.#listeners) {
            listener(this.#state, this.#module, this.#error);
        }
    }

    onStateChange(listener) {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }
}

// 2. Loading lifecycle hooks
class ModuleLifecycle {
    async beforeLoad() {
        // Hook before module starts loading
    }

    async afterLoad(module) {
        // Hook after module is loaded
    }

    async onError(error) {
        // Hook when loading fails
    }

    async load(modulePath) {
        await this.beforeLoad();
        
        try {
            const module = await import(modulePath);
            await this.afterLoad(module);
            return module;
        } catch (error) {
            await this.onError(error);
            throw error;
        }
    }
}

// 3. Module initialization tracking
class ModuleInitializer {
    #initialized = new Set();
    
    async initialize(modulePath) {
        if (this.#initialized.has(modulePath)) {
            return;
        }

        const module = await import(modulePath);
        
        if (typeof module.initialize === 'function') {
            await module.initialize();
        }
        
        this.#initialized.add(modulePath);
    }

    isInitialized(modulePath) {
        return this.#initialized.has(modulePath);
    }
}

// 4. Module dependencies
class ModuleDependencies {
    #dependencies = new Map();
    
    addDependency(module, dependency) {
        if (!this.#dependencies.has(module)) {
            this.#dependencies.set(module, new Set());
        }
        this.#dependencies.get(module).add(dependency);
    }

    async loadWithDependencies(modulePath) {
        const dependencies = this.#dependencies.get(modulePath) || new Set();
        
        // Load dependencies first
        await Promise.all(
            Array.from(dependencies).map(dep => import(dep))
        );
        
        // Then load the main module
        return import(modulePath);
    }
}

// Usage examples:
async function demo() {
    // 1. Module loading with state tracking
    const loader = new ModuleLoader();
    
    loader.onStateChange((state, module, error) => {
        console.log(`Module state: ${state}`);
        if (state === STATES.LOADED) {
            console.log('Module loaded:', module);
        } else if (state === STATES.ERROR) {
            console.error('Loading failed:', error);
        }
    });

    try {
        const module = await loader.load('./feature.js');
    } catch (error) {
        console.error('Failed to load module:', error);
    }

    // 2. Module with lifecycle hooks
    class AppModuleLifecycle extends ModuleLifecycle {
        async beforeLoad() {
            console.log('Preparing to load module...');
        }

        async afterLoad(module) {
            console.log('Module loaded:', module);
        }

        async onError(error) {
            console.error('Module loading failed:', error);
        }
    }

    const lifecycle = new AppModuleLifecycle();
    await lifecycle.load('./app.js');

    // 3. Module initialization
    const initializer = new ModuleInitializer();
    await initializer.initialize('./feature.js');

    if (initializer.isInitialized('./feature.js')) {
        console.log('Feature module is initialized');
    }

    // 4. Module with dependencies
    const dependencies = new ModuleDependencies();
    dependencies.addDependency('./app.js', './utils.js');
    dependencies.addDependency('./app.js', './config.js');

    const appModule = await dependencies.loadWithDependencies('./app.js');
}
