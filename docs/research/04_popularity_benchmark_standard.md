# Popularity Benchmark Standard

Date: 2026-05-20

Status: proposed standard. User approval required.

## Conclusion

Use popularity as a filter, not as truth.

Our standard:
1. Use popular, maintained engines for calculation.
2. Use professional apps as UX benchmarks.
3. Reject unverifiable master rankings as authority.
4. Require Peter audit before any rule enters product.

## Technical Source Ranking

### Decision

MVP calculation standard:
- Primary: `6tail/lunar-python` or `6tail/lunar-javascript`.
- Cross-check: `sxtwl`.
- Almanac cross-check: `cnlunar`.
- Later Zi Wei Dou Shu module: `iztro`.

### Evidence

| Rank | Source | Popularity Signal | Maintenance Signal | Use |
|---:|---|---:|---|---|
| 1 | `6tail/lunar-javascript` | 1.5k GitHub stars, 264 forks, 22,946 npm downloads last week | MIT, latest GitHub release shown as 2025-11-05 | TypeScript product engine |
| 2 | `iztro` | 3.7k GitHub stars, 595 forks, 9,536 npm downloads last week | MIT, Snyk marks maintenance healthy | Zi Wei Dou Shu later module |
| 3 | `6tail/lunar-python` | 604 GitHub stars, 146 forks, 8,451 PyPI downloads last week | MIT, PyPI latest 1.4.8 on 2025-11-05 | Python backend engine |
| 4 | `sxtwl` | 10,276 PyPI downloads last week | Calendar/solar-term precision focus | Independent calendar validation |
| 5 | `cnlunar` | 666 GitHub stars, 168 forks, 3,148 PyPI downloads last week | MIT, almanac feature depth | 黄历 and 八字 cross-check |
| 6 | `tyme4ts` | 7,484 npm downloads last week | MIT, newer 6tail upgrade path | Watchlist, not MVP default |

### Interpretation

`lunar` family wins MVP because it combines:
- Broad feature coverage.
- Active package distribution.
- MIT license.
- Direct support for daily 运势 primitives.

`sxtwl` has strong PyPI usage but weak GitHub popularity. Treat it as a precision validation engine, not the product-facing rule engine.

`iztro` is the most popular specialized Zi Wei Dou Shu source found. It should define the Zi Wei charting benchmark when that module enters scope.

## Consumer App Benchmarks

### China-facing benchmarks

| App | Evidence | What We Take |
|---|---|---|
| 准了 | App Store CN: 4.7 rating, 8.9万 ratings | Daily habit, emotional framing, AI问答, team/expert positioning |
| 测测 | Google Play: stars / 八字 / AI agents / community / certified experts | Community, emotional support, AI conversation, self-understanding positioning |
| 问真八字 | App Store CN: 4.1 rating, 2203 ratings; reviews highlight professional charting and 古籍 reference | Professional 排盘, traceable knowledge links, tool credibility |
| 文墨天机 | App Store CN: 4.9 rating, 1.8万 ratings | Expert-grade chart UI, multi-school settings, long-term maintenance |

### Global astrology benchmarks

| App | Evidence | What We Take |
|---|---|---|
| CHANI | Rev.now ranks it #1 by estimated revenue; astrology ranking sites rank it high for daily guidance | Daily ritual, reflective guidance, paid content clarity |
| Co-Star | Global app-first brand | Shareable daily insights, social loop |
| The Pattern | Popular psychology-style framing | Non-fear-based emotional language |
| Sanctuary | Live astrologer service | Human expert escalation model |

## Annual Master Ranking Review

Search found yearly or top-list pages for:
- 易学大师.
- 算命大师.
- 风水大师.

Do not use these as product authority.

Reason:
- No auditable methodology.
- Often SEO/media posts.
- No reproducible accuracy test.
- No clear conflict-of-interest disclosure.
- Ranking people does not validate calculation rules.

What we can take:
- Candidate names for Peter to review.
- Common public categories.
- Market language patterns.
- Proof that users value authority signals.

What we must not take:
- Ranking order.
- Claims of accuracy.
- Paid-service claims.
- Fear-based predictions.
- Cure, ritual, or guaranteed outcome claims.

## Product Standard

Every answer must have four layers:

1. Calculation output.
2. Approved rule card.
3. Plain-language explanation.
4. Supportive action advice.

No answer can rely only on LLM generation.

## Benchmark Scorecard

Use this scorecard before a source enters MVP.

| Criterion | Weight | Pass Standard |
|---|---:|---|
| Calculation coverage | 25% | Covers required daily 运势 primitives |
| Popularity | 15% | Strong GitHub, npm, PyPI, or app-store signal |
| Maintenance | 15% | Recent release or active issue handling |
| License | 15% | Commercial use acceptable or legal review passed |
| Cross-checkability | 15% | Can be tested against another engine or known reference |
| Peter approval | 15% | Rule interpretation approved |

Minimum score: 80.

Peter approval is mandatory even if score is above 80.

## Current Standard Choice

Set this as the working standard:

1. Calculation baseline: `lunar` family.
2. Validation baseline: `sxtwl` plus `cnlunar`.
3. Zi Wei benchmark: `iztro`.
4. UX benchmark: 准了 + 测测 + 问真八字 + 文墨天机.
5. Global daily-habit benchmark: CHANI + Co-Star + The Pattern.

## Next Task

Create `Peter_Rule_System_Review.md` with:
- MVP systems.
- Approved rule cards.
- Forbidden claims.
- Test cases.

Create `Andrew_Source_Inventory.csv` with:
- Source.
- URL.
- License.
- Popularity evidence.
- Maintenance evidence.
- Risk.
- Use decision.
