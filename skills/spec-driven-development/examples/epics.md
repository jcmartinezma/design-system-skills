> Fictional example. Specs `001` and `003` belong to the same product area. `001` is deprecated; only `003` still counts toward the epic.

# Epics

Epics are optional. Medium SDD does not require this file. Use an epic when several specs together deliver one larger capability or product area. Spec numbers in an epic do not have to be consecutive.

A spec line is marked done here only after that spec's acceptance criteria and `specs/validation.md` have passed. An epic is done only when every listed spec is done and its definition of done is met. A spec in no epic is still specified, planned, and implemented on its own.

## Epic list

## Epic: Workshop discovery

Neighbors can find workshops they can visit by filtering the public list to a useful geographic grain.

**Status:** done

### Definition of done

A visitor can open the workshops list, filter by province, clear the filter, and see an empty state when the province has no workshops. Keyboard use works for the filter control.

### Specs

- [x] `001-community-filter` — first geographic filter (autonomous community); later deprecated
- [x] `003-province-filter` — filter by province, empty state, and keyboard access
