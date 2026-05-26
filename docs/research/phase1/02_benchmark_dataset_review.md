# Benchmark Dataset Review

Date: 2026-05-20

## Conclusion

Use `MingLi-Bench` as the first benchmark candidate.

Do not treat it as final product authority yet.

## MingLi-Bench

Source:
- https://github.com/DestinyLinker/MingLi-Bench
- https://destinylinker.github.io/MingLi-Bench/

Upstream description:
- Benchmark for LLMs on Chinese traditional fortune telling.
- Covers BaZi and Zi Wei Dou Shu.
- Questions are multiple-choice.
- Exact-match scoring.
- Corpus stated as sourced from annual Global Fortune Teller Competition 2022-2025.
- Includes pre-computed BaZi and Zi Wei charts.
- MIT license in repository.

Local copy:
- `data/external/mingli_bench/data.json`
- `data/external/mingli_bench/fortune_api_results.json`

Local stats:

| Metric | Value |
|---|---:|
| Questions | 160 |
| Cases | 32 |
| Pre-computed chart records | 32 |
| Questions with answer | 160 |

Category mix:

| Category | Count |
|---|---:|
| 婚姻 | 44 |
| 事业 | 25 |
| 家庭 | 22 |
| 健康 | 17 |
| 性格 | 14 |
| 财运 | 13 |
| 学业 | 11 |
| 子女 | 6 |
| 外貌 | 3 |
| 运势 | 2 |
| 灾劫 | 2 |
| 官非 | 1 |

## Strengths

- Public code and data.
- Clear exact-match scoring.
- Includes structured birth information.
- Includes pre-computed chart output.
- Covers real user-relevant domains.
- Useful for model-vs-human benchmark.

## Limitations

- Official 2025 competition page was later verified, but direct reuse rights remain unclear.
- Multiple-choice benchmark is not the same as real consultation.
- Health, disaster, legal, marriage, and children categories contain high-risk content.
- Zi Wei and BaZi are mixed; MVP daily app may need narrower tests.
- It tests prediction matching, not emotional support or product experience.

## Decision

Use it for:
- internal model baseline
- reasoning error analysis
- category coverage
- hard question bank

Do not use it for:
- user-facing claims
- marketing claims
- proof of accuracy
- medical, legal, or life-event certainty

## Required Next Checks

Andrew:
- confirm upstream license applies to dataset files
- find official competition source or archive
- identify whether raw sheets have separate rights

Peter:
- review whether questions reflect acceptable metaphysics logic
- mark categories unsuitable for product output

Bill:
- convert the benchmark into product-safe evaluation dimensions
- add tone, usefulness, and safety scoring

## Starnum Benchmark

Source:
- https://starnum.com.tw/benchmark/zh-TW/

Use:
- methodology reference.

Observed:
- 37 fixed chart cases.
- six-dimension scoring.
- public scoring rubric links.
- CC BY 4.0 stated on page.

What we take:
- golden test suite method.
- regression testing after every rule/model update.
- hard-rule verification before narrative generation.

Limitation:
- Direct JSON download returned 403 from local command.
- It is Zi Wei-focused and school-specific.

## Recommended Benchmark Standard

Build two benchmark layers:

1. Hard benchmark:
   - calculation accuracy
   - chart consistency
   - rule match
   - multiple-choice exact match

2. Product benchmark:
   - useful answer
   - safe tone
   - emotional support
   - no fear-based claims
   - clear action suggestion

MVP cannot pass with hard score alone.
