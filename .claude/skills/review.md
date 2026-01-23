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
   Reference `.claude/rules/` for project-specific conventions:
   - TypeScript: Use `type` not `interface`
   - JavaScript: Arrow functions, explicit returns
   - React: Proper component structure, hooks guidelines
   - Clean Code: Naming, function size, comments
