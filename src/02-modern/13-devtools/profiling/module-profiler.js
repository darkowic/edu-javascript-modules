// Module performance profiling

// Performance observer for module loading
const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    
    // Group by module
    const moduleStats = new Map();
    
    entries.forEach(entry => {
        if (entry.name.endsWith('.js')) {
            const stats = moduleStats.get(entry.name) || {
                count: 0,
                totalDuration: 0,
                entries: []
            };
            
            stats.count++;
            stats.totalDuration += entry.duration;
            stats.entries.push(entry);
            
            moduleStats.set(entry.name, stats);
        }
    });
    
    // Log statistics
    console.group('Module Loading Performance');
    moduleStats.forEach((stats, module) => {
        console.group(module);
        console.log('Load count:', stats.count);
        console.log('Average duration:', stats.totalDuration / stats.count);
        console.log('Total duration:', stats.totalDuration);
        console.table(stats.entries.map(entry => ({
            startTime: entry.startTime,
            duration: entry.duration,
            transferSize: entry.transferSize
        })));
        console.groupEnd();
    });
    console.groupEnd();
});

// Start observing
observer.observe({ 
    entryTypes: ['resource', 'measure']
});

// Module execution profiler
export class ModuleProfiler {
    constructor() {
        this.profiles = new Map();
    }
    
    // Start profiling a module
    start(moduleName) {
        performance.mark(`${moduleName}-start`);
        console.profile(moduleName);
        
        this.profiles.set(moduleName, {
            startTime: performance.now(),
            operations: new Map()
        });
    }
    
    // End module profiling
    end(moduleName) {
        const profile = this.profiles.get(moduleName);
        if (!profile) return;
        
        performance.mark(`${moduleName}-end`);
        performance.measure(
            `Module: ${moduleName}`,
            `${moduleName}-start`,
            `${moduleName}-end`
        );
        
        console.profileEnd(moduleName);
        
        const duration = performance.now() - profile.startTime;
        console.group(`Profile: ${moduleName}`);
        console.log('Total duration:', duration);
        
        // Log operation timings
        if (profile.operations.size > 0) {
            console.group('Operations');
            profile.operations.forEach((timing, operation) => {
                console.log(`${operation}:`, timing.duration);
            });
            console.groupEnd();
        }
        
        console.groupEnd();
        this.profiles.delete(moduleName);
    }
    
    // Track operation within module
    trackOperation(moduleName, operation, duration) {
        const profile = this.profiles.get(moduleName);
        if (!profile) return;
        
        profile.operations.set(operation, {
            duration,
            timestamp: performance.now()
        });
    }
}

// Usage example
const profiler = new ModuleProfiler();

// Profile module loading
profiler.start('feature');

// Import and initialize module
const module = await import('./feature.js');
await module.initialize();

// Track specific operations
profiler.trackOperation('feature', 'initialization', 150);
profiler.trackOperation('feature', 'data-loading', 300);

// End profiling
profiler.end('feature');
