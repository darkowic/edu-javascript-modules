// Module chunking strategy
export const chunks = {
    // Main chunk - critical path
    main: [
        '/core/app.js',
        '/core/router.js',
        '/core/store.js'
    ],

    // Vendor chunk - third-party dependencies
    vendor: [
        '/node_modules/react/index.js',
        '/node_modules/redux/index.js',
        '/node_modules/lodash-es/index.js'
    ],

    // Feature chunks - lazy loaded
    features: {
        dashboard: [
            '/features/dashboard/index.js',
            '/features/dashboard/charts.js',
            '/features/dashboard/stats.js'
        ],
        profile: [
            '/features/profile/index.js',
            '/features/profile/avatar.js',
            '/features/profile/settings.js'
        ]
    },

    // Route chunks - loaded on navigation
    routes: {
        home: ['/routes/home/index.js'],
        about: ['/routes/about/index.js'],
        contact: ['/routes/contact/index.js']
    },

    // Shared chunks - common dependencies
    shared: [
        '/shared/utils.js',
        '/shared/constants.js',
        '/shared/api.js'
    ]
};

// Chunk loading order
export const loadOrder = [
    'vendor',    // Load vendor first
    'shared',    // Then shared dependencies
    'main',      // Then main application
    'routes',    // Then current route
    'features'   // Then features as needed
];

// Chunk optimization rules
export const optimizationRules = {
    // Minimum chunk size
    minSize: 20000,  // 20KB
    
    // Maximum chunk size
    maxSize: 250000,  // 250KB
    
    // Minimum modules to create chunk
    minChunks: 2,
    
    // Maximum parallel requests
    maxInitialRequests: 4,
    maxAsyncRequests: 6,
    
    // Automatic chunk creation
    automaticNameDelimiter: '-',
    
    // Cache groups
    cacheGroups: {
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        },
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        }
    }
};
