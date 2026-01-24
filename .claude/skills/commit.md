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

5. **Important Rules**
   - Do NOT add `Co-Authored-By` lines
   - Do NOT commit until user approves
   - Do NOT use `--amend` unless explicitly requested
   - Do NOT push unless explicitly requested
   - Keep commit messages concise (under 72 characters)

6. **Create the Commit**

   ```bash
   git commit -m "type(scope): description"
   ```

7. **Verify**
   - Run `git status` to confirm commit succeeded
   - Show the commit hash to the user
