---
title: "Remote control"
description: "Run Aster over Telegram with long-polling. No public URL, approval prompts as buttons."
---

Aster can answer from your Telegram account, so the agent in your repository is
reachable from your phone.

```sh
ASTER_TELEGRAM_TOKEN=… ASTER_REMOTE_USERS=123,456 aster remote telegram [--mode manual]
aster remote telegram --token T --user 123 --mode auto
```

- `ASTER_TELEGRAM_TOKEN` (or `--token`): the bot token from @BotFather.
- `ASTER_REMOTE_USERS` (or `--user`, repeatable): Telegram user ids allowed to
  talk. Anything else is ignored.
- `--mode manual` asks before every edit and command; `auto` applies the
  permission rules without prompting.

Transport is long-polling against Telegram. No public URL, no port, no tunnel;
the machine running `aster remote telegram` only makes outbound requests.
Approval prompts arrive as inline buttons, and long output is sent back as
documents instead of flooding the chat.

## Notes

- One bot token serves one poller. Two processes polling the same token split
  updates randomly.
- The remote session uses the same aster.yaml, keys, and permission rules as
  the terminal on that machine.
