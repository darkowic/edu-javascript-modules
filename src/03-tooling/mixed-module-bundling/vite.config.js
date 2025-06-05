import { defineConfig } from "vite";
import commonjs from "@rollup/plugin-commonjs";
import babel from "vite-plugin-babel";

// This configuration is designed to work with the original module formats
// without modifying them, preserving the educational value of showing
// different module types (AMD, UMD, CommonJS, ES Modules)
export default defineConfig({
  // Set base directory
  root: ".",

  // Configure build
  build: {
    // Output to dist-vite directory
    outDir: "dist-vite",
    // Clean the output directory before build
    emptyOutDir: true,
    // Minify output
    minify: false,
    // Source maps for debugging
    sourcemap: true,

    target: "esnext",
    modulePreload: {
      polyfill: false,
    },

    assetsInlineLimit: 0,

    rollupOptions: {
      preserveEntrySignatures: "strict",
      output: {
        preserveModules: true,
      },
    },
  },

  // Configure plugins
  plugins: [
    babel({
      include: [/modules\/utils/],
      babelConfig: {
        plugins: ["transform-amd-to-commonjs"],
      },
    }),
    // This is the key plugin that allows Vite to handle CommonJS and UMD modules
    commonjs({
      // Process all JavaScript files
      include: [/modules\/formatting/, /modules\/utils/, /modules\/validation/],
      // Ensure CommonJS modules are properly transformed
      transformMixedEsModules: true,
    }),
  ],

  // Configure path resolution
  resolve: {
    // This is important for handling different module formats
    mainFields: ["browser", "module", "main"],
  },

  // Configure server
  server: {
    port: 3000,
    open: true,
  },
});
