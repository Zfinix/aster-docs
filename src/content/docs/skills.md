---
title: "Skills"
description: "Folders with a SKILL.md that teach Aster a workflow. Install from GitHub, local dirs, or other agents."
---

A skill is a folder with a `SKILL.md`: instructions for one workflow, loaded
when it becomes relevant. Titles are indexed into context; bodies load on
demand, so ten skills cost almost nothing until one matches.

Five core skills ship built in and listed. Eleven more about the agent's own
conduct are internal and never shown. A skill installed under
`<skills root>/internal/<name>/` is internal too. Ten optional skills are
bundled off by default.

## Install

```sh
aster skills add owner/repo            # from GitHub
aster skills add ./dir                 # from a local folder
aster skills add                       # wizard listing skills found on this machine
aster skills find react [--owner org]  # search GitHub, install interactively
aster skills add claude-code           # import from another agent's format
```

Useful flags: `-p` project scope instead of global, `-s name` one skill from a
repo, `--all` everything found, `-y` no prompts, `--force` overwrite.

## Manage

```sh
aster skills list [-p|-g]
aster skills use owner/repo@skill      # print a skill without installing
aster skills bundled [name…] [--force] # list or turn on optional built-ins
aster skills update [name…]
aster skills remove [name…] [--all] [-y]
aster skills init my-skill             # scaffold my-skill/SKILL.md
```

## Using skills

`/skills` in chat lists installed skills and loads one. The agent also loads
skills on its own when a task matches a description. Skills that declare a
command appear as slash commands, for example `/write-tests`.

## Writing your own

`aster skills init my-skill` scaffolds the folder. A `SKILL.md` is frontmatter
(name, description) plus a markdown body of instructions. Keep the description
concrete: it is what the agent matches tasks against. Install it right after
writing with `aster skills add ./my-skill --all --yes --force`.
