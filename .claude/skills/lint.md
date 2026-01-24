# Lint Skill

Run linting and type checking across the Terrae codebase.

## Instructions

1. **Run Type Checking**

   ```bash
   npx tsc --noEmit
   ```

   This checks TypeScript types without emitting files.

2. **Run ESLint**

   ```bash
   npm run lint
   ```

   This runs ESLint on the codebase.

3. **Run Prettier Check**

   ```bash
   npm run format:check
   ```

   This checks if files are properly formatted.

4. **Report Results**
   - List any type errors with file locations
   - List any linting errors/warnings
   - List any formatting issues

5. **Offer to Fix**
   If issues are found, ask the user if they want to:
   - Auto-fix linting issues: `npm run lint -- --fix`
   - Auto-format files: `npm run format`
   - Manually address type errors (show each error)

6. **Re-verify**
   After fixes, run the checks again to confirm all issues are resolved.
