---
title: "Permissions"
description: "Five permission modes and one rule language that gates every edit, read, and command."
---

One setting gates what the agent may write, read, and run. Change it with
`shift+tab` in chat, `--permission-mode` per run, or `permissions.mode` in
aster.yaml.

## The modes

| Mode | Does |
| --- | --- |
| `plan` | Explores and presents a plan. Never edits or runs |
| `manual` | Asks before every edit and command. Needs the TUI or `--stream`; headless runs deny instead |
| `auto` | Edits and runs, pausing on the built-in risky-command list |
| `edit` | Like auto, but commands are trusted; only a rule stops one. **Default** |
| `yolo` | No rules, no sandbox. Asks once before enabling |

No mode allows something a looser one refuses, so stepping up the ladder only
ever adds freedom.

## Rules

`allow`, `ask`, and `deny` hold rules in one language:

| Rule | Matches |
| --- | --- |
| `Edit(<glob>)` | Writing a path |
| `Read(<glob>)` | Reading a path |
| `Bash(<command>:*)` | A command line starting with `<command>` |
| `Bash(<command>)` | That command line exactly |
| `Edit`, `Read`, `Bash` | Everything that tool does |

```yaml
permissions:
  mode: edit
  allow: ["Bash(cargo test:*)", "Edit(src/**)", "Read(**/.env)"]
  ask:   ["Edit(migrations/**)", "Bash(git push:*)"]
  deny:  ["Bash(npm publish:*)", "Edit(infra/**)"]
```

A `Bash` rule is matched against the command line **and every command inside a
shell script it carries**, so `Bash(sudo:*)` still fires on
`bash -lc "cargo build && sudo make install"`. Leading environment assignments
are ignored, a shell nested in a shell is followed a few levels down, and a
prefix ends at a word boundary, so `Bash(rm:*)` does not also match `rmdir`.

## Precedence

1. `deny`
2. `ask`
3. `allow`
4. the built-in rules
5. `mode`

User rules come before the built-ins, so a single `allow` entry overrides one of
them without disabling the rest. To read `.env` files but keep every other
secret protected:

```yaml
permissions:
  allow: ["Read(**/.env)"]
```

## Built-in rules

**Ask before writing**, since anything here runs as code later: `.git/**`,
`**/.git/**`, `.github/workflows/**`, `.husky/**`.

**Ask before running, in every mode but `edit`**: privilege escalation (`sudo`,
`doas`, `su`), destructive filesystem operations (`rm`, `rmdir`, `dd`, `mkfs`,
`shred`), permission and process control (`chmod`, `chown`, `chgrp`, `kill`,
`killall`, `pkill`), system control (`shutdown`, `reboot`, `halt`, `systemctl`,
`launchctl`), and network egress (`curl`, `wget`, `nc`, `ssh`, `scp`, `rsync`).
Pausing on these is the whole difference between `auto` and `edit`; an `ask`
rule of your own fires in `edit` too.

**Refuse to read**, since a secret cannot be taken back out of the model's
context: `**/.env`, `**/.env.*`, `**/*.pem`, `**/*.key`, `**/id_rsa*`,
`**/*.p12`, `**/*.pfx`, `**/credentials.json`, `**/secrets.*`.

`use_default_rules: false` drops all three sets at once.

## Sandbox

Outside yolo, commands run in a sandbox: filesystem writes are limited to the
repository and temp directories, secrets are stripped from the environment, and
the network is reachable with per-domain approval.

Two keys tune the edges:

```yaml
permissions:
  additional_directories: ["~/Downloads"]   # readable outside the repo, no prompt
  allow_credentials: ["gh:~/.config/gh"]    # preauthorize one credential dir for one command
```

The sandbox denies `~/.ssh`, `~/.aws`, `~/.gnupg`, `~/.config/gh`, and
`~/.kube` by default and prompts when a command needs one; an
`allow_credentials` entry skips the prompt for that command-and-directory pair
only. `~/Library/Keychains` is never grantable.

## Headless runs

A prompt needs a front-end that can answer. Headless runs (`-p`, `--json`) have
none, so anything that reaches `ask` is refused there. Pre-approve it with an
`allow` rule, or run with `--stream` and answer approvals on stdin.
