---
title: "Memory"
description: "Durable memory in two layers. Project facts always in context, named blocks read on demand."
---

Aster remembers across sessions in two layers:

- **Project memory** is a short list of facts kept in context on every turn.
  Small, always visible, for the things that shape every reply.
- **Named blocks** are longer-lived notes with a title. Only the title and a
  one-line description are listed in context; the agent reads the full body with
  `recall` when it becomes relevant.

The agent writes with `remember`, reads with `recall`, and retracts with
`forget`, all on its own during a turn. You can manage the same store from the
shell:

```sh
aster memory [list]
aster memory add "we deploy from release, never main"
aster memory add "prefers terse replies" --title tone
aster memory show tone
aster memory remove tone
```

## What belongs there

Lasting facts: conventions, preferences, workflow rules, environment quirks.
Not conversation history; sessions already persist, and `/compact` summarizes
them when they grow long.

## In chat

`/memory` prints what Aster remembers in this project, both layers. Ask it to
remember something in plain language and it writes the block itself; correct it
later and it updates or retracts the block.
