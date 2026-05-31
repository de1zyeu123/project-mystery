#!/usr/bin/env python3
from __future__ import annotations

import json
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets/generated/life-road-atlas-v2"
RAW_TERRAIN = ASSET_DIR / "00_life_topology_map_v3_soft_terrain_raw.png"
APP_IMAGE = ASSET_DIR / "00_life_topology_map_v3_ai_mapped.png"
SOFT_IMAGE = ASSET_DIR / "00_life_topology_map_v3_ai_mapped_soft.png"
DEBUG_IMAGE = ASSET_DIR / "00_life_topology_map_v3_ai_mapped_soft_debug.png"
SEMANTIC_JSON = ASSET_DIR / "terrain_semantic_map_v3.json"
ROUTE_CONFIG_JSON = ASSET_DIR / "route_story_config_v4.json"
MAPPING_JSON = ASSET_DIR / "topology_node_mapping.json"
MAPPING_JSON_V3 = ASSET_DIR / "topology_node_mapping_v3.json"


ANCHORS = {
    "0": (13, 82),
    "1": (18, 62),
    "2": (34, 78),
    "3": (18, 48),
    "4": (47, 55),
    "5": (48, 84),
    "6": (18, 34),
    "7": (45, 38),
    "8": (62, 48),
    "9": (75, 76),
    "10A": (21, 15),
    "10B": (88, 73),
    "11": (81, 20),
}

TRANSITIONS = {
    "0": ["1", "2"],
    "1": ["3", "4"],
    "2": ["4", "5"],
    "3": ["6", "7"],
    "4": ["7", "8"],
    "5": ["9"],
    "6": ["10A"],
    "7": ["11"],
    "8": ["11"],
    "9": ["10B"],
    "10A": [],
    "10B": [],
    "11": [],
}

PATHS = {
    ("0", "1"): [(13, 82), (12, 72), (15, 67), (18, 62)],
    ("0", "2"): [(13, 82), (20, 80), (27, 78), (34, 78)],
    ("1", "3"): [(18, 62), (17, 56), (17, 51), (18, 48)],
    ("1", "4"): [(18, 62), (27, 58), (38, 56), (47, 55)],
    ("2", "4"): [(34, 78), (38, 69), (42, 60), (47, 55)],
    ("2", "5"): [(34, 78), (39, 82), (44, 84), (48, 84)],
    ("3", "6"): [(18, 48), (17, 42), (17, 37), (18, 34)],
    ("3", "7"): [(18, 48), (27, 43), (36, 40), (45, 38)],
    ("4", "7"): [(47, 55), (47, 49), (46, 43), (45, 38)],
    ("4", "8"): [(47, 55), (53, 52), (58, 50), (62, 48)],
    ("5", "9"): [(48, 84), (57, 82), (67, 78), (75, 76)],
    ("6", "10A"): [(18, 34), (18, 25), (20, 18), (21, 15)],
    ("7", "11"): [(45, 38), (58, 31), (70, 24), (81, 20)],
    ("8", "11"): [(62, 48), (68, 37), (75, 27), (81, 20)],
    ("9", "10B"): [(75, 76), (80, 74), (84, 73), (88, 73)],
}

DOCK_EXCLUSION = [
    {"id": "left_existing_bridge_landing", "bbox": [30, 53, 41, 61]},
    {"id": "lower_right_dock", "bbox": [61, 61, 76, 72]},
]

FORCED_BRIDGE_SPANS = {
    ("0", "1"): [(0.28, 0.68)],
    ("1", "4"): [(0.24, 0.50)],
    ("3", "7"): [(0.18, 0.48)],
}

LADDER_SPANS = {
    ("8", "11"): [(0.46, 0.72)],
    ("5", "9"): [(0.52, 0.82)],
}

STAIR_SPANS = {
    ("3", "6"): [(0.36, 0.68)],
}

