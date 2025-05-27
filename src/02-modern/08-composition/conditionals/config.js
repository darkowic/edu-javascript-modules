// Conditional exports based on environment
export const config = {
    development: {
        api: 'http://localhost:3000',
        debug: true,
        features: {
            experimental: true
        }
    },
    production: {
        api: 'https://api.example.com',
        debug: false,
        features: {
            experimental: false
        }
    },
    test: {
        api: 'http://test-api.example.com',
        debug: true,
        features: {
            experimental: true
        }
    }
};

// Export based on environment
export default config[process.env.NODE_ENV || 'development'];
