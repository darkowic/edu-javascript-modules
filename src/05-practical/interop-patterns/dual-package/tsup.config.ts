import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/**/*.ts'],  // Include all TypeScript files in src directory
    format: ['esm', 'cjs'],  // Build both ESM and CommonJS
    dts: true,              // Generate .d.ts files
    clean: true,            // Clean output directory
    splitting: false,       // No code splitting
    sourcemap: true,        // Generate source maps
    target: 'esnext',       // Target for latest es modules
    outDir: 'dist',         // Output directory
    treeshake: false,       // Preserve file structure
    
    // ESM-specific options
    outExtension({ format }) {
        return {
            js: format === 'esm' ? '.js' : '.cjs'
        };
    },
});
