---
title: "Review"
description: "Hypothesize, retrieve evidence, verify by refutation. Findings with file, line, severity, and confidence."
---

`aster review` reviews a diff: the current branch, a range, a PR, or stdin.

```sh
aster review                               # current branch
aster review --range main..HEAD
git diff HEAD~1 | aster review --diff -
aster review --pr 42 [--repo owner/repo] [--token T]
aster review --pr 42 --comment [-y]        # post inline PR comments
aster review --tui                         # browse findings
aster review --json                        # data for CI
aster review --stream                      # NDJSON progress for UIs
aster review -i "src/**/*.rs" -x "**/*.lock" --min-confidence 0.6
aster review --no-index                    # faster, less evidence
aster review --effort high
```

## How it works

1. **Hypothesize.** A model reads the diff and forms candidate findings.
2. **Retrieve.** A local symbol index pulls the code around each candidate, so
   the verifier sees context, not just the hunk.
3. **Verify.** A second pass tries to refute each finding. What survives is
   reported; what is refuted is dropped.
4. **Shape.** Findings carry file, line, severity, category, title, suggestion,
   and confidence.

The refutation pass is the point: a finding that cannot be refuted after an
honest attempt is worth your time. `--no-index` skips the symbol index for
speed at the cost of evidence.

## Configuration

Under `review:` in aster.yaml:

| Key | Does |
| --- | --- |
| `model` | The review model; `auto` picks from OpenRouter's live rankings |
| `hypothesis_model`, `verify_model` | Override per stage |
| `base_url` | Custom endpoint |
| `min_confidence` | Drop findings below this (0 to 1) |
| `max_diff_bytes` | Refuse diffs larger than this |
| `analyzers` | `[semgrep, ast-grep]`, run alongside the model pass |
| `astgrep_rules` | Extra ast-grep rule paths |
| `effort` | Reasoning budget for the review |
| `web_search` | Let the review search the web |
| `focus_areas` | Steer attention, e.g. security or error handling |
| `include`, `exclude` | Glob filters over the diff |

`model: auto` tiers with `ASTER_ROUTER_TIER=cheap|balanced|strong`; `aster model
router` shows the current pick. Environment overrides: `ASTER_VERIFY_MODEL`,
`ASTER_HYPOTHESIS_MODEL`, `ASTER_VERIFY_CONCURRENCY`.

## In CI

`--json` prints findings as data; exit code reflects severity, so a plain
`aster review --json` step fails the build on a critical finding. The
`--pr --comment` pair posts findings inline on the PR. See
[Fix](/docs/fix) for consuming the JSON.
