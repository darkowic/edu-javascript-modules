// Database initialization with top-level await
import { config } from './config.js';

const connection = await createConnection(config.database);

export async function query(sql) {
    return connection.query(sql);
}

async function createConnection(dbConfig) {
    // Simulate database connection
    await new Promise(resolve => setTimeout(resolve, 100));
    return {
        query: async (sql) => ({ rows: [] })
    };
}

// Module initialization is blocked until connection is established
console.log('Database connection ready');
