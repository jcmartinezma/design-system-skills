---
name: spec-driven-development
description: >-
  Ship a feature with medium SDD: a spec.md with acceptance criteria, a short
  plan.md, optional epics to group related specs, project validation rules,
  one commit per step, and criterion-by-criterion checks. Use when building or
  changing behavior with scope control, or when the work lives under specs/.
---

# Spec-driven development

Medium SDD: one spec per feature and a short plan. The spec says what ships, how it is checked, and what stays untouched. The plan says the steps. The person confirms the plan before any code.

Optional **epics** group several specs into one larger capability or product area. Project **validation** rules in `specs/validation.md` ensure each implemented spec also follows the project's stack, structure, style, and content parameters.

Do not write the `requirements.md`, `design.md`, and `tasks.md` trio. That cycle is long SDD. Here control lives in the acceptance criteria, plan confirmation, and project validation.

Product artifacts live under `specs/` in the repo you are working in:

```
specs/
├── validation.md          # project rules (create once, keep current)
├── epics.md               # optional; create when an epic is needed
└── NNN-short-name/
    ├── spec.md
    └── plan.md
```

This skill's templates are only copied. Do not copy the examples into the product repo.

## When to use it

- The person asks for a feature, a behavior change, or a spec.
- Scope must be written down and validated criterion by criterion.
- Several specs belong to one larger capability or area (epic).
- An already implemented spec needs a tweak, and you must decide whether it fits there or needs a new spec.

Do not use it to stand up a design system from scratch: that is `design-system-architect`. Do not use it only to specify or review a component's accessibility: that is `aria-implementation` or `aria-review`. A fix that does not change behavior and does not fall under any spec is done directly, without opening a spec.

## Flow

Copy [templates/spec.md](templates/spec.md) and [templates/plan.md](templates/plan.md). Do not rewrite the structure from memory. A finished example is in [examples/003-province-filter/](examples/003-province-filter/) and a deprecated spec is in [examples/001-community-filter/spec.md](examples/001-community-filter/spec.md).

### 0. Project files (once)

Before the first **Implemented** status in a repo:

1. If `specs/validation.md` is missing, copy [templates/validation.md](templates/validation.md). Fill every `{PLACEHOLDER}` with a checkable rule for this project. Ask for stack, layout, style, and content rules you do not know. Do not invent product policy.
2. Do not create `specs/epics.md` until the person asks for an epic or assigns a spec to one. When needed, copy [templates/epics.md](templates/epics.md).

`validation.md` is required to close a spec. `epics.md` is optional.

### 1. Spec

The person writes the spec, or you draft it with them. One feature, one `spec.md`.

1. Look at `specs/` (ignore `validation.md` and `epics.md` when numbering). The number is the highest existing plus one, zero-padded to three digits (`001`, `014`). If there is no numbered folder, start at `001`. Do not reuse or renumber.
2. Create `specs/NNN-short-name/spec.md`. The slug is kebab-case, short, with no spaces.
3. Fill the template. Initial status: **Draft**. Today's date (`YYYY-MM-DD`). Remove `Replaces`, `Replaced by`, `Depends on`, and the `## Deprecation reason` section when they do not apply.
4. **Story.** One sentence: As a [user] I want [action] so that [benefit].
5. **Acceptance criteria.** Checklist `- [ ]`, numbered `AC-1`, `AC-2`… Each one is a checkable behavior in Given / When / Then. If a criterion bundles two outcomes, split it.
6. **Technical requirements.** They cover stack, design-system components (`ds-*`), data and APIs, performance, accessibility, and constraints. Empty, error, and loading do not get their own section: if they apply, they are criteria.
7. **Out of scope.** What someone might sneak into the same change and must not be touched. If nothing is nearby, write `None.`.
8. **References.** Link to Figma if it exists, `ds-*` components, and notes. Do not invent a link.
9. Leave **Change log** as `None.` until there is one.
10. If the person assigns this spec to an epic, follow **Epics** below. Do not invent an epic.

Move to **Ready** only when the person says the spec is closed. Until then it stays Draft and can be edited.

### 2. Plan

With the spec in Ready, copy the template to `specs/NNN-short-name/plan.md`.

1. Write 3 to 7 steps. Each step closes one or two criteria, names the files, and fits in one commit. The plan does not add behavior the spec does not have.
2. List the affected files (create or modify).
3. Check impact on earlier specs (rule below) and fill that table. If `specs/` had nothing else, say so in the table.
4. Ask the person before implementing, even if the spec looks complete. Ask only what the spec does not answer:
   - edge cases
   - empty, error, and loading states
   - permissions
   - mobile
   - accessibility
   - an important or ambiguous technical detail (data contract, system component, route, breakpoint)
