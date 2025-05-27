// Pattern generation utility for paint worklet
export function generatePattern(ctx, width, height, spacing, color) {
    ctx.fillStyle = color;
    
    for (let x = 0; x < width; x += spacing * 2) {
        for (let y = 0; y < height; y += spacing * 2) {
            ctx.fillRect(x, y, spacing, spacing);
            ctx.fillRect(x + spacing, y + spacing, spacing, spacing);
        }
    }
}
