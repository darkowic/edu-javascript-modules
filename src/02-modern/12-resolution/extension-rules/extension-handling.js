/**
 * ESM Extension Rules and Handling
 *
 * This file demonstrates the extension requirements in ES Modules
 * and how they differ from CommonJS.
 */

// 1. ESM Extension Requirements
// ❌ CommonJS style (works in CJS, fails in ESM)
import { helper } from './utils';
import data from './data';

// ✅ ESM style (works in both)
import { helper } from './utils.js';
import data from './data.json';

// 2. Different File Types
import metadata from './config.json';  // JSON files
import wasm from './module.wasm';      // WebAssembly
import styles from './styles.css';     // CSS Modules (with proper bundler)

// 3. Directory Imports
// ❌ Implicit index (works in CJS, fails in ESM)
import { feature } from './features';

// ✅ Explicit index (works in both)
import { feature } from './features/index.js';

// 4. TypeScript Considerations
// TypeScript source
import { type } from './types.ts';          // Direct TS import (needs transpilation)
import { interface } from './interfaces.js'; // Transpiled JS import

// 5. Package.json Configuration
const packageJson = {
    "name": "my-package",
    "type": "module",        // Treat .js files as ESM
    "exports": {
        ".": {
            "import": "./dist/index.js",    // ESM entry
            "require": "./dist/index.cjs"    // CommonJS entry
        },
        "./features/*": {
            "import": "./dist/features/*.js",
            "require": "./dist/features/*.cjs"
        }
    },
    "imports": {
        "#internal/*": "./src/internal/*.js"  // Internal imports
    }
};

// 6. Import Assertions
import data from './data.json' assert { type: 'json' };

// 7. Module Types by Extension
const moduleTypes = {
    '.mjs': 'Always ESM',
    '.cjs': 'Always CommonJS',
    '.js': 'Depends on package.json "type" field',
    '.json': 'JSON module (needs assertion in ESM)',
    '.node': 'Native addon (CommonJS only)',
    '.wasm': 'WebAssembly module'
};

/**
 * Extension Resolution Rules:
 *
 * 1. ESM requires explicit extensions for:
 *    - Relative imports (./file.js)
 *    - Absolute imports (/abs/path/file.js)
 *
 * 2. Exceptions (no extension needed):
 *    - Bare specifiers (e.g., 'lodash')
 *    - Built-in modules (e.g., 'node:fs')
 *
 * 3. Package Entry Points:
 *    - Defined in package.json "exports"
 *    - Can map extensions differently for ESM/CommonJS
 *
 * 4. TypeScript Handling:
 *    - TS source: import from .ts
 *    - Compiled: import from .js
 *    - Path mapping in tsconfig.json
 */

// Example tsconfig.json
const tsConfig = {
    "compilerOptions": {
        "moduleResolution": "node16",  // Modern resolution
        "allowImportingTsExtensions": true,  // Allow .ts imports
        "paths": {
            "@/*": ["./src/*"]  // Path mapping
        }
    }
};
