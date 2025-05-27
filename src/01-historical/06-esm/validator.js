// ES Module - Validator
// Note the clean, standardized syntax

export function isValidUsername(name) {
    return typeof name === 'string' && name.length >= 3;
}

// Key features of ES Modules:
// 1. Static imports/exports (analyzable at compile time)
// 2. Named exports (multiple per module)
// 3. Default exports possible
// 4. Live bindings (exports are references)
// 5. Strict mode by default
// 6. Asynchronous loading in browsers
// 7. Tree-shakeable (unused exports can be removed)
