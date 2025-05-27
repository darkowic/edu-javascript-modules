/**
 * Authentication Provider Module
 * 
 * Handles authentication token management and refresh logic.
 */

import { z } from 'zod';
import { AuthError } from './errors.js';

// Token response schema
const TokenSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string().optional(),
    expires_in: z.number()
});

type TokenResponse = z.infer<typeof TokenSchema>;

/**
 * Authentication Provider Interface
 */
export interface AuthProvider {
    getToken(): Promise<string | null>;
    refreshToken(): Promise<void>;
    setTokens(tokens: TokenResponse): void;
    clearTokens(): void;
}

/**
 * JWT Authentication Provider
 * 
 * Implements JWT-based authentication with token refresh.
 */
export class JwtAuthProvider implements AuthProvider {
    private accessToken: string | null = null;
    private refreshToken: string | null = null;
    private expiresAt: number | null = null;
    private refreshPromise: Promise<void> | null = null;

    private readonly storage: Storage;
    private readonly refreshEndpoint: string;

    constructor(options: {
        storage?: Storage;
        refreshEndpoint?: string;
    } = {}) {
        this.storage = options.storage || localStorage;
        this.refreshEndpoint = options.refreshEndpoint || '/auth/refresh';
        this.loadFromStorage();
    }

    /**
     * Get current access token, refresh if needed
     */
    async getToken(): Promise<string | null> {
        // Return existing token if valid
        if (this.isTokenValid()) {
            return this.accessToken;
        }

        // Return refresh promise if refresh in progress
        if (this.refreshPromise) {
            await this.refreshPromise;
            return this.accessToken;
        }

        // Try to refresh token
        if (this.refreshToken) {
            await this.refreshToken();
            return this.accessToken;
        }

        return null;
    }

    /**
     * Refresh access token using refresh token
     */
    async refreshToken(): Promise<void> {
        if (!this.refreshToken) {
            throw new AuthError('No refresh token available');
        }

        // Ensure only one refresh at a time
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshPromise = (async () => {
            try {
                const response = await fetch(this.refreshEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refresh_token: this.refreshToken
                    })
                });

                if (!response.ok) {
                    throw new AuthError('Token refresh failed');
                }

                const data = TokenSchema.parse(await response.json());
                this.setTokens(data);
            } finally {
                this.refreshPromise = null;
            }
        })();

        return this.refreshPromise;
    }

    /**
     * Set new tokens and update storage
     */
    setTokens(tokens: TokenResponse): void {
        this.accessToken = tokens.access_token;
        this.refreshToken = tokens.refresh_token ?? null;
        this.expiresAt = Date.now() + tokens.expires_in * 1000;

        // Update storage
        this.storage.setItem('auth_tokens', JSON.stringify({
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            expiresAt: this.expiresAt
        }));
    }

    /**
     * Clear all tokens
     */
    clearTokens(): void {
        this.accessToken = null;
        this.refreshToken = null;
        this.expiresAt = null;
        this.storage.removeItem('auth_tokens');
    }

    /**
     * Check if current token is valid
     */
    private isTokenValid(): boolean {
        if (!this.accessToken || !this.expiresAt) {
            return false;
        }

        // Add 30s buffer for expiration
        return Date.now() < this.expiresAt - 30000;
    }

    /**
     * Load tokens from storage
     */
    private loadFromStorage(): void {
        const stored = this.storage.getItem('auth_tokens');
        if (!stored) return;

        try {
            const { accessToken, refreshToken, expiresAt } = JSON.parse(stored);
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.expiresAt = expiresAt;
        } catch {
            this.clearTokens();
        }
    }
}

/**
 * Usage Example:
 * 
 * ```typescript
 * const auth = new JwtAuthProvider({
 *     refreshEndpoint: 'https://api.example.com/auth/refresh'
 * });
 * 
 * // Set initial tokens
 * auth.setTokens({
 *     access_token: 'jwt.token.here',
 *     refresh_token: 'refresh.token.here',
 *     expires_in: 3600
 * });
 * 
 * // Get token (will refresh if needed)
 * const token = await auth.getToken();
 * ```
 */
