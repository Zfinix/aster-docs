---
title: "One-shot CLI"
description: "Same agent, no interactive session."
---

```sh
aster -p "why is this test failing?"
aster review
aster fix --findings-json findings.json --apply
```

Same agent, no interactive session. Plain text out by default when piped,
`--json` for machine-readable output. This is the form scripts and CI use.

See the [CLI reference](/cli) for every flag.
