// Main application module
export function initialize() {
    console.log('App initialized');
}

// Module execution is deferred by default
console.log('Module executed after HTML parsing');

// Modules are in strict mode by default
message = 'error';  // This will throw

// Modules have their own scope
const privateVar = 'not visible outside';

// Export public interface
export const version = '1.0.0';
