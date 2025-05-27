/**
 * Working with ESM-only Dependencies
 * 
 * This example demonstrates how to work with packages that are
 * ESM-only or provide dual package support.
 */

// ESM-only package (chalk)
import chalk from 'chalk';

// Dual package (zod)
import { z } from 'zod';

// CommonJS package (express)
import express from 'express';

// ESM-only package (node-fetch)
import fetch from 'node-fetch';

// Type definitions
const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
});

type User = z.infer<typeof UserSchema>;

// Express app setup
const app = express();
app.use(express.json());

// External API client
class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getUser(id: number): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/${id}`);
        const data = await response.json();
        return UserSchema.parse(data);
    }
}

// Request handler with ESM dependencies
app.get('/users/:id', async (req, res) => {
    try {
        const client = new ApiClient('https://api.example.com');
        const user = await client.getUser(Number(req.params.id));
        
        console.log(chalk.green(`Retrieved user: ${user.name}`));
        res.json(user);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.log(chalk.red('Validation error:'), error.errors);
            res.status(400).json({ errors: error.errors });
        } else {
            console.log(chalk.red('Server error:'), error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(chalk.blue(`Server running at http://localhost:${port}`));
});

/**
 * ESM Dependency Challenges and Solutions:
 * 
 * 1. ESM-only packages:
 *    - Must use import instead of require
 *    - Need proper TypeScript/Node.js configuration
 *    - May need bundler configuration
 * 
 * 2. Dual packages:
 *    - Work in both ESM and CommonJS
 *    - Use package.json "exports" field
 *    - May have different entry points
 * 
 * 3. CommonJS compatibility:
 *    - May need esModuleInterop
 *    - Consider using dynamic import()
 *    - Use createRequire for legacy modules
 */

// Example webpack configuration for ESM packages
const webpackConfig = {
    resolve: {
        extensions: ['.ts', '.js'],
        mainFields: ['module', 'main']  // Prefer ESM version
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};

// Example Vite configuration
const viteConfig = {
    optimizeDeps: {
        include: ['chalk', 'zod']  // Pre-bundle ESM dependencies
    },
    build: {
        target: 'esnext'  // Use modern JavaScript features
    }
};
