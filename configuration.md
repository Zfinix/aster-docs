---
title: "Configuration"
description: "The complete aster.yaml reference. Precedence, every section, keys, providers, models, and mom.yaml routing."
---

Configuration is yaml, layered:

```sh
./aster.yaml            # project, wins
~/.aster/aster.yaml     # global
built-in defaults       # lose
```

The project file wins per key, not per section: a key it leaves unset falls
through to the global file, then to defaults. Lists merge instead of
replacing: permission rules, MCP tool filters, and MCP servers union across
both files, the permission mode takes the stricter of the two, and schedules
merge by name so a repo can override one cadence without dropping the rest.
A malformed yaml file is an error, never silently skipped. Precedence for the
things that can also come from elsewhere:

**CLI flags > environment variables > aster.yaml > defaults.**

Keys never live in yaml. They go in `.env` files (`~/.aster/.env` global,
`.env` in the repo local), loaded into the environment at startup.

## Managing from the shell

```sh
aster config                          # form in a terminal, table when piped
aster config list | get KEY | set KEY VALUE [--global|--local] | unset KEY
aster config path | edit [--global|--local]
aster config providers | provider [ID --model M] | models [--capabilities] | model [ID]

aster key list [--all] | get VAR | set VAR [VALUE] [--stdin] [--local] | unset VAR | path

aster provider list
aster provider use openai [--model gpt-5.5]   # endpoint and model together
aster model list [--capabilities] | use ID | recommended
aster model router [--tier cheap|balanced|strong]
```

`aster config list` prints each setting with the layer it came from, which is
the fastest way to answer "why is this value what it is".

## Sections

### Model and endpoint

The model, endpoint, and reasoning effort live under `review:`. The name is
historical; every command reads them, chat included. `aster init`, `aster
model use`, and `aster provider use` all write here.

```yaml
review:
  model: anthropic/claude-sonnet-4.5   # or auto, see below
  base_url: https://openrouter.ai/api/v1
  effort: medium        # off|low|medium|high|xhigh|max|ultra
```

Any OpenAI-compatible endpoint works: point `base_url` at it and set a key var
named for it. A key var named for the endpoint (`ANTHROPIC_API_KEY`,
`OPENROUTER_API_KEY`) beats the shared `ASTER_API_KEY`. `ASTER_MODEL` and
`ASTER_BASE_URL` outrank this file.

`model: auto` picks from OpenRouter's live benchmark rankings instead of a
fixed id (OpenRouter endpoints only). The tier comes from `ASTER_ROUTER_TIER`
(`cheap` | `balanced` | `strong`, default `balanced`), picks are cached for a
day in `~/.aster/model-rankings.json`, and `aster model router` shows what
each tier resolves to.

### `permissions`

See [Permissions](/permissions) for the full language.

```yaml
permissions:
  mode: edit
  allow: ["Bash(cargo test:*)"]
  ask:   ["Bash(git push:*)"]
  deny:  ["Edit(infra/**)"]
  use_default_rules: true
  additional_directories: ["~/Downloads"]
  allow_credentials: ["gh:~/.config/gh"]
```

### `agent`

```yaml
agent:
  max_tool_rounds: 60            # ASTER_MAX_TOOL_ROUNDS
  command_timeout_secs: 300      # ASTER_COMMAND_TIMEOUT
  compact_budget_chars: 192000   # ASTER_COMPACT_BUDGET
  max_output_tokens: 8000        # ASTER_MAX_TOKENS; 0 lifts the cap
  language: English              # ASTER_LANGUAGE; unset follows the user
  learn: true                    # score finished tasks, refine learned skills
```

### `review`

See [Review](/review#configuration) for every key.

### `mcp`

See [MCP servers](/mcp) for the full section.

```yaml
mcp:
  servers: {}
  context_tokens: 100000
  inventory_percent: 1.5
  tools:
    allow: []
    deny: []
```

### `schedules`

See [Schedules](/schedules).

```yaml
schedules:
  - name: nightly-review
    cron: "0 9 * * *"
    agent: sentinel
    task: "review yesterday's commits on main"
    notify: true
```

### `agents`

Sub-agent limits: `max_concurrent`, `max_per_turn`, `agent_timeout_secs`,
`collector_model`. See [Sub-agents](/agents).

### `ui`

```yaml
ui:
  theme: dark          # any built-in or custom theme name
  welcome: true        # session header on launch
```

### `mom`

The switch and the file it reads; the routing policy itself lives in
[mom.yaml](#mom-yaml-model-routing).

```yaml
mom:
  enabled: true        # whether a mom.yaml may route each turn
  manifest: mom.yaml   # which file to read
```

### `providers`

```yaml
providers:
  catalog_url: https://…   # JSON of model ids per provider, pulled by `aster provider refresh`
```

Only model ids travel over this: endpoints and key vars ship in the binary and
are never taken from a fetched file.

### `mom.yaml`: model routing per turn

A `mom.yaml` in the repo root or `~/.aster/` routes each turn to a model by
intent. Entries describe intent (`power`, `thinking`, `prefer`), `switch` rules
fire on conditions like `planning`, `stuck`, `looping`, `model-down`, and a
cheap router judges the rest. Switches show as `mom:` notes in chat.

```sh
aster mom check                 # validate, show what each entry resolves to
aster mom route "refactor the auth module"   # which entry the router would pick
```

Spec: `specs/mom.md` in the main repository. Logs:
`~/.aster/logs/mom-router.jsonl` and `mom-switches.jsonl`.

## Environment variables

See [Environment variables](/env) for the full list. The two that
outrank the yaml file: `ASTER_MODEL` and `ASTER_BASE_URL`, both reported by
`aster status` when set.
