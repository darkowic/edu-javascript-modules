/**
 * TypeScript CommonJS Interoperability
 * 
 * This file demonstrates how TypeScript handles CommonJS modules
 * and provides interoperability between CJS and ESM.
 */

// 1. CommonJS-style requires (with esModuleInterop)
import fs from 'fs';  // Works with esModuleInterop
import * as path from 'path';  // Namespace import

// 2. Mixed Module Types
import express from 'express';  // CJS module
import { z } from 'zod';       // ESM module

// 3. Handling CommonJS Default Exports
import moment from 'moment';  // CJS module with default export
const now = moment();        // Works with esModuleInterop

// 4. CommonJS Named Exports
import { join, resolve } from 'path';  // Named imports from CJS

// 5. Type Definitions for CommonJS
import type { Request, Response } from 'express';

// Example CJS-style export (transpiled to CommonJS)
export = class Logger {
    log(message: string) {
        console.log(message);
    }
};

// 6. Interop Helpers
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Using require for CommonJS modules
const lodash = require('lodash');
const yaml = require('js-yaml');

/**
 * CommonJS to ESM Migration Strategies
 */

// 1. Dual Package Hazard
const dualPackageExample = {
    // package.json
    "name": "my-package",
    "exports": {
        ".": {
            "import": "./dist/index.js",    // ESM entry
            "require": "./dist/index.cjs",  // CJS entry
            "types": "./dist/index.d.ts"    // Types
        }
    },
    // Conditional exports for subpaths
    "./features": {
        "import": "./dist/features/index.js",
        "require": "./dist/features/index.cjs"
    }
};

// 2. TypeScript Configuration
const tsConfig = {
    "compilerOptions": {
        // Interop Settings
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        
        // Module Settings
        "module": "NodeNext",
        "moduleResolution": "NodeNext"
    }
};

/**
 * Common Interop Patterns
 */

// 1. Dynamic require() in ESM
async function loadLegacyModule(id: string) {
    const require = createRequire(import.meta.url);
    return require(id);
}

// 2. Hybrid Package Support
const hybridPackage = {
    "name": "hybrid-package",
    "type": "module",
    "exports": {
        ".": {
            "import": "./dist/index.js",
            "require": "./dist/index.cjs"
        }
    },
    "main": "./dist/index.cjs",    // CJS fallback
    "module": "./dist/index.js",    // ESM fallback
    "types": "./dist/index.d.ts"    // TypeScript types
};

// 3. CommonJS Wrapper for ESM
async function commonJsWrapper() {
    const { default: esmModule } = await import('./esm-module.js');
    return esmModule;
}

/**
 * Interop Challenges and Solutions
 * 
 * 1. __dirname and __filename in ESM
 */
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. require() in ESM
const requireFromEsm = createRequire(import.meta.url);
const config = requireFromEsm('./config.json');

// 3. JSON modules
const jsonConfig = await import('./config.json', {
    assert: { type: 'json' }
});

/**
 * Best Practices
 * 
 * 1. Use ESM by default for new code
 * 2. Provide both CJS and ESM builds
 * 3. Use TypeScript's moduleResolution: "NodeNext"
 * 4. Configure package.json "exports" field
 * 5. Include TypeScript types for both formats
 */
