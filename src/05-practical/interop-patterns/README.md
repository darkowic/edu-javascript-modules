# JavaScript Module Interoperability Patterns

This example demonstrates how to create and consume packages that work across different JavaScript module systems (ESM and CommonJS).

## Project Structure

```
interop-patterns/
├── dual-package/   # Package supporting both ESM and CommonJS
├── esm-consumer/   # ESM consumer example
└── cjs-consumer/   # CommonJS consumer example
```

## Dual Package Pattern

The `dual-package` provides compatibility for both ESM and CommonJS through:

```json
"exports": {
  ".": {
    "import": "./dist/index.js",    // ESM entry
    "require": "./dist/index.cjs",  // CommonJS entry
    "types": "./dist/index.d.ts"    // TypeScript types
  }
},
"main": "./dist/index.cjs",  // Legacy CommonJS entry
"module": "./dist/index.js"  // Legacy ESM entry
```

**Important:** If you remove the `main` or `module` fields, the examples will stop working because:

- The `main` field is used by CommonJS consumers as a fallback when `exports` is not supported
- The `module` field is used by ESM-aware bundlers and some ESM consumers as a fallback
- Older tools may not support the `exports` field and rely exclusively on these traditional fields

## Consumer Examples

### ESM Consumer
- Uses `"type": "module"` in package.json
- Standard ESM import syntax: `import { formatDate } from "dual-package"`
- Run with: `cd esm-consumer && npm run start`

### CommonJS Consumer
- Uses `"type": "commonjs"` in package.json
- CommonJS require syntax in `.cts` files: `const { formatDate } = require("dual-package")`
- Run with: `cd cjs-consumer && npm run start` (uses ts-node)

## Common Issues

- **Module Resolution**: Ensure correct paths in tsconfig.json
- **Runtime Errors**: Use appropriate syntax for each module system
- **TypeScript Setup**: Use `.ts` for ESM and `.cts` for CommonJS
