# Module Interoperability

This section covers how different module systems work together and best practices for maintaining compatibility.

## Key Aspects

1. **CommonJS and ESM Interop**
   ```js
   // CommonJS module
   const data = require('./data.cjs');
   module.exports = { data };

   // ESM importing CommonJS
   import data from './data.cjs';
   
   // Using createRequire in ESM
   import { createRequire } from 'module';
   const require = createRequire(import.meta.url);
   const data = require('./data.cjs');
   ```

2. **Dual Package Support**
   ```json
   {
     "name": "my-package",
     "type": "module",
     "exports": {
       ".": {
         "import": "./dist/index.js",
         "require": "./dist/index.cjs"
       }
     },
     "main": "./dist/index.cjs",
     "module": "./dist/index.js"
   }
   ```

3. **TypeScript Integration**
   ```ts
   // TypeScript with ESM
   import type { Config } from './types.js';
   import { data } from './data.js';

   // TypeScript with CommonJS
   import type { Config } from './types';
   const { data } = require('./data');
   ```

## Common Patterns

1. **Package Entry Points**
   ```json
   {
     "exports": {
       ".": {
         "types": "./dist/index.d.ts",
         "import": "./dist/index.js",
         "require": "./dist/index.cjs"
       },
       "./features": {
         "types": "./dist/features/index.d.ts",
         "import": "./dist/features/index.js",
         "require": "./dist/features/index.cjs"
       }
     }
   }
   ```

2. **Conditional Exports**
   ```json
   {
     "exports": {
       "node": {
         "import": "./dist/node/index.js",
         "require": "./dist/node/index.cjs"
       },
       "browser": "./dist/browser/index.js",
       "default": "./dist/index.js"
     }
   }
   ```

3. **Type Definitions**
   ```ts
   // index.d.ts
   export type Config = {
     // ...
   };
   
   export function initialize(config: Config): void;
   
   // Support both ESM and CommonJS
   export = initialize;
   export default initialize;
   ```

## Best Practices

1. **Package Configuration**
   - Use "type": "module" for new packages
   - Provide both ESM and CommonJS builds
   - Include proper type definitions
   - Use conditional exports

2. **Code Organization**
   - Keep extension in imports (.js)
   - Use index files for exports
   - Maintain consistent paths
   - Avoid mixing module systems

3. **Build Setup**
   - Configure TypeScript properly
   - Set up dual builds
   - Test in all environments
   - Use modern tools (tsup, rollup)

## Tools and Resources

1. **Build Tools**
   - tsup
   - rollup
   - tsc
   - babel

2. **Testing**
   - jest
   - mocha
   - vitest
   - node:test

3. **Type Checking**
   - TypeScript
   - JSDoc
   - Flow
   - type-coverage

## References

- [Node.js Modules](https://nodejs.org/api/modules.html)
- [TypeScript Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [Package Entry Points](https://nodejs.org/api/packages.html)
- [ES Modules in Node.js](https://nodejs.org/api/esm.html)