5. Apply each answer:
   - new checkable behavior → new criterion in the spec
   - something that stays out → out of scope
   - only the how, without changing what ships → technical requirements and the plan step
6. Do not fill in the answer yourself. If they say it does not apply, note that in the row and continue.
7. If the spec changed, update the steps so they still cite the current criteria and show that change before asking for confirmation.
8. Ask for explicit confirmation of the plan. Check the box, set **Confirmed:** yes and move the spec to **In progress**. Criteria accepted during the plan do not send the spec back to Draft.

Do not write code while **Confirmed** is `no`.

### 3. Implementation

1. One commit per plan step, on that spec's branch.
2. The message cites the spec and the criteria the step closes. Form: `feat(003): AC-2 filter by province`. Use `test` if the step only adds the test, `fix` if it corrects a criterion that was failing.
3. Do not combine steps in one commit. Do not jump ahead to the next step.
4. If the code reveals behavior the spec does not cover, stop. Do not sneak it in. Update the spec, adjust the plan, and wait for a new confirmation.

### 4. Validation

Two layers. Both must pass before **Implemented**.

#### 4a. Acceptance criteria

When the steps are done, walk each criterion and try to verify it. Choose the cheapest honest check:

- data or state logic → test or run
- interaction, focus, keyboard, layout, or visual state → browser or Storybook, depending on the repo

Mark `- [x]` only if it passed. Below it, one `Validated:` line with how (test file, command, story, what you did in the browser). If it failed, leave `- [ ]` and write `Pending:` with the reason. If this environment could not open the browser or Storybook, do not mark it: leave what was missing.

#### 4b. Project rules

Open `specs/validation.md`. For every applicable rule, say PASS or FAIL with a short note (file, command, or what you checked). If `validation.md` is still full of placeholders, stop and fill it with the person before closing the spec.

A FAIL keeps the spec **In progress**. Fix the work or update the rule with the person's agreement; do not skip the rule.

When every criterion is `- [x]` and every applicable project rule is PASS, status moves to **Implemented** and the header date moves to today. If that spec is listed in `specs/epics.md`, mark its epic line `[x]` only after this point. Set the epic **Status** to `done` only when every listed spec is `[x]` and the definition of done is met.

## Rules

### Epics (optional)

An epic groups specs that together deliver one larger capability or product area. Numbers do not have to be consecutive (`006` and `008` can share an epic while `007` belongs to another, or to none).

`specs/epics.md` is the only epic artifact. Each epic has a name, a short description, a definition of done, and a checkbox list of specs.

| Field | Meaning |
|---|---|
| Name | Short title, heading `## Epic: …` |
| Description | One or two sentences under the heading |
| Definition of done | What is true when the epic is finished |
| Specs | Checkbox list. `[ ]` not done, `[x]` done |

When the person assigns a spec to an epic:

1. If `specs/epics.md` is missing, create it from [templates/epics.md](templates/epics.md).
2. If that epic exists, append `- [ ] \`NNN-short-name\` — {what this spec contributes}`. Ask for the contribution sentence if missing.
3. If that epic does not exist, ask for name, description, and definition of done before adding the entry block. Do not invent them.
4. New spec lines always start as `[ ]`.

Do not create an epic just because a new spec exists. Do not copy epic requirements into a spec; the spec stays the source of truth for behavior. Do not mark a spec `[x]` in `epics.md` before acceptance criteria and `validation.md` pass. Do not mark the epic `done` from checkboxes alone: the definition of done must also be met.

A filled example is in [examples/epics.md](examples/epics.md).

### Project validation

`specs/validation.md` holds the project's standing rules: completeness, architecture, style, language, and content. Acceptance criteria prove the feature. Project validation proves the change still fits how this repo works.

Keep rules numbered and observable. A reviewer must be able to say PASS or FAIL. Replace template placeholders with real project rules; add or remove numbers as needed. A filled example is in [examples/validation.md](examples/validation.md).

Do not mark **Implemented** while applicable project rules are FAIL or still placeholders.

### Parallel specs

Specs are not a cascade. Several can be implemented at once if they are independent: they do not edit the same files or the same behavior.

Isolate them. One branch, worktree, or cloud agent per spec. Two specs in the same working tree will collide.

