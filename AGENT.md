# Codex Agent Guide

This document provides clear, concise instructions for Codex CLI when operating in this repository.

## Overview

- Project: Adobe UXP React plugin for Premiere Pro located at `Test-2l7rcl`.
- Primary feature: Convert `.srt` files to plain text via UI (`FileProcessor`).
- Secondary feature: Optional agent UI that calls an external LLM (`src/components/agent.jsx`).
- Build: `webpack@4`, Babel with JSX transform; no modern syntax like optional chaining.
- Entrypoint: `src/index.jsx`; Panel controller: `src/controllers/PanelController.jsx`.
- Manifest: `plugin/manifest.json` (UXP manifest v5).

## How Codex Should Work Here

- Be concise. Preface terminal actions with a short preamble. Use `update_plan` for multi-step tasks.
- Prefer surgical edits over broad refactors. Keep changes minimal and consistent with current style.
- When adding UI:
  - Place components in `src/components`, CSS in same folder.
  - Use functional React components and hooks.
  - Avoid optional chaining and other modern syntax not supported by current Babel config.
- When adding utilities:
  - Place in `src/utils`, export small pure functions.
  - Keep Node/UXP APIs separate from React components.

## Commands and Build

- Build the plugin: `npm run build --prefix Test-2l7rcl`
- Dev watch: `npm run watch --prefix Test-2l7rcl`
- UXP actions (run from `Test-2l7rcl/dist`):
  - `npm run uxp:load --prefix Test-2l7rcl`
  - `npm run uxp:reload --prefix Test-2l7rcl`

Note: Codex should not attempt to open UXP UI. Limit to building and file edits.

## File/Code Conventions

- React imports use `.jsx`; utilities use `.js`.
- CSS is imported directly (no CSS modules).
- Webpack externals: `uxp`, `premierepro` are externals and must not be bundled.
- Avoid optional chaining (`?.`) and nullish coalescing (`??`) due to Babel setup.
- Keep manifest domains updated when adding network calls.

## Planning and Tooling

- Use `update_plan` for multi-step or ambiguous tasks. Keep steps short (5–7 words).
- Use `apply_patch` for file changes; avoid committing or branching.
- Use shell guidelines:
  - Prefer `rg` for search and `sed -n 'start,endp'` for reads.
  - Read files in chunks ≤ 250 lines.

## Testing and Validation

- After changes, run a scoped build: `npm run build --prefix Test-2l7rcl`.
- Do not install new dependencies unless necessary; if needed, explain why.
- If build fails on modern syntax, downlevel to ES5-compatible constructs.

## Security and Secrets

- Never commit secrets. If implementing API usage, store keys in-memory only, or behind UXP secure storage if requested.
- If adding network calls, whitelist domains in `plugin/manifest.json` under `requiredPermissions.webview.domains`.

## Typical Tasks and Checklists

### Add a New UI Component

1. Create `src/components/<name>.jsx` and optional `<name>.css`.
2. Import and render it via `src/components/container.jsx` or another parent.
3. Keep props simple; avoid global state unless necessary.
4. Build and verify.

### Add a Utility Function

1. Create `src/utils/<name>.js` with named exports.
2. Import where needed; avoid circular deps.
3. Keep functions pure; handle I/O at call sites.
4. Build and verify.

### Extend SRT Processing

1. Update `src/utils/processSrt.js` carefully (line normalization, filtering).
2. Ensure results remain trimmed and newline-preserving.
3. Build, then manual check with sample SRT if provided.

### Add/Modify Network Access

1. Implement fetch logic in `src/utils/`.
2. Update `plugin/manifest.json` domains to include the host(s).
3. Add minimal UI in `src/components/` if user interaction is needed.
4. Build and verify.

## Known Pitfalls

- Optional chaining breaks the current build; use defensive checks instead.
- `devtool: cheap-eval-source-map` will not work inside the host; acceptable for local builds.
- UXP requires whitelisted domains; forgetting to add them causes runtime failures.
- Keep `uxp` and `premierepro` as externals in webpack; do not import Node-only modules in UI code.

## Response Style for Codex

- Short, friendly preamble before grouped tool calls.
- Summarize changes and next steps; avoid repeating file contents unless asked.
- Use bullets with bold keywords for clarity in final messages.

## Prompt Examples

- “Add a button to clear output in the Agent panel.”
  - Create `src/components/agent.jsx` patch to add button and state handler.
  - Build and verify.

- “Support WebSocket to local service.”
  - Add client in `src/utils/wsClient.js`.
  - Update manifest domains if needed.
  - Provide minimal UI toggle; build.

- “Improve SRT cleaning to remove NARRATOR lines.”
  - Update filter logic in `processSrt.js` (regex for uppercase names + colon).
  - Build and note impact in final message.

