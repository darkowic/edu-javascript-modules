/**
 * Node.js Module Resolution Example
 *
 * This file demonstrates how Node.js resolves different types of module specifiers
 * and the differences between CommonJS and ESM resolution.
 */

// 1. Bare Specifiers
// Node.js looks in node_modules directory
import express from 'express';
import lodash from 'lodash-es';

// 2. Relative Paths
// Must include file extension in ESM
import { helper } from './utils.js';
import { config } from '../config.js';

// 3. Absolute Paths
// From project root (package.json location)
import { database } from '/src/lib/database.js';

// 4. Directory Imports
// Must point to a file specified in package.json "exports" or "main"
import { feature } from './features/index.js';

// 5. Package Subpath Imports
// Uses package.json "exports" field
import { Button } from '@company/ui/components';

// 6. Node.js Built-in Modules
// Prefixed with 'node:' in ESM
import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Resolution Algorithm:
 * 
 * 1. Built-in modules (prefixed with 'node:')
 * 2. Node.js resolution algorithm:
 *    a. If has extension -> try direct file
 *    b. If no extension -> try .js, .mjs, .json, .node
 *    c. If directory -> check package.json "exports"/"main"
 *    d. Try index.js, index.mjs, index.json, index.node
 * 3. node_modules lookup:
 *    a. Check current directory's node_modules
 *    b. Move up directory tree
 *    c. Check global node_modules
 */

// Example package.json "exports" field
const packageJson = {
  "name": "my-package",
  "exports": {
    ".": "./index.js",                    // Main entry
    "./features": "./src/features.js",    // Subpath
    "./utils/*": "./src/utils/*.js"       // Pattern
  }
};

// Example import map (browser equivalent)
const importMap = {
  "imports": {
    "lodash": "/node_modules/lodash-es/lodash.js",
    "@company/ui/": "/node_modules/@company/ui/dist/"
  }
};
