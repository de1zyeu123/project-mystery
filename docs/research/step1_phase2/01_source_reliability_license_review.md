# Step 1 Phase 2: Source Reliability and License Review

Date: 2026-05-20

Status: review required.

## Objective

Decide which collected sources can enter the internal wiki.

This phase checks:
- source existence
- source authority
- license
- product-use risk
- benchmark-use risk

## Current Verdict

| Source | Reliability | License | Product Use | Verdict |
|---|---|---|---|---|
| `lunar-python` | high | MIT | calculation engine | approve for test |
| `lunar-javascript` | high | MIT | TypeScript calculation engine | approve for test |
| `sxtwl` | medium-high | BSD on PyPI | validation engine | approve for validation |
| `cnlunar` | medium-high | MIT | validation engine | approve for validation |
| `iztro` | high | MIT | Zi Wei module | approve for Phase 2 only |
| `MingLi-Bench` | medium-high | MIT in repo | internal benchmark | approve with restrictions |
| official Global Fortune Teller Competition page | high existence signal | unclear reuse | source verification only | do not ingest directly yet |
| BaziQA paper | medium-high academic signal | paper license only | benchmark reference | research reference |
| Starnum benchmark | medium method signal | page states CC BY 4.0 | method reference | reference only |

## Benchmark Source Review

### MingLi-Bench

Source:
- https://github.com/DestinyLinker/MingLi-Bench
- https://destinylinker.github.io/MingLi-Bench/

Verified:
- Public GitHub repository.
- MIT license in repository.
- 160 normalized multiple-choice questions.
- 32 cases.
- 32 pre-computed chart records.
- README states corpus comes from annual Global Fortune Teller Competition 2022-2025.
- README states exact-match scoring.
- README states pre-computed Bazi/Ziwei charts can be injected with `--astro`.

Risk:
- MIT license covers repository files, but original competition question rights still need legal review.
- Official competition pages verify existence, but do not clearly grant broad commercial reuse.
- Multiple-choice performance does not equal real consultation quality.

Decision:
- Use internally for evaluation.
- Do not use in marketing.
- Do not expose raw questions in the product.
- Do not train on it until rights are reviewed.

### Official Global Fortune Teller Competition

Source:
- https://hkjfma.org/2025/06/2025%E5%B9%B4%E7%AC%AC%E5%8D%81%E5%85%AD%E5%B1%86-%E5%85%A8%E7%90%83%E7%AE%97%E5%91%BD%E5%B8%AB%E6%AF%94%E8%B3%BD

Verified:
- Official page exists.
- Page title confirms 2025 16th Global Fortune Teller Competition.
- HKJFMA site has older competition pages and question/answer pages in navigation.

Risk:
- The page is not a reusable dataset license.
- Images and question materials may have separate rights.

Decision:
- Use as existence/source verification.
- Do not scrape and redistribute direct material without rights review.

### BaziQA-Benchmark

Source:
- https://arxiv.org/abs/2602.12889

Verified:
- arXiv paper submitted 2026-02-13.
- Paper says benchmark derives from 200 professionally curated multiple-choice problems from Global Fortune-teller Competition 2021-2025.

Use:
- Research reference.
- Confirms the competition corpus is used by other benchmark work.

Risk:
- Paper does not automatically grant rights to use competition data in product.

Decision:
- Add as methodology/reference source.
- Do not rely on it as product data.

## Calculation Engine Review

### `lunar-python`

Verified:
- Installed version: 1.4.8.
- License: MIT.
- Provides lunar calendar, solar terms, GanZhi, BaZi, almanac fields.

Decision:
- Best current MVP backend candidate.

Reason:
- Handles hour-sensitive BaZi fields better than date-only validation calls in boundary smoke tests.

### `lunar-javascript`

Verified:
- npm latest: 1.7.7.
- License: MIT.

Decision:
- Best current TypeScript candidate.

Open point:
- Need JS/Python parity test before selecting final stack.

### `sxtwl`

Verified:
- Installed version: 2.0.7.
- License on PyPI: BSD.
- Provides precise solar-term time data.
- Example: 2024 立春 returned 2024-02-04 16:26:53.

Decision:
- Use for solar-term validation.

Risk:
- Direct `fromSolar()` GanZhi output is date-level, not enough for hour-sensitive birth-chart boundary validation.

### `cnlunar`

Verified:
- Installed version: 0.2.4.
- License: MIT.
- Broad Huangli and almanac coverage.

Decision:
- Use for Huangli and almanac cross-check.

Risk:
- `year8Char="beginningOfSpring"` appears date-level in smoke test, not exact-hour sensitive.

## Approval Recommendation

Approve for next step:
- `lunar-python`
- `lunar-javascript`
- `sxtwl`
- `cnlunar`
- `MingLi-Bench` for internal benchmark only

Hold:
- direct official competition material ingestion
- BaziQA as product data
- Starnum as product data

Reject:
- SEO-style “大师排行榜” as authority

## Required Controls

Before internal wiki ingestion:
- keep source URL
- keep license note
- keep source-use decision
- keep Peter approval status
- mark user-facing allowed / internal-only / rejected
