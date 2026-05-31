import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ATLAS_DIR = join(ROOT, "assets/generated/life-road-atlas-v2");
const TOPOLOGY_PATH = join(ATLAS_DIR, "topology_blueprint_from_user_v2.json");
const STORY_PATH = join(ATLAS_DIR, "route_story_config_v5.json");
const OUT_PATH = join(ATLAS_DIR, "00_life_story_base_map_v12.svg");
const SOURCE_PATH = join(ATLAS_DIR, "00_life_story_base_map_v12.source.txt");

const topology = JSON.parse(await readFile(TOPOLOGY_PATH, "utf8"));
const story = JSON.parse(await readFile(STORY_PATH, "utf8"));

const PATHS = {
  "0->1": "M136 762 C146 690 164 632 180 574",
  "0->2": "M136 762 C227 731 324 692 414 665",
  "1->3": "M180 574 C162 528 150 480 136 437",
  "1->4": "M180 574 C266 560 360 549 448 542",
  "3->6": "M136 437 C145 390 155 346 166 309",
  "6->10": "M166 309 C181 247 198 188 212 133",
  "3->7": "M136 437 C236 411 351 384 447 360",
  "7->11": "M447 360 C568 304 681 243 778 190",
  "4->7": "M448 542 C448 484 448 420 447 360",
  "4->8": "M448 542 C499 506 553 472 609 444",
  "8->11": "M609 444 C667 351 727 250 778 190",
  "2->4": "M414 665 C430 620 441 579 448 542",
  "2->5": "M414 665 C451 724 489 785 545 831",
  "5->8": "M545 831 C562 688 588 552 609 444",
  "5->9": "M545 831 C610 793 680 759 744 728",
  "9->12": "M744 728 C790 720 840 716 879 718"
};

const BRIDGES = new Set(["0->1", "1->3", "1->4", "3->7"]);
const STAIRS = new Set(["3->6", "8->11", "5->9"]);
const NODES = topology.nodes;
const EDGE_IDS = topology.edges.map((edge) => edge.id);
const FORBIDDEN_EDGE_IDS = new Set(topology.forbidden_edges.map((edge) => edge.id));

for (const edgeId of EDGE_IDS) {
  if (!PATHS[edgeId]) {
    throw new Error(`Missing SVG path for topology edge ${edgeId}`);
  }
  if (!story.edges[edgeId]) {
    throw new Error(`Missing V5 route story for topology edge ${edgeId}`);
  }
}

for (const edgeId of Object.keys(PATHS)) {
  if (!EDGE_IDS.includes(edgeId)) {
    throw new Error(`SVG path is not in topology edge list: ${edgeId}`);
  }
  if (FORBIDDEN_EDGE_IDS.has(edgeId)) {
    throw new Error(`Forbidden edge must not be rendered: ${edgeId}`);
  }
}

function node(id) {
  return NODES[id];
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;"
  })[char]);
}

function road(edgeId, d) {
  const type = BRIDGES.has(edgeId) ? "bridge" : STAIRS.has(edgeId) ? "stairs" : "road";
  const route = story.edges[edgeId];
  const attrs = `data-edge="${esc(edgeId)}" data-route-name="${esc(route.name)}" data-route-terrain="${esc(route.terrain)}"`;
  if (type === "bridge") {
    return `
      <g ${attrs} class="route bridge-route">
        <path class="bridge-base" d="${d}"/>
        <path class="bridge-top" d="${d}"/>
        <path class="bridge-rail-left" d="${d}"/>
        <path class="bridge-rail-right" d="${d}"/>
      </g>`;
  }
  if (type === "stairs") {
    return `
      <g ${attrs} class="route stair-route">
        <path class="road-base" d="${d}"/>
        <path class="stair-top" d="${d}"/>
        <path class="stair-lines" d="${d}"/>
      </g>`;
  }
  return `
    <g ${attrs} class="route road-route">
      <path class="road-base" d="${d}"/>
      <path class="road-top" d="${d}"/>
      <path class="road-tile-lines" d="${d}"/>
    </g>`;
}

