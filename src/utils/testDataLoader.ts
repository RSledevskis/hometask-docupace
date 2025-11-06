import config, { env } from "../../envConfig";
import path from "node:path";
import fs from "node:fs";

export interface UserCredentials {
    id: string;
    username: string;
    password: string;
    type: "valid" | "locked" | "invalid";
    description: string;
}

export class TestDataLoader {
    private usersCache: UserCredentials[] | null = null;

    private loadData<T>(dataType: string): T {
        const fileName = `${dataType}.${env}.${config.dataVersion}.json`;
        const filePath = path.join(__dirname, "../test-data", fileName);

        if (!fs.existsSync(filePath)) {
            throw new Error(`Test data file not found: ${fileName}`);
        }

        try {
            const fileContent = fs.readFileSync(filePath, "utf8");
            return JSON.parse(fileContent);
        } catch (error) {
            throw new Error(`Failed to parse test data file: ${fileName}. Error: ${error}`);
        }
    }

    getUsers(): UserCredentials[] {
        if (!this.usersCache) {
            this.usersCache = this.loadData<UserCredentials[]>("users");
        }
        return this.usersCache;
    }

    getUserById(id: string): UserCredentials {
        const users = this.getUsers();
        const user = users.find((user) => user.id === id);

        if (!user) {
            throw new Error(
                `User with id '${id}' not found in test data.\n` +
                    `Available users: ${users.map((user) => user.id).join(", ")}`,
            );
        }

        return user;
    }

    getUsersByType(type: UserCredentials["type"]): UserCredentials[] {
        const users = this.getUsers();
        return users.filter((user) => user.type === type);
    }

    validateDataVersion(): void {
        const users = this.getUsers();
        console.log(`✓ Test data loaded successfully`);
        console.log(`  Environment: ${env}`);
        console.log(`  Data version: ${config.dataVersion}`);
        console.log(`  Users loaded: ${users.length}`);
    }
}

export const testDataLoader = new TestDataLoader();
