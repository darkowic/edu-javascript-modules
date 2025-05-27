// Network resilience for module loading
class NetworkResilientLoader {
    constructor() {
        this.failedModules = new Map();
        this.offlineQueue = [];
        this.setupNetworkHandlers();
    }

    // Set up network status handlers
    setupNetworkHandlers() {
        window.addEventListener('online', () => {
            console.log('Network online, retrying failed modules');
            this.retryFailedModules();
        });

        window.addEventListener('offline', () => {
            console.log('Network offline, queuing module loads');
        });
    }

    // Load module with network resilience
    async loadModule(path, options = {}) {
        const {
            timeout = 5000,
            fallback = null,
            critical = false
        } = options;

        // If offline and not critical, queue for later
        if (!navigator.onLine && !critical) {
            return this.queueOfflineLoad(path, options);
        }

        try {
            const module = await this.loadWithTimeout(path, timeout);
            this.failedModules.delete(path);
            return module;

        } catch (error) {
            if (error.name === 'NetworkError') {
                return this.handleNetworkFailure(path, fallback);
            }
            throw error;
        }
    }

    // Load with timeout
    async loadWithTimeout(path, timeout) {
        const controller = new AbortController();
        const signal = controller.signal;

        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(path, { signal });
            if (!response.ok) throw new Error('NetworkError');
            
            const module = await import(path);
            return module;

        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('NetworkError');
            }
            throw error;

        } finally {
            clearTimeout(timeoutId);
        }
    }

    // Handle network failure
    async handleNetworkFailure(path, fallback) {
        this.failedModules.set(path, {
            timestamp: Date.now(),
            retryCount: (this.failedModules.get(path)?.retryCount || 0) + 1
        });

        if (fallback) {
            return { default: fallback };
        }

        throw new Error(`Failed to load module ${path}`);
    }

    // Queue module load for when online
    queueOfflineLoad(path, options) {
        const promise = new Promise((resolve, reject) => {
            this.offlineQueue.push({
                path,
                options,
                resolve,
                reject
            });
        });

        return promise;
    }

    // Retry failed modules
    async retryFailedModules() {
        // Retry offline queue
        const queue = [...this.offlineQueue];
        this.offlineQueue = [];

        await Promise.allSettled(
            queue.map(async ({ path, options, resolve, reject }) => {
                try {
                    const module = await this.loadModule(path, options);
                    resolve(module);
                } catch (error) {
                    reject(error);
                }
            })
        );

        // Retry failed modules
        const failed = [...this.failedModules.entries()];
        await Promise.allSettled(
            failed.map(async ([path, info]) => {
                try {
                    await this.loadModule(path);
                } catch (error) {
                    console.warn(`Retry failed for ${path}:`, error);
                }
            })
        );
    }

    // Clear failed modules
    clearFailed() {
        this.failedModules.clear();
        this.offlineQueue = [];
    }
}

// Usage example
const resilientLoader = new NetworkResilientLoader();

// Load with network resilience
try {
    const module = await resilientLoader.loadModule('./feature.js', {
        timeout: 3000,
        fallback: () => console.log('Offline fallback'),
        critical: true
    });
    module.default();
} catch (error) {
    console.error('Failed to load module:', error);
}
