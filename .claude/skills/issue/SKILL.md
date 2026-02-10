---
name: issue
description: Read a GitHub issue, summarize it, and create a branch for it
allowed-tools: Bash(gh *), Bash(git *)
---

# Issue Skill

Read a GitHub issue by number or URL, summarize it, then create a working branch.

## Repository

`alamenai/terrae` — https://github.com/alamenai/terrae/issues

## Arguments

The user provides either:

- An issue number (e.g., `42`)
- A GitHub issue URL (e.g., `https://github.com/alamenai/terrae/issues/42`)

If a URL is provided, extract the issue number from it.

## Instructions

1. **Fetch the Issue**
   - Run `gh issue view <number> --repo alamenai/terrae` to read the issue
   - If the issue doesn't exist, tell the user and stop

2. **Summarize the Issue**
   - Display the issue title and number
   - Summarize the description in 2-3 bullet points
   - List any labels
   - Note if there are linked PRs or assignees

3. **Determine Branch Name**
   - Infer the type from labels or content:
     - `bug` label or bug description → `fix/`
     - `enhancement` or `feature` label → `feat/`
     - `documentation` label → `docs/`
     - Otherwise → `feat/`
   - Build the branch name: `type/issue-number-short-description`
   - Keep the description part short (2-4 words, kebab-case)
   - Examples:
     - `feat/42-add-heatmap-component`
     - `fix/17-marker-memory-leak`
     - `docs/8-update-installation-guide`

4. **Create the Branch**
   - Make sure we're on `main` and up to date: `git checkout main && git pull`
   - Create and switch to the new branch: `git checkout -b <branch-name>`
   - Confirm the branch was created

5. **Report**
   - Show the branch name
   - Remind the user what the issue is about so they can start working
