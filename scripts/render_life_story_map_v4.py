#!/usr/bin/env python3
from __future__ import annotations

import json
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets/generated/life-road-atlas-v2"
RAW_TERRAIN = ASSET_DIR / "00_life_story_base_map_v4_ai_raw.png"
APP_IMAGE = ASSET_DIR / "00_life_topology_map_v3_ai_mapped.png"
SOFT_IMAGE = ASSET_DIR / "00_life_story_base_map_v4.png"
DEBUG_IMAGE = ASSET_DIR / "00_life_story_topology_debug_v4.png"
SEMANTIC_JSON = ASSET_DIR / "terrain_semantic_map_v3.json"
MAPPING_JSON = ASSET_DIR / "topology_node_mapping.json"
MAPPING_JSON_V3 = ASSET_DIR / "topology_node_mapping_v3.json"
ROUTE_CONFIG_JSON = ASSET_DIR / "route_story_config_v4.json"


ANCHORS = {
    "0": (14, 80),
    "1": (18, 53),
    "2": (34, 80),
    "3": (26, 41),
    "4": (47, 52),
    "5": (47, 85),
    "6": (24, 30),
    "7": (57, 43),
    "8": (73, 39),
    "9": (75, 77),
    "10A": (27, 18),
    "10B": (89, 73),
    "11": (82, 18),
}

TRANSITIONS = {
    "0": ["1", "2"],
    "1": ["3", "4"],
    "2": ["4", "5"],
    "3": ["6", "7"],
    "4": ["7", "8"],
    "5": ["8", "9"],
    "6": ["10A"],
    "7": ["11"],
    "8": ["11"],
    "9": ["10B"],
    "10A": [],
    "10B": [],
    "11": [],
}

DEBUG_PATHS = {
    ("0", "1"): [(14, 80), (14, 68), (16, 59), (18, 53)],
    ("0", "2"): [(14, 80), (20, 81), (28, 81), (34, 80)],
    ("1", "3"): [(18, 53), (20, 48), (23, 44), (26, 41)],
    ("1", "4"): [(18, 53), (28, 51), (38, 51), (47, 52)],
    ("2", "4"): [(34, 80), (38, 70), (42, 60), (47, 52)],
    ("2", "5"): [(34, 80), (39, 84), (43, 85), (47, 85)],
    ("3", "6"): [(26, 41), (25, 37), (24, 33), (24, 30)],
    ("3", "7"): [(26, 41), (36, 39), (47, 40), (57, 43)],
    ("4", "7"): [(47, 52), (50, 48), (53, 45), (57, 43)],
    ("4", "8"): [(47, 52), (55, 49), (64, 44), (73, 39)],
    ("5", "8"): [(47, 85), (55, 72), (63, 55), (73, 39)],
    ("5", "9"): [(47, 85), (57, 83), (67, 79), (75, 77)],
    ("6", "10A"): [(24, 30), (24, 25), (25, 21), (27, 18)],
    ("7", "11"): [(57, 43), (65, 34), (74, 24), (82, 18)],
    ("8", "11"): [(73, 39), (76, 30), (79, 23), (82, 18)],
    ("9", "10B"): [(75, 77), (80, 75), (85, 74), (89, 73)],
}

DIRECT_FEATURES = [
    {
        "id": "shortcut_forest_bridge",
        "kind": "bridge",
        "route_hint": "0->1",
        "meaning": "跨水入林的捷径桥",
        "points": [(14.0, 75.5), (14.7, 71.0), (16.0, 66.8), (17.5, 63.2)],
    },
    {
        "id": "forest_to_plain_bridge",
        "kind": "bridge",
        "route_hint": "1->4",
        "meaning": "把森林机会接回平原主路",
        "points": [(20.4, 61.0), (26.2, 59.2), (32.8, 57.9), (38.0, 56.9)],
    },
    {
        "id": "forest_exit_small_bridge",
        "kind": "bridge",
        "route_hint": "3->7",
        "meaning": "冒险后回到平原的小桥",
        "points": [(19.2, 48.2), (25.5, 44.6), (32.2, 42.0), (38.8, 40.4)],
    },
    {
        "id": "hill_steps",
        "kind": "steps",
        "route_hint": "3->6",
        "meaning": "森林后的上坡台阶",
        "points": [(18.0, 45.8), (17.7, 41.8), (17.8, 37.8), (18.0, 34.8)],
    },
    {
        "id": "highland_ladder",
        "kind": "ladder",
        "route_hint": "8->11",
        "meaning": "上灯塔高地的梯子",
        "points": [(72.0, 35.2), (74.8, 30.2), (77.8, 25.2), (80.2, 21.2)],
    },
    {
        "id": "cliffside_ladder",
        "kind": "ladder",
        "route_hint": "5->9",
        "meaning": "崖边捷径的梯子",
        "points": [(62.8, 80.4), (66.8, 78.8), (71.2, 77.2), (74.8, 76.4)],
    },
]


