import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/utils/index.ts'],
    format: ['esm', 'cjs'],  // Build both ESM and CommonJS
    dts: true,              // Generate .d.ts files
    clean: true,            // Clean output directory
    splitting: false,       // No code splitting
    sourcemap: true,        // Generate source maps
    target: 'node14',       // Target Node.js 14+
    outDir: 'dist',         // Output directory
    
    // ESM-specific options
    outExtension({ format }) {
        return {
            js: format === 'esm' ? '.js' : '.cjs'
        };
    },
    
    // Package exports configuration
    esbuildOptions(options) {
        options.banner = {
            js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);"
        };
    }
});
