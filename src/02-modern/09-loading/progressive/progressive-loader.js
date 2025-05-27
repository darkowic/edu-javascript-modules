// Progressive module loading
export class ProgressiveLoader {
    constructor() {
        this.loaded = new Set();
        this.loading = new Map();
        this.queue = [];
        this.processing = false;
    }

    // Add module to loading queue
    async load(modulePath, priority = 0) {
        if (this.loaded.has(modulePath)) {
            return this.loaded.get(modulePath);
        }

        if (this.loading.has(modulePath)) {
            return this.loading.get(modulePath);
        }

        const promise = new Promise((resolve, reject) => {
            this.queue.push({
                path: modulePath,
                priority,
                resolve,
                reject
            });
        });

        this.loading.set(modulePath, promise);
        this.processQueue();
        
        return promise;
    }

    // Process loading queue
    async processQueue() {
        if (this.processing) return;
        this.processing = true;

        try {
            // Sort by priority
            this.queue.sort((a, b) => b.priority - a.priority);

            while (this.queue.length > 0) {
                const batch = this.queue.splice(0, 3); // Load 3 at a time
                
                await Promise.all(batch.map(async item => {
                    try {
                        const module = await import(item.path);
                        this.loaded.set(item.path, module);
                        this.loading.delete(item.path);
                        item.resolve(module);
                    } catch (error) {
                        this.loading.delete(item.path);
                        item.reject(error);
                    }
                }));

                // Small delay between batches
                if (this.queue.length > 0) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
        } finally {
            this.processing = false;
        }
    }

    // Preload modules without executing
    preload(modulePath) {
        const link = document.createElement('link');
        link.rel = 'modulepreload';
        link.href = modulePath;
        document.head.appendChild(link);
    }

    // Clear loader state
    clear() {
        this.loaded.clear();
        this.loading.clear();
        this.queue = [];
        this.processing = false;
    }
}

// Usage example
const loader = new ProgressiveLoader();

// High priority modules
loader.load('/core/app.js', 2);
loader.load('/core/router.js', 2);

// Medium priority modules
loader.load('/features/auth.js', 1);
loader.load('/features/user.js', 1);

// Low priority modules
loader.load('/features/analytics.js', 0);
loader.load('/features/feedback.js', 0);