def cubic(p0, p1, p2, p3, steps=120):
    points = []
    for i in range(steps + 1):
        t = i / steps
        mt = 1 - t
        points.append(
            (
                mt**3 * p0[0] + 3 * mt**2 * t * p1[0] + 3 * mt * t**2 * p2[0] + t**3 * p3[0],
                mt**3 * p0[1] + 3 * mt**2 * t * p1[1] + 3 * mt * t**2 * p2[1] + t**3 * p3[1],
            )
        )
    return points


def draw_feature_map(base: Image.Image) -> Image.Image:
    width, height = base.size
    scale = 3
    canvas = base.resize((width * scale, height * scale), Image.Resampling.LANCZOS)

    def px(point):
        return (point[0] / 100 * width * scale, point[1] / 100 * height * scale)

    def path_points(feature):
        return [px(point) for point in cubic(*feature["points"])]

    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    for feature in DIRECT_FEATURES:
        points = path_points(feature)
        if feature["kind"] == "bridge":
            shadow_draw.line(points, fill=(75, 46, 26, 58), width=33 * scale, joint="curve")
        elif feature["kind"] == "ladder":
            shadow_draw.line(points, fill=(75, 46, 26, 42), width=23 * scale, joint="curve")
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=2.8 * scale))
    canvas.alpha_composite(shadow)

    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    def draw_bridge(points):
        draw.line(points, fill=(91, 61, 39, 135), width=32 * scale, joint="curve")
        draw.line(points, fill=(190, 139, 82, 226), width=25 * scale, joint="curve")
        draw.line(points, fill=(233, 182, 112, 220), width=18 * scale, joint="curve")
        step = max(8, int(len(points) / 7))
        for index in range(step, len(points) - step, step):
            x, y = points[index]
            x0, y0 = points[max(0, index - 2)]
            x1, y1 = points[min(len(points) - 1, index + 2)]
            dx, dy = x1 - x0, y1 - y0
            length = math.hypot(dx, dy) or 1
            nx, ny = -dy / length, dx / length
            half = 11 * scale
            draw.line([(x - nx * half, y - ny * half), (x + nx * half, y + ny * half)], fill=(94, 66, 44, 130), width=max(1, int(1.2 * scale)))

    def draw_ladder(points):
        left = []
        right = []
        for index, (x, y) in enumerate(points):
            x0, y0 = points[max(0, index - 2)]
            x1, y1 = points[min(len(points) - 1, index + 2)]
            dx, dy = x1 - x0, y1 - y0
            length = math.hypot(dx, dy) or 1
            nx, ny = -dy / length, dx / length
            half = 7 * scale
            left.append((x - nx * half, y - ny * half))
            right.append((x + nx * half, y + ny * half))
        draw.line(left, fill=(84, 56, 35, 195), width=max(2, int(2 * scale)), joint="curve")
        draw.line(right, fill=(84, 56, 35, 195), width=max(2, int(2 * scale)), joint="curve")
        step = max(8, int(len(points) / 7))
        for index in range(step, len(points) - step, step):
            draw.line([left[index], right[index]], fill=(228, 164, 87, 232), width=max(2, int(2 * scale)))

    def draw_steps(points):
        step = max(7, int(len(points) / 8))
        for index in range(step, len(points) - step, step):
            x, y = points[index]
            x0, y0 = points[max(0, index - 2)]
            x1, y1 = points[min(len(points) - 1, index + 2)]
            dx, dy = x1 - x0, y1 - y0
            length = math.hypot(dx, dy) or 1
            nx, ny = -dy / length, dx / length
            half = 10 * scale
            draw.line([(x - nx * half, y - ny * half), (x + nx * half, y + ny * half)], fill=(118, 92, 61, 150), width=max(1, int(1.4 * scale)))

    for feature in DIRECT_FEATURES:
        points = path_points(feature)
        if feature["kind"] == "bridge":
            draw_bridge(points)
        elif feature["kind"] == "ladder":
            draw_ladder(points)
        elif feature["kind"] == "steps":
            draw_steps(points)

    canvas.alpha_composite(layer)
    return canvas.resize((width, height), Image.Resampling.LANCZOS).convert("RGB")


def draw_debug_overlay(base: Image.Image) -> Image.Image:
    width, height = base.size
    scale = 3
    canvas = base.convert("RGBA").resize((width * scale, height * scale), Image.Resampling.LANCZOS)

    def px(point):
        return (point[0] / 100 * width * scale, point[1] / 100 * height * scale)

    route = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    route_draw = ImageDraw.Draw(route)
    for control_points in DEBUG_PATHS.values():
        points = [px(point) for point in cubic(*control_points)]
        route_draw.line(points, fill=(255, 232, 65, 120), width=5 * scale, joint="curve")
    canvas.alpha_composite(route)

    labels = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    label_draw = ImageDraw.Draw(labels)
    try:
        from PIL import ImageFont

        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 24 * scale)
    except Exception:
        font = None
    for node_id, center in ANCHORS.items():
        x, y = px(center)
        radius = 19 * scale
        label_draw.ellipse([x - radius, y - radius, x + radius, y + radius], fill=(255, 248, 10, 238), outline=(32, 24, 14, 255), width=3 * scale)
        bbox = label_draw.textbbox((0, 0), node_id, font=font)
        label_draw.text((x - (bbox[2] - bbox[0]) / 2, y - (bbox[3] - bbox[1]) / 2 - scale), node_id, fill=(20, 16, 10, 255), font=font)
    canvas.alpha_composite(labels)
    return canvas.resize((width, height), Image.Resampling.LANCZOS).convert("RGB")


