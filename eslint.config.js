import globals from "globals";

export default {
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {

        'prettier/prettier': [
            'error',
            {
                tabWidth: 2,
                useTabs: false,
                semi: true,
                singleQuote: true,
                trailingComma: 'all',
                printWidth: 80,
                arrowParens: 'avoid',
                bracketSpacing: true,
            },
        ],
    },
};