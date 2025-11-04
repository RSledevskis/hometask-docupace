import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    eslintPluginPrettierRecommended,
    {
        rules: { "prettier/prettier": ["error"] },
    },
    {
        ignores: [
            "playwright-report/*",
            "test-results/*",
            "package.json",
            "README.MD",
            "yarn.lock",
        ],
    },
];
