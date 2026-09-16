---
title: "Fix"
description: "Turn review findings into patches, preview them, apply them."
---

`aster fix` consumes review findings and produces patches:

```sh
aster review --json | aster fix                # dry run: preview the patches
aster review --json | aster fix --apply        # write them
aster fix --findings-json findings.json --apply --repo-root .
```

The dry run prints each patch against its finding; `--apply` writes them to the
working tree, where your normal git flow takes over. Findings below the
confidence floor are skipped, and anything it cannot patch cleanly is left for
you with a note.
