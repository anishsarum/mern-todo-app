import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,

  {
    ignores: ['node_modules/', 'build/', 'dist/', '.next/', 'coverage/'],
  },
  {
    files: ['frontend/**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: './frontend/tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['backend/**/*.{ts,js}'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: './backend/tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