If one needs another's result, declare it in the header: `Depends on: NNN`. That one goes after, when the dependency is **Implemented**. Do not start the dependent one in parallel "in the meantime".

### Changes without a new spec

An **Implemented** spec allows tweaks and refactors without a new spec if they stay inside its goal and add no functionality: reorganize files, polish visuals, UX details, performance, cleanup.

Record them in that spec's `## Change log`, one line: date and what changed. A small commit is enough. Another `plan.md` is not required. If the tweak could break a criterion or a project validation rule, re-check what it touches and update the `Validated:` line or the validation notes.

| The change… | Do this |
|---|---|
| Reorganizes files and behavior stays the same | Tweak. One line in the change log. |
| Polishes spacing, color, or hierarchy within the goal | Tweak. One line in the change log. |
| Refines the experience and the criterion stays true | Tweak. One line in the change log. |
| Improves performance or cleans code and the observable result holds | Tweak. One line in the change log. |
| Adds an action, a filter, a data field, a screen, or a state | New spec. |
| Makes an already written criterion stop holding | New spec, and apply the impact rule. |

Quick rule: if someone who already uses the feature would notice a new capability or a different response, it is a new spec. If they would notice the same behavior clearer, faster, or better organized, it is a tweak.

### Impact on earlier specs

Before closing the plan, open the `spec.md` files under `specs/` and look for criteria that talk about the files or behavior you will touch. List them in the plan, including when the action is "none". Do not trust memory for the search.

If a later spec changes another spec's criteria, before moving the new one to **Implemented** do one of these two things:

**(a) Rewrite.** The behavior still exists, but the old criterion no longer tells the truth. Edit the criterion in its original spec, re-validate it, and leave provenance:

```markdown
- [x] **AC-2.** Given {new context}, when {action}, then {new result}.
      Validated: {how, on this pass}.
      Rewritten by 014 on {YYYY-MM-DD}: previously promised {old result}.
```

**(b) Deprecate.** The old spec no longer describes the product because the behavior changed in an important way. Status **Deprecated**, `Replaced by: NNN`, today's date, and a `## Deprecation reason` section. The new spec carries `Replaces: NNN`. Check both links: both specs exist and point at each other. Do not re-validate the old criteria; they no longer apply. If the deprecated spec is listed in an epic, leave its checkbox as historical context or note the replacement in the contribution line; do not uncheck a passed epic solely because of deprecation—update the epic's definition of done with the person if the capability changed. The example is [examples/001-community-filter/spec.md](examples/001-community-filter/spec.md), replaced by [examples/003-province-filter/spec.md](examples/003-province-filter/spec.md).

## What not to do

- Do not create `requirements.md`, `design.md`, or `tasks.md`.
- Do not write code while **Confirmed** is `no`.
- Do not mark `[x]` on a criterion just because you read the code. You need a test, a run, or a browser or Storybook review.
- Do not mark **Implemented** without walking `specs/validation.md`.
- Do not invent epic name, description, or definition of done.
- Do not invent project validation rules; ask and fill `validation.md` with the person.
- Do not open a new spec for a tweak that fits the table above.
- Do not park new functionality in the change log.
- Do not run in parallel two specs that edit the same files.
- Do not chain specs that have no `Depends on`.
- Do not move to **Implemented** a spec that leaves other criteria out of date.
- Do not invent a criterion, out-of-scope item, or Figma link. Propose it and wait.
- Do not deprecate a spec if the new one does not exist or does not say `Replaces`.
- Do not copy this skill's examples into the product repo. Copy the templates.

## When to read each file

| Read it when | File |
|---|---|
| You are about to create the spec | [templates/spec.md](templates/spec.md) |
| You are about to create the plan | [templates/plan.md](templates/plan.md) |
| You need project validation rules, or they are missing | [templates/validation.md](templates/validation.md) |
| You are creating or updating an epic | [templates/epics.md](templates/epics.md) |
| You want an implemented spec, with checked criteria and a change log | [examples/003-province-filter/spec.md](examples/003-province-filter/spec.md) |
| You want the confirmed plan, with questions and impact | [examples/003-province-filter/plan.md](examples/003-province-filter/plan.md) |
| You want a deprecated spec and the reason | [examples/001-community-filter/spec.md](examples/001-community-filter/spec.md) |
| You want a filled project validation file | [examples/validation.md](examples/validation.md) |
| You want a filled epic that groups related specs | [examples/epics.md](examples/epics.md) |
