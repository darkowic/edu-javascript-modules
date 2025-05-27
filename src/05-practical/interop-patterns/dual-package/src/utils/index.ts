/**
 * Utility Functions
 * 
 * These utilities demonstrate how to handle internal modules
 * in a dual package.
 */

export type DateFormat = 'iso' | 'unix' | 'relative';

/**
 * Format a date according to the specified format
 */
export function formatDate(date: Date, format: DateFormat = 'iso'): string {
    switch (format) {
        case 'iso':
            return date.toISOString();
        case 'unix':
            return Math.floor(date.getTime() / 1000).toString();
        case 'relative':
            return getRelativeTime(date);
        default:
            throw new Error(`Unknown format: ${format}`);
    }
}

/**
 * Parse a date string into a Date object
 */
export function parseDate(dateString: string): Date {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }
    return date;
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
function getRelativeTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return `${seconds} seconds ago`;
}

/**
 * Usage in both ESM and CommonJS:
 * 
 * ESM:
 * ```js
 * import { formatDate, parseDate } from 'dual-package/utils';
 * ```
 * 
 * CommonJS:
 * ```js
 * const { formatDate, parseDate } = require('dual-package/utils');
 * ```
 */
