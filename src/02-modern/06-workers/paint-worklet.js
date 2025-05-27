// Paint Worklet with ES Modules
import { generatePattern } from './pattern.js';

registerPaint('checkerboard', class {
    static get inputProperties() {
        return ['--checkerboard-spacing', '--checkerboard-color'];
    }

    paint(ctx, size, properties) {
        const spacing = parseInt(properties.get('--checkerboard-spacing')) || 10;
        const color = properties.get('--checkerboard-color').toString() || 'black';
        
        generatePattern(ctx, size.width, size.height, spacing, color);
    }
});
