// TypeScript Example Usage
import { UserService } from './user-service.js';
import { User } from './types.js';

async function main() {
    const userService = new UserService();

    try {
        // Create a valid user
        const alice: User = await userService.createUser({
            name: 'Alice',
            email: 'alice@example.com'
        });
        console.log('Created user:', alice);

        // Try to create an invalid user
        await userService.createUser({
            name: 'Bo',  // Too short
            email: 'invalid-email'  // Invalid email
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error:', error.message);
        } else {
            console.log('Unknown error:', error);
        }
    }

    // TypeScript ensures type safety:
    // This would cause compilation errors:
    // await userService.createUser({
    //     name: 123,  // Type 'number' is not assignable to type 'string'
    //     email: true // Type 'boolean' is not assignable to type 'string'
    // });
}

main().catch(console.error);

// Key TypeScript advantages:
// 1. Compile-time type checking
// 2. Better IDE support
// 3. Refactoring support
// 4. Documentation through types
// 5. Error prevention
// 6. Modern JavaScript features
