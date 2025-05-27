/**
 * TypeScript Import Resolution Examples
 * 
 * This file demonstrates different import scenarios in TypeScript
 * and how the compiler resolves them.
 */

// 1. Basic Types and Interfaces
interface Config {
    name: string;
    version: string;
}

// 2. Type-Only Imports/Exports
export type { Config };  // Export type only
import type { User } from './types';  // Import type only

// 3. Mixed Type/Value Imports
import { Router, type RequestHandler } from 'express';
const router = Router();
const handler: RequestHandler = (req, res) => res.send('OK');

// 4. Import Elision
// TypeScript removes type-only imports during compilation
import { type UserRole } from './types';  // Removed in JS output
import { createUser } from './users';     // Kept in JS output

// 5. Resolution with JavaScript
// TypeScript can import from .js files
import { helper } from './utils.js';  // Works with allowJs: true
import data from './data.json';       // Works with resolveJsonModule: true

// 6. Module Declaration Files
// TypeScript looks for .d.ts files
declare module 'my-library' {
    export function doSomething(): void;
}
import { doSomething } from 'my-library';

// 7. Ambient Modules
// Global type definitions
declare global {
    interface Window {
        config: Config;
    }
}

// 8. Path Mapping with Baseurl
import { Logger } from '@/utils/logger';  // Maps to src/utils/logger
import { Database } from '@lib/db';       // Maps to src/lib/db

// 9. Module Resolution Modes
// Classic:
import { oldStyle } from './module';  // Looks for module.ts

// Node:
import { newStyle } from './module.js';  // Explicit extension required

// 10. Package.json Exports
import { feature } from 'my-package/feature';  // Uses package.json "exports"

/**
 * Import Resolution Strategies
 */

// 1. Classic Resolution (moduleResolution: "classic")
const classicResolution = {
    steps: [
        '1. <path>/module.ts',
        '2. <path>/module.d.ts'
    ]
};

// 2. Node Resolution (moduleResolution: "node")
const nodeResolution = {
    steps: [
        '1. <path>/module.ts',
        '2. <path>/module.tsx',
        '3. <path>/module.d.ts',
        '4. <path>/module/index.ts',
        '5. <path>/module/index.tsx',
        '6. <path>/module/index.d.ts',
        '7. node_modules resolution'
    ]
};

// 3. Node16 Resolution (moduleResolution: "node16")
const node16Resolution = {
    steps: [
        '1. Check package.json "exports"',
        '2. Require explicit extensions',
        '3. Follow Node.js ESM rules'
    ]
};

// 4. Bundler Resolution (moduleResolution: "bundler")
const bundlerResolution = {
    steps: [
        '1. Similar to node16',
        '2. But more permissive with extensions',
        '3. Better for build tools'
    ]
};

/**
 * Common TypeScript Configuration Options
 */
const typicalConfig = {
    compilerOptions: {
        // Module System
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        
        // Import Configuration
        "allowJs": true,              // Allow importing .js files
        "resolveJsonModule": true,    // Allow importing .json files
        "allowSyntheticDefaultImports": true,  // Allow default imports
        "esModuleInterop": true,      // Better interop with CommonJS
        
        // Path Configuration
        "baseUrl": "./src",
        "paths": {
            "@/*": ["*"],
            "@lib/*": ["lib/*"]
        }
    }
};
