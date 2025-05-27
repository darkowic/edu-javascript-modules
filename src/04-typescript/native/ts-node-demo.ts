/**
 * Native TypeScript Execution with ts-node
 * 
 * This file demonstrates how to run TypeScript code directly
 * without prior compilation using ts-node.
 */

import { createServer } from 'node:http';
import express, { Request, Response } from 'express';
import { z } from 'zod';  // Runtime type checking

// Type definitions
interface User {
    id: number;
    name: string;
    email: string;
}

// Zod schema for runtime validation
const UserSchema = z.object({
    id: z.number(),
    name: z.string().min(2),
    email: z.string().email()
});

// In-memory database
const users: User[] = [];

// Express app setup
const app = express();
app.use(express.json());

// Type-safe request handlers
app.post('/users', (req: Request, res: Response) => {
    try {
        // Runtime validation with Zod
        const user = UserSchema.parse(req.body);
        users.push(user);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.errors });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

app.get('/users', (_req: Request, res: Response) => {
    res.json(users);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/**
 * Running this file with ts-node:
 * 
 * 1. Direct execution:
 *    ts-node src/native/ts-node-demo.ts
 * 
 * 2. With Node.js loader:
 *    node --loader ts-node/esm src/native/ts-node-demo.ts
 * 
 * 3. With experimental specifier resolution:
 *    node --loader ts-node/esm --experimental-specifier-resolution=node src/native/ts-node-demo.ts
 */

/**
 * ts-node Configuration (in package.json or tsconfig.json)
 */
const tsNodeConfig = {
    "ts-node": {
        "transpileOnly": true,        // Faster execution
        "files": true,               // Load files from tsconfig.json
        "esm": true,                 // Enable ESM support
        "experimentalSpecifiers": true,
        "compilerOptions": {
            "module": "NodeNext"
        }
    }
};

/**
 * Benefits of ts-node:
 * 1. Direct TypeScript execution
 * 2. No build step needed
 * 3. Great for development
 * 4. Source map support
 * 5. REPL with TypeScript
 * 
 * Limitations:
 * 1. Slower than compiled code
 * 2. Not recommended for production
 * 3. Some TypeScript features may not work
 * 4. Module resolution differences
 */

// Example CURL commands to test the API:
/**
 * Create user:
 * curl -X POST http://localhost:3000/users \
 *   -H "Content-Type: application/json" \
 *   -d '{"id": 1, "name": "John", "email": "john@example.com"}'
 * 
 * Get users:
 * curl http://localhost:3000/users
 */
