# TODO

Single source of truth for tasks. Use this file to track work across chat resets.

How to use with the assistant
- To add: say “Add task: <description> [P1|P2|P3]”.
- To start: say “Start T-###”. I’ll move it to In Progress.
- To complete: say “Done T-###” (or “Complete <description>”). I’ll check it off and move it to Done.
- To edit/retitle/reprioritize: say “Update T-###: <new text> [Pn]”.

Conventions
- IDs: T-###
- Priority: P1 (high), P2 (normal), P3 (low)
- Sections: Inbox -> Next -> In Progress -> Done

## In Progress
- [ ] (T-005) Manual code walkthrough to understand architecture and flow (P1)

## Inbox
- [ ] (T-004) Add CLI flags for targetModule and sourcePattern (P2)
- [ ] (T-006) Set up CI (GitHub Actions) to run npm test on Node 18.x and 20.x (P2)
- [ ] (T-007) Add ESLint + Prettier with npm scripts (lint, format, lint:fix) (P3)

## Next
- [ ] (T-001) Rebuild package-lock.json and reinstall deps (P2)
- [ ] (T-002) Run tests (npm test) and verify sample output (P1)
- [ ] (T-003) Add package.json "engines": { "node": ">=18" } (P3)

## Done
- [x] (T-000) Create CONTEXT.md to preserve state and next steps (P2)
