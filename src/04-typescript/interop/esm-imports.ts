/**
 * TypeScript ESM Interoperability
 * 
 * This file demonstrates how TypeScript handles ES Module imports
 * and exports, including interop with CommonJS modules.
 */

// 1. Standard ESM Imports
import { readFile } from 'node:fs/promises';
import path from 'node:path';

// 2. Type Imports
import type { RequestHandler } from 'express';
import type { User, Role } from './types';

// 3. Mixed Imports (Values and Types)
import express, { Request, Response, NextFunction } from 'express';

// 4. Import Assertions
import config from './config.json' assert { type: 'json' };

// 5. Dynamic Imports
const loadModule = async () => {
    const module = await import('./dynamic-module.js');
    return module.default;
};

// 6. Re-exports
export { User, Role } from './types';
export type { RequestHandler };  // Type-only re-export

// 7. Default Export
export default class ApiClient {
    async getUser(id: number): Promise<User> {
        const data = await readFile(`users/${id}.json`, 'utf-8');
        return JSON.parse(data);
    }
}

// 8. Named Exports
export const handler: RequestHandler = (req, res, next) => {
    // Handler implementation
};

// 9. Type-Safe Dynamic Imports
async function loadFeature<T>(name: string): Promise<T> {
    const module = await import(`./features/${name}.js`);
    return module.default;
}

/**
 * ESM Features in TypeScript:
 * 
 * 1. Top-level await
 *    - Available in ESM only
 *    - Must set "module": "ESNext" in tsconfig.json
 */
const data = await readFile('data.json', 'utf-8');

/**
 * 2. Import attributes
 *    - Requires TypeScript 4.5+
 *    - Used for JSON, CSS, WebAssembly
 */
import styles from './styles.css' assert { type: 'css' };

/**
 * 3. Module resolution
 *    - Must use .js extension in imports
 *    - TypeScript transpiles to .js
 *    - Node16/NodeNext resolution
 */

// Example package.json
const packageJson = {
    "type": "module",
    "exports": {
        ".": {
            "import": "./dist/index.js",
            "require": "./dist/index.cjs",
            "types": "./dist/index.d.ts"
        }
    }
};

// Example tsconfig.json
const tsConfig = {
    "compilerOptions": {
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "target": "ES2022",
        "allowImportingTsExtensions": true,
        "moduleDetection": "force"
    }
};
