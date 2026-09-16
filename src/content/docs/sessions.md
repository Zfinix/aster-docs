---
title: "Sessions"
description: "Every chat is saved under ~/.aster. List, resume, rename, prune, and import from other agents."
---

Every chat, ACP thread, and scheduled run is a session under `~/.aster`.
Sessions are what `--continue` and `--resume` reopen, and what `/compact` folds.

```sh
aster sessions [list] [--all]          # this repo, or every project
aster sessions show ID
aster sessions rename ID "title"
aster sessions delete ID
aster sessions prune [--keep N] [--older-than DAYS]   # empties always go
aster sessions import [--from claude|codex|cursor|opencode|hermes] [--dry-run]
```

## Resuming

Inside chat, `/resume` (or `/r`) reopens a saved session. From the shell,
`aster --continue` resumes this repository's latest session and `aster --resume
ID` picks one. `aster --session ID "question"` persists into a named session,
creating it when it does not exist.

## Importing

`aster sessions import --from claude` (also `codex`, `cursor`, `opencode`,
`hermes`) pulls history from another agent's local storage so it is searchable
and resumable here. `--dry-run` reports what it would bring in without writing.

## Housekeeping

`aster sessions prune` deletes empty sessions always, and with `--keep N` or
`--older-than DAYS` trims the rest. `aster sessions delete ID` removes one.
