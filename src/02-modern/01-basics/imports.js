// Different ways to use imports

// 1. Named imports
import { PI, increment, Calculator } from './named-exports.js';

// 2. Namespace import
import * as mathUtils from './named-exports.js';

// 3. Default import
import defaultValue from './default-exports.js';

// 4. Mixed default and named imports
import defaultExport, { helper, random } from './named-exports.js';

// 5. Renamed imports
import { 
    increment as inc,
    random as randomNumber
} from './named-exports.js';

// 6. Empty import (only runs module code)
import './side-effects.js';

// 7. Import with side effects and exports
import './module-with-initialization.js';

// Note: Imports are hoisted
// This means you can use imported values before the import statement
// However, it's better style to put imports at the top of the file

console.log(PI);  // 3.14159
console.log(mathUtils.counter);  // Current counter value
console.log(defaultValue);  // 42

// Imports create live bindings
setInterval(() => {
    console.log(mathUtils.counter);  // Will show updated values
}, 1000);
