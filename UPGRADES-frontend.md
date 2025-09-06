Frontend dependency upgrade (2025-09-06)

Summary:
- Bumped `vite` to 7.1.4 (from ^5.0.10) to pull in a fixed `esbuild` and resolve a moderate advisory.
- Bumped `shadcn-ui` to 0.9.5 (from ^0.7.0) to avoid a lodash.template high severity advisory.

Verification performed locally:
- `npm install` completed and updated `package-lock.json`.
- `npm run build` succeeded using Vite v7.1.4 (build warnings about `"use client"` in @tanstack/react-query, non-blocking).
- `npm audit` returned 0 vulnerabilities.

Notes:
- The Vite and shadcn-ui changes are semver-major upgrades; I recommend a quick UI smoke test.
- If you want me to open a PR that includes the actual package.json changes instead of this metadata file, let me know; currently the workspace shows the dependency bumps are present on the repository's main HEAD.
