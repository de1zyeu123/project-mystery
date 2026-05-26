# Step 1 Data Collection Status

Date: 2026-05-20

Owner: Andrew.

Status: in progress.

## Objective

Collect the source base for the product.

The source base must support:
- calculation
- rule grounding
- benchmark evaluation
- competitor learning
- user-question inventory

## Current Collection

| Area | Current Source | Local Status | Decision |
|---|---|---|---|
| Calendar / BaZi calculation | `6tail/lunar-python`, `6tail/lunar-javascript` | inventory only | MVP primary candidate |
| Calendar validation | `sxtwl` | inventory only | validation source |
| Almanac validation | `cnlunar` | inventory only | validation source |
| Zi Wei Dou Shu | `iztro` | inventory only | Phase 2 candidate |
| Benchmark | `DestinyLinker/MingLi-Bench` | downloaded locally | candidate benchmark |
| Zi Wei benchmark method | `starnum-bench` | reviewed online only | methodology reference |
| Classical texts | Chinese Text Project, Wikisource 周易 | inventory only | research reference |
| China app benchmark | 准了, 测测, 问真八字, 文墨天机 | inventory only | UX/product reference |
| Global app benchmark | CHANI, Co-Star, The Pattern, Sanctuary | inventory only | UX/product reference |

## Local Data Added

Path:
- `data/external/mingli_bench/`

Files:
- `data.json`
- `fortune_api_results.json`
- `README_zh.md`
- `LICENSE`
- `SOURCE.md`

Observed stats:
- 160 questions.
- 32 cases.
- 32 chart records.
- all 160 questions have answers.

## Review Gate

Before Phase 2 knowledge base:
- Peter confirms MVP metaphysics scope.
- Andrew confirms license and source reliability.
- User approves the source list.

## Current Judgment

Step 1 should continue with three workstreams:

1. Deep-validate calculation engines.
2. Validate benchmark rights and structure.
3. Build competitor and user-question inventory.
