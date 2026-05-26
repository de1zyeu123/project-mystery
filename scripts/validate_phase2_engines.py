#!/usr/bin/env python3
"""Validate candidate metaphysics calculation engines on fixed smoke tests."""

from __future__ import annotations

import json
from datetime import datetime
from importlib import metadata
from pathlib import Path

import cnlunar
import sxtwl
from lunar_python import Solar


TG = "甲乙丙丁戊己庚辛壬癸"
DZ = "子丑寅卯辰巳午未申酉戌亥"


CASES = [
    {
        "case_id": "today_shanghai",
        "datetime": "2026-05-20 17:00",
        "reason": "current project date; normal day; 酉时",
    },
    {
        "case_id": "mingli_case_1",
        "datetime": "1974-04-28 16:40",
        "reason": "MingLi-Bench sample birth time",
    },
    {
        "case_id": "cny_2024",
        "datetime": "2024-02-10 09:00",
        "reason": "Chinese New Year boundary",
    },
    {
        "case_id": "lichun_2024_before",
        "datetime": "2024-02-04 15:00",
        "reason": "立春 date boundary before common afternoon transition",
    },
    {
        "case_id": "millennium",
        "datetime": "2000-01-01 00:30",
        "reason": "子时 and century date smoke test",
    },
]


def pkg_version(name: str) -> str:
    try:
        return metadata.version(name)
    except metadata.PackageNotFoundError:
        return "unknown"


def gz_from_sxtwl(gz: sxtwl.GZ) -> str:
    return TG[gz.tg] + DZ[gz.dz]


def sxtwl_case(dt: datetime) -> dict[str, object]:
    day = sxtwl.fromSolar(dt.year, dt.month, dt.day)
    time_gz = sxtwl.getShiGz(day.getDayGZ().tg, dt.hour)
    return {
        "lunar_year": day.getLunarYear(),
        "lunar_month": day.getLunarMonth(),
        "lunar_day": day.getLunarDay(),
        "is_leap_month": bool(day.isLunarLeap()),
        "year_gz": gz_from_sxtwl(day.getYearGZ()),
        "month_gz": gz_from_sxtwl(day.getMonthGZ()),
        "day_gz": gz_from_sxtwl(day.getDayGZ()),
        "time_gz": gz_from_sxtwl(time_gz),
    }


def lunar_python_case(dt: datetime) -> dict[str, object]:
    solar = Solar.fromYmdHms(dt.year, dt.month, dt.day, dt.hour, dt.minute, 0)
    lunar = solar.getLunar()
    eight_char = lunar.getEightChar()
    return {
        "lunar_text": lunar.toString(),
        "calendar_year_gz": lunar.getYearInGanZhi(),
        "calendar_month_gz": lunar.getMonthInGanZhi(),
        "year_gz": eight_char.getYear(),
        "month_gz": eight_char.getMonth(),
        "day_gz": eight_char.getDay(),
        "time_gz": eight_char.getTime(),
        "jieqi": lunar.getJieQi(),
        "eight_char": eight_char.toString(),
    }


def cnlunar_case(dt: datetime) -> dict[str, object]:
    lunar = cnlunar.Lunar(dt, godType="8char", year8Char="beginningOfSpring")
    return {
        "lunar_year": lunar.lunarYear,
        "lunar_month": lunar.lunarMonth,
        "lunar_day": lunar.lunarDay,
        "year_gz": lunar.year8Char,
        "month_gz": lunar.month8Char,
        "day_gz": lunar.day8Char,
        "time_gz": lunar.twohour8Char,
        "today_solar_terms": lunar.todaySolarTerms,
        "next_solar_term": lunar.nextSolarTerm,
    }


def compare_gz(row: dict[str, object]) -> dict[str, bool]:
    keys = ["year_gz", "month_gz", "day_gz", "time_gz"]
    output = {}
    for key in keys:
        values = {
            "lunar_python": row["lunar_python"].get(key),
            "sxtwl": row["sxtwl"].get(key),
            "cnlunar": row["cnlunar"].get(key),
        }
        output[key] = len(set(values.values())) == 1
    return output


def main() -> None:
    rows = []
    for case in CASES:
        dt = datetime.strptime(case["datetime"], "%Y-%m-%d %H:%M")
        row = {
            **case,
            "lunar_python": lunar_python_case(dt),
            "sxtwl": sxtwl_case(dt),
            "cnlunar": cnlunar_case(dt),
        }
        row["gz_consistency"] = compare_gz(row)
        rows.append(row)

    report = {
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "packages": {
            "lunar-python": pkg_version("lunar-python"),
            "sxtwl": pkg_version("sxtwl"),
            "cnlunar": pkg_version("cnlunar"),
        },
        "cases": rows,
        "summary": {
            "case_count": len(rows),
            "all_gz_consistent": all(
                all(case["gz_consistency"].values()) for case in rows
            ),
        },
    }
    out = Path("data/validation/phase2_engine_validation.json")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(report["summary"], ensure_ascii=False))
    print(out)


if __name__ == "__main__":
    main()
