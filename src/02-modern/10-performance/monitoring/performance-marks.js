// Performance marks and measures

// Create performance timeline
export function createTimeline() {
    // Start application load
    performance.mark('app-init-start');

    // Mark core module loading
    performance.mark('core-modules-start');
    loadCoreModules().then(() => {
        performance.mark('core-modules-end');
        performance.measure(
            'Core Modules Load Time',
            'core-modules-start',
            'core-modules-end'
        );
    });

    // Mark route module loading
    performance.mark('route-modules-start');
    loadRouteModules().then(() => {
        performance.mark('route-modules-end');
        performance.measure(
            'Route Modules Load Time',
            'route-modules-start',
            'route-modules-end'
        );
    });

    // Mark feature module loading
    performance.mark('feature-modules-start');
    loadFeatureModules().then(() => {
        performance.mark('feature-modules-end');
        performance.measure(
            'Feature Modules Load Time',
            'feature-modules-start',
            'feature-modules-end'
        );
    });

    // End application load
    window.addEventListener('load', () => {
        performance.mark('app-init-end');
        performance.measure(
            'Total App Load Time',
            'app-init-start',
            'app-init-end'
        );
    });
}

// Module loading simulation
async function loadCoreModules() {
    await Promise.all([
        import('/core/app.js'),
        import('/core/router.js'),
        import('/core/store.js')
    ]);
}

async function loadRouteModules() {
    const currentRoute = window.location.pathname;
    await import(`/routes${currentRoute}.js`);
}

async function loadFeatureModules() {
    const features = ['comments', 'search', 'profile'];
    await Promise.all(
        features.map(f => import(`/features/${f}.js`))
    );
}

// Performance monitoring
export function monitorPerformance() {
    // Create performance observer
    const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
            // Log measure entries
            if (entry.entryType === 'measure') {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        });
    });

    // Start observing
    observer.observe({
        entryTypes: ['measure', 'mark']
    });

    return observer;
}

// Clear performance data
export function clearPerformanceData() {
    performance.clearMarks();
    performance.clearMeasures();
}
