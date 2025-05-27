// Formatting utilities for worker
export function formatResult(primes) {
    return {
        count: primes.length,
        primes: primes,
        summary: `Found ${primes.length} prime numbers`,
        timestamp: new Date().toISOString()
    };
}
