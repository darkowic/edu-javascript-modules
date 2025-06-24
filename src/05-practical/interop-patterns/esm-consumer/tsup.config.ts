import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/**/*.ts'],  // Include all TypeScript files in src directory
    format: ['esm'],        // Only ESM format for ESM consumer
    dts: true,              // Generate .d.ts files
    clean: true,            // Clean output directory
    splitting: false,       // No code splitting
    sourcemap: true,        // Generate source maps
    target: 'esnext',       // Target latest ES features
    outDir: 'dist',         // Output directory
    treeshake: false,       // Preserve file structure
});
