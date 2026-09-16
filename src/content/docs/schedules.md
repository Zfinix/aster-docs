---
title: "Schedules"
description: "Cron runs, reminders, and where their output goes."
---

## Schedules

Declare schedules in aster.yaml:

```yaml
schedules:
  - name: nightly-review
    cron: "0 9 * * *"        # five fields, local time
    agent: sentinel
    task: "review yesterday's commits on main"
    notify: true
```

```sh
aster cron install | list | remove NAME | run NAME   # launchd on macOS, cron on Linux
```

`aster cron install` registers a launcher with your system scheduler; the
launcher invokes `aster cron run <name>` at the scheduled time. Each run is a
session like any other, visible in `aster sessions --all`. `notify: true`
sends the result through the agent's notification channel.

## Reminders

```sh
aster remind "stand up" "in 30m"     # or "in 2h", "at 18:00"
```

Reminders are one-shot schedules: the same launcher fires, the message arrives,
nothing else runs.
