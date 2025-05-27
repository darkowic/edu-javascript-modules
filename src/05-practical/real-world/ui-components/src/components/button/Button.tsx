/**
 * Button Component Module
 * 
 * A flexible button component with variants and composition support.
 */

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/styles.js';

// Button variants using class-variance-authority
const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    {
        variants: {
            variant: {
                primary: 'bg-primary text-white hover:bg-primary/90',
                secondary: 'bg-secondary text-white hover:bg-secondary/90',
                outline: 'border-2 border-primary text-primary hover:bg-primary/10',
                ghost: 'hover:bg-gray-100 text-gray-700'
            },
            size: {
                sm: 'h-8 px-3 text-sm',
                md: 'h-10 px-4',
                lg: 'h-12 px-6 text-lg'
            },
            fullWidth: {
                true: 'w-full'
            },
            disabled: {
                true: 'opacity-50 cursor-not-allowed'
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md'
        }
    }
);

// Button props interface
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

/**
 * Button Component
 * 
 * Features:
 * - Multiple variants and sizes
 * - Composition support via asChild
 * - Full width option
 * - Disabled state
 * - Forwarded ref
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ 
        className,
        variant,
        size,
        fullWidth,
        disabled,
        asChild = false,
        ...props
    }, ref) => {
        const Comp = asChild ? Slot : 'button';
        
        return (
            <Comp
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        fullWidth,
                        disabled
                    }),
                    className
                )}
                ref={ref}
                disabled={disabled}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

/**
 * Usage Examples:
 * 
 * ```tsx
 * // Basic usage
 * <Button>Click me</Button>
 * 
 * // With variants
 * <Button variant="secondary" size="lg">
 *   Large Button
 * </Button>
 * 
 * // As child component
 * <Button asChild>
 *   <Link href="/about">About Page</Link>
 * </Button>
 * 
 * // Full width
 * <Button fullWidth>
 *   Full Width Button
 * </Button>
 * 
 * // Disabled state
 * <Button disabled>
 *   Disabled Button
 * </Button>
 * ```
 */

// Re-export variants for external use
export { buttonVariants };