ROUTE_STORY = {
    "id": "life_route_story_v4",
    "note": "草图里有两个 10。系统内部拆为 10A/10B；用户侧不显示编号。",
    "initial_choice": ["1", "2"],
    "terminal_nodes": ["10A", "10B", "11"],
    "edges": {
        "0->1": {
            "name": "走捷径",
            "terrain": "过桥入林",
            "mystic_logic": "偏门、食伤、偏财、驿马被引动，适合用小成本试一条非常规路。",
            "plain_copy": "你可以快一步，但要先跨出去。适合试新机会，不适合一次押满。",
            "fit": "适合有突破欲、资源可试错、外部机会明显的人。",
            "avoid": "忌冲动跳槽、重仓投入、没有退路。"
        },
        "0->2": {
            "name": "走平原",
            "terrain": "普通道路",
            "mystic_logic": "正官、正印、土气承接，适合先走常道，把节奏和基本盘稳住。",
            "plain_copy": "这条路慢一点，但更稳。适合先把确定的事做扎实。",
            "fit": "适合需要积累信用、作品、现金流或关系基础的人。",
            "avoid": "忌嫌慢、频繁换方向。"
        },
        "1->3": {
            "name": "深入森林",
            "terrain": "林中冒险路",
            "mystic_logic": "木气生发，食伤打开，适合探索新问题和新场景。",
            "plain_copy": "继续往新路里走，会更有发现，也会更不确定。",
            "fit": "适合创意、产品、内容、创业型尝试。",
            "avoid": "忌信息不足还硬冲。"
        },
        "1->4": {
            "name": "过桥回主路",
            "terrain": "桥接平原",
            "mystic_logic": "偏路转正路，贵人、平台、制度开始承接你的尝试。",
            "plain_copy": "把新机会接回现实。先找平台、合作方或明确规则。",
            "fit": "适合把试验变成稳定项目。",
            "avoid": "忌只讲想法，不落流程。"
        },
        "3->6": {
            "name": "爬小山",
            "terrain": "森林后的上坡",
            "mystic_logic": "官杀成压，印星可化。挑战变大，但能逼出能力。",
            "plain_copy": "会累，但这是练硬本事的一段。适合补技能、拿资格、扛责任。",
            "fit": "适合能持续投入的人。",
            "avoid": "忌半途换题。"
        },
        "6->10A": {
            "name": "翻山收束",
            "terrain": "山顶终点",
            "mystic_logic": "杀印相生时成名，身弱无承接时成耗。结果好坏由算法评分决定。",
            "plain_copy": "挑战到顶，结果会很明确。扛住了就是高位收获，扛不住就是消耗。",
            "fit": "适合压力能转成果的人。",
            "avoid": "忌孤军硬扛。"
        },
        "3->7": {
            "name": "过桥入平原",
            "terrain": "小桥转平路",
            "mystic_logic": "食伤回到官印，探索成果开始落地。",
            "plain_copy": "从冒险回到可执行。适合把灵感变成计划。",
            "fit": "适合找稳定承接和长期路径。",
            "avoid": "忌继续漂着不定。"
        },
        "7->11": {
            "name": "平路到灯塔",
            "terrain": "平稳终点",
            "mystic_logic": "官印财库成局，重在持续、秩序、可信度。",
            "plain_copy": "这条路不刺激，但结果清楚。适合长期积累后稳定成局。",
            "fit": "适合重视安全感和可持续结果的人。",
            "avoid": "忌临门一脚又想改道。"
        },
        "4->7": {
            "name": "沿主路慢走",
            "terrain": "长一点的平原路",
            "mystic_logic": "土气厚、官印顺，慢行反而更稳。",
            "plain_copy": "路长一点，但阻力小。适合稳住主线，逐步放大。",
            "fit": "适合有基本盘但不想冒大险的人。",
            "avoid": "忌急于求快。"
        },
        "4->8": {
            "name": "抄近路上高台",
            "terrain": "快路前的门槛",
            "mystic_logic": "偏财与七杀同动，能提速，但要先过门槛。",
            "plain_copy": "可以快一点，但要补一道硬条件。没有梯子就上不去。",
            "fit": "适合有贵人、资源、资质或清晰机会的人。",
            "avoid": "忌条件没补齐就硬上。"
        },
        "8->11": {
            "name": "爬梯到灯塔",
            "terrain": "梯子上高地",
            "mystic_logic": "门槛位，靠资质、证据、贵人和规则通关。",
            "plain_copy": "先把该补的条件补齐，再上高地。过了这一层，路会变稳。",
            "fit": "适合补证书、补作品、补合作、补背书。",
            "avoid": "忌只凭热情。"
        },
        "2->4": {
            "name": "走向主路",
            "terrain": "平原会合",
            "mystic_logic": "常道入中宫，先稳定再分岔。",
            "plain_copy": "先回到主线，把眼前确定的事走顺。",
            "fit": "适合先求稳定的人。",
            "avoid": "忌把简单路走复杂。"
        },
        "2->5": {
            "name": "贴崖试路",
            "terrain": "悬崖边小路",
            "mystic_logic": "偏财、劫财、驿马动，机会快，但波动也大。",
            "plain_copy": "这条路更快，也更窄。适合小步试，不适合重押。",
            "fit": "适合有风险预算的人。",
            "avoid": "忌借钱冒险、情绪决策。"
        },
        "5->9": {
            "name": "爬梯过坎",
            "terrain": "崖边梯子",
            "mystic_logic": "险中有阶，关键在外部工具和硬条件。",
            "plain_copy": "前面不是平路，要靠工具上去。先补资源、方法和保护。",
            "fit": "适合有明确抓手的人。",
            "avoid": "忌赤手空拳硬爬。"
        },
        "9->10B": {
            "name": "梯后坦途",
            "terrain": "下路终点",
            "mystic_logic": "偏路收束，得失取决于前面风险是否被控制。",
            "plain_copy": "过了最险的一段，后面会平一些。结果看你前面有没有守住边界。",
            "fit": "适合能把风险收口的人。",
            "avoid": "忌赚了还继续加码。"
        }
    }
}


