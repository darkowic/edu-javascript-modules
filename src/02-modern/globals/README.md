# Global Scope in ECMAScript Modules

ECMAScript Modules (ESM) handle global scope differently from traditional JavaScript scripts. This document explains the key concepts and best practices for working with scope in ESM.

Resources:
- [globalThis explained](https://medium.com/@leroyleowdev/javascripts-globalthis-explained-understanding-its-scope-in-relation-to-var-let-and-const-75ebb1e68e3e)
- [MDN: globalThis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

## Key Differences from Traditional Scripts

### 1. Module Scope Isolation

Each module has its own scope, completely isolated from other modules and the global scope. This is fundamentally different from traditional scripts where variables would automatically be added to the global scope.

```javascript
// In a traditional script:
var globalVar = "I'm global"; // Added to window/global object

// In a module:
const moduleVar = "I'm scoped"; // Stays within module scope
```

### 2. Global Object Access

When you need to access or modify global variables in ESM:

- Use `globalThis` (recommended) - works consistently across all JavaScript environments
- `window` (browser) or `global` (Node.js) are environment-specific and should be avoided
- Top-level `this` is `undefined`, not the global object

```javascript
// Cross-platform global access
globalThis.sharedData = { version: '1.0.0' };

// Environment-specific (avoid)
window.sharedData; // Only works in browsers
global.sharedData; // Only works in Node.js
```

## Best Practices

### 1. Explicit Exports

Instead of relying on global variables, use explicit exports:

```javascript
// state.js
export const appState = {
    version: '1.0.0',
    config: {}
};

// Other modules can import
import { appState } from './state.js';
```

### 2. Singleton Pattern

When you need shared state across modules:

```javascript
// store.js
let instance = null;

export class Store {
    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;
        this.state = {};
    }
    
    static getInstance() {
        if (!instance) {
            instance = new Store();
        }
        return instance;
    }
}
```

### 3. Using Global State (When Necessary)

If you must use global state, use `globalThis` and namespace your globals:

```javascript
// Initialize global namespace
globalThis.myApp = globalThis.myApp || {};

// Add properties
myApp.config = {
    apiUrl: 'https://api.example.com'
};

// Access from any module
console.log(globalThis.myApp.config.apiUrl);
```

## Security Benefits

Module scope isolation provides several security benefits:

- Prevents accidental global namespace pollution
- Reduces risk of naming conflicts
- Makes it harder for malicious code to interfere with your application's globals
- Enables better code encapsulation and information hiding

## Common Pitfalls

1. **Accessing Window Properties**
```javascript
// Don't do this:
window.setTimeout(() => {}, 1000);

// Do this instead:
setTimeout(() => {}, 1000);
// or
globalThis.setTimeout(() => {}, 1000);
```

2. **Global Event Handlers**
```javascript
// Don't do this:
window.onload = () => {};

// Do this instead:
globalThis.addEventListener('load', () => {});
```

3. **Third-party Library Integration**
```javascript
// Don't do this:
window.jQuery = jQuery;

// Do this instead:
globalThis.jQuery = jQuery;
// Or better yet, use proper module imports
```

## Best Practices Summary

1. Avoid global variables whenever possible
2. Use ES modules' import/export system for sharing code
3. When globals are necessary, use `globalThis`
4. Implement proper singleton patterns for shared state
5. Keep module dependencies explicit and avoid circular references
6. Use namespacing for organization when working with globals

By following these guidelines, you can write more maintainable and secure JavaScript applications while taking full advantage of ES modules' scoping features.