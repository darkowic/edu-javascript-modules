# Module Resolution in ESM

This section explains how module resolution works in ES Modules, focusing on differences between Node.js and browsers, extension requirements, and path resolution strategies.

## Key Topics

1. Node.js vs Browser Resolution
   - Node.js module resolution algorithm
   - Browser's native ESM resolution
   - Differences in bare specifier handling
   - Package.json "exports" field

2. Extension Requirements
   - Mandatory file extensions in ESM
   - Extension handling in different environments
   - TypeScript extension considerations
   - Configuration options

3. Path Resolution
   - Relative paths (`./` and `../`)
   - Absolute paths
   - Base URL configuration
   - Import maps

## Examples Structure

```
/12-resolution/
  /node-vs-browser/     # Resolution differences
  /extension-rules/     # Extension handling
  /path-mapping/        # Path resolution
```

## Common Pitfalls

1. Extension Requirements
   ```js
   // ❌ Missing extension (works in CJS, fails in ESM)
   import { helper } from './utils'
   
   // ✅ Explicit extension (works in both)
   import { helper } from './utils.js'
   ```

2. Path Resolution
   ```js
   // ❌ Bare specifier (fails in browser)
   import moment from 'moment'
   
   // ✅ Full path (works in browser)
   import moment from '/node_modules/moment/dist/moment.js'
   
   // ✅ Import map (clean solution)
   import moment from 'moment' // with proper import map
   ```

3. Package Exports
   ```json
   {
     "exports": {
       ".": {
         "import": "./index.mjs",
         "require": "./index.cjs"
       }
     }
   }
   ```

## Best Practices

1. Always use explicit file extensions in ESM
2. Use import maps for clean module specifiers
3. Configure package.json "exports" field
4. Consider dual package hazard
5. Use TypeScript path mapping for development
