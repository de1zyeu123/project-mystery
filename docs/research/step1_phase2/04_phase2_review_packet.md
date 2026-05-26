# Step 1 Phase 2 Review Packet

Date: 2026-05-20

## What Was Done

1. Verified source and license signals.
2. Confirmed official competition page existence.
3. Re-tested `MingLi-Bench` benchmark structure.
4. Installed and smoke-tested calculation engines.
5. Found one critical solar-term boundary issue.
6. Created source reliability audit.

## Main Decision

Approve `lunar-python` as the current BaZi calculation baseline.

Reason:
- MIT.
- installed and tested.
- matches other engines on normal cases.
- handles exact solar-term boundary better in smoke test.

## Benchmark Decision

Approve `MingLi-Bench` for internal evaluation only.

Allowed:
- model baseline testing
- reasoning error analysis
- benchmark category design
- scoring-rubric design

Not allowed yet:
- marketing claim
- raw question publication
- product content
- model training

Reason:
- repo is MIT, but original competition-question rights still need review.

## Key Risk

立春 boundary logic is product-critical.

At 2024-02-04 15:00:
- exact 立春 time from `sxtwl`: 16:26:53
- `lunar-python` did not switch pillars before 16:26
- `sxtwl.fromSolar()` and `cnlunar` tested output switched by date

Decision:
- personal BaZi must use exact solar-term time
- date-level engine output cannot be final authority for birth-chart calculation

## Approval Needed

Approve or change:

1. `lunar-python` as MVP backend baseline.
2. `sxtwl` as solar-term validation source.
3. `cnlunar` as Huangli/almanac validation source.
4. `MingLi-Bench` as internal-only benchmark.
5. Boundary-test requirement before Step 2 wiki ingestion.

## Next Step

Step 1 Phase 3:
- build the benchmark scoring rubric
- create benchmark split: hard reasoning vs product answer quality
- prepare Peter rule-card template
- define internal wiki schema

Then Step 2 can start.
