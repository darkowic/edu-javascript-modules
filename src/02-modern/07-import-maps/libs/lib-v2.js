// Example versioned library module
export function feature(data) {
    return {
        ...data,
        version: 'v2',
        processed: true
    };
}
