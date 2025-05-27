# Module Bundling and Build Tools

This section covers modern JavaScript module bundlers and build tools.

## Key Tools

1. **Webpack**
   ```js
   // webpack.config.js
   module.exports = {
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: '[name].[contenthash].js'
     },
     optimization: {
       splitChunks: {
         chunks: 'all'
       }
     }
   };
   ```

2. **Rollup**
   ```js
   // rollup.config.js
   export default {
     input: 'src/index.js',
     output: {
       dir: 'dist',
       format: 'es',
       preserveModules: true
     },
     plugins: [
       // ...
     ]
   };
   ```

3. **Vite**
   ```js
   // vite.config.js
   export default {
     build: {
       lib: {
         entry: 'src/index.js',
         formats: ['es', 'cjs']
       },
       rollupOptions: {
         external: ['react', 'react-dom']
       }
     }
   };
   ```

## Common Features

1. **Code Splitting**
   ```js
   // Dynamic imports
   const AdminPanel = () => import('./admin/Panel.js');
   
   // Route-based splitting
   const routes = {
     '/admin': () => import('./admin/index.js'),
     '/user': () => import('./user/index.js')
   };
   ```

2. **Tree Shaking**
   ```js
   // Good: Named exports
   export { function1, function2 };
   
   // Bad: Default export object
   export default { function1, function2 };
   ```

3. **Asset Optimization**
   ```js
   // Image imports
   import logo from './logo.png';
   
   // CSS modules
   import styles from './styles.module.css';
   ```

## Build Configurations

1. **Development**
   ```js
   {
     mode: 'development',
     devtool: 'source-map',
     devServer: {
       hot: true,
       port: 3000
     }
   }
   ```

2. **Production**
   ```js
   {
     mode: 'production',
     optimization: {
       minimize: true,
       moduleIds: 'deterministic'
     }
   }
   ```

3. **Library**
   ```js
   {
     output: {
       library: 'MyLib',
       libraryTarget: 'umd',
       umdNamedDefine: true
     }
   }
   ```

## Best Practices

1. **Performance**
   - Enable tree shaking
   - Configure code splitting
   - Optimize dependencies
   - Use production mode

2. **Development**
   - Fast refresh/HMR
   - Source maps
   - Error overlay
   - Development proxy

3. **Maintenance**
   - Clear configuration
   - Consistent naming
   - Plugin documentation
   - Build analysis

## Tools and Resources

1. **Analysis**
   - webpack-bundle-analyzer
   - rollup-plugin-visualizer
   - source-map-explorer
   - bundle-stats

2. **Optimization**
   - terser
   - babel
   - postcss
   - imagemin

3. **Development**
   - webpack-dev-server
   - vite
   - @rollup/plugin-node-resolve
   - esbuild

## References

- [Webpack Documentation](https://webpack.js.org/)
- [Rollup Guide](https://rollupjs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Bundler Performance](https://bundlers.tooling.report/)
