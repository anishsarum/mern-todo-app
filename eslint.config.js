import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,

  {
    ignores: ['node_modules/', 'build/', 'dist/', '.next/', 'coverage/'],
  },
  {
    files: ['frontend/**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommended,
      // You might also have eslint-plugin-react rules here from your Vite setup
      // For example: pluginReactConfig, (if you added it before)
      // If you're using prettier, you might add: eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true, // <--- CHANGE THIS LINE
        // project: './frontend/tsconfig.json', // <--- REMOVE OR COMMENT OUT THIS LINE
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['backend/**/*.{ts,js}'], // Note: if you have .js files in backend, make sure they are linted as JS, not TS
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        projectService: true, // <--- CHANGE THIS LINE
        // project: './backend/tsconfig.json', // <--- REMOVE OR COMMENT OUT THIS LINE
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