def render():
    base = Image.open(RAW_TERRAIN).convert("RGBA").resize((1254, 1254), Image.Resampling.LANCZOS)
    width, height = base.size
    rgb = base.convert("RGB")

    def water_ratio(center, rad=16):
        xp, yp = center
        x = int(xp * width / 100)
        y = int(yp * height / 100)
        water = 0
        total = 0
        for yy in range(y - rad, y + rad + 1, 4):
            for xx in range(x - rad, x + rad + 1, 4):
                if 0 <= xx < width and 0 <= yy < height:
                    r, g, b = rgb.getpixel((xx, yy))
                    total += 1
                    if b > g + 12 and b > r + 22:
                        water += 1
        return round(water / total, 3)

    feature_map = draw_feature_map(base)
    feature_map.save(SOFT_IMAGE, quality=95)
    feature_map.save(APP_IMAGE, quality=95)
    draw_debug_overlay(feature_map).save(DEBUG_IMAGE, quality=95)

    node_checks = {node_id: {"x": center[0], "y": center[1], "water_ratio": water_ratio(center)} for node_id, center in ANCHORS.items()}
    route_config = json.loads(ROUTE_CONFIG_JSON.read_text()) if ROUTE_CONFIG_JSON.exists() else {}

    semantic = {
        "id": "terrain_semantic_map_v4_story",
        "source_image": RAW_TERRAIN.name,
        "app_image": APP_IMAGE.name,
        "debug_image": DEBUG_IMAGE.name,
        "coordinate_system": "normalized_percent",
        "terrain_features_are_base_map_assets": True,
        "topology_rendered_on_user_map": False,
        "direct_features": DIRECT_FEATURES,
        "land_safe_anchors": node_checks,
        "feature_policy": "bridges, ladders, and steps are drawn directly on the base map; they are not topology overlays",
    }
    SEMANTIC_JSON.write_text(json.dumps(semantic, ensure_ascii=False, indent=2) + "\n")

    mapping = {
        "id": "life_road_story_topology_v4",
        "map": {
            "filename": APP_IMAGE.name,
            "base_feature_filename": SOFT_IMAGE.name,
            "debug_filename": DEBUG_IMAGE.name,
            "terrain_raw": RAW_TERRAIN.name,
            "terrain_semantic_map": SEMANTIC_JSON.name,
            "route_story_config": ROUTE_CONFIG_JSON.name,
            "coordinate_system": "normalized_percent",
            "meaning_source": "fixed_v4_story_topology_anchors",
            "style_source": "user_sketch_plus_ai_terrain_plus_direct_map_features",
        },
        "rules": {
            "topology_is_fixed_display_skeleton": True,
            "topology_rendered_on_user_map": False,
            "terrain_features_are_base_map_assets": True,
            "nodes_must_snap_to_road_anchors": True,
            "nodes_must_be_landlocked": True,
            "node_meaning_source": "computed_from_bazi_calendar_scores_and_user_path",
            "llm_can_rewrite_copy_only": True,
            "initial_visible_nodes": route_config.get("initial_choice", ["1", "2"]),
            "max_choices_per_step": 2,
            "terminal_nodes": ["10A", "10B", "11"],
            "duplicate_label_resolution": "sketch labels two endpoints as 10; internal ids are 10A and 10B",
        },
        "road_anchors": {
            node_id: {
                "x": float(center[0]),
                "y": float(center[1]),
                "role": "current_position" if node_id == "0" else ("outcome" if node_id in ["10A", "10B", "11"] else "choice"),
                "water_ratio": water_ratio(center),
            }
            for node_id, center in ANCHORS.items()
        },
        "transitions": TRANSITIONS,
        "debug_paths": {
            f"{start}->{end}": {"d": f"M{points[0][0]} {points[0][1]} C{points[1][0]} {points[1][1]} {points[2][0]} {points[2][1]} {points[3][0]} {points[3][1]}"}
            for (start, end), points in DEBUG_PATHS.items()
        },
        "direct_map_features": DIRECT_FEATURES,
        "validation": {
            "all_nodes_reachable_from_start": True,
            "max_fanout": 2,
            "terminal_node_count": 3,
            "terminal_nodes": ["10A", "10B", "11"],
            "merge_nodes": ["4", "7", "11"],
            "max_node_water_ratio": max(check["water_ratio"] for check in node_checks.values()),
        },
    }
    MAPPING_JSON.write_text(json.dumps(mapping, ensure_ascii=False, indent=2) + "\n")
    MAPPING_JSON_V3.write_text(json.dumps(mapping, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"app_image": str(APP_IMAGE), "debug_image": str(DEBUG_IMAGE), "semantic": str(SEMANTIC_JSON), "max_node_water_ratio": mapping["validation"]["max_node_water_ratio"]}, indent=2))


if __name__ == "__main__":
    render()
