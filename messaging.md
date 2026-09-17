---
title: "Telegram, iMessage, Photon"
description: "Set up each messaging channel and drive the agent from your phone."
---

`aster remote` bridges a messaging channel to the agent, so the agent in your
repository is reachable from your phone. The remote session uses the same
`aster.yaml`, API keys, and permission rules as the terminal on that machine.

Pick one channel:

- **Telegram**: works anywhere, free, only needs a bot token. Long-polling, so
  no public URL, port, or tunnel.
- **iMessage**: free and local, macOS only. Aster reads and sends through
  Messages.app on your Mac.
- **Photon**: bridges iMessage through a Photon agent server with signed
  webhooks, for when you already run Photon.

All three take `--mode`, which sets how much the agent may do without asking:
`manual` (default) asks before every edit and command, `auto` applies your
permission rules without prompting. `plan`, `edit`, and `yolo` are also
accepted. See [Permissions](/permissions).

## Telegram

1. **Create a bot.** Message [@BotFather](https://t.me/BotFather), send
   `/newbot`, and follow the prompts. It gives you a token that looks like
   `123456789:AAH…`.
2. **Start the bridge.** From the repository you want the agent to work in:

   ```sh
   ASTER_TELEGRAM_TOKEN=123456789:AAH… aster remote telegram
   ```

   Or pass the token directly with `--token`.
3. **Allow your account.** Until you allow at least one user, the bridge
   ignores every message. Send your bot any message, then restart with your
   Telegram user id:

   ```sh
   aster remote telegram --token … --user 123456789
   ```

   `--user` is repeatable, or set `ASTER_REMOTE_USERS=123,456` for several.
4. **Message the bot.** Replies stream into the chat as they run. Approval
   prompts arrive as inline buttons you tap. Long output is sent as a document
   instead of flooding the chat.

Notes:

- Transport is long-polling against Telegram. The machine running the bridge
  only makes outbound requests, so nothing to expose.
- One bot token serves one poller. Two processes polling the same token split
  updates randomly, so the bot answers from whichever wins the race.

## iMessage

1. **Grant Full Disk Access.** Aster reads Messages.app's `chat.db` to see
   inbound messages. Give your terminal app Full Disk Access in System
   Settings, Privacy & Security, or the database is unreadable.
2. **Start the bridge.** macOS only. From the repository you want the agent to
   work in:

   ```sh
   aster remote imessage --sender +15551234567
   ```

   `--sender` is an iMessage handle, email or phone, and is repeatable. Or set
   `ASTER_REMOTE_USERS=+15551234567,you@me.com`.
3. **Allow your handle.** With no senders allowed, the bridge ignores every
   message. Message the chat once, then restart with your handle as above.
4. **Message the agent.** Aster polls the chat every few seconds and replies
   through Messages.app as plain texts: no markdown tables or long code
   blocks. Approval prompts arrive as plain questions; you answer
   yes/no/always in text.

## Photon

Photon's macOS agent server watches iMessage and POSTs signed webhooks to
Aster; replies go back through Photon's send API.

1. **Run Photon** and get the webhook signing secret from its dashboard.
2. **Point Photon's webhook at Aster.** The listener binds `127.0.0.1` on port
   `8799` by default, so the webhook URL is
   `http://127.0.0.1:8799` unless you change `--port`.
3. **Start the bridge:**

   ```sh
   aster remote photon --secret <secret> --sender +15551234567
   ```

   Or set `ASTER_PHOTON_SECRET` and `ASTER_REMOTE_USERS` instead of the flags.
4. **Message the agent.** Same plain-text replies and yes/no/always approvals
   as the native iMessage bridge.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `ASTER_TELEGRAM_TOKEN` | Bot token for the Telegram remote |
| `ASTER_PHOTON_SECRET` | Webhook signing secret for the Photon remote |
| `ASTER_REMOTE_USERS` | User ids or senders allowed to talk to Aster, comma separated |

Whoever can message the bot or chat can run the agent with your keys, so
always set `--user` / `--sender` and keep the default `manual` mode until you
trust the setup.
