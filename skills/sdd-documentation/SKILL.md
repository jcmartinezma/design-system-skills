---
name: sdd-documentation
description: >-
  Scaffolds Spec-Driven Development (SDD) documentation for a project: full
  setup (AGENTS.md SDD section, validation.md, optional epics.md, specs tree)
  or only a new
  numbered spec folder when SDD docs already exist. Use when the user asks to
  set up SDD docs, create a specs structure, add a new spec, bootstrap
  documentation/specs, add an optional epic in documentation/epics.md, or add
  SDD rules to AGENTS.md. When an agent finishes an SDD task, it records
  that task's elapsed time and token spend next to the completed task.
disable-model-invocation: true
---

# SDD Documentation Scaffold

Generate Spec-Driven Development documentation so an agent delivers features
only from written specs.

## Modes

Detect the mode **before** writing files. Prefer the user's explicit request;
otherwise infer from what already exists.

| Mode | When |
|------|------|
| **A — Full setup** | No SDD docs yet, or user asks to bootstrap / set up SDD |
| **B — New spec only** | User asks for a new spec/feature folder, and the rest of SDD already exists |

### Mode detection

SDD base is considered present when **all** of these exist:

1. `AGENTS.md` with SDD Constitution / SDD Rules (or equivalent)
2. `documentation/validation.md`
3. `documentation/specs/` (directory)

| Situation | Action |
|-----------|--------|
| User asks for a new spec / new feature folder only | Mode **B**. If base is missing → stop and ask whether to run full setup |
| User asks to bootstrap / set up SDD documentation | Mode **A** |
| Ambiguous + base present | Ask: full setup vs new spec only |
| Ambiguous + base missing | Mode **A** |

**Mode B must not** create, overwrite, or rewrite `AGENTS.md` or `validation.md`.

## Language (mandatory)

- The skill instructions, all templates, and **every generated file** (`AGENTS.md` SDD sections, `validation.md`, `epics.md`, `spec.md`, `plan.md`, `tasks.md`) must be written in **English**.
- Placeholders and filled content (user stories, requirements, tasks, comments) must be English.
- Do not generate Spanish (or other) documentation headings or body text.
- Chat replies to the user may follow the user's language; generated docs stay English.

---

## Mode A — Full setup

Copy this checklist and track progress:

```
SDD full setup:
- [ ] 1. Confirm target project root
- [ ] 2. Create folder tree
- [ ] 3. Write / merge AGENTS.md SDD sections (English)
- [ ] 4. Write documentation/validation.md (English)
- [ ] 5. Write documentation/epics.md (English, empty epic list)
- [ ] 6. Create first spec folder with English templates
- [ ] 7. Reminder: do not implement until open questions are resolved
```

### A1 — Confirm context

Ask only if missing:

| Field | Placeholder meaning |
|-------|---------------------|
| Project name | `{{PROJECT_NAME}}` |
| One-line purpose | `{{PROJECT_PURPOSE}}` |
| First feature | `{{NNN}}` + `{{FEATURE_SLUG}}` (e.g. `001` + `landing-shell`) |
| Stack constraints | `{{STACK}}` (e.g. Vite MPA + Web Components) |
| AGENTS.md exists? | Merge SDD sections; do not wipe unrelated rules |

### A2 — Create folder tree

```
{{PROJECT_ROOT}}/
├── AGENTS.md
└── documentation/
    ├── validation.md
    ├── epics.md
    └── specs/
        └── {{NNN}}-{{FEATURE_SLUG}}/
            ├── spec.md
            ├── plan.md
            └── tasks.md
```

Rules:

- `documentation/` is **not** part of the app build.
- Spec folders: `NNN-kebab-slug` (zero-padded number + short English slug).
- One active feature folder at a time for implementation work.

### A3 — AGENTS.md

If `AGENTS.md` is missing, create a minimal project header + the SDD blocks below.
If it exists, **append or merge** only the SDD Constitution and SDD Rules sections
(and a short Architecture note that SDD is used), without deleting project-specific rules.

Use the full block in [templates/agents-sdd.md](templates/agents-sdd.md).
Replace every `{{PLACEHOLDER}}` with project values.

