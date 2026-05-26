# Step 1 Review Packet

Date: 2026-05-20

## What We Collected

1. Calculation engine candidates.
2. Validation engine candidates.
3. Benchmark candidate.
4. Competitor benchmark list.
5. User question buckets.
6. Safety-risk buckets.

## Key Decision

Use `MingLi-Bench` as the first internal benchmark candidate.

Reason:
- public GitHub repo
- 160 questions
- 32 cases
- answer key
- chart data
- evaluation code
- MIT license stated

Condition:
- not approved as final authority until source rights are verified.

## Current Source Standard

| Layer | Standard |
|---|---|
| MVP calculation | `lunar` family |
| Calculation validation | `sxtwl`, `cnlunar` |
| Benchmark | `MingLi-Bench` candidate |
| Benchmark method | Starnum-style golden test suite |
| UX reference | 准了, 测测, 问真八字, 文墨天机 |
| Global habit reference | CHANI, Co-Star, The Pattern, Sanctuary |

## User Approval Needed

Approve or change:

1. Use `MingLi-Bench` as first benchmark candidate.
2. Keep MVP logic narrow: daily 运势 + calendar + 干支 + 五行 + 黄历 + basic 八字.
3. Keep Zi Wei Dou Shu as Phase 2.
4. Build internal wiki after source validation.

## Next Step After Approval

Step 1 continuation:
- run engine validation tests
- build source-rights checklist
- create first benchmark scoring rubric

Then Step 2:
- Peter creates rule cards
- Andrew maps data to wiki structure
