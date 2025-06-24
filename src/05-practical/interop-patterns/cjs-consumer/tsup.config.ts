import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/**/*.{ts,cts}'],  // Include all TypeScript files including .cts files
    format: ['cjs'],        // Only CommonJS format for CJS consumer
    dts: true,              // Generate .d.ts files
    clean: true,            // Clean output directory
    splitting: false,       // No code splitting
    sourcemap: true,        // Generate source maps
    target: 'es6',          // Target ES6 for better compatibility
    outDir: 'dist',         // Output directory
    treeshake: false,       // Preserve file structure
});
