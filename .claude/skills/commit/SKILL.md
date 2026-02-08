---
name: commit
description: Create standardized git commits following Terrae's conventions
allowed-tools: Bash(git *)
---

# Commit Skill

Create standardized git commits following Terrae's conventions.

## Instructions

1. **Check Current State**
   - Run `git status` to see changed files
   - Run `git diff` to see the actual changes

2. **Review Changes with User**
   - Summarize what files were changed
   - Explain the nature of changes (new feature, bug fix, refactor, etc.)
   - Ask the user if they want to proceed with the commit

3. **Stage Files**
   - Stage specific files by name (avoid `git add -A` or `git add .`)
   - Never stage sensitive files (.env, credentials, etc.)

4. **Commit Message Format**
   Follow conventional commits:

   ```
   type(scope): description
   ```

   Types:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Formatting, no code change
   - `refactor`: Code restructuring
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks

   Examples:
   - `feat(marker): add rotation support`
   - `fix(popup): prevent memory leak on unmount`
   - `docs(readme): update installation instructions`

5. **New Component Convention**

   When committing a new component, split into 3 separate commits in this order:
   1. `feat(map): add {component} component` — the source file (`src/registry/map/{slug}.tsx`)
   2. `feat(docs): add {component} example components` — all example files (`src/app/docs/_components/examples/{slug}-*.tsx`)
   3. `feat(docs): add {component} documentation page` — the docs page (`src/app/docs/{slug}/page.tsx`)

   Shared file modifications (sidebar, components page, changelog, registry.json, barrel export) should be committed separately since they often contain changes for multiple components.

6. **Important Rules**
   - Do NOT add `Co-Authored-By` lines
   - Do NOT commit until user approves
   - Do NOT use `--amend` unless explicitly requested
   - Do NOT push unless explicitly requested
   - Keep commit messages concise (under 72 characters)

7. **Create the Commit**

   ```bash
   git commit -m "type(scope): description"
   ```

8. **Verify**
   - Run `git status` to confirm commit succeeded
   - Show the commit hash to the user
