// TypeScript Validator Module
import { User, ValidationResult } from './types.js';

export function validateUser(user: Partial<User>): ValidationResult {
    const errors: string[] = [];
    
    // Name validation
    if (!user.name || user.name.length < 3) {
        errors.push('Name must be at least 3 characters long');
    }
    
    // Email validation
    if (!user.email || !user.email.includes('@')) {
        errors.push('Valid email is required');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

// TypeScript advantages demonstrated:
// 1. Type-safe function parameters
// 2. Return type inference
// 3. Partial<T> utility type
// 4. String literal types
// 5. Array type inference
