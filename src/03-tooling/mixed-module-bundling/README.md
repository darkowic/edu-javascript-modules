# User Profile Manager - Module Bundling Example

This example demonstrates how modern bundlers (Webpack and Vite) can bundle different module formats (AMD, UMD, CommonJS, ES Modules) into a single cohesive application. Unlike showing independent modules, this example creates a functional User Profile Manager where each module type contributes to the overall functionality.

## Module Types and Their Roles

1. **ES Module (Core)**
   - `ProfileManager.js`: The main application class that orchestrates all functionality
   - Imports and uses all other module types
   - Handles the core business logic

2. **CommonJS Module (Validation)**
   - `userValidator.js`: Provides validation functions for user data
   - Ensures data integrity before processing

3. **UMD Module (Formatting)**
   - `textFormatter.js`: Provides text formatting utilities
   - Formats names, dates, and other display values

4. **AMD Module (Utilities)**
   - `helpers.js`: Provides utility functions like ID generation and deep cloning
   - Adds helper functionality used throughout the application

## External Libraries

The example also integrates external libraries:

- **Lodash** - Utility functions (UMD/CommonJS format)

## Project Structure

```
module-bundling-example/
├── package.json           # Project dependencies and scripts
├── webpack.config.js      # Webpack configuration
├── vite.config.js         # Vite configuration
├── index.html             # HTML template for Vite
├── src/
│   ├── index.html         # HTML template for Webpack
│   ├── index.js           # Main entry point
│   └── modules/
│       ├── core/          # ES Module (ProfileManager)
│       ├── validation/    # CommonJS Module (userValidator)
│       ├── formatting/    # UMD Module (textFormatter)
│       └── utils/         # AMD Module (helpers)
├── dist/                  # Webpack output directory (generated after build)
└── dist-vite/             # Vite output directory (generated after build)
```

## How to Run

1. Install dependencies:
   ```
   npm install
   ```

### Using Webpack

1. Start the development server:
   ```
   npm start
   ```

2. Build for production (output to `dist` folder):
   ```
   npm run build
   ```

### Using Vite

1. Start the development server:
   ```
   npm run dev:vite
   ```

2. Build for production (output to `dist-vite` folder):
   ```
   npm run build:vite
   ```

3. Preview the production build:
   ```
   npm run preview:vite
   ```

## How It Works

This example demonstrates a more realistic use case for modern bundlers' capabilities:

1. The ES Module (`ProfileManager.js`) imports functionality from CommonJS, UMD, and AMD modules
2. Each module provides a specific type of functionality to the application
3. Both Webpack and Vite resolve all these different module formats and bundle them into a single cohesive application

The application allows you to:
- Create user profiles
- Edit existing profiles
- Delete profiles
- See how different module types interact with each other

## Historical Context

This example demonstrates how webpack bridges the gap between different module systems that evolved throughout JavaScript's history:

- **AMD modules** (like those used by RequireJS) were popular before ES Modules were standardized
- **CommonJS** became the standard for Node.js
- **UMD** was created to work across different environments
- **ES Modules** are now the standard, but many libraries still use other formats

Many popular libraries have adapted to different module systems over time. For example, Lodash is available in multiple module formats to maintain compatibility with various environments.

## Key Benefits of This Approach

This example showcases several important concepts:

1. **Module Composition** - How different module types can be composed together to create a cohesive application
2. **Cross-Module Dependencies** - How modules can import and use functionality from other module types
3. **Modern Bundlers' Resolution Systems** - How bundlers like Webpack and Vite resolve different module formats seamlessly
4. **Single Application Purpose** - Instead of isolated examples, all modules work together for a single purpose
5. **Bundler Flexibility** - The same codebase can be built with different bundlers

This approach better reflects real-world applications where different libraries and modules (potentially using different module systems) need to work together.
