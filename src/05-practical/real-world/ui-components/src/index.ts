/**
 * UI Components Library Entry Point
 * 
 * This module exports all components, hooks, and utilities
 * in a well-organized manner.
 */

// Components
export * from './components/button/index.js';
export * from './components/dialog/Dialog.js';

// Hooks
export * from './hooks/useMediaQuery.js';

// Utilities
export * from './utils/styles.js';

/**
 * Usage Example:
 * 
 * ```tsx
 * import { 
 *   Button,
 *   Dialog,
 *   useMediaQuery,
 *   cn
 * } from '@example/ui-components';
 * 
 * function App() {
 *   const isDesktop = useMediaQuery('lg');
 * 
 *   return (
 *     <Dialog>
 *       <DialogTrigger asChild>
 *         <Button>Open Dialog</Button>
 *       </DialogTrigger>
 *       <DialogContent className={cn(
 *         'w-full',
 *         isDesktop ? 'max-w-2xl' : 'max-w-sm'
 *       )}>
 *         {/* Dialog content */}
 *       </DialogContent>
 *     </Dialog>
 *   );
 * }
 * ```
 */
