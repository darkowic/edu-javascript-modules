// TypeScript adds type information to modules

// Interface for a user
export interface User {
    id: number;
    name: string;
    email: string;
}

// Type for validation results
export type ValidationResult = {
    isValid: boolean;
    errors: string[];
};

// Enum for user status
export enum UserStatus {
    Active = 'active',
    Inactive = 'inactive',
    Pending = 'pending'
}

// Key TypeScript module features:
// 1. Type definitions can be exported/imported
// 2. Interfaces for better API contracts
// 3. Type-safe imports/exports
// 4. Better tooling support
// 5. Declaration files (.d.ts) for JS libraries
