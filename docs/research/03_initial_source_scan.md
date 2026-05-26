# Initial Source Scan

Status: initial scan. Not approved for production.

## Shortlist

| Area | Candidate | Use | Status |
|---|---|---:|---|
| Calendar / 八字 | `6tail/lunar-python` | Lunar calendar, solar terms, 干支, 黄历, 八字, 五行 | Strong candidate |
| Calendar / frontend | `6tail/lunar-javascript` | Same family, JS implementation | Strong candidate |
| Calendar precision | `skydancep/sxtwl` | 寿星天文历, calendar and solar-term calculation | Validate |
| 黄历 / 八字 | `opn48/cnlunar` | Almanac and 8-character fields | Validate |
| 紫微斗数 | `SylarLong/iztro` | Zi Wei Dou Shu chart generation | Strong candidate for later phase |
| Classical texts | Chinese Text Project | Pre-modern Chinese text corpus | Research source, license review needed |
| Classical texts | Wikisource 周易 | Zhouyi text source | Research source, license review needed |

## Notes

### 6tail/lunar-python

Source: https://github.com/6tail/lunar-python

Observed:
- MIT license.
- Python library.
- Supports lunar calendar, solar terms, 干支, zodiac, 黄历, 彭祖百忌, 吉神方位, 冲煞, 纳音, 星宿, 八字, 五行, 十神.
- GitHub page showed 604 stars and latest release `v1.4.8` on 2025-11-05.

Use:
- MVP backend calculation candidate.

Risk:
- Need regression tests against known 万年历 references.
- Need Peter review of interpretation layer.

### 6tail/lunar-javascript

Source: https://github.com/6tail/lunar-javascript

Observed:
- Same domain as `lunar-python`.
- JavaScript implementation.
- Useful for frontend/serverless proof of concept.

Use:
- Candidate if app stack uses TypeScript.

Risk:
- Need parity check against Python version.

### skydancep/sxtwl

Source: https://github.com/skydancep/sxtwl

Observed:
- C++ implementation of 寿星天文历.
- Exposes bindings for Python and other languages.
- Focuses on calendar and solar-term calculation.

Use:
- Independent validation engine.

Risk:
- Lower product-layer coverage than `lunar-python`.
- Need install and API test.

### opn48/cnlunar

Source: https://github.com/OPN48/cnlunar

Observed:
- Python lunar/almanac package.
- Public docs show lunar conversion and 八字 fields.

Use:
- Secondary validation candidate.

Risk:
- Need license and maintenance check.

### SylarLong/iztro

Source: https://github.com/SylarLong/iztro

Observed:
- MIT license.
- JavaScript library for 紫微斗数 astrolabe generation.
- GitHub page showed 3.7k stars and 614 commits.
- Supports birth date, birth time, gender, 12 palaces, 四柱, 大限, 小限, 流年, 流月, 流日, 流时, 四化, 三方四正.

Use:
- Phase 2 personalization or advanced paid feature.

Risk:
- Interpretation quality is separate from chart generation.
- Peter must approve school assumptions.

### Chinese Text Project

Source: https://ctext.org/

Observed:
- Open-access digital library of pre-modern Chinese texts.
- Site states it has over 30,000 titles and over 5B characters.
- Includes Book of Changes and other classical texts.

Use:
- Research reference.
- Quote/source mapping.

Risk:
- API and reuse rights need legal review.
- Not a direct product calculation engine.

### Wikisource 周易

Source: https://zh.wikisource.org/zh-hant/%E5%91%A8%E6%98%93

Observed:
- Public text source for 周易.

Use:
- Reference for 周易 module.

Risk:
- Need license treatment.
- Need avoid unsupported modern interpretation.

## Initial Architecture Implication

Separate three layers:

1. Calculation engine.
2. Rule and source library.
3. Dialogue generation layer.

The model should not invent the fortune logic. It should read structured calculation output and approved rule cards.

## Next Research Questions

1. Which MVP system is most credible for daily usage?
2. Which library gives the most reliable calendar/BaZi output?
3. Which texts are legally usable for rule cards?
4. Which competitor apps users trust and why?
5. Which claims must be banned?
