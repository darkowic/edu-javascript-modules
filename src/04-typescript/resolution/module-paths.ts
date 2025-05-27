/**
 * TypeScript Module Path Resolution
 * 
 * This file demonstrates different ways TypeScript resolves module paths
 * and how to configure path mappings.
 */

// 1. Standard Node.js-style imports
import path from 'node:path';
import express from 'express';
import type { Request, Response } from 'express';

// 2. Relative imports with TypeScript
import { User } from './types/user';  // Will resolve to user.ts
import { db } from '../lib/database'; // Will resolve to database.ts or database.js

// 3. Path alias imports (configured in tsconfig.json)
import { Logger } from '@/utils/logger';
import { Config } from '@lib/config';
import { validateUser } from '@utils/validation';

// 4. Type-only imports
import type { DatabaseConfig } from '@/types/database';
import type { LogLevel } from '@/types/logger';

// 5. Interface definitions
interface AppConfig {
    port: number;
    database: DatabaseConfig;
    logLevel: LogLevel;
}

// Example class using imports
class App {
    private config: AppConfig;
    private logger: Logger;

    constructor(config: AppConfig) {
        this.config = config;
        this.logger = new Logger(config.logLevel);
    }

    async start(): Promise<void> {
        const app = express();

        // Type-safe request handling
        app.post('/users', async (req: Request, res: Response) => {
            const user = req.body as User;
            
            if (validateUser(user)) {
                await db.users.create(user);
                res.status(201).json(user);
            } else {
                res.status(400).json({ error: 'Invalid user data' });
            }
        });

        app.listen(this.config.port, () => {
            this.logger.info(`Server started on port ${this.config.port}`);
        });
    }
}

/**
 * TypeScript Path Resolution Algorithm:
 * 
 * 1. Relative/absolute paths:
 *    - Check exact file
 *    - Try adding extensions: .ts, .tsx, .d.ts, .js, .jsx
 *    - Try adding /index with above extensions
 * 
 * 2. Path aliases (tsconfig.json "paths"):
 *    - Replace alias with configured path
 *    - Follow relative path resolution
 * 
 * 3. Module resolution strategies:
 *    - "node": Classic Node.js resolution
 *    - "node16": Modern Node.js with package.json exports
 *    - "bundler": For build tools like webpack
 *    - "classic": TypeScript's original resolution
 */

// Example tsconfig.json paths configuration
const tsconfigPaths = {
    "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
            "@/*": ["*"],
            "@lib/*": ["lib/*"],
            "@utils/*": ["utils/*"],
            "@types/*": ["types/*"]
        }
    }
};

// Example package.json exports configuration
const packageJsonExports = {
    "exports": {
        ".": {
            "import": "./dist/index.js",
            "require": "./dist/index.cjs",
            "types": "./dist/index.d.ts"  // TypeScript types
        },
        "./utils": {
            "import": "./dist/utils/index.js",
            "require": "./dist/utils/index.cjs",
            "types": "./dist/utils/index.d.ts"
        }
    }
};

export { App, type AppConfig };
