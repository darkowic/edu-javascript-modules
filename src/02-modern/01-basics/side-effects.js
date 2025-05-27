// Module side effects demonstration

// 1. Module code runs on first import
console.log('Module initialized');

// 2. Set up global state
window.moduleLoaded = true;

// 3. Register event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Module responding to DOM events');
});

// 4. Modify built-in objects (not recommended!)
Array.prototype.first = function() {
    return this[0];
};

// 5. Initialize module state
const state = new Map();

// 6. Run async initialization
async function initialize() {
    const response = await fetch('/api/config');
    const config = await response.json();
    state.set('config', config);
}

// 7. Export initialization promise
export const ready = initialize().catch(error => {
    console.error('Failed to initialize:', error);
    return false;
});

// Note: Side effects run on first import
// Subsequent imports of this module won't re-run the code
// But they will have access to the initialized state
