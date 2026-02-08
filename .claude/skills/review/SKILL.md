---
name: review
description: Review code changes implemented in the current session before committing
allowed-tools: Read, Grep, Glob, Bash(git *)
---

# Review Skill

Review the code changes implemented in the current session before committing.

## Instructions

1. **Gather Changes**

   ```bash
   git status
   git diff --stat
   ```

   Identify all modified and new files from the current work.

2. **Read Changed Files**
   For each modified or new file, read the full content to understand the implementation.
   Use `git diff <file>` for modified files to see what changed.

3. **Analyze Changes**
   Review the code for:
   - **Correctness**: Logic errors, edge cases, potential bugs
   - **Project Conventions**: Following Terrae patterns (arrow functions, `type` over `interface`, etc.)
   - **Performance**: Unnecessary re-renders, memory leaks, inefficient algorithms
   - **Security**: XSS, injection vulnerabilities, exposed secrets
   - **TypeScript**: Proper typing, avoiding `any`, type safety
   - **React Patterns**: Proper hooks usage, effect dependencies, cleanup functions

4. **Structure the Review**
   Format your review with clear sections:

   ```
   ## Code Review: [Feature/Change Name]

   ### Overview
   Brief summary of what the changes do.

   ### Code Quality & Style
   - Positives
   - Issues found

   ### Potential Issues & Risks
   Bugs, edge cases, or concerns.

   ### Performance Implications
   Any performance considerations.

   ### Suggestions for Improvement
   Specific, actionable recommendations.

   ### Summary
   Overall assessment and next steps.
   ```

5. **Be Constructive**
   - Acknowledge good code, not just problems
   - Provide specific line numbers when referencing issues
   - Suggest fixes, not just problems
   - Distinguish between blockers and nice-to-haves

6. **Check for Common Issues**
   - Missing cleanup in useEffect
   - Missing dependencies in hooks
   - Unhandled promise rejections
   - Missing error boundaries
   - Hardcoded values that should be constants
   - Missing TypeScript types
   - Console.log statements left in code

7. **Verify Against Project Rules**
   Read the rule files in `.claude/rules/` and verify the code follows them:
   - `.claude/rules/typescript.md`: Types, naming, ordering
   - `.claude/rules/javascript.md`: Formatting, arrow functions, explicit returns, early returns
   - `.claude/rules/react/component.md`: File structure, component structure, map component template
   - `.claude/rules/react/hooks.md`: useEffect extraction, dependencies, memoization rules
   - `.claude/rules/react/props.md`: Type extraction, ordering, defaults, documentation
   - `.claude/rules/react/patterns.md`: Component size, composition, common patterns
   - `.claude/rules/react/rendering.md`: Conditional rendering, inline functions, keys, fragments
   - `.claude/rules/react/performance.md`: Resource cleanup, refs vs state, layer management, canvas, DOM
   - `.claude/rules/clean-code.md`: Naming, functions, comments, formatting, error handling
   - `.claude/rules/nextjs.md`: App Router folder structure, file naming
   - `.claude/rules/security.md`: XSS, CSP, CORS, CSRF, secrets, rate limiting

   Flag any violations with the specific rule and file location.

8. **Verify Page Navigation**
   If docs pages were added or modified, verify the `prev` and `next` props in `DocsLayout` match the sidebar navigation order defined in `src/app/docs/_components/docs-sidebar.tsx`. Check:
   - prev/next titles match the sidebar item titles exactly
   - prev/next hrefs point to the correct neighboring pages
   - New pages are linked from their neighbors (both prev and next sides)
   - The first page has no `prev`, the last page has no `next`
