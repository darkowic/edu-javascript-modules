// Critical path optimization
const criticalModules = [
    '/core/app.js',
    '/core/router.js',
    '/core/store.js',
    '/routes/home.js'
];

// Preload critical modules
export function preloadCritical() {
    criticalModules.forEach(module => {
        const link = document.createElement('link');
        link.rel = 'modulepreload';
        link.href = module;
        document.head.appendChild(link);
    });
}

// Preload specific route
export function preloadRoute(route) {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = `/routes/${route}.js`;
    document.head.appendChild(link);
}

// Prefetch non-critical modules
export function prefetchFeatures() {
    [
        '/features/comments.js',
        '/features/search.js',
        '/features/profile.js'
    ].forEach(feature => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = feature;
        document.head.appendChild(link);
    });
}