def cubic(p0, p1, p2, p3, steps=160):
    out = []
    for i in range(steps + 1):
        t = i / steps
        mt = 1 - t
        out.append(
            (
                mt**3 * p0[0] + 3 * mt**2 * t * p1[0] + 3 * mt * t**2 * p2[0] + t**3 * p3[0],
                mt**3 * p0[1] + 3 * mt**2 * t * p1[1] + 3 * mt * t**2 * p2[1] + t**3 * p3[1],
            )
        )
    return out


def render():
    base = Image.open(RAW_TERRAIN).convert("RGBA").resize((1254, 1254), Image.Resampling.LANCZOS)
    width, height = base.size
    scale = 3
    rgb = base.convert("RGB")

    def is_water_percent(xp, yp):
        x = max(0, min(width - 1, int(xp * width / 100)))
        y = max(0, min(height - 1, int(yp * height / 100)))
        r, g, b = rgb.getpixel((x, y))
        return b > g + 12 and b > r + 22

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

    def px(point, offset=(0, 0)):
        return ((point[0] / 100 * width + offset[0]) * scale, (point[1] / 100 * height + offset[1]) * scale)

    path_samples = {edge: cubic(*control_points) for edge, control_points in PATHS.items()}
    path_points = {edge: [px(point, offset=(0, 1.2)) for point in points] for edge, points in path_samples.items()}

    def water_spans(points):
        spans = []
        start = None
        count = len(points)
        for index, point in enumerate(points):
            water = is_water_percent(point[0], point[1])
            if water and start is None:
                start = index
            if (not water or index == count - 1) and start is not None:
                end = index - 1 if not water else index
                if end - start >= 9:
                    spans.append((start / (count - 1), end / (count - 1)))
                start = None
        merged = []
        for start, end in spans:
            start = max(0, start - 0.025)
            end = min(1, end + 0.025)
            if merged and start - merged[-1][1] < 0.06:
                merged[-1] = (merged[-1][0], max(merged[-1][1], end))
            else:
                merged.append((round(start, 3), round(end, 3)))
        return merged

    def span_center(edge, span):
        points = path_samples[edge]
        index = int(((span[0] + span[1]) / 2) * (len(points) - 1))
        return points[index]

    def in_bbox(point, bbox):
        return bbox[0] <= point[0] <= bbox[2] and bbox[1] <= point[1] <= bbox[3]

    bridge_spans = {edge: list(spans) for edge, spans in FORCED_BRIDGE_SPANS.items()}

    canvas = base.resize((width * scale, height * scale), Image.Resampling.LANCZOS)

    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    for points in path_points.values():
        shadow_draw.line(points, fill=(72, 48, 31, 28), width=38 * scale, joint="curve")
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=3.2 * scale))
    canvas.alpha_composite(shadow)

    road = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    road_draw = ImageDraw.Draw(road)
    for points in path_points.values():
        road_draw.line(points, fill=(112, 83, 55, 72), width=29 * scale, joint="curve")
    for points in path_points.values():
        road_draw.line(points, fill=(229, 203, 162, 170), width=24 * scale, joint="curve")
    for points in path_points.values():
        road_draw.line(points, fill=(255, 240, 207, 176), width=18 * scale, joint="curve")
    for points in path_points.values():
        road_draw.line(points, fill=(255, 255, 236, 50), width=4 * scale, joint="curve")
    canvas.alpha_composite(road)

    bridge_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    bridge_draw = ImageDraw.Draw(bridge_layer)

    def draw_bridge(edge, span):
        points = path_points[edge]
        start = int(span[0] * (len(points) - 1))
        end = int(span[1] * (len(points) - 1))
        segment = points[start : end + 1]
        if len(segment) < 2:
            return
        bridge_draw.line(segment, fill=(90, 62, 42, 110), width=29 * scale, joint="curve")
        bridge_draw.line(segment, fill=(192, 139, 82, 202), width=23 * scale, joint="curve")
        bridge_draw.line(segment, fill=(231, 181, 113, 202), width=17 * scale, joint="curve")
        step = max(9, int(len(segment) / 5))
        for index in range(step, len(segment) - step, step):
            x, y = segment[index]
            x0, y0 = segment[max(0, index - 2)]
            x1, y1 = segment[min(len(segment) - 1, index + 2)]
            dx, dy = x1 - x0, y1 - y0
            length = math.hypot(dx, dy) or 1
            nx, ny = -dy / length, dx / length
            half = 9 * scale
            bridge_draw.line(
                [(x - nx * half, y - ny * half), (x + nx * half, y + ny * half)],
                fill=(94, 66, 44, 110),
                width=max(1, int(1 * scale)),
            )

    for edge, spans in bridge_spans.items():
        for span in spans:
            draw_bridge(edge, span)
    canvas.alpha_composite(bridge_layer)

    ladder_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ladder_draw = ImageDraw.Draw(ladder_layer)

    def segment_for_span(edge, span):
        points = path_points[edge]
        start = int(span[0] * (len(points) - 1))
        end = int(span[1] * (len(points) - 1))
        return points[start : end + 1]

    def draw_ladder(edge, span):
        segment = segment_for_span(edge, span)
        if len(segment) < 2:
            return
        left = []
        right = []
        for index, (x, y) in enumerate(segment):
            x0, y0 = segment[max(0, index - 2)]
            x1, y1 = segment[min(len(segment) - 1, index + 2)]
            dx, dy = x1 - x0, y1 - y0
            length = math.hypot(dx, dy) or 1
            nx, ny = -dy / length, dx / length
            half = 7 * scale
            left.append((x - nx * half, y - ny * half))
            right.append((x + nx * half, y + ny * half))
        ladder_draw.line(left, fill=(84, 56, 35, 190), width=max(2, int(2 * scale)), joint="curve")
        ladder_draw.line(right, fill=(84, 56, 35, 190), width=max(2, int(2 * scale)), joint="curve")
        step = max(8, int(len(segment) / 7))
        for index in range(step, len(segment) - step, step):
            ladder_draw.line([left[index], right[index]], fill=(221, 159, 83, 230), width=max(2, int(2 * scale)))

    def draw_steps(edge, span):
        segment = segment_for_span(edge, span)
        if len(segment) < 2:
            return
        step = max(7, int(len(segment) / 8))
        for index in range(step, len(segment) - step, step):
            x, y = segment[index]
            x0, y0 = segment[max(0, index - 2)]
            x1, y1 = segment[min(len(segment) - 1, index + 2)]
            dx, dy = x1 - x0, y1 - y0
            length = math.hypot(dx, dy) or 1
            nx, ny = -dy / length, dx / length
            half = 10 * scale
            ladder_draw.line(
                [(x - nx * half, y - ny * half), (x + nx * half, y + ny * half)],
                fill=(118, 92, 61, 150),
                width=max(1, int(1.4 * scale)),
            )

    for edge, spans in LADDER_SPANS.items():
        for span in spans:
            draw_ladder(edge, span)
    for edge, spans in STAIR_SPANS.items():
        for span in spans:
            draw_steps(edge, span)
    canvas.alpha_composite(ladder_layer)

    def ellipse_box(center, r_px, offset=(0, 0)):
        cx, cy = px(center, offset)
        radius = r_px * scale
        return [cx - radius, cy - radius, cx + radius, cy + radius]

    node_shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    node_shadow_draw = ImageDraw.Draw(node_shadow)
    for node_id, center in ANCHORS.items():
        radius = 47 if node_id == "0" else 28
        node_shadow_draw.ellipse(ellipse_box(center, radius + 5, offset=(0, 3)), fill=(62, 43, 31, 36))
    node_shadow = node_shadow.filter(ImageFilter.GaussianBlur(radius=2.2 * scale))
    canvas.alpha_composite(node_shadow)

    node_layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    node_draw = ImageDraw.Draw(node_layer)
    for node_id, center in ANCHORS.items():
        radius = 47 if node_id == "0" else 28
        node_draw.ellipse(ellipse_box(center, radius + 4), fill=(91, 64, 43, 70))
        node_draw.ellipse(ellipse_box(center, radius), fill=(232, 203, 160, 150))
        node_draw.ellipse(
            ellipse_box(center, radius - 6),
            fill=(255, 241, 211, 160),
            outline=(143, 106, 72, 74),
            width=max(1, int(1 * scale)),
        )
        node_draw.arc(
            ellipse_box(center, radius - 10, offset=(-1, -1)),
            205,
            320,
            fill=(255, 255, 239, 80),
            width=max(1, int(1 * scale)),
        )
    canvas.alpha_composite(node_layer)

    final = canvas.resize((width, height), Image.Resampling.LANCZOS).convert("RGB")
    final.save(SOFT_IMAGE, quality=95)
    final.save(APP_IMAGE, quality=95)

    debug = final.convert("RGBA")
    debug_draw = ImageDraw.Draw(debug)
    try:
        from PIL import ImageFont

        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 24)
    except Exception:
        font = None
    debug_labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10A", "10B", "11"]
    for node_id in debug_labels:
        x = ANCHORS[node_id][0] / 100 * width
        y = ANCHORS[node_id][1] / 100 * height
        radius = 17
        debug_draw.ellipse([x - radius, y - radius, x + radius, y + radius], fill=(255, 248, 234, 220), outline=(85, 58, 39, 210), width=3)
        bbox = debug_draw.textbbox((0, 0), node_id, font=font)
        debug_draw.text((x - (bbox[2] - bbox[0]) / 2, y - (bbox[3] - bbox[1]) / 2 - 1), node_id, fill=(69, 43, 28, 255), font=font)
    debug.convert("RGB").save(DEBUG_IMAGE, quality=95)

    node_checks = {node_id: {"x": center[0], "y": center[1], "water_ratio": water_ratio(center)} for node_id, center in ANCHORS.items()}

    semantic = {
        "id": "terrain_semantic_map_v4_story",
        "source_image": RAW_TERRAIN.name,
        "app_image": APP_IMAGE.name,
        "coordinate_system": "normalized_percent",
        "terrain_regions": [
            {"id": "start_plateau", "meaning": "0 起点/当前所在", "bbox": [8, 76, 19, 88]},
            {"id": "shortcut_forest", "meaning": "1/3/6/10A 捷径森林与山地挑战", "bbox": [12, 12, 30, 64]},
            {"id": "central_plain", "meaning": "2/4/7 平原主路与会合", "bbox": [30, 36, 52, 80]},
            {"id": "upper_right_lighthouse", "meaning": "8/11 灯塔高地结果", "bbox": [60, 14, 86, 50]},
            {"id": "lower_right_cliffside", "meaning": "5/9/10B 崖边捷径结果", "bbox": [46, 72, 92, 88]},
        ],
        "water_regions": [
            {"id": "left_channel", "bbox": [16, 26, 36, 72]},
            {"id": "middle_channel", "bbox": [50, 28, 70, 64]},
            {"id": "right_lake", "bbox": [65, 48, 88, 78]},
        ],
        "dock_or_existing_crossings": DOCK_EXCLUSION,
        "land_safe_anchors": node_checks,
        "bridge_policy": "forced story bridges only: 0->1, 1->4, 3->7; dock/ladder routes do not get bridge overlays",
        "bridge_spans": {f"{start}->{end}": spans for (start, end), spans in bridge_spans.items()},
        "ladder_spans": {f"{start}->{end}": spans for (start, end), spans in LADDER_SPANS.items()},
        "stair_spans": {f"{start}->{end}": spans for (start, end), spans in STAIR_SPANS.items()},
    }
    SEMANTIC_JSON.write_text(json.dumps(semantic, ensure_ascii=False, indent=2) + "\n")
    ROUTE_CONFIG_JSON.write_text(json.dumps(ROUTE_STORY, ensure_ascii=False, indent=2) + "\n")

    mapping = {
        "id": "life_road_story_topology_v4",
        "map": {
            "filename": APP_IMAGE.name,
            "soft_preview_filename": SOFT_IMAGE.name,
            "debug_filename": DEBUG_IMAGE.name,
            "terrain_raw": RAW_TERRAIN.name,
            "terrain_semantic_map": SEMANTIC_JSON.name,
            "route_story_config": ROUTE_CONFIG_JSON.name,
            "coordinate_system": "normalized_percent",
            "meaning_source": "fixed_v4_story_topology_anchors",
            "style_source": "user_sketch_plus_ai_terrain_plus_deterministic_story_overlay",
        },
        "rules": {
            "topology_is_fixed_display_skeleton": True,
            "road_layer_is_visual_ground_truth": True,
            "nodes_must_snap_to_road_anchors": True,
            "nodes_must_be_landlocked": True,
            "node_meaning_source": "computed_from_bazi_calendar_scores_and_user_path",
            "llm_can_rewrite_copy_only": True,
            "initial_visible_nodes": ["1", "2"],
            "max_choices_per_step": 2,
            "terminal_nodes": ["10A", "10B", "11"],
            "terminal_regions": {
                "10A": "upper_left_mountain_forest",
                "10B": "lower_right_cliffside",
                "11": "upper_right_lighthouse_plateau",
            },
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
        "road_paths": {
            f"{start}->{end}": {"d": f"M{points[0][0]} {points[0][1]} C{points[1][0]} {points[1][1]} {points[2][0]} {points[2][1]} {points[3][0]} {points[3][1]}"}
            for (start, end), points in PATHS.items()
        },
        "bridge_spans": {f"{start}->{end}": spans for (start, end), spans in bridge_spans.items()},
        "ladder_spans": {f"{start}->{end}": spans for (start, end), spans in LADDER_SPANS.items()},
        "stair_spans": {f"{start}->{end}": spans for (start, end), spans in STAIR_SPANS.items()},
        "validation": {
            "all_nodes_reachable_from_start": True,
            "max_fanout": 2,
            "terminal_node_count": 3,
            "terminal_nodes": ["10A", "10B", "11"],
            "merge_nodes": ["4", "7", "11"],
            "visual_topology_softened": True,
            "max_node_water_ratio": max(check["water_ratio"] for check in node_checks.values()),
        },
    }
    MAPPING_JSON.write_text(json.dumps(mapping, ensure_ascii=False, indent=2) + "\n")
    MAPPING_JSON_V3.write_text(json.dumps(mapping, ensure_ascii=False, indent=2) + "\n")

    print(json.dumps({"app_image": str(APP_IMAGE), "debug_image": str(DEBUG_IMAGE), "semantic": str(SEMANTIC_JSON), "route_config": str(ROUTE_CONFIG_JSON), "max_node_water_ratio": mapping["validation"]["max_node_water_ratio"]}, indent=2))


if __name__ == "__main__":
    render()
