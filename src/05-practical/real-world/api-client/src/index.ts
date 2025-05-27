/**
 * API Client Module
 * 
 * A real-world example of a modular API client with authentication,
 * error handling, and type safety.
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';
import { AuthProvider } from './auth.js';
import { ApiError, NetworkError, ValidationError } from './errors.js';
import type { RequestOptions, ApiResponse } from './types.js';

// API Client Configuration
export interface ApiConfig {
    baseUrl: string;
    timeout?: number;
    retries?: number;
}

// Response Schema Validation
const ErrorSchema = z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.unknown()).optional()
});

/**
 * API Client Class
 * 
 * Features:
 * - Automatic authentication
 * - Request/response interceptors
 * - Error handling
 * - Response validation
 * - Retry logic
 */
export class ApiClient {
    private client: AxiosInstance;
    private auth: AuthProvider;
    private config: ApiConfig;

    constructor(config: ApiConfig, auth: AuthProvider) {
        this.config = config;
        this.auth = auth;
        
        // Initialize axios instance
        this.client = axios.create({
            baseURL: config.baseUrl,
            timeout: config.timeout || 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Add request interceptor for authentication
        this.client.interceptors.request.use(
            async (config) => {
                const token = await this.auth.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(new NetworkError(error))
        );

        // Add response interceptor for error handling
        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                // Handle token expiration
                if (error.response?.status === 401) {
                    await this.auth.refreshToken();
                    return this.client(error.config);
                }
                
                // Parse error response
                if (error.response?.data) {
                    try {
                        const parsed = ErrorSchema.parse(error.response.data);
                        throw new ApiError(parsed.code, parsed.message, parsed.details);
                    } catch (e) {
                        if (e instanceof z.ZodError) {
                            throw new ValidationError('Invalid error response', e.errors);
                        }
                        throw e;
                    }
                }
                
                throw new NetworkError(error);
            }
        );
    }

    /**
     * Make a type-safe API request
     */
    async request<T>(
        method: string,
        path: string,
        schema: z.ZodType<T>,
        options: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        const config: AxiosRequestConfig = {
            method,
            url: path,
            data: options.data,
            params: options.params,
            headers: options.headers
        };

        try {
            const response = await this.client.request(config);
            const validated = schema.parse(response.data);
            
            return {
                data: validated,
                status: response.status,
                headers: response.headers
            };
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new ValidationError('Invalid response data', error.errors);
            }
            throw error;
        }
    }

    /**
     * Typed request methods
     */
    async get<T>(path: string, schema: z.ZodType<T>, options?: RequestOptions) {
        return this.request('GET', path, schema, options);
    }

    async post<T>(path: string, schema: z.ZodType<T>, options?: RequestOptions) {
        return this.request('POST', path, schema, options);
    }

    async put<T>(path: string, schema: z.ZodType<T>, options?: RequestOptions) {
        return this.request('PUT', path, schema, options);
    }

    async delete<T>(path: string, schema: z.ZodType<T>, options?: RequestOptions) {
        return this.request('DELETE', path, schema, options);
    }
}

/**
 * Usage Example:
 * 
 * ```typescript
 * import { ApiClient } from '@example/api-client';
 * import { JwtAuthProvider } from '@example/api-client/auth';
 * 
 * // Define response schema
 * const UserSchema = z.object({
 *     id: z.number(),
 *     name: z.string(),
 *     email: z.string().email()
 * });
 * 
 * // Create client instance
 * const client = new ApiClient({
 *     baseUrl: 'https://api.example.com',
 *     timeout: 5000
 * }, new JwtAuthProvider());
 * 
 * // Make type-safe request
 * const response = await client.get('/users/1', UserSchema);
 * const user = response.data; // Fully typed
 * ```
 */
