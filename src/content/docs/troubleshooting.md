---
title: "Troubleshooting"
description: "When something fails: what to run first, and where the logs are."
---

## Start here

```sh
aster status                                          # what will run, and from where
tail -5 ~/.aster/logs/provider-errors.jsonl | jq      # every failed provider request
aster config list                                     # each setting and its source
aster mcp list --no-connect                           # servers without spawning them
```

`aster status` answers most "why is it using that model" questions: it prints
the resolved provider, model, mode, and which layer each came from.

## Common failures

**Auth error from the provider.** The key in the environment is missing,
expired, or for the wrong endpoint. `aster key list --all` shows what is set;
`aster login <provider>` or `aster key set VAR` fixes it. A var named for the
endpoint (`OPENROUTER_API_KEY`) beats the shared `ASTER_API_KEY`, so a stale
endpoint-specific var can override a fresh shared one.

**"Command not allowed" in a script.** A permission rule reached `ask` in a
headless run, where nothing can answer. Add an `allow` rule for it, or run with
`--stream` and reply to approvals on stdin. See
[Permissions](/docs/permissions#headless-runs).

**MCP server will not connect.** `aster mcp list --no-connect` shows the config
without spawning. Check the command exists, the env vars it needs are set, and
`disabled` is not true. `/mcp` in chat retries a connection.

**Session will not resume.** `aster sessions list` shows what is on disk;
`aster sessions show ID` prints one. If a session is from another machine,
import it with `aster sessions import --from …`.

**Review finds nothing.** Check `--min-confidence` (try lowering it), the
`include`/`exclude` globs, and `--no-index` to rule out the symbol index.
`aster review --stream` shows the pipeline working stage by stage.

**Model switches mid-session.** That is [mom.yaml](/docs/configuration#mom-yaml-model-routing)
routing by intent. `/mom` shows the current state; `/mom resume` re-arms it
after a manual `/model`.

## Logs

| Path | What |
| --- | --- |
| `~/.aster/logs/provider-errors.jsonl` | Every failed provider request with the raw error |
| `~/.aster/logs/mom-router.jsonl` | Routing decisions |
| `~/.aster/logs/mom-switches.jsonl` | Model switches |

## Still stuck

[Open an issue](https://github.com/Zfinix/aster/issues) with the output of
`aster status` and the relevant lines from `provider-errors.jsonl`. Redact keys
first; the log never contains them, but your shell history might.
