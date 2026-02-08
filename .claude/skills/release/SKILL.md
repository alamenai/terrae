---
name: release
description: Prepare a Terrae component for release by running all checks and builds
disable-model-invocation: true
allowed-tools: Bash(npx tsc *), Bash(npm run *)
---

# Release Skill

Prepare a Terrae component for release.

## Instructions

1. **Pre-release Checklist**
   Run these checks in order:

   a. **Type Check**

   ```bash
   npx tsc --noEmit
   ```

   b. **Lint**

   ```bash
   npm run lint
   ```

   c. **Format Check**

   ```bash
   npm run format:check
   ```

   d. **Tests**

   ```bash
   npm run test:run
   ```

2. **Build Registry**
   If all checks pass:

   ```bash
   npm run registry:build
   ```

   This builds the component registry to `./public/maps`.

3. **Build Project**

   ```bash
   npm run build
   ```

   This runs the Next.js production build.

4. **Report Status**
   - Show results of each step
   - If any step fails, stop and report the issue
   - Offer to help fix any issues found

5. **Final Verification**
   - Confirm all checks passed
   - Show the built files in `./public/maps`
   - Remind user to commit changes if needed

6. **Do NOT**
   - Automatically push to remote
   - Automatically create tags or releases
   - Modify version numbers without explicit request
