import * as devConfig from "./dev.json";
import * as testConfig from "./test.json";

interface Config {
    baseUrl: string;
    timeout: number;
}

const env = process.env.ENV || "DEV";

const configs: Record<string, Config> = {
    DEV: devConfig,
    TEST: testConfig,
};

const config: Config = configs[env];

export default config;