### A4 — validation.md

Create `documentation/validation.md` from [templates/validation.md](templates/validation.md).
Keep rules numbered and project-specific under Architecture / Style / Content.
Every rule must be checkable after a spec is done.

### A5 — epics.md

Create `documentation/epics.md` from [templates/epics.md](templates/epics.md).
Leave **Epic list** as `No epics yet.` Do not invent an epic during setup.
Epics are optional: SDD still works if this file stays empty.

### A6 — Spec artifacts

Create the first spec folder using the same steps as **Mode B** below.

### A7 — Agent operating rules (remind the user)

After scaffolding, summarize (chat language may match the user; docs remain English):

- Nothing is coded unless it is in the active `spec.md`.
- Missing decisions → stop and ask; no silent guesses.
- Tests green before marking a task done (if the project has tests).
- When a task is marked done, write its elapsed time and token spend on that task (see **Task cost**).
- Validation is requirement-by-requirement against `validation.md`.
- Epics in `documentation/epics.md` are optional. A spec does not need one.
- All SDD documentation files are in English.

---

## Mode B — New spec only

Use when SDD base already exists. Only add one new folder under `documentation/specs/`.

```
New spec only:
- [ ] 1. Verify SDD base exists (AGENTS.md SDD + validation.md + specs/)
- [ ] 2. Pick next {{NNN}} and {{FEATURE_SLUG}}
- [ ] 3. Create documentation/specs/{{NNN}}-{{FEATURE_SLUG}}/{spec,plan,tasks}.md
- [ ] 4. Fill placeholders known from the user; leave the rest + [NEEDS CLARIFICATION]
- [ ] 5. Do not touch AGENTS.md or validation.md
- [ ] 6. If the user assigns this spec to an epic, update documentation/epics.md only
```

### B1 — Verify base

If any of the three base pieces is missing, **do not** invent them silently.
Tell the user what is missing and offer Mode A (full setup) or abort.

### B2 — Numbering and slug

1. List existing folders in `documentation/specs/`.
2. Set `{{NNN}}` to the next free zero-padded number (e.g. after `001-…` → `002`), unless the user gave an explicit number.
3. Set `{{FEATURE_SLUG}}` from the feature name (English kebab-case).
4. **Abort** if `documentation/specs/{{NNN}}-{{FEATURE_SLUG}}/` already exists — do not overwrite.

Ask only if missing: feature title/goal, actors, or anything needed for a usable first draft of `spec.md`.

### B3 — Create files

```
documentation/specs/{{NNN}}-{{FEATURE_SLUG}}/
├── spec.md    ← templates/spec.md
├── plan.md    ← templates/plan.md
└── tasks.md   ← templates/tasks.md
```

| File | Template | Role |
|------|----------|------|
| `spec.md` | [templates/spec.md](templates/spec.md) | Requirements (EARS). Source of truth. |
| `plan.md` | [templates/plan.md](templates/plan.md) | Modules, data, tech decisions, test strategy. |
| `tasks.md` | [templates/tasks.md](templates/tasks.md) | Ordered checkboxes, **Done when** criteria, and a **Cost** line when a task is marked done. |

Replace `{{NNN}}`, `{{FEATURE_TITLE}}`, and any facts the user already provided.
Leave unknown fields as placeholders; add `[NEEDS CLARIFICATION]` where needed.
All headings, body text, and filled placeholders must be **English**.

Optional: leave `plan.md` / `tasks.md` mostly as templates if the user only wants the spec drafted first — still create all three files so the SDD shape stays consistent.

### B4 — Epic membership (only if the user asks)

If the user does not mention an epic, leave `documentation/epics.md` unchanged.
Do not create an epic just because a new spec exists.

If the user says this spec belongs to an epic:

1. Read `documentation/epics.md`. If the file is missing, create it from [templates/epics.md](templates/epics.md) and continue. Do not rewrite `AGENTS.md` or `validation.md` for that.
2. If that epic already exists, append one line under its **Specs** list: `- [ ] \`{{NNN}}-{{FEATURE_SLUG}}\` — {{what this spec contributes}}`. Ask for the contribution sentence if the user did not give one.
3. If that epic does not exist, ask for its name, description, and definition of done before adding the block from the entry shape. Do not invent them.
4. New spec lines always start as `[ ]`.

