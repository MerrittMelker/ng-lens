# Project Context Snapshot (NgLens)

Purpose: Persist the current state, decisions, and next steps so work continues smoothly after a chat reset.

## What this project is
- Name: NgLens (formerly “Angular Analyzer”).
- Type: Node.js/TypeScript static analyzer using ts-morph to map Angular DI services and the methods actually used in components.

## Key decisions
- Module system: ESM ("type": "module", ts-node esm: true).
- Entry point: npm start -> ts-node src/index.ts.
- Scope: Analyze .ts files in sample/ by default; configurable in src/index.ts.

## Current status (Aug 19, 2025)
- Repo name and metadata aligned to "ng-lens" (package.json name, repo URLs).
- npm scripts available: start, test, test:basic, test:validation.
- Node modules installed; lockfile present. You planned to regenerate the lockfile and run tests next.

## Useful scripts
- Start: npm start
- All tests: npm test
- Basic analysis: npm run test:basic  (runs src/index.ts against sample/)
- Validation tests: npm run test:validation (runs src/test-runner.ts)

## One-liner commands you queued up
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
- ts-node + ESM: Configured via tsconfig.json ("ts-node.esm": true). If you ever see ESM loader issues, you can alternatively run with: node --loader ts-node/esm src/index.ts
- Lockfile isn’t tied to folder name; regeneration is still okay to ensure a clean state.

## Pointers
- Docs: [README.md](./README.md) (features, usage, architecture)
- History/decisions: [CHANGELOG.md](./CHANGELOG.md)
- Questions: [QUESTIONS.md](./QUESTIONS.md) — [Open](./QUESTIONS.md#open), [Answered](./QUESTIONS.md#answered), [Parked](./QUESTIONS.md#parked)
- Code: src/**/*, analyzers/*, sample/*

## Task tracking
- Centralized task list: see [TODO.md](./TODO.md) — [Inbox](./TODO.md#inbox), [Next](./TODO.md#next), [In Progress](./TODO.md#in-progress), [Done](./TODO.md#done).
- Quick commands you can say here and I’ll update TODO.md:
  - Add: "Add task: <description> [P1|P2|P3]"
  - Start work: "Start T-###"
  - Complete: "Done T-###" or "Complete <description>"
  - Update: "Update T-###: <new text> [Pn]"
