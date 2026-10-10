---
title: Tokens
status: draft
owner: {owner}
update: {date}
---

# Tokens

Values for {system-name} live in `docs/tokens/`. This page explains the layers. It does not duplicate every value.

```
docs/tokens/
├── core/        # Raw values
├── semantic/    # Roles that alias core
├── composite/   # Multi-value styles
└── theme/       # Mode overrides of semantic tokens
    └── dark/
        └── color.semantic.json
```

## Rules

| Layer | Contains | Must not contain |
|---|---|---|
| Core | Hex, px, ms, one font family, curves | Aliases or UI roles |
| Semantic | Roles such as `color.action.primary` | Raw hex or component names |
| Composite | Type, shadow, border, transition | A new palette |
| Theme | Same semantic paths, different aliases | Roles that do not exist in semantic |

Color names follow `color-{element}-{hierarchy}-{state}`. The default state is stored as `$root` and dropped from the public name. `surface` is a container. `action` is a control fill. `icon` is an icon.

Files use DTCG (`$schema`, `$value`, `$type`, `$description`). Aliases look like `{color.neutral.900}`.

## Build

Generate CSS from these files. Do not hand-edit the output.

1. Load the JSON.
2. Resolve aliases. `{color.bg.primary}` matches `color.bg.primary.$root`.
3. Emit variables. Put theme overrides under `[data-theme="dark"]` (or the mode you ship).

Any token tool is fine if it keeps this layer order. Re-validate JSON when values change.

## Related

- [Versioning](../governance/versioning.md)

Add a color guide next to this file when you document contrast. Link it from `docs/README.md`.