### B5 — After create

Remind briefly:

1. Resolve open questions in `spec.md` before planning/coding.
2. Then fill `plan.md` → `tasks.md`.
3. Implement one task at a time. When you mark a task done, record its cost (see **Task cost**). Validate with existing `documentation/validation.md`.
4. An epic is optional. Skip it unless the user assigned this spec to one.

---

## Shared: order of work (after docs exist)

1. Fill `spec.md` (resolve open questions first).
2. Clarify with the user if any `[NEEDS CLARIFICATION]` remains.
3. Fill `plan.md`.
4. Fill `tasks.md`.
5. Implement **one task at a time**. When that task meets its **Done when**, mark it `[x]` and write its **Cost** line in the same edit.
6. Walk `validation.md` when the spec is complete.
7. If that spec is listed in `documentation/epics.md`, mark its line `[x]` only after validation passes. Set the epic **Status** to `done` only when every listed spec is `[x]` and the definition of done is met. If the definition of done still fails, leave **Status** as `in progress`.

## Task cost

Write this only when you mark a task `[x]` in `tasks.md`. Put it on the line directly under that task's `Done when:` line. Leave it off tasks that are still `[ ]`.

```markdown
- [x] T1. Add the page header
      Done when: the header matches RF-1.
      Cost: 16 min (2026-10-14 14:02–14:18 +02:00) · 18,400 tokens
```

1. When you **start** the task, note the start time (date, clock time, and timezone). Do not write `Cost` yet.
2. When **Done when** is met, note the end time. Duration is wall-clock time from that start to that end. Write `Nh Nm`, or `Nm Ns` when it is under a minute.
3. **Tokens** are the tokens spent on that task (input + output). If the session shows a running total, subtract the total at task start from the total at task end. If it shows each request, add the requests that belong to this task.
4. Do not invent a token count. If the session does not report usage, write `tokens: not reported`.
5. Do not change the `Cost` line of a task that was already done, unless you are correcting a figure you wrote in the same turn.

## EARS notation (for specs)

| Pattern | Form |
|---------|------|
| Event | WHEN `{{event}}`, THE SYSTEM SHALL `{{response}}` |
| Unwanted | IF `{{undesired_condition}}`, THEN THE SYSTEM SHALL `{{response}}` |
| State | WHILE `{{state}}`, THE SYSTEM SHALL `{{response}}` |
| Ubiquitous | THE SYSTEM SHALL `{{standing_behavior}}` |

Number them `RF-1`, `RF-2`, …

## Do not invent

If the user has not decided stack, actors, or scope, leave placeholders and mark
`[NEEDS CLARIFICATION]` — do not invent product decisions.

## Epics (optional)

An epic groups specs that together deliver one larger capability. Numbers do not have to be consecutive (`006` and `008` can share an epic while `007` belongs to another, or to none).

`documentation/epics.md` is the only epic artifact. Each epic has:

| Field | Meaning |
|-------|---------|
| Name | Short title, heading `## Epic: …` |
| Description | One or two sentences under the heading |
| Definition of done | What is true when the epic is finished |
| Specs | Checkbox list. `[ ]` not done, `[x]` done |

Rules:

- SDD does not require an epic. Mode A creates an empty list. Mode B does not add an epic unless the user assigns the spec to one.
- Do not invent a name, description, or definition of done.
- Do not mark a spec `[x]` in `epics.md` before that spec's own validation passes.
- Do not mark the epic `done` from checkboxes alone. The definition of done must also be met.
- Do not copy epic requirements into a spec. The spec stays the source of truth for behavior.

## Additional resources

- AGENTS SDD block: [templates/agents-sdd.md](templates/agents-sdd.md)
- Epics template: [templates/epics.md](templates/epics.md)
- Spec template: [templates/spec.md](templates/spec.md)
- Plan template: [templates/plan.md](templates/plan.md)
- Tasks template: [templates/tasks.md](templates/tasks.md)
- Validation template: [templates/validation.md](templates/validation.md)
