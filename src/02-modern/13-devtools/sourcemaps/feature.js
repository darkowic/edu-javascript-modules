// Original source file (will be transformed)
export class Feature {
    constructor() {
        this.initialized = false;
    }

    async initialize() {
        // This comment and formatting will be preserved in source maps
        try {
            await this.loadDependencies();
            this.initialized = true;
            
            // Debug point for initialization
            debugger;
            
            return true;
        } catch (error) {
            console.error('Initialization failed:', error);
            return false;
        }
    }

    async loadDependencies() {
        // This will be async/await transformed
        const [dep1, dep2] = await Promise.all([
            import('./dependency1.js'),
            import('./dependency2.js')
        ]);

        return { dep1, dep2 };
    }
}
