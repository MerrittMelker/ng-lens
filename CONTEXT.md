# Project Context Snapshot (NgLens)

Purpose: Persist the current state, decisions, and next steps so work continues smoothly after a chat reset.

## What this project is
- Name: NgLens (formerly “Angular Analyzer”).
- Type: Node.js/TypeScript static analyzer using ts-morph to map Angular DI services and the methods actually used in components, plus route metadata extraction.

## Key decisions
- Module system: ESM ("type": "module", ts-node esm: true).
- Entry point: npm start -> ts-node src/index.ts.
- Scope: Analyze .ts files in sample/ by default; configurable in src/index.ts.

## Current status (Aug 21, 2025)
- Route scanning implemented: extracts component, fullPath, data.menuId, and importPath from Angular routing modules (see src/analyzers/RoutingAnalyzer.ts and src/route-scan.ts).
- Tests pass end-to-end; validation suite confirms routing analysis and service usage analysis.
- npm scripts available: start, test, test:basic, test:validation, scan:routes.
- Dependencies installed; lockfile updated recently.

## Useful scripts
- Start: npm start
- All tests: npm test
- Basic analysis: npm run test:basic  (runs src/index.ts against sample/)
- Validation tests: npm run test:validation (runs src/test-runner.ts)
- Route scan: npm run scan:routes (runs src/route-scan.ts and prints route entries)

## One-liner commands
- Rebuild lockfile (optional but fine after a rename):
  - Cross-platform:
    ```bash
    rm -rf node_modules package-lock.json && npm install
    ```
  - Windows PowerShell:
    ```powershell
    Remove-Item -Recurse -Force node_modules, package-lock.json; npm install
    ```
- Run tests:
  ```bash
  npm test
  ```

## Notes and tips
- ts-node + ESM: Configured via tsconfig.json ("ts-node.esm": true). If you see ESM loader issues, try: `node --loader ts-node/esm src/index.ts`.
- Windows shim files: If you used `npm install --prefix <path>` on Windows, npm may create command shims in the repo root (e.g., `acorn`, `ts-node.ps1`, `tsc.cmd`). They’re duplicates of `node_modules/.bin/*` and safe to delete. Prefer running `npm install` from the project root without `--prefix`.

## Pointers
- Docs: [README.md](./README.md) (features, usage, architecture)
- History/decisions: [CHANGELOG.md](./CHANGELOG.md)
- Questions: [QUESTIONS.md](./QUESTIONS.md) — [Open](./QUESTIONS.md#open), [Answered](./QUESTIONS.md#answered), [Parked](./QUESTIONS.md#parked)
- Tasks: [TODO.md](./TODO.md) — [Inbox](./TODO.md#inbox), [Next](./TODO.md#next), [In Progress](./TODO.md#in-progress), [Done](./TODO.md#done)
- Code: src/**/*, analyzers/*, sample/*

## Task tracking
- Centralized task list: use [TODO.md](./TODO.md). Link to sections with anchors like `(./TODO.md#next)`; cross-file links work in most renderers (GitHub, IDEs).
- Quick commands you can say here and I’ll update TODO.md:
  - Add: "Add task: <description> [P1|P2|P3]"
  - Start work: "Start T-###"
  - Complete: "Done T-###" or "Complete <description>"
  - Update: "Update T-###: <new text> [Pn]"