function pad(id, opts = {}) {
  const point = node(id);
  const role = point.role;
  const rx = opts.rx || (role === "start" ? 66 : role === "terminal" ? 50 : 44);
  const ry = opts.ry || (role === "start" ? 38 : role === "terminal" ? 29 : 25);
  return `
    <g class="node-pad node-${esc(id)}" data-node="${esc(id)}" transform="translate(${point.x} ${point.y})">
      <ellipse class="pad-side" cx="0" cy="12" rx="${rx}" ry="${ry}"/>
      <ellipse class="pad-top" cx="0" cy="0" rx="${rx}" ry="${ry}"/>
      <ellipse class="pad-ring" cx="0" cy="0" rx="${Math.round(rx * 0.7)}" ry="${Math.round(ry * 0.63)}"/>
      <path class="pad-shine" d="M${-Math.round(rx * 0.42)} ${-Math.round(ry * 0.22)} C${-Math.round(rx * 0.16)} ${-Math.round(ry * 0.54)} ${Math.round(rx * 0.25)} ${-Math.round(ry * 0.5)} ${Math.round(rx * 0.46)} ${-Math.round(ry * 0.12)}"/>
    </g>`;
}

function tree(x, y, scale = 1, color = "pine") {
  const leaf = color === "round" ? "tree-round" : "tree-pine";
  return `
    <g class="tree" transform="translate(${x} ${y}) scale(${scale})">
      <rect class="tree-trunk" x="-4" y="13" width="8" height="18" rx="2"/>
      <path class="${leaf}" d="M0 -26 C16 -18 21 -5 13 7 C24 14 15 27 0 24 C-15 27 -24 14 -13 7 C-21 -5 -16 -18 0 -26Z"/>
    </g>`;
}

function rock(x, y, scale = 1) {
  return `<ellipse class="rock" cx="${x}" cy="${y}" rx="${18 * scale}" ry="${13 * scale}"/>`;
}

function flowers(x, y) {
  return `
    <g class="flowers" transform="translate(${x} ${y})">
      <circle class="flower-p" cx="-8" cy="0" r="5"/>
      <circle class="flower-y" cx="5" cy="-4" r="5"/>
      <circle class="flower-w" cx="9" cy="8" r="4"/>
    </g>`;
}

function island(name, d, dx = 0, dy = 18) {
  return `
    <g class="island island-${name}">
      <path class="island-side" transform="translate(${dx} ${dy})" d="${d}"/>
      <path class="island-top" d="${d}"/>
    </g>`;
}

const islands = [
  island("forest", "M78 223C70 148 136 78 226 82C315 86 356 141 341 208C391 240 373 317 315 340C320 394 281 448 216 459C229 520 206 591 141 617C79 643 26 602 40 536C12 493 35 431 84 403C54 342 48 280 78 223Z"),
  island("start", "M72 720C32 650 58 586 126 564C198 542 261 575 277 640C335 652 365 717 335 772C304 831 221 855 146 826C96 807 63 767 72 720Z"),
  island("center", "M330 318C390 241 499 207 593 244C677 277 711 373 666 450C722 525 684 633 592 669C506 702 409 666 381 581C310 553 288 381 330 318Z"),
  island("lower", "M413 742C397 675 443 622 512 615C584 608 646 653 657 724C671 802 617 863 537 864C468 865 424 812 413 742Z"),
  island("rightHigh", "M623 362C644 294 706 240 782 236C878 232 942 292 946 383C950 469 892 533 806 537C722 541 620 480 623 362Z"),
  island("rightLow", "M644 686C662 609 735 562 815 577C909 595 946 679 908 759C872 833 772 852 702 809C659 782 633 736 644 686Z")
].join("\n");

const roadLayer = topology.edges
  .map((edge) => road(edge.id, PATHS[edge.id]))
  .join("\n");

