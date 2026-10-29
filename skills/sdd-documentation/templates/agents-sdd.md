# {{PROJECT_NAME}}

{{PROJECT_PURPOSE}}

## Commands

**Run:** `{{DEV_COMMAND}}`
**Build:** `{{BUILD_COMMAND}}`
**Output:** `{{BUILD_OUTPUT_DIR}}`

## Architecture

SDD (specs) + {{STACK}}

**Project layout:** {{LAYOUT_SUMMARY}}
(`documentation/` is not part of the build.)

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Always deployable; reflects production |
| `dev` | Continuous integration of features |
| `feature/*` | Daily work (e.g., `feature/{{NNN}}-{{FEATURE_SLUG}}`) |

**Flow:** feature → merge into `dev` → when stable, merge `dev` into `main` with a semver tag (e.g., `{{VERSION_TAG_EXAMPLE}}`).

## Rules

- Read this document first before making new changes.
- Do not install any new dependencies without asking.
- Follow the provided documentation strictly.
- Do not invent if there is a gap in the documentation. Ask in this case.
- Verify that changes followed the rules and the specification.

## SDD Constitution

Non-negotiable principles. Every spec, plan, and task must comply with them.

1. **The spec rules**: no behavior is implemented unless it is present in the
   active spec. If a decision is missing, stop the work and ask.
2. **Tests as gatekeeper**: every task ends with all its tests green.
   Proceeding with red tests is strictly forbidden.
3. **Language**: use English for documentation and implementation.
   Chat replies to the user may use {{USER_REPLY_LANGUAGE}}.

## SDD Rules (Spec-Driven Development)

Specification-driven development. No functionality is implemented unless it is defined in the active spec.

| Step | Artifact |
|------|----------|
| Rules | Read the rules of this document |
| Specification | `documentation/specs/NNN-*/spec.md` — requirements in EARS notation |
| Clarification | Review of the spec before planning |
| Planning | `documentation/specs/NNN-*/plan.md` — modules, technical decisions |
| Tasks | `documentation/specs/NNN-*/tasks.md` — checkboxes with "Done when:" criteria. A finished task also has a "Cost:" line (time and tokens) |
| Implementation | One task at a time, aligned with the spec. When a task is marked done, record its elapsed time and token spend on that task |
| Validation | `documentation/validation.md` — requirement-by-requirement walkthrough after completing a spec |
| Epics (optional) | `documentation/epics.md` — larger capabilities made of one or more specs. Skip this step when no epic applies. |

**Key rule:** If a decision is missing in the spec, work stops and clarification is sought before coding.

### Task cost

When a task in `tasks.md` is marked `[x]`, add a `Cost` line directly under its `Done when:` line in the same edit. Do not add `Cost` to a task that is still `[ ]`.

```markdown
Cost: 16 min (2026-10-14 14:02–14:18 +02:00) · 18,400 tokens
```

- Note the start time (date, clock time, timezone) when the task starts. Duration is wall-clock time until **Done when** is met (`Nh Nm`, or `Nm Ns` under a minute).
- Tokens are the tokens spent on that task (input + output). Use a running-total delta, or the sum of the requests that belong to the task.
- Do not invent a token count. If the session does not report usage, write `tokens: not reported`.
- Do not rewrite the `Cost` of a task that was already done, unless correcting a figure written in the same turn.

### Epics (optional)

Epics are not required to use SDD. They are a layer above specs, used only when several specs together deliver one larger capability. Those specs do not have to be consecutive.

`documentation/epics.md` lists each epic with a name, a description, a definition of done, and the specs that compose it. Each spec line shows whether that spec is done. Mark a spec done there only after that spec's own validation passes. An epic is complete only when every listed spec is done and its definition of done is met. A spec with no epic is still implemented normally.

---

<!--
PLACEHOLDER CHEAT SHEET (delete this comment block after filling):
{{PROJECT_NAME}}           — Short product/repo name
{{PROJECT_PURPOSE}}        — One short paragraph: what the app does and for whom
{{DEV_COMMAND}}            — e.g. npm run dev
{{BUILD_COMMAND}}          — e.g. npm run build
{{BUILD_OUTPUT_DIR}}       — e.g. dist/
{{STACK}}                  — e.g. Vite MPA + Web Components + Git + Figma
{{LAYOUT_SUMMARY}}         — Where source, public assets, and entry HTML live
{{NNN}} / {{FEATURE_SLUG}} — Example feature folder naming
{{VERSION_TAG_EXAMPLE}}    — e.g. v1.0.0
{{USER_REPLY_LANGUAGE}}    — language for chat replies only (e.g. English); docs stay English
Add project-specific Style / Components / Content sections above Rules as needed.
-->
