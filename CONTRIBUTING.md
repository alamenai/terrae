# Contributing

Terrae is an open-source project and we welcome contributions from the community.

## How to Contribute

1. Fork the repository
2. Create a new branch for your feature or fix
3. Make your changes
4. Open a pull request with a clear description of what you changed and why

## Ways to Contribute

- **Add new components** - Use the Claude skill `/component/new` to scaffold a new map component with all required files (source, docs, examples, sidebar, registry)
- **Fix bugs** - Found something broken? Submit a fix
- **Add features** - Have an idea? Open an issue first to discuss, then submit a PR
- **Improve docs** - Help make the documentation clearer
- **Report issues** - Found a bug or have a suggestion? Open an issue

## Creating a New Component

Each new component requires the following files:

1. Component source file in `src/registry/map/`
2. Barrel export in `src/registry/map/index.tsx`
3. Registry entry in `registry.json`
4. Example file(s) in `src/app/docs/_components/examples/`
5. Documentation page in `src/app/docs/`
6. Sidebar navigation entry
7. Components listing entry
8. Changelog entry

### With Claude Code

This project uses [Claude Code](https://claude.ai/claude-code) with a custom skill to streamline component creation.

For an agentic implementation, it is better to use this skill as it ensures consistency and follows all project conventions.

Run the `/component/new` skill and it will guide you through creating all required files automatically.

### Manual

If you prefer to create components manually, follow the patterns in `.claude/rules/react/component.md` and use existing components in `src/registry/map/` as reference.

You will need to create each of the files listed above by hand.

## Guidelines

- Follow the existing code style and conventions
- Keep pull requests focused on a single change
- Write clear commit messages

Thank you for helping make Terrae better!
