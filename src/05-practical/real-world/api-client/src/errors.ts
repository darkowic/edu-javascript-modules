/**
 * API Error Types Module
 * 
 * Defines custom error types for the API client.
 */

/**
 * Base API Error
 */
export class ApiError extends Error {
    constructor(
        public code: string,
        message: string,
        public details?: Record<string, unknown>
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Network-related errors
 */
export class NetworkError extends ApiError {
    constructor(public originalError: Error) {
        super(
            'NETWORK_ERROR',
            originalError.message || 'Network request failed'
        );
        this.name = 'NetworkError';
    }
}

/**
 * Authentication errors
 */
export class AuthError extends ApiError {
    constructor(message: string) {
        super('AUTH_ERROR', message);
        this.name = 'AuthError';
    }
}

/**
 * Validation errors
 */
export class ValidationError extends ApiError {
    constructor(message: string, public validationErrors: unknown[]) {
        super('VALIDATION_ERROR', message, {
            errors: validationErrors
        });
        this.name = 'ValidationError';
    }
}

/**
 * Rate limit errors
 */
export class RateLimitError extends ApiError {
    constructor(
        message: string,
        public retryAfter?: number
    ) {
        super('RATE_LIMIT', message, {
            retryAfter
        });
        this.name = 'RateLimitError';
    }
}

/**
 * Error type guards
 */
export const isApiError = (error: unknown): error is ApiError => {
    return error instanceof ApiError;
};

export const isNetworkError = (error: unknown): error is NetworkError => {
    return error instanceof NetworkError;
};

export const isAuthError = (error: unknown): error is AuthError => {
    return error instanceof AuthError;
};

export const isValidationError = (error: unknown): error is ValidationError => {
    return error instanceof ValidationError;
};

export const isRateLimitError = (error: unknown): error is RateLimitError => {
    return error instanceof RateLimitError;
};

/**
 * Usage Example:
 * 
 * ```typescript
 * try {
 *     await api.get('/users/1', UserSchema);
 * } catch (error) {
 *     if (isAuthError(error)) {
 *         // Handle authentication error
 *     } else if (isValidationError(error)) {
 *         // Handle validation error
 *     } else if (isNetworkError(error)) {
 *         // Handle network error
 *     } else {
 *         // Handle other errors
 *     }
 * }
 * ```
 */
