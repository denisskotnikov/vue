import { builtinModules } from 'module';

import eslintJS from '@eslint/js';
import typescriptParser from 'vue-eslint-parser';
import vitest from '@vitest/eslint-plugin';
import pluginImport from 'eslint-plugin-import';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintVue from 'eslint-plugin-vue';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import eslintTypescript from 'typescript-eslint';
import { fixupPluginRules } from '@eslint/compat';
import effector from 'eslint-plugin-effector';

const nodeBuiltinModules = builtinModules.join('|');
const ourOwnModules = [''].join('|');

export default eslintTypescript.config(
    eslintJS.configs.recommended,
    eslintTypescript.configs.recommended,
    ...eslintVue.configs['flat/recommended'],
    pluginImport.flatConfigs.recommended,
    pluginPrettierRecommended,
    vitest.configs.recommended,
    {
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                parser: eslintTypescript.parser,
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.vitest,
                ref: 'readonly',
                computed: 'readonly',
                watch: 'readonly',
                watchEffect: 'readonly',
            },
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
        },
        plugins: {
            vitest,
            'simple-import-sort': simpleImportSortPlugin,
            'no-only-tests': noOnlyTests,
            effector: fixupPluginRules(effector),
        },
        rules: {
            // effector,
            ...effector.configs.recommended.rules,
            ...effector.configs.scope.rules,
            // Possible Errors
            'no-console': [2, { allow: ['warn', 'error', 'info'] }], // sometimes console warnings or console errors are helpful, but console.log probably shouldn't be checked into source control (?)
            'no-constant-condition': 2,
            'no-debugger': 2,
            'no-dupe-args': 2,
            'no-dupe-keys': 2,
            'no-duplicate-case': 2,
            'no-obj-calls': 2,
            'no-unreachable': 2,
            'no-unsafe-negation': 2,
            'use-isnan': 2,

            // Best practices
            'no-empty-pattern': 2,
            'no-extra-bind': 2,
            'no-implied-eval': 2,
            'no-labels': 2,
            'no-self-assign': 2,
            'no-self-compare': 2,
            'no-throw-literal': 2,
            'no-void': 2,
            'no-with': 2,
            'import/no-cycle': ['error'],

            // Variables
            'no-shadow-restricted-names': 2,
            /**
             * @see https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
             */
            'no-undef': 0,
            'no-unused-vars': 0, // Finds things like arguments that aren't used but later arguments are used. Or an event handler where the event object isn't used.

            // Stylistic things are enforced by Prettier, so they don't need to be enforced by eslint
            indent: [0, 'tab'], // Enforces a specific number of tab indentations :(
            'no-trailing-spaces': 0, // Somewhat militant, especially for empty lines that sometimes have indentation that matches the line above it.
            'no-mixed-spaces-and-tabs': 0,
            'no-tabs': 0,

            // ES2015 rules
            'constructor-super': 2,
            'no-const-assign': 2,
            'no-dupe-class-members': 2,
            'no-duplicate-imports': 2,
            'no-this-before-super': 2,

            // jsx-a11y rules
            'jsx-a11y/click-events-have-key-events': 'off',
            'jsx-a11y/no-autofocus': 'off',
            'jsx-a11y/no-onchange': 'off',

            eqeqeq: ['error', 'allow-null'],
            'arrow-body-style': ['warn', 'as-needed'],
            'import/no-default-export': 'error',
            'import/named': 'off',
            'import/no-duplicates': 'off',
            'import/no-unresolved': 'off',
            'import/namespace': 'off',
            'import/no-dynamic-require': 'error',
            'no-unsafe-optional-chaining': 'error',
            'default-case': 'error',
            'no-empty': 'error',
            'prefer-const': 'error',
            'no-else-return': 'error',
            'no-implicit-coercion': ['error', { disallowTemplateShorthand: false }],
            'no-nested-ternary': 'error',
            'no-useless-computed-key': 'error',
            'no-use-before-define': 'error',
            'no-param-reassign': ['error', { props: false }],
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-var-requires': 'error',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-use-before-define': ['error'],
            '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { destructuredArrayIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
            ],
            'no-prototype-builtins': 'off',
            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        ['^vue', '^@?\\w'],
                        /* import 'foo*' or import '@foo*' */
                        [`^\\u0000@?\\w`],
                        /* import '@some-lib*' or import '@some-ui*' */
                        [`^\\u0000(${ourOwnModules})`],
                        /* import '#foo*' */
                        ['^\\u0000#\\w'],
                        /* import './foo*' or import '../foo*' */
                        ['^\\u0000\\.'],
                        /* import ... from 'fs' */
                        [`^(${nodeBuiltinModules})`],
                        /* import ... from 'foo*' or import ... from '@foo*' */
                        [`^@?\\w`],
                        /* import ... from '@some-lib*' or import ... from '@some-ui*' */
                        [`^(${ourOwnModules})`],
                        /* import ... from '@foo*' */
                        ['^@\\w'],
                        /* import @/shared */
                        ['@/shared?\\w'],
                        /* import @/entities */
                        ['@/entities?\\w'],
                        /* import @/features */
                        ['@/features?\\w'],
                        /* import @/widgets */
                        ['@/widgets?\\w'],
                        /* import ... from './foo*' or import ... from '../foo*' */
                        ['^\\.'],
                        /* import styles */
                        ['^.+\\.?(scss|css)$'],
                    ],
                },
            ],
            ...vitest.configs.recommended.rules,
            'vitest/consistent-test-it': ['error'],
            'vitest/no-conditional-in-test': 'error',
            'vitest/prefer-equality-matcher': 'error',

            'no-only-tests/no-only-tests': 'error',
        },
    },
    {
        ignores: ['dist', 'node_modules', 'coverage', '*.config.js'],
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/no-unused-expressions': 'off',
        },
    },
    {
        files: ['**/*.d.ts'],
        rules: {
            '@typescript-eslint/consistent-type-definitions': 'off',
            'import/no-default-export': 'off',
        },
    },
    {
        files: [
            '*.d.ts',
            'eslint.config.mjs',
            'express-entry.ts',
            'vite.config.ts',
            'vitest.config.ts',
            'pages/**/*',
            'src/app/**/*',
        ],
    },
    {
        files: ['*.js'],
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
        },
    },
    {
        files: [
            '*.d.ts',
            'eslint.config.mjs',
            'express-entry.ts',
            'vite.config.ts',
            'vitest.config.ts',
            'pages/**/*',
            'src/app/**/*',
            'postcss.config.*',
        ],
        rules: {
            'import/no-default-export': 'off',
        },
    }
);