const pads = Object.keys(NODES).map((id) => pad(id)).join("\n");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 982 966" width="982" height="966" role="img" aria-label="Project Mystery life road base map">
  <defs>
    <linearGradient id="waterGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#72d4f7"/>
      <stop offset="0.55" stop-color="#26a9df"/>
      <stop offset="1" stop-color="#137eb5"/>
    </linearGradient>
    <linearGradient id="grassGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b8dc58"/>
      <stop offset="1" stop-color="#78ad34"/>
    </linearGradient>
    <linearGradient id="sideGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#bd8240"/>
      <stop offset="1" stop-color="#755026"/>
    </linearGradient>
    <linearGradient id="stoneGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe6b7"/>
      <stop offset="1" stop-color="#e1b36d"/>
    </linearGradient>
    <pattern id="grassSpeckles" width="36" height="36" patternUnits="userSpaceOnUse">
      <circle cx="6" cy="8" r="1.8" fill="rgba(255,255,255,0.34)"/>
      <circle cx="24" cy="12" r="1.5" fill="rgba(86,127,37,0.32)"/>
      <path d="M12 26c5-4 9-4 13 0" fill="none" stroke="rgba(86,127,37,0.28)" stroke-width="2" stroke-linecap="round"/>
    </pattern>
    <filter id="mapShadow" x="-12%" y="-12%" width="124%" height="124%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#5f421f" flood-opacity="0.24"/>
    </filter>
    <style>
      .bg { fill: #f8edcf; }
      .water { fill: url(#waterGradient); }
      .ripple { fill: none; stroke: rgba(255,255,255,0.38); stroke-width: 2; stroke-linecap: round; }
      .island-side { fill: url(#sideGradient); stroke: #6f431f; stroke-width: 3; }
      .island-top { fill: url(#grassGradient); stroke: #557b27; stroke-width: 3; filter: url(#mapShadow); }
      .island-top + .grass-texture, .grass-texture { fill: url(#grassSpeckles); opacity: 0.9; }
      .road-base { fill: none; stroke: #9c672e; stroke-width: 35; stroke-linecap: round; stroke-linejoin: round; opacity: 0.82; }
      .road-top { fill: none; stroke: url(#stoneGradient); stroke-width: 25; stroke-linecap: round; stroke-linejoin: round; }
      .road-tile-lines { fill: none; stroke: rgba(255,255,255,0.45); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 7 17; }
      .bridge-base { fill: none; stroke: #6d411d; stroke-width: 38; stroke-linecap: round; stroke-linejoin: round; }
      .bridge-top { fill: none; stroke: #bf7b34; stroke-width: 28; stroke-linecap: round; stroke-linejoin: round; }
      .bridge-rail-left, .bridge-rail-right { fill: none; stroke: #563317; stroke-width: 4; stroke-linecap: round; stroke-dasharray: 8 13; }
      .bridge-rail-left { opacity: 0.85; }
      .bridge-rail-right { opacity: 0.55; stroke-width: 3; }
      .stair-top { fill: none; stroke: url(#stoneGradient); stroke-width: 24; stroke-linecap: round; stroke-linejoin: round; }
      .stair-lines { fill: none; stroke: #a46e32; stroke-width: 6; stroke-linecap: butt; stroke-dasharray: 4 17; }
      .pad-side { fill: #ad7433; opacity: 0.74; }
      .pad-top { fill: url(#stoneGradient); stroke: #986630; stroke-width: 3; }
      .pad-ring { fill: none; stroke: rgba(145,94,41,0.35); stroke-width: 3; }
      .pad-shine { fill: none; stroke: rgba(255,255,255,0.55); stroke-width: 4; stroke-linecap: round; }
      .terminal-lighthouse { fill: #f7e6c8; stroke: #96652f; stroke-width: 3; }
      .lighthouse-red { fill: #db5634; }
      .star { fill: #ffd54f; stroke: #a17122; stroke-width: 3; }
      .mountain { fill: #718c96; stroke: #405761; stroke-width: 3; }
      .snow { fill: #f7f2e6; }
      .tree-trunk { fill: #8d5b2d; }
      .tree-pine { fill: #2a8b62; stroke: #1d6647; stroke-width: 2; }
      .tree-round { fill: #88b933; stroke: #5f8325; stroke-width: 2; }
      .rock { fill: #b8b09a; stroke: #827a68; stroke-width: 2; }
      .flower-p { fill: #ed7e9a; }
      .flower-y { fill: #f2c94c; }
      .flower-w { fill: #f9f1d9; }
    </style>
  </defs>

  <rect class="bg" width="982" height="966"/>
  <path class="water" d="M40 198C96 143 171 119 254 130C340 142 384 188 398 247C451 211 532 204 590 231C639 254 665 299 658 347C718 306 813 309 884 361C957 414 955 508 914 568C956 642 936 746 856 794C792 832 729 825 683 794C640 873 544 905 466 866C415 841 384 792 373 739C317 794 232 813 163 780C75 738 45 642 84 565C38 517 8 436 33 356C46 315 70 285 100 264C59 247 41 226 40 198Z"/>
  <path class="ripple" d="M79 256C152 226 225 233 288 266"/>
  <path class="ripple" d="M492 261C552 243 606 256 640 302"/>
  <path class="ripple" d="M690 665C752 631 822 637 865 680"/>
  <path class="ripple" d="M154 718C231 744 306 728 355 680"/>

  <g id="islands">${islands}</g>
  <g id="grass-texture">
    <path class="grass-texture" d="M78 223C70 148 136 78 226 82C315 86 356 141 341 208C391 240 373 317 315 340C320 394 281 448 216 459C229 520 206 591 141 617C79 643 26 602 40 536C12 493 35 431 84 403C54 342 48 280 78 223Z"/>
    <path class="grass-texture" d="M72 720C32 650 58 586 126 564C198 542 261 575 277 640C335 652 365 717 335 772C304 831 221 855 146 826C96 807 63 767 72 720Z"/>
    <path class="grass-texture" d="M330 318C390 241 499 207 593 244C677 277 711 373 666 450C722 525 684 633 592 669C506 702 409 666 381 581C310 553 288 381 330 318Z"/>
    <path class="grass-texture" d="M413 742C397 675 443 622 512 615C584 608 646 653 657 724C671 802 617 863 537 864C468 865 424 812 413 742Z"/>
    <path class="grass-texture" d="M623 362C644 294 706 240 782 236C878 232 942 292 946 383C950 469 892 533 806 537C722 541 620 480 623 362Z"/>
    <path class="grass-texture" d="M644 686C662 609 735 562 815 577C909 595 946 679 908 759C872 833 772 852 702 809C659 782 633 736 644 686Z"/>
  </g>

  <g id="landmarks">
    <path class="mountain" d="M126 184L172 72L222 184Z"/><path class="snow" d="M172 72L154 116L171 104L190 121Z"/>
    <path class="mountain" d="M190 178L247 44L310 178Z"/><path class="snow" d="M247 44L224 100L246 88L270 108Z"/>
    <path class="mountain" d="M270 190L313 82L364 190Z"/><path class="snow" d="M313 82L297 124L313 113L332 132Z"/>
    <g transform="translate(785 112)">
      <rect class="terminal-lighthouse" x="-24" y="28" width="48" height="78" rx="10"/>
      <rect class="lighthouse-red" x="-20" y="54" width="40" height="18"/>
      <ellipse class="terminal-lighthouse" cx="0" cy="28" rx="28" ry="13"/>
      <path class="star" d="M0 -28L9 -8L31 -6L14 8L19 30L0 18L-19 30L-14 8L-31 -6L-9 -8Z"/>
    </g>
  </g>

  <g id="decor">
    ${tree(99, 534, 1.05)}${tree(74, 444, 0.95)}${tree(170, 247, 1.0)}${tree(307, 202, 0.9, "round")}
    ${tree(534, 247, 0.9, "round")}${tree(681, 306, 0.86)}${tree(858, 418, 1.0)}${tree(810, 650, 0.9, "round")}
    ${rock(604, 289)}${rock(490, 747, 0.9)}${rock(875, 612)}${rock(261, 316, 0.8)}
    ${flowers(273, 504)}${flowers(571, 424)}${flowers(715, 412)}${flowers(824, 291)}${flowers(240, 754)}
  </g>

  <g id="routes">${roadLayer}</g>
  <g id="pads">${pads}</g>
</svg>
`;

await mkdir(ATLAS_DIR, { recursive: true });
await writeFile(OUT_PATH, svg);
await writeFile(SOURCE_PATH, `# 00_life_story_base_map_v12.svg

Generated by scripts/render_life_story_map_v12.mjs.

Authoritative inputs:
- topology_blueprint_from_user_v2.json
- route_story_config_v5.json
- docs/logic/v5_route_meaning_and_possibilities.md

Rendering contract:
- Topology is deterministic SVG, not free-form AI redraw.
- Visible routes are exactly: ${EDGE_IDS.join(", ")}.
- Forbidden legacy connections are excluded: ${topology.forbidden_edges.map((edge) => edge.id).join(", ")}.
- Bridges are only: ${Array.from(BRIDGES).join(", ")}.
- Stairs/ladders are only: ${Array.from(STAIRS).join(", ")}.
- 4->8 is rendered as a fast threshold road with no ladder.
- 8->11 is rendered as the upper lighthouse stairs.
- 5->9 is rendered as the lower cliff ladder/stairs.
- Node 9 has one outgoing route: 9->12.
- Official base map shows no numbers, Chinese labels, yellow guide lines, or deletion markers.

Style target:
- Clean Monopoly + Mario 3D board-map feel.
- Cream stone routes, toy-like green islands, blue water, soft cliffs, rounded pads, dense left forest, mountain result at 10, lighthouse result at 11, separate lower-right result at 12.
`);
console.log(OUT_PATH);
