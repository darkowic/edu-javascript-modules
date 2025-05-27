// TypeScript User Service Module
import { User, UserStatus } from './types.js';
import { validateUser } from './validator.js';

// Example of a more complex module with TypeScript features
export class UserService {
    private users: Map<number, User & { status: UserStatus }> = new Map();
    private nextId: number = 1;

    async createUser(userData: Omit<User, 'id'>): Promise<User> {
        const validation = validateUser(userData);
        if (!validation.isValid) {
            throw new Error(`Invalid user data: ${validation.errors.join(', ')}`);
        }

        const user: User & { status: UserStatus } = {
            id: this.nextId++,
            ...userData,
            status: UserStatus.Pending
        };

        this.users.set(user.id, user);
        return user;
    }

    async activateUser(id: number): Promise<void> {
        const user = this.users.get(id);
        if (!user) {
            throw new Error(`User ${id} not found`);
        }
        user.status = UserStatus.Active;
    }

    async getUser(id: number): Promise<User | undefined> {
        return this.users.get(id);
    }
}

// TypeScript module system benefits shown:
// 1. Class-based modules
// 2. Access modifiers (private)
// 3. Async/await support
// 4. Generic types (Map)
// 5. Union types
// 6. Type intersection
// 7. Type utilities (Omit)
// 8. Strict null checks
