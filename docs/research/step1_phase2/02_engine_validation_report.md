# Step 1 Phase 2: Engine Validation Report

Date: 2026-05-20

Status: smoke test complete.

## Objective

Check whether candidate engines produce consistent basic outputs.

Tested engines:
- `lunar-python` 1.4.8
- `sxtwl` 2.0.7
- `cnlunar` 0.2.4

Validation output:
- `data/validation/phase2_engine_validation.json`

Validation script:
- `scripts/validate_phase2_engines.py`

## Test Cases

| Case | Date Time | Reason |
|---|---|---|
| `today_shanghai` | 2026-05-20 17:00 | current project date |
| `mingli_case_1` | 1974-04-28 16:40 | MingLi-Bench sample |
| `cny_2024` | 2024-02-10 09:00 | Chinese New Year boundary |
| `lichun_2024_before` | 2024-02-04 15:00 | solar-term boundary |
| `millennium` | 2000-01-01 00:30 | Zi hour and century smoke test |

## Result

| Case | Year Pillar | Month Pillar | Day Pillar | Hour Pillar | Result |
|---|---|---|---|---|---|
| `today_shanghai` | match | match | match | match | pass |
| `mingli_case_1` | match | match | match | match | pass |
| `cny_2024` | match | match | match | match | pass |
| `lichun_2024_before` | mismatch | mismatch | match | match | boundary issue |
| `millennium` | match | match | match | match | pass |

## Key Finding

The only mismatch is 2024-02-04 15:00, before the exact 立春 time.

Observed:
- `lunar-python`: 癸卯 乙丑 戊戌 庚申
- `sxtwl`: 甲辰 丙寅 戊戌 庚申
- `cnlunar`: 甲辰 丙寅 戊戌 庚申

Interpretation:
- `lunar-python` BaZi output uses exact solar-term time.
- `sxtwl.fromSolar()` and `cnlunar` tested path behave at date-level for this pillar boundary.
- `sxtwl` can still provide precise solar-term time separately.

Independent solar-term check:
- `sxtwl.getJieQiByYear(2024)` returned 立春 at 2024-02-04 16:26:53.

Therefore:
- At 2024-02-04 15:00, a strict hour-sensitive BaZi engine should not yet switch year/month pillars.

## Decision

Use `lunar-python` as the first BaZi calculation baseline.

Use `sxtwl` for:
- solar-term time validation
- independent calendar cross-check

Use `cnlunar` for:
- Huangli/almanac cross-check
- non-boundary sanity checks

Do not use date-level GanZhi output as final birth-chart authority.

## Required Next Tests

Before MVP build:
- 24 solar-term boundary tests.
- Chinese New Year boundary tests.
- Zi hour day-boundary tests.
- timezone/location normalization tests.
- JS/Python parity tests for `lunar` family.
- comparison against at least one professional 排盘 reference selected by Peter.

## Product Implication

Birth-chart onboarding must collect:
- birth date
- birth time
- birthplace
- timezone
- calendar type
- uncertainty flag if birth time is unknown

Daily fortune can tolerate date-level logic.

Personal BaZi cannot.
