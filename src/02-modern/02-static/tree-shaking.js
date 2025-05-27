// Tree shaking demonstration

// Good for tree shaking: Named exports
export function usedFunction() {
    return 'This will be included';
}

export function unusedFunction() {
    return 'This will be removed by tree shaking';
}

// Good: Individual exports
export const CONFIG = {
    debug: true,
    mode: 'production'
};

export class UsedClass {
    method() {
        return 'This class is used';
    }
}

export class UnusedClass {
    method() {
        return 'This class will be removed';
    }
}

// Bad for tree shaking: Default export of object
export default {
    method1() { return 'Cannot be tree-shaken individually'; },
    method2() { return 'Must include all or nothing'; }
};

// Bad: Indirect exports
const utils = {
    format() { return 'format'; },
    parse() { return 'parse'; }
};
export { utils };  // Must include all utils

// Good: Individual exports from utils
export const { format, parse } = utils;  // Can be tree-shaken individually

// Side effects prevent tree shaking
console.log('This side effect forces module inclusion');

// Pure functions are ideal for tree shaking
export const pure = (x) => x * 2;  // No side effects

// Getters/setters can be tree-shaken
export const counter = {
    get value() { return 42; },
    set value(v) { /* setter */ }
};
