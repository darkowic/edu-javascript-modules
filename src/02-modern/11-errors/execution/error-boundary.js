// Module execution error handling
class ModuleErrorBoundary {
    constructor() {
        this.errorHandlers = new Map();
        this.setupGlobalHandlers();
    }

    // Set up global error handlers
    setupGlobalHandlers() {
        window.addEventListener('error', (event) => {
            if (event.error?.module) {
                this.handleModuleError(event.error);
            }
        });

        window.addEventListener('unhandledrejection', (event) => {
            if (event.reason?.module) {
                this.handleModuleError(event.reason);
            }
        });
    }

    // Register error handler for module
    onError(modulePath, handler) {
        this.errorHandlers.set(modulePath, handler);
    }

    // Handle module error
    handleModuleError(error) {
        const { module, message, stack } = error;
        const handler = this.errorHandlers.get(module);

        if (handler) {
            handler(error);
        } else {
            console.error(`Unhandled module error in ${module}:`, {
                message,
                stack
            });
        }
    }

    // Wrap module execution
    async executeModule(modulePath, ...args) {
        try {
            const module = await import(modulePath);
            
            if (typeof module.default !== 'function') {
                throw new Error(`Module ${modulePath} has no default export`);
            }

            return module.default(...args);
        } catch (error) {
            error.module = modulePath;
            this.handleModuleError(error);
            throw error;
        }
    }

    // Clean up error handlers
    cleanup() {
        this.errorHandlers.clear();
    }
}

// Usage example
const errorBoundary = new ModuleErrorBoundary();

// Register error handler
errorBoundary.onError('./feature.js', (error) => {
    console.error('Feature module error:', error);
    // Show user-friendly error message
    showErrorUI('Feature temporarily unavailable');
    // Log to monitoring service
    logError(error);
});

// Execute module with error boundary
try {
    await errorBoundary.executeModule('./feature.js', { config: 'value' });
} catch (error) {
    // Handle fatal errors
    console.error('Fatal error:', error);
}

// Helper functions
function showErrorUI(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
}

function logError(error) {
    // Send to monitoring service
    console.log('Logging error:', error);
}
