/**
 * WebAssembly Modules with Import Attributes
 *
 * This module demonstrates how to load and use WebAssembly modules
 * in ES Modules. WebAssembly provides near-native performance for
 * computationally intensive tasks while maintaining safety and
 * seamless JavaScript integration.
 */

// Step 1: Load and Instantiate WebAssembly
// Using streaming instantiation for better performance
const wasmInstance = await WebAssembly.instantiateStreaming(
    fetch('./data/module.wasm'),  // Fetch the .wasm file
    {}  // No imports needed for this module
);

/**
 * Hash Computation Function
 * 
 * This function demonstrates how to call WebAssembly functions
 * from JavaScript. The actual computation happens in WebAssembly
 * for maximum performance.
 *
 * @param {Uint8Array} data - The data to hash
 * @returns {Promise<number>} The computed hash
 */
export async function computeHash(data) {
    // Call the WebAssembly function directly
    return wasmInstance.instance.exports.hash(data);
}

/**
 * Benefits of WebAssembly Modules:
 * 
 * 1. Near-Native Performance
 *    - Executes at close to native speed
 *    - Optimized binary format
 *    - Efficient memory access
 * 
 * 2. Type Safety
 *    - Strong type checking
 *    - Predictable behavior
 *    - Better error detection
 * 
 * 3. Memory Safety
 *    - Sandboxed execution
 *    - Protected memory access
 *    - No buffer overflows
 * 
 * 4. JavaScript Integration
 *    - Seamless interop with JS
 *    - Share memory and functions
 *    - Use existing JS tools
 * 
 * 5. Binary Optimization
 *    - Compact file size
 *    - Fast loading
 *    - Efficient execution
 *
 * Example Usage:
 * ```javascript
 * const data = new Uint8Array([1, 2, 3, 4]);
 * const hash = await computeHash(data);
 * console.log('Hash:', hash);
 * ```
 */
