import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  // Use ESLint's default recommended code rules
  js.configs.recommended,
  
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,    // Enables Node.js globals (process, require, etc.)
        ...globals.express, // Enables Express specific environments if needed
      },
    },
    rules: {
      // Force semicolons at the end of statements
      "semi": ["error", "always"],
      
      // Prefer const over let when variables aren't reassigned
      "prefer-const": "warn",
      
      // Allow console statements, common in backend development
      "no-console": "off",
    },
  },
  
  {
    // Ignore folders you don't want ESLint rewriting
    ignores: ["node_modules/"],
  }
]);
