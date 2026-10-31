Thank you for your interest in making Spline better _(seriously, thank you!)_.

This guide covers the coding standards and pull request requirements.

For setting up a development environment, check [the README.md's pre-requisites and getting started](./README.md#prerequisites).

## Pull Requests

- For feature requests, create an issue before making a Pull Request until a maintainer approves the request.
- Keep them in draft until they've ran through our pre-submition checks.
- Related issues must be referenced with "Closes #issuenumber".
- Breaking changes must be mentionned.
- All required CI checks must pass.
- Relevant tests must be added or updated.
- Changes should be focused.

## Commit messages

Spline uses short, human-readable commit messages.

Commit messages should:

- Start with a capital letter.
- Briefly describe what the commit does.
- Use imperative wording where practical.
- Avoid unnecessary prefixes, scopes, or issue numbers.

Examples:

- `Add GitHub issue integration`
- `Fix authentication redirect`
- `Update database schema`
- `Improve workspace navigation`
- `Remove unused dependencies`

## Branch naming

Use descriptive branch names following the `type/short-description` format.

Supported prefixes:

- `feature/`: New functionality
- `fix/`: Bug fixes
- `refactor/`: Code restructuring
- `docs/`: Documentation changes
- `chore/`: Maintenance and tooling

Use lowercase words separated by hyphens.

Examples:

- `feature/github-integration`
- `fix/login-redirect`
- `refactor/api-client`
- `docs/contributing-guide`
- `chore/update-dependencies`

## Potentially useful scripts

- `pnpm dev[:web, :server]`: Runs a development server (use `:web` or `:server` to start each server independently)
- `pnpm test`: Runs tests
- `pnpm lint[:fix]`: Checks all problems with lint rules, and fixes them if asked
- `pnpm format[:check]`: Formats all files or simply checks which files are missing formatting
- `pnpm typecheck`: Checks all TypeScript types

## Before submitting changes

Run the following scripts:

```bash
pnpm lint:fix
pnpm format
pnpm typecheck
pnpm test
```

If they fail, fix the issue.

Finally, see if the CI checks pass.

## Issues

Report all bugs through issues, using the pre-made issue template, before making a bugfix pull request.

## License

All changes are licensed accordingly to [LICENSE](./LICENSE).
