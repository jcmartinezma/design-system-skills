---
title: Design principles
status: draft
owner: {owner}
update: {date}
---

# Design principles

Decisions for {system-name} on {platforms}. When two options both look acceptable, follow the principle.

## 1. Name the value

Color, space, type, radius, elevation, and motion come from a token.

**Do:** cite `color.action.primary` or `spacing.md` in specs.

**Do not:** paste a hex or a pixel value into a component spec.

## 2. Accessible in the first draft

Keyboard use, a visible focus ring, an accessible name, and contrast are part of the spec, not a later pass.

**Do:** check every theme and state you ship.

**Do not:** remove a focus ring without a token that replaces it.

## 3. One primary action

A view has one main action. Other actions are quieter.

**Do:** use `color.action.primary` once per view.

**Do not:** give every button the same emphasis.

## 4. Reuse before you add

Search components and patterns before designing a new control.

**Do:** extend a spec when the job is the same.

**Do not:** fork a component for a single screen.

## 5. Write the gap down

Unknown decisions go to the decisions backlog.

**Do:** stop and ask when two docs disagree.

**Do not:** fill the hole with a plausible rule.
