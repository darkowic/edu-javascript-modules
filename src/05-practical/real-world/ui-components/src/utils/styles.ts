/**
 * Style Utilities Module
 * 
 * Provides utilities for handling class names and style variants.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with Tailwind CSS classes
 * 
 * Features:
 * - Handles conditional classes
 * - Merges Tailwind utility classes
 * - Resolves conflicts
 * 
 * @example
 * ```tsx
 * cn('px-2 py-1', 'bg-blue-500', { 'text-white': true })
 * // => 'px-2 py-1 bg-blue-500 text-white'
 * 
 * cn('p-2', 'p-3') // Resolves to 'p-3'
 * ```
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Generates responsive class names
 * 
 * @example
 * ```tsx
 * responsive('text', ['sm', 'md', 'lg'])
 * // => 'text-sm md:text-md lg:text-lg'
 * ```
 */
export function responsive(prefix: string, values: (string | number)[]) {
    return values
        .map((value, index) => {
            if (index === 0) return `${prefix}-${value}`;
            const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl'];
            return `${breakpoints[index - 1]}:${prefix}-${value}`;
        })
        .join(' ');
}

/**
 * Creates a variant class generator
 * 
 * @example
 * ```tsx
 * const textVariants = createVariants({
 *   size: {
 *     sm: 'text-sm',
 *     md: 'text-base',
 *     lg: 'text-lg'
 *   },
 *   weight: {
 *     normal: 'font-normal',
 *     bold: 'font-bold'
 *   }
 * });
 * 
 * textVariants({ size: 'sm', weight: 'bold' })
 * // => 'text-sm font-bold'
 * ```
 */
export function createVariants<
    T extends Record<string, Record<string, string>>
>(variants: T) {
    type VariantProps = {
        [K in keyof T]?: keyof T[K];
    };

    return (props: VariantProps) => {
        return Object.entries(props)
            .map(([key, value]) => variants[key]?.[value as string])
            .filter(Boolean)
            .join(' ');
    };
}
