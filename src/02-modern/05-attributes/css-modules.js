/**
 * CSS Modules with Import Attributes
 *
 * This module demonstrates how to work with CSS in ES Modules using
 * Import Attributes. This approach provides better encapsulation,
 * scoping, and performance compared to traditional CSS loading.
 */

// Step 1: Dynamic CSS Loading
// Create a link element to load the CSS file
const link = document.createElement('link');
link.rel = 'stylesheet';           // Standard stylesheet
link.href = './data/theme.css';    // CSS file path
document.head.appendChild(link);   // Add to document

/**
 * Component Creation
 * 
 * Create DOM elements with appropriate CSS classes.
 * The classes are defined in the imported CSS file.
 */

// Main container with theme support
const container = document.createElement('div');
container.className = 'container';  // Base styles

// Theme Detection and Application
// Automatically detect and apply dark mode if preferred
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    container.classList.add('dark-mode');  // Dark theme styles
}

// Interactive Element
// Button with themed styles
const button = document.createElement('button');
button.className = 'button';       // Button styles
button.textContent = 'Click me';   // Button text

/**
 * Exported Components
 * 
 * Export the styled elements for use in other modules.
 * The CSS is guaranteed to be loaded when these are used.
 */
export const elements = {
    container,  // Themed container
    button      // Styled button
};

/**
 * Benefits of CSS Modules:
 * 
 * 1. Browser Caching
 *    - CSS files are cached independently
 *    - Faster subsequent page loads
 *    - Efficient resource utilization
 * 
 * 2. Parallel Loading
 *    - CSS loads in parallel with JavaScript
 *    - No blocking of script execution
 *    - Better overall performance
 * 
 * 3. Standard CSS Features
 *    - Full CSS specification support
 *    - CSS variables and calculations
 *    - Media queries and animations
 * 
 * 4. No Build Requirements
 *    - Works without transpilation
 *    - Direct browser support
 *    - Simpler development workflow
 * 
 * 5. Developer Tools
 *    - Browser DevTools integration
 *    - Style inspection and debugging
 *    - Live CSS editing support
 */
