---
title: "Sub-agents"
description: "Fan work out to named personas with the agent tool, or run them headless with aster run."
---

Inside a turn, the agent can delegate self-contained tasks to sub-agents. Each
starts with a fresh context and reports back; the parent weighs the report
rather than trusting it.

## The roster

| Agent | Role |
| --- | --- |
| `scout` | Read-only recon, fast: where does X live, how does Y work |
| `cartographer` | Read-only architecture mapping: how subsystems connect |
| `sentinel` | Skeptical review; tries to refute a claim before reporting it |
| `forge` | Applies a specific, well-described change to files |
| `scribe` | Writes and updates docs so they match the code |
| `prism` | Synthesis: deduplicates collector reports into one result |

## Custom agents

A directory with an `AGENT.md` is a custom agent: frontmatter (name, tools,
edit permission) plus the system prompt as the body. See `docs/SWARM.md` in the
main repository for the format.

## Limits

Under `agents:` in aster.yaml: `max_concurrent`, `max_per_turn`,
`agent_timeout_secs`, and `collector_model` (the model that synthesizes fan-out
reports).

## Headless runs

```sh
aster run sentinel "review yesterday's commits on main" [--notify] [--cwd DIR] [--schedule NAME]
```

`aster run` executes one agent task and exits, `--notify` sends the result
where the agent's config says to, and `--schedule NAME` attaches the run to a
[schedule](/docs/schedules). `aster run --help` mentions `aster agents`; that
command does not exist, the roster above is the list.
