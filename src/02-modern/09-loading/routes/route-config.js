// Route-based code splitting
export const routes = {
    home: {
        path: '/',
        component: () => import('./pages/home.js'),
        preload: true  // Load immediately
    },
    about: {
        path: '/about',
        component: () => import('./pages/about.js'),
        preload: true  // Load immediately
    },
    profile: {
        path: '/profile',
        component: () => import('./pages/profile.js'),
        preload: false,  // Load on demand
        dependencies: ['auth']  // Load auth first
    },
    settings: {
        path: '/settings',
        component: () => import('./pages/settings.js'),
        preload: false,
        dependencies: ['auth', 'user']
    }
};

// Preload critical routes
export async function preloadCriticalRoutes() {
    const criticalRoutes = Object.values(routes)
        .filter(route => route.preload);

    await Promise.all(
        criticalRoutes.map(route => route.component())
    );
}

// Load route with dependencies
export async function loadRoute(name) {
    const route = routes[name];
    if (!route) throw new Error(`Route ${name} not found`);

    // Load dependencies first
    if (route.dependencies) {
        await Promise.all(
            route.dependencies.map(dep => 
                import(`./dependencies/${dep}.js`)
            )
        );
    }

    // Then load the route component
    return route.component();
}
