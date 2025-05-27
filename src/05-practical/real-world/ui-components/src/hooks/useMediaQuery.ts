/**
 * Media Query Hook Module
 * 
 * A custom hook for responsive design using media queries.
 */

import { useEffect, useState } from 'react';

/**
 * Media query breakpoints
 */
export const breakpoints = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
} as const;

type Breakpoint = keyof typeof breakpoints;

/**
 * Hook for responsive design
 * 
 * Features:
 * - Type-safe breakpoints
 * - SSR support
 * - Automatic cleanup
 * 
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const isDesktop = useMediaQuery('lg');
 * 
 *   return (
 *     <div>
 *       {isDesktop ? 'Desktop View' : 'Mobile View'}
 *     </div>
 *   );
 * }
 * ```
 */
export function useMediaQuery(breakpoint: Breakpoint): boolean {
    // Default to false for SSR
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Skip if no window (SSR)
        if (typeof window === 'undefined') return;

        const query = window.matchMedia(breakpoints[breakpoint]);

        // Set initial value
        setMatches(query.matches);

        // Update matches on change
        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Modern browsers
        query.addEventListener('change', listener);

        // Cleanup
        return () => {
            query.removeEventListener('change', listener);
        };
    }, [breakpoint]);

    return matches;
}

/**
 * Hook for multiple breakpoints
 * 
 * @example
 * ```tsx
 * function ResponsiveLayout() {
 *   const { sm, md, lg } = useBreakpoints(['sm', 'md', 'lg']);
 * 
 *   return (
 *     <div className={cn(
 *       'grid',
 *       sm && 'grid-cols-2',
 *       md && 'grid-cols-3',
 *       lg && 'grid-cols-4'
 *     )}>
 *       {/* Content */}
 *     </div>
 *   );
 * }
 * ```
 */
export function useBreakpoints(points: Breakpoint[]) {
    const result = {} as Record<Breakpoint, boolean>;

    points.forEach(point => {
        result[point] = useMediaQuery(point);
    });

    return result;
}

/**
 * Hook for responsive values
 * 
 * @example
 * ```tsx
 * function ResponsiveText() {
 *   const fontSize = useResponsiveValue({
 *     base: 'text-sm',
 *     md: 'text-base',
 *     lg: 'text-lg'
 *   });
 * 
 *   return <p className={fontSize}>Responsive Text</p>;
 * }
 * ```
 */
export function useResponsiveValue<T>(values: Partial<Record<Breakpoint | 'base', T>>): T {
    const activeBreakpoints = useBreakpoints(
        Object.keys(values).filter((k): k is Breakpoint => k !== 'base') as Breakpoint[]
    );

    // Find the highest active breakpoint
    const activeBreakpoint = (
        Object.entries(activeBreakpoints) as [Breakpoint, boolean][]
    ).reduce<Breakpoint | null>((highest, [breakpoint, isActive]) => {
        if (!isActive) return highest;
        if (!highest) return breakpoint;
        return breakpoint;
    }, null);

    // Return the value for the highest active breakpoint, or base value
    return values[activeBreakpoint ?? 'base'] as T;
}
