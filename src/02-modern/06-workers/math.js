// Math utilities for worker
export async function calculatePrimes(start, end) {
    const primes = [];
    
    for (let num = start; num <= end; num++) {
        if (await isPrime(num)) {
            primes.push(num);
        }
    }
    
    return primes;
}

async function isPrime(num) {
    if (num < 2) return false;
    
    // Simulate complex calculation
    await new Promise(resolve => setTimeout(resolve, 1));
    
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    
    return true;
}
