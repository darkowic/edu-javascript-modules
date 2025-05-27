/**
 * Browser Module Resolution Example
 *
 * This file demonstrates how browsers resolve ES Module specifiers
 * and the differences from Node.js resolution.
 */

// Browser Module Resolution Rules:
// 1. Must be full URLs or relative paths
// 2. Must include file extensions
// 3. No automatic node_modules resolution
// 4. Import maps for bare specifier support

// 1. Relative Paths
// Must include file extension
import { helper } from './utils.js';
import { config } from '../config.js';

// 2. Absolute URLs
// Full URL path required
import { feature } from 'https://cdn.skypack.dev/feature';
import moment from 'https://cdn.jsdelivr.net/npm/moment@2.29.4/dist/moment.js';

// 3. Import Maps
// Defined in HTML, enables bare specifier support
// <script type="importmap">
// {
//   "imports": {
//     "lodash": "/node_modules/lodash-es/lodash.js",
//     "react": "https://cdn.skypack.dev/react"
//   }
// }
// </script>
import _ from 'lodash';  // Works with import map
import React from 'react';  // Works with import map

// 4. Module Workers
// Must use absolute or relative URLs
const worker = new Worker('./worker.js', { type: 'module' });

// 5. Dynamic Imports
// Same rules apply to dynamic imports
const modulePromise = import('./feature.js');
const cdnModule = import('https://cdn.example.com/module.js');

/**
 * Browser Resolution Algorithm:
 * 
 * 1. Check if specifier is a valid URL
 *    - Absolute URL -> use directly
 *    - Relative URL -> resolve against base URL
 * 
 * 2. If import map exists:
 *    a. Check exact matches
 *    b. Check scope matches
 *    c. Check prefix matches
 * 
 * 3. If no match found:
 *    - Throw error for bare specifiers
 *    - Resolve relative/absolute paths
 */

// Example HTML setup
const html = `
<!DOCTYPE html>
<html>
<head>
    <!-- Import map must come before modules -->
    <script type="importmap">
    {
        "imports": {
            "lodash": "/node_modules/lodash-es/lodash.js",
            "react": "https://cdn.skypack.dev/react",
            "@company/": "/modules/"
        },
        "scopes": {
            "/admin/": {
                "react": "/modules/react.js"
            }
        }
    }
    </script>

    <!-- Module script with proper resolution -->
    <script type="module">
        import _ from 'lodash';  // Uses import map
        import { helper } from './utils.js';  // Relative to document
        import React from 'react';  // Uses CDN via import map
    </script>
</head>
</html>
`;
