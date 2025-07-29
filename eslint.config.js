// eslint.config.js - Consolidated with correct tsconfig paths
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // ESLint's core recommended rules (applies broadly)
  js.configs.recommended,

  // Global ignores for the entire project
  {
    ignores: [
      'node_modules/',
      'build/',
      'dist/',
      '.next/', // If you are using Next.js
      'coverage/',
    ],
  },

  // -----------------------------
  // Configuration for FRONTEND TypeScript/React files
  // -----------------------------
  {
    files: ['frontend/**/*.{ts,tsx}'], // Apply to TS/TSX files within the frontend folder
    extends: [
      ...tseslint.configs.recommended, // Includes parser setup and recommended TS rules
    ],
    languageOptions: {
      parserOptions: {
        project: './frontend/tsconfig.json', // <-- Correct path for frontend tsconfig
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // You'd add React-specific rules/configs here later
  },

  // -----------------------------
  // Configuration for BACKEND TypeScript files
  // -----------------------------
  {
    files: ['backend/**/*.{ts,js}'], // Apply to TS/JS files within the backend folder
    extends: [
      ...tseslint.configs.recommended, // Includes parser setup and recommended TS rules
    ],
    languageOptions: {
      parserOptions: {
        project: './backend/tsconfig.json', // <-- Correct path for backend tsconfig
        tsconfigRootDir: import.meta.dirname,
      },
    },
    // Add any Node.js specific rules/configs here later (e.g., globals.node)
  }
);
