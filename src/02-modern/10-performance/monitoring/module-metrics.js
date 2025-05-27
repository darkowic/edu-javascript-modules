// Module performance monitoring

// Module loading metrics
class ModuleMetrics {
    constructor() {
        this.metrics = new Map();
        this.initMetrics();
    }

    initMetrics() {
        // Initialize performance observers
        this.observer = new PerformanceObserver(list => {
            list.getEntries().forEach(entry => {
                this.recordMetric(entry);
            });
        });

        // Observe module loading
        this.observer.observe({
            entryTypes: ['resource', 'measure']
        });
    }

    recordMetric(entry) {
        const metric = {
            duration: entry.duration,
            startTime: entry.startTime,
            transferSize: entry.transferSize,
            timestamp: Date.now()
        };

        if (!this.metrics.has(entry.name)) {
            this.metrics.set(entry.name, []);
        }
        this.metrics.get(entry.name).push(metric);
    }

    // Measure module load time
    async measureLoad(modulePath, operation) {
        const start = performance.now();
        const markStart = `${modulePath}-start`;
        const markEnd = `${modulePath}-end`;
        
        performance.mark(markStart);
        
        try {
            const result = await operation();
            performance.mark(markEnd);
            
            performance.measure(
                `Load ${modulePath}`,
                markStart,
                markEnd
            );
            
            return result;
        } catch (error) {
            this.recordError(modulePath, error);
            throw error;
        }
    }

    // Record loading error
    recordError(modulePath, error) {
        const errorMetric = {
            path: modulePath,
            error: error.message,
            timestamp: Date.now(),
            type: 'LoadError'
        };

        if (!this.metrics.has('errors')) {
            this.metrics.set('errors', []);
        }
        this.metrics.get('errors').push(errorMetric);
    }

    // Get module loading statistics
    getStats(modulePath) {
        const metrics = this.metrics.get(modulePath) || [];
        
        if (metrics.length === 0) {
            return null;
        }

        const durations = metrics.map(m => m.duration);
        
        return {
            count: metrics.length,
            averageTime: durations.reduce((a, b) => a + b, 0) / metrics.length,
            minTime: Math.min(...durations),
            maxTime: Math.max(...durations),
            totalSize: metrics.reduce((sum, m) => sum + (m.transferSize || 0), 0)
        };
    }

    // Get loading waterfall
    getWaterfall() {
        const entries = [];
        
        this.metrics.forEach((metrics, path) => {
            metrics.forEach(metric => {
                entries.push({
                    path,
                    startTime: metric.startTime,
                    endTime: metric.startTime + metric.duration,
                    duration: metric.duration
                });
            });
        });

        return entries.sort((a, b) => a.startTime - b.startTime);
    }

    // Clear metrics
    clear() {
        this.metrics.clear();
    }
}

// Usage example
const metrics = new ModuleMetrics();

// Measure module loading
async function loadModule(path) {
    return metrics.measureLoad(path, () => import(path));
}

// Get loading statistics
function getModuleStats(path) {
    const stats = metrics.getStats(path);
    console.log(`Module ${path} stats:`, stats);
}

// Export monitoring utilities
export { ModuleMetrics, loadModule, getModuleStats };
