import * as devConfig from "./dev.json";
import * as testConfig from "./test.json";

export interface EnvironmentConfig {
    baseUrl: string;
    timeout: number;
    dataVersion: string;
}

const env = process.env.ENV || "DEV";

const configs: Record<string, EnvironmentConfig> = {
    DEV: devConfig,
    TEST: testConfig,
};

if (!configs[env]) {
    throw new Error(`Invalid environment: ${env}. Available: ${Object.keys(configs).join(", ")}`);
}

const config: EnvironmentConfig = configs[env];

export default config;
export { env };
