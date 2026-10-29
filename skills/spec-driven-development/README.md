# spec-driven-development

Skill for an agent that ships a feature with medium SDD.

A spec says what ships, how you know it is done, and what is out. A short plan says the steps and the files. The agent does not write code until the person confirms that plan. At the end, each acceptance criterion is checked, then the project's validation rules in `specs/validation.md`. Only then does the spec become Implemented.

Optional epics in `specs/epics.md` group several specs into one larger capability or product area.

Nothing to install. The skill is instructions and templates.

## Why medium SDD

Full SDD separates requirements, design, and tasks. It fits when the change is large and many people must align. In day-to-day product work it gets slow: three documents for a filter, a state, or a flow tweak.

The medium mode leaves one `spec.md` per feature and a `plan.md` beside it. Control does not disappear. It still lives in the criteria (Given / When / Then), in the questions before coding, in project validation at close, and optionally in epics that group related specs. What goes away is the document pack that does not change the decision.

## Installation

Copy `skills/spec-driven-development/` into the skills directory your agent reads. Ask for a feature, a behavior change, or to open a spec. It will read `SKILL.md` when it fits.

## How it is used

Artifacts live in the product repo under `specs/`:

```
specs/
├── validation.md       # project rules (once)
├── epics.md            # optional
└── NNN-short-name/
    ├── spec.md
    └── plan.md
```

1. **Project files.** On first use, create `specs/validation.md` from the template and fill the placeholders with this project's rules. Create `specs/epics.md` only when an epic is needed.
2. **Spec.** Write `spec.md`: story, acceptance criteria, technical requirements, out of scope, and references. Status moves from Draft to Ready when you close it. If it belongs to an epic, add it under that epic's Specs list.
3. **Plan.** The agent writes `plan.md` (3 to 7 steps and the files). Before coding it asks about what the spec does not close: edge cases, empty, error, loading, permissions, mobile, accessibility, and ambiguous technical details. If an answer changes scope, it goes into the spec. You confirm the plan and then coding starts.
4. **Implementation.** One commit per step, citing the spec. For example: `feat(003): AC-2 filter by province`.
5. **Validation.** The agent checks each acceptance criterion (test, run, browser, or Storybook), then walks every applicable rule in `specs/validation.md`. Both must pass before status becomes Implemented. If the spec is on an epic, its epic checkbox is marked only after that.

Several specs can run at once if they do not collide on files. Isolate them (one branch, worktree, or cloud agent per spec). If one needs another, declare `Depends on: NNN` and that one waits.

A tweak that adds no functionality (move files, polish visuals, a UX detail, performance, cleanup) does not open a new spec. It is noted in the change log of the spec that already covers that goal. If the change adds behavior or makes a criterion stop holding, it is a new spec.

## What the agent reads

`SKILL.md` is the entry point: the flow, epics, project validation, parallel-spec rules, tweaks, and impact on earlier specs. `templates/` are the files it copies. `examples/` shows an implemented spec, its plan, a deprecated spec, a filled `validation.md`, and a filled `epics.md`.

## Tree

```
spec-driven-development/
├── SKILL.md
├── README.md
├── templates/
│   ├── spec.md
│   ├── plan.md
│   ├── validation.md
│   └── epics.md
└── examples/
    ├── validation.md
    ├── epics.md
    ├── 001-community-filter/
    │   └── spec.md
    └── 003-province-filter/
        ├── spec.md
        └── plan.md
```
