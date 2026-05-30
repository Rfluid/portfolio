# Contributing

This is a personal portfolio project maintained solely by **Ruy Vieira ([@Rfluid](https://github.com/Rfluid))**.

**External contributions are not accepted.** Issues, pull requests, and feature
requests from outside collaborators will be closed without review. The repository
is public for transparency and reference only.

If you spotted something genuinely broken, feel free to reach out via the contact
links on [rfluid.astervia.tech](https://rfluid.astervia.tech) instead.

## For the maintainer

```bash
npm install
npm run dev           # local dev server
npm run typecheck     # tsc
npm run lint          # eslint
npm run format        # prettier --write
npm run format:check  # prettier --check (used in CI)
npm run build         # production build
```

Merges to `main` use **rebase only** to keep history linear.
