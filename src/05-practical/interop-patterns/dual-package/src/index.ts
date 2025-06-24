/**
 * Dual Package Pattern Example
 * 
 * This module demonstrates how to create a package that works in both
 * ESM and CommonJS environments.
 */

import { createHash } from 'crypto';
import { formatDate, parseDate } from './utils';

// Type definitions
export interface Config {
    algorithm: string;
    encoding: BufferEncoding;
}

export type DateFormat = 'iso' | 'unix' | 'relative';

// Default configuration
const defaultConfig: Config = {
    algorithm: 'sha256',
    encoding: 'hex'
};

/**
 * Hash Generator Class
 * Works in both ESM and CommonJS
 */
export class HashGenerator {
    private config: Config;

    constructor(config: Partial<Config> = {}) {
        this.config = { ...defaultConfig, ...config };
    }

    generate(input: string): string {
        const hash = createHash(this.config.algorithm);
        hash.update(input);
        // @ts-expect-error
        return hash.digest(this.config.encoding);
    }
}

/**
 * Date Formatter
 * Demonstrates using internal utilities
 */
export class DateFormatter {
    format(date: Date, format: DateFormat = 'iso'): string {
        return formatDate(date, format);
    }

    parse(dateString: string): Date {
        return parseDate(dateString);
    }
}

// Named exports (work in both ESM and CJS)
export { formatDate, parseDate };

// Default export (needs special handling)
export default HashGenerator;

/**
 * Usage in ESM:
 * ```js
 * import HashGenerator, { DateFormatter } from 'dual-package';
 * ```
 * 
 * Usage in CommonJS:
 * ```js
 * const { HashGenerator, DateFormatter } = require('dual-package');
 * ```
 */
