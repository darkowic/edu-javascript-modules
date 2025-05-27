// Mixed module types with Import Attributes

// Import different module types
import config from './data/config.json' with { type: 'json' };
import styles from './data/theme.css' with { type: 'css' };
import wasmModule from './data/module.wasm' with { type: 'webassembly' };

// Combine different module types
export class ThemeManager {
    constructor() {
        this.config = config;
        this.styles = styles;
        this.wasm = wasmModule;
    }

    async initialize() {
        // Apply theme from config
        if (this.config.features.darkMode) {
            document.body.classList.add(this.styles['dark-mode']);
        }

        // Use WebAssembly for performance-critical operations
        const themeHash = await this.wasm.hash(JSON.stringify(this.config));
        console.log('Theme hash:', themeHash);
    }
}

// Import attributes enable:
// 1. Type-safe imports
// 2. Module-specific loading
// 3. Better error handling
// 4. Build tool optimization
// 5. Security improvements
