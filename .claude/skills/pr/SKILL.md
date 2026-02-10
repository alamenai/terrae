---
name: pr
description: Commit, push, and open a pull request on GitHub
allowed-tools: Bash(git *), Bash(gh *)
---

# Pull Request Skill

Commit changes, push the branch, and open a pull request on GitHub.

## Instructions

1. **Check Current State**
   - Run `git status` to see changed files
   - Run `git diff --staged` and `git diff` to see all changes
   - Run `git log --oneline -5` to see recent commits

2. **Stage and Commit**
   - Stage specific files by name (avoid `git add -A` or `git add .`)
   - Never stage sensitive files (.env, credentials, etc.)
   - Follow conventional commit format: `type(scope): description`
   - Keep commit messages concise (under 72 characters)

3. **Create or Use Branch**
   - If on `main`, create a new branch: `git checkout -b <branch-name>`
   - Branch name format: `type/short-description` (e.g., `feat/code-comparison`, `fix/marker-cleanup`)
   - If already on a feature branch, use it

4. **Push to Remote**
   - Push with upstream tracking: `git push -u origin <branch-name>`

5. **Assign Labels**
   Add `--label` flags to `gh pr create` based on the PR type and scope.

   **Type labels** — pick based on the commit type:
   | Commit type | Label |
   |-------------|-------|
   | `fix` | `bug` |
   | `feat` | `enhancement` |
   | `docs` | `documentation` |
   | `test` | (no type label) |
   | `refactor` | (no type label) |
   | `chore` | (no type label) |

   **Component labels** — if the scope matches a component label in the repo, add it:
   | Scope | Label |
   |-------|-------|
   | `compass` | `Compass` |
   | `interaction` | `Interaction` |

   Run `gh label list` to check available labels if unsure. Multiple labels can be combined:

   ```bash
   gh pr create --label "bug" --label "Compass" ...
   ```

6. **Open Pull Request**
   - Use `gh pr create` to open the PR
   - Write a clear title (under 70 characters)
   - Write a description that follows the structure below based on PR type
   - Start with a **Type** checklist — check the one that applies:

   ```bash
   gh pr create --title "type(scope): description" --label "label" --body "$(cat <<'EOF'
   ## Type

   - [ ] Feature
   - [ ] Bug fix
   - [ ] Refactor
   - [ ] Test
   - [ ] Docs
   - [ ] Chore

   ## Summary
   - bullet points describing what changed and why

   ## Bug Details (only for bug fixes)
   **What was the bug?**
   Describe the incorrect behavior.

   **Why did it happen?**
   Explain the root cause.

   **How was it fixed?**
   Describe the solution.

   ## Test Coverage
   If tests were added or updated, link to the file on the branch (permalink):
   - [`src/registry/map/__tests__/component.test.tsx`](https://github.com/alamenai/terrae/blob/<branch-name>/src/registry/map/__tests__/component.test.tsx)
   EOF
   )"
   ```

7. **Verify and Report**
   - Show the PR URL to the user
   - Run `git status` to confirm clean state

## Important Rules

- Do NOT push to `main` directly — always use a feature branch
- Do NOT force push unless explicitly requested
- Ask user before proceeding with each step
