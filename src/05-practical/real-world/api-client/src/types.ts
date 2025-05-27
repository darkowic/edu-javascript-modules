/**
 * API Client Type Definitions
 */

import { AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios';

/**
 * Request Options
 */
export interface RequestOptions {
    data?: unknown;
    params?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
}

/**
 * API Response
 */
export interface ApiResponse<T> {
    data: T;
    status: number;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
}

/**
 * Pagination Parameters
 */
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

/**
 * Paginated Response
 */
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

/**
 * Filter Parameters
 */
export interface FilterParams {
    [key: string]: string | number | boolean | Array<string | number> | null;
}

/**
 * Search Parameters
 */
export interface SearchParams {
    query: string;
    fields?: string[];
}

/**
 * Cache Options
 */
export interface CacheOptions {
    ttl?: number;
    key?: string;
    bypass?: boolean;
}

/**
 * Retry Options
 */
export interface RetryOptions {
    attempts?: number;
    delay?: number;
    shouldRetry?: (error: unknown) => boolean;
}

/**
 * Usage Example:
 * 
 * ```typescript
 * // Define a paginated request
 * interface UserFilters extends FilterParams {
 *     role?: string;
 *     active?: boolean;
 * }
 * 
 * interface UserSearchParams extends SearchParams {
 *     includeDeleted?: boolean;
 * }
 * 
 * // Make a request with types
 * const response = await client.get<PaginatedResponse<User>>(
 *     '/users',
 *     UserSchema,
 *     {
 *         params: {
 *             ...paginationParams,
 *             ...filterParams,
 *             ...searchParams
 *         }
 *     }
 * );
 * ```
 */
