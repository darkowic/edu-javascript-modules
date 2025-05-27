// Debugging helpers for modules

// Debug point for module loading
export function debugModule(moduleName) {
    console.group(`Module: ${moduleName}`);
    console.trace('Loading stack');
    
    // Create breakpoint opportunity
    debugger;
    
    return {
        log: createLogger(moduleName),
        track: createTracker(moduleName),
        profile: createProfiler(moduleName)
    };
}

// Create namespaced logger
function createLogger(namespace) {
    return {
        info: (...args) => console.log(`[${namespace}]`, ...args),
        warn: (...args) => console.warn(`[${namespace}]`, ...args),
        error: (...args) => console.error(`[${namespace}]`, ...args),
        group: (label) => console.group(`[${namespace}] ${label}`),
        groupEnd: () => console.groupEnd()
    };
}

// Create execution tracker
function createTracker(namespace) {
    const timers = new Map();
    
    return {
        start: (label) => {
            const timer = {
                start: performance.now(),
                label
            };
            timers.set(label, timer);
            console.time(`[${namespace}] ${label}`);
        },
        
        end: (label) => {
            const timer = timers.get(label);
            if (timer) {
                const duration = performance.now() - timer.start;
                console.timeEnd(`[${namespace}] ${label}`);
                timers.delete(label);
                return duration;
            }
        },
        
        measure: async (label, fn) => {
            const tracker = createTracker(namespace);
            tracker.start(label);
            try {
                return await fn();
            } finally {
                tracker.end(label);
            }
        }
    };
}

// Create performance profiler
function createProfiler(namespace) {
    return {
        start: (label) => {
            console.profile(`[${namespace}] ${label}`);
        },
        
        end: () => {
            console.profileEnd();
        },
        
        mark: (label) => {
            performance.mark(`${namespace}:${label}`);
        },
        
        measure: (label, startMark, endMark) => {
            performance.measure(
                `[${namespace}] ${label}`,
                `${namespace}:${startMark}`,
                `${namespace}:${endMark}`
            );
        }
    };
}

// Usage example
const debug = debugModule('MyFeature');

// Logging
debug.log.info('Feature initialized');
debug.log.warn('Deprecated usage');

// Tracking
debug.track.start('operation');
await someOperation();
const duration = debug.track.end('operation');

// Profiling
debug.profile.start('critical-section');
await criticalOperation();
debug.profile.end();

// Performance marks
debug.profile.mark('init-start');
await initialize();
debug.profile.mark('init-end');
debug.profile.measure('Initialization', 'init-start', 'init-end');
