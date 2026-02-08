---
name: fix
description: Systematically fix issues found by /review or reported by the user
allowed-tools: Read, Grep, Glob, Edit, Write, Bash(git diff*), Bash(npx tsc *)
---

# Fix Skill

Systematically fix code issues found by `/review` or reported by the user.

## Instructions

### Step 1: Identify Issues

If coming from a `/review`, gather the issues from the review output. Otherwise, ask the user what needs fixing.

Categorize each issue by severity:

- **Critical** — Compilation errors, missing imports, runtime crashes
- **High** — Memory leaks, missing cleanup, security concerns, DRY violations
- **Medium** — Convention violations, inconsistencies, naming issues
- **Low** — Style preferences, minor optimizations

### Step 2: Plan the Fix Order

Fix issues in severity order (critical first). Group related fixes together when they touch the same file to minimize changes.

Present the plan to the user before starting:

```
## Fix Plan

### Critical (fix first)
1. [Issue] — [File:line] — [What to do]

### High
2. [Issue] — [File:line] — [What to do]

### Medium
3. [Issue] — [File:line] — [What to do]
```

### Step 3: Apply Fixes

For each fix:

1. Read the file to understand the current code
2. Apply the minimal change needed to fix the issue
3. Verify the fix doesn't break anything nearby
4. Move to the next issue

Follow these principles:

- **Minimal changes** — Fix only what's broken, don't refactor surrounding code
- **One concern at a time** — Don't mix fixes for different issues in the same edit
- **Preserve intent** — Keep the original behavior while fixing the problem
- **Follow project conventions** — Apply fixes using the patterns from `.claude/rules/`

### Step 4: Verify

After all fixes:

1. Run `npx tsc --noEmit` to check for type errors
2. Show the user a summary of what was fixed

```
## Fix Summary

### Fixed
- [Issue] — [File] — [What was done]

### Skipped (needs discussion)
- [Issue] — [Reason]

### Remaining
- [Issue] — [Why it wasn't fixed]
```

### Step 5: Review Changes

Show the user the diff of all changes:

```bash
git diff --stat
```

Ask if they want to proceed with committing or if adjustments are needed.

## Common Fix Patterns

### Missing Import

Add the import at the top of the file, grouped with similar imports.

### Missing useEffect Cleanup

Add a return function that removes event listeners, cancels animation frames, clears timeouts, and removes map layers/sources/markers.

### Untracked setTimeout/setInterval

Store the timer ID in a ref and clear it in the cleanup function.

### Untracked requestAnimationFrame

Store the RAF ID and cancel it with `cancelAnimationFrame` in the cleanup function.

### Replacing `any` with Proper Types

Identify what the value actually is and create a named type for it. Use `unknown` only as a last resort.

### DRY Violations

Extract the duplicated code into a shared utility file. Update all files that used the duplicated code to import from the shared location.

### Convention Violations

Reference `.claude/rules/` for the correct pattern and apply it consistently.
