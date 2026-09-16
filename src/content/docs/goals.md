---
title: "Goals"
description: "A slash command that loops turns until a separate judge model agrees the condition is met."
---

`/goal <condition>` in chat sets a target and keeps the turn loop running until
it is met:

```text
/goal all tests pass and clippy is clean
```

After each turn, a separate cheap judge model rules the condition `met`,
`not_yet`, or `impossible`. The worker model never certifies itself; a different
model holds the yardstick. The judge's verdict is shown in the transcript, and
the loop stops on `met` or `impossible`.

`ASTER_GOAL_MAX_TURNS` caps the loop, default 20. `/goal` with no argument
clears the current goal.
