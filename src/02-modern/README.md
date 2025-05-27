# Modern ES Modules: Complete Guide

This directory contains comprehensive examples of modern ES Modules features, patterns, and best practices. Each section demonstrates different aspects of the ES Modules system with practical examples.

## Core Concepts

### 1. Module Syntax and Semantics
Directory: `01-basics/`

- Named exports vs default exports: Different ways to export values (`export`, `export default`)
- Module scope: How modules create isolated scopes and prevent global pollution
- Live bindings: How exported values maintain live references
- Cyclic dependencies: Handling mutual dependencies between modules
- Namespace imports: Using `import * as name` for module organization
- Side effects: Understanding module initialization and execution order

### 2. Static Analysis Features
Directory: `02-static/`

- Import/Export analysis: How bundlers analyze module dependencies
- Tree shaking: Removing unused exports during bundling
- Build optimization: How static analysis enables build-time optimizations
- Type preservation: Maintaining type information across module boundaries
- Module graph: Understanding module relationships and dependencies
- Constant folding: Compile-time evaluation of constant expressions

### 3. Dynamic Features
Directory: `03-dynamic/`

- Dynamic imports: Loading modules on demand with `import()`
- Import attributes: Specifying module type and loading behavior
- Loading events: Monitoring module loading lifecycle
- Error handling: Managing module loading and execution errors
- Performance: Optimizing dynamic module loading
- Lazy loading: Loading modules only when needed

## Modern Features

### 1. Top-level await
Directory: `04-top-level-await/`

Using `await` directly in modules without async functions:
```javascript
// Await at module scope
const data = await fetch('/api/data');
export const config = await data.json();

// Affects module loading
export const ready = await initialize();
```

### 2. Import Attributes
Directory: `05-attributes/`

Specifying how to load different types of modules:
```javascript
// Load JSON as a module
import data from './data.json' with { type: 'json' };

// Load CSS as a module
import styles from './styles.css' with { type: 'css' };

// Load WebAssembly
import * as wasm from './module.wasm' with { type: 'webassembly' };
```

### 3. Module Workers
Directory: `06-workers/`

Using ES Modules in Web Workers:
```javascript
// Dedicated module worker
new Worker('worker.js', { type: 'module' });

// Shared module worker
new SharedWorker('shared.js', { type: 'module' });

// CSS Paint Worklet
await CSS.paintWorklet.addModule('paint.js');
```

### 4. Import Maps
Directory: `07-import-maps/`

Configuring module specifier resolution:
```html
<script type="importmap">
{
  "imports": {
    "lodash": "/node_modules/lodash-es/lodash.js",
    "react": "https://esm.sh/react",
    "#components/": "/src/components/"
  }
}
</script>
```

## Advanced Patterns

### 1. Module Composition
Directory: `08-composition/`

- Re-exports: Combining and reshaping module exports
- Facade pattern: Simplifying complex module interactions
- Barrel exports: Consolidating multiple exports
- Conditional exports: Environment-specific modules
- Virtual modules: Runtime-generated modules

### 2. Loading Patterns
Directory: `09-loading/`

- Preloading: Loading modules before they're needed
- Lazy loading: Loading modules on demand
- Route-based splitting: Loading modules by route
- Progressive loading: Loading in order of importance
- Waterfall prevention: Optimizing loading chains

### 3. Performance Patterns
Directory: `10-performance/`

- Module initialization: Optimizing module startup
- Dependency optimization: Managing module dependencies
- Loading strategies: Efficient module loading
- Caching: Module caching techniques
- Build optimization: Bundling and code splitting

### 4. Error Handling
Directory: `11-errors/`

- Loading errors: Handling module load failures
- Execution errors: Managing runtime errors
- Network failures: Handling connectivity issues
- Type errors: Managing type mismatches
- Recovery: Implementing fallback strategies

## Browser Integration

### 1. Module Scripts
Directory: `12-browser/`

- Script attributes: Controlling script loading
- Module vs classic: Differences between script types
- Defer/async: Loading behavior control
- Cross-origin: Loading from other domains
- Integrity: Security checks for remote modules

### 2. Developer Tools
Directory: `13-devtools/`

- Debugging: Module debugging techniques
- Profiling: Performance measurement
- Network: Analyzing module loading
- Source maps: Debugging bundled code
- Hot reloading: Development workflow

## References

1. [ES Modules Specification](https://tc39.es/ecma262/#sec-modules)
2. [Import Assertions Specification](https://tc39.es/proposal-import-assertions/)
3. [Import Maps Specification](https://html.spec.whatwg.org/multipage/webappapis.html#import-maps)
4. [Module Workers Specification](https://html.spec.whatwg.org/multipage/workers.html#module-workers)
