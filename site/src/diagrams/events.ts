// How it's used: a status read from the events, in one 22 s loop. Two
// claims share one log. The invariant is proposed, annotated, accepted and
// later superseded; the assumption is proposed and rejected. Each event is
// appended to the log, and each claim's status moves only when an event
// that opens or closes it is appended. The note moves nothing.
//
// Timeline, percent of the loop:
//   6 and 14 the proposals · 26 the note · 38 accepted · 50 rejected
//   62 the replacement proposed · 74 accepted, and the old claim superseded
import { Diagram, type Frames, type Layout } from "./kit";

const T = 22;
const END = 96;
// A claim's pill: room for the longest name, in a node of either layout.
const PILL = 146;

// The log: number, event, record, actor, when it is appended.
const LOG: [string, string, string, string, number][] = [
  ["#1", "proposed", "billing-owns-invoices", "agent", 6],
  ["#2", "proposed", "card-payments-only", "agent", 14],
  ["#3", "annotated", "billing-owns-invoices", "Ada", 26],
  ["#4", "accepted", "billing-owns-invoices", "Ada", 38],
  ["#5", "rejected", "card-payments-only", "Ada", 50],
  ["#6", "proposed", "invoice-writers", "agent", 62],
  ["#7", "accepted", "invoice-writers", "Ada", 74],
  ["#8", "superseded", "billing-owns-invoices", "Ada", 74.5],
];
const TONE: Record<string, string> = {
  proposed: "warn",
  annotated: "ac",
  accepted: "ok",
  rejected: "bad",
  superseded: "m",
};

// The statuses, as nodes: name, column, row, colour.
const NODES: [string, number, number, string][] = [
  ["proposed", 0, 0, "warn"],
  ["standing", 1, 0, "ok"],
  ["rejected", 0, 1, "bad"],
  ["superseded", 1, 1, "m"],
];

// Each claim's path through the nodes: the node, the slot in it, from when.
const TOKENS: { name: string; cls: string; steps: [number, number, number][] }[] = [
  {
    name: "billing-owns-invoices",
    cls: "accbox",
    steps: [
      [0, 0, 6],
      [1, 0, 38],
      [3, 0, 74.5],
    ],
  },
  {
    name: "card-payments-only",
    cls: "box2",
    steps: [
      [0, 1, 14],
      [2, 0, 50],
    ],
  },
  {
    name: "invoice-writers",
    cls: "accbox",
    steps: [
      [0, 0, 62],
      [1, 1, 74],
    ],
  },
];

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

function geometry(layout: Layout) {
  if (layout === "wide") {
    const node = (c: number, r: number): Box => ({
      x: 336 + c * 212,
      y: 74 + r * 150,
      w: 156,
      h: 82,
    });
    return {
      W: 720,
      H: 420,
      n: false,
      heads: [
        ["THE LOG, APPENDED", 16, 30],
        ["STATUS, READ FROM THE LOG", 340, 30],
      ] as [string, number, number][],
      log: { x: 16, y: 44, w: 300, h: 300 } as Box,
      rowY: (i: number) => 84 + i * 31,
      node,
      caps: (i: number) => ({ x: 16 + (i % 2) * 356, y: 374 + Math.floor(i / 2) * 26 }),
    };
  }
  const node = (c: number, r: number): Box => ({ x: 8 + c * 194, y: 356 + r * 150, w: 150, h: 82 });
  return {
    W: 360,
    H: 724,
    n: true,
    heads: [
      ["THE LOG, APPENDED", 12, 24],
      ["STATUS, READ FROM THE LOG", 12, 318],
    ] as [string, number, number][],
    log: { x: 8, y: 34, w: 344, h: 266 } as Box,
    rowY: (i: number) => 72 + i * 28,
    node,
    caps: (i: number) => ({ x: 8, y: 640 + i * 20 }),
  };
}

export function events(layout: Layout) {
  const g = geometry(layout);
  const n = g.n;
  const d = new Diagram(T);
  const add = (s: string) => d.add(s);

  add(`<rect class="bg" width="${g.W}" height="${g.H}" rx="10"/>`);
  for (const [s, x, y] of g.heads) add(`<text class="hd" x="${x}" y="${y}">${s}</text>`);

  // ---- the log
  const L = g.log;
  add(`<rect class="panel" x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="8"/>`);
  add(
    `<text class="m xxs" x="${L.x + 14}" y="${L.y + 20}">events.rec · one line each, never edited</text>`,
  );
  LOG.forEach(([no, ev, rec, who, at], i) => {
    const y = g.rowY(i);
    add(`<g class="${d.show(`row${i}`, at, END)}">`);
    // The line just appended is lit until the next one comes.
    add(
      `<rect class="accbox ${d.show(`lit${i}`, at, Math.min(at + 7, END))}" x="${L.x + 6}" y="${y - 15}" width="${L.w - 12}" height="24" rx="5" style="stroke-width:1"/>`,
    );
    add(
      `<text class="mono xxs" x="${L.x + 14}" y="${y + 1}"><tspan class="m">${no}</tspan> <tspan class="${TONE[ev]} b">${ev}</tspan></text>`,
    );
    add(`<text class="t mono xxs" x="${L.x + 106}" y="${y + 1}">${rec}</text>`);
    add(`<text class="m xxs" x="${L.x + L.w - 14}" y="${y + 1}" text-anchor="end">${who}</text>`);
    add("</g>");
  });

  // ---- the statuses
  for (const [name, c, r, tone] of NODES) {
    const N = g.node(c, r);
    add(`<rect class="box" x="${N.x}" y="${N.y}" width="${N.w}" height="${N.h}" rx="8"/>`);
    add(`<text class="${tone} b xs" x="${N.x + 12}" y="${N.y + 20}">${name}</text>`);
  }
  const P = g.node(0, 0);
  const S = g.node(1, 0);
  const R = g.node(0, 1);
  const X = g.node(1, 1);
  const arrow = (
    id: string,
    path: string,
    label: string,
    lx: number,
    ly: number,
    lit: number[],
  ) => {
    add(`<path class="wire" d="${path}"/>`);
    lit.forEach((at, k) => {
      add(`<path class="dash ${d.show(`${id}${k}`, at, at + 6)}" d="${path}"/>`);
    });
    add(`<text class="m xxs" x="${lx}" y="${ly}" text-anchor="middle">${label}</text>`);
  };
  const my = P.y + P.h / 2;
  arrow(
    "aa",
    `M${P.x + P.w},${my} L${S.x - 6},${my}`,
    "accepted",
    (P.x + P.w + S.x) / 2,
    my - 8,
    [38, 74],
  );
  add(`<path class="edge" d="M${S.x - 10},${my - 4} L${S.x - 4},${my} L${S.x - 10},${my + 4}"/>`);
  const rx = P.x + 40;
  arrow(
    "ar",
    `M${rx},${P.y + P.h} L${rx},${R.y - 6}`,
    "rejected",
    rx + 34,
    (P.y + P.h + R.y) / 2 + 4,
    [50],
  );
  add(`<path class="edge" d="M${rx - 4},${R.y - 10} L${rx},${R.y - 4} L${rx + 4},${R.y - 10}"/>`);
  const sx = S.x + 40;
  arrow(
    "as",
    `M${sx},${S.y + S.h} L${sx},${X.y - 6}`,
    "superseded",
    sx + 40,
    (S.y + S.h + X.y) / 2 + 4,
    [74.5],
  );
  add(`<path class="edge" d="M${sx - 4},${X.y - 10} L${sx},${X.y - 4} L${sx + 4},${X.y - 10}"/>`);
  // A note loops back to where it was.
  {
    const x0 = P.x + P.w - 46;
    const x1 = P.x + P.w - 14;
    const path = `M${x0},${P.y} C${x0},${P.y - 22} ${x1},${P.y - 22} ${x1},${P.y}`;
    add(`<path class="wire" d="${path}"/>`);
    add(`<path class="dash ${d.show("loop", 26, 33)}" d="${path}"/>`);
    add(`<text class="m xxs" x="${x1 + 12}" y="${P.y - 8}">annotated: no status moves</text>`);
  }

  // ---- each claim, where its events put it
  const slot = (node: number, k: number) => {
    const [, c, r] = NODES[node];
    const N = g.node(c, r);
    return { x: N.x + (N.w - PILL) / 2, y: N.y + 30 + k * 24 };
  };
  TOKENS.forEach((tok, t) => {
    const home = slot(tok.steps[0][0], tok.steps[0][1]);
    const fr: Frames = [];
    const at = (p: { x: number; y: number }, o: number) =>
      `transform:translate(${p.x - home.x}px,${p.y - home.y}px);opacity:${o}`;
    const first = tok.steps[0][2];
    fr.push([0, at(home, 0)], [first - 0.5, at(home, 0)], [first + 0.5, at(home, 1)]);
    for (let s = 1; s < tok.steps.length; s++) {
      const [pn, pk] = tok.steps[s - 1];
      const [node, k, when] = tok.steps[s];
      fr.push([when, at(slot(pn, pk), 1)], [when + 3, at(slot(node, k), 1)]);
    }
    const [ln, lk] = tok.steps[tok.steps.length - 1];
    fr.push(
      [END, at(slot(ln, lk), 1)],
      [END + 0.8, at(slot(ln, lk), 0)],
      [100, at(slot(ln, lk), 0)],
    );
    d.kf(`tok${t}`, fr);
    add(`<g class="move ${d.anim(`tok${t}`)}">`);
    add(
      `<rect class="${tok.cls}" x="${home.x}" y="${home.y}" width="${PILL}" height="20" rx="10" style="stroke-width:1"/>`,
    );
    add(
      `<text class="t mono xxs" x="${home.x + PILL / 2}" y="${home.y + 14}" text-anchor="middle">${tok.name}</text>`,
    );
    add("</g>");
  });
  // The note lights the claim it is on, and moves it nowhere.
  {
    const p = slot(0, 0);
    add(
      `<rect class="${d.show("noted", 26, 33)}" x="${p.x - 2}" y="${p.y - 2}" width="${PILL + 4}" height="24" rx="12" style="fill:none;stroke:var(--dg-accent);stroke-width:2"/>`,
    );
  }

  // ---- captions
  const caps: [string, number, number][] = [
    ["Each event is appended; none is edited.", 4, 24],
    ["A note moves no status.", 24, 36],
    ["Each status is read from the log.", 36, 60],
    ["An accepted replacement supersedes the old.", 60, 96],
  ];
  caps.forEach(([txt, a, b], i) => {
    const c = g.caps(i);
    const cls = d.keep(d.show(`cap${i}`, a, b, 0.35));
    add(
      `<g class="${cls}"><circle class="badge" cx="${c.x + 11}" cy="${c.y - 4}" r="${n ? 8 : 10}"/>`,
    );
    add(`<text class="badget" x="${c.x + 11}" y="${c.y}" text-anchor="middle">${i + 1}</text>`);
    add(`<text class="t ${n ? "xs" : "sm"}" x="${c.x + 28}" y="${c.y}">${txt}</text>`);
    add("</g>");
  });

  return d.render({
    id: n ? "en" : "ew",
    width: g.W,
    height: g.H,
    title: "A status, read from the events",
    desc:
      "One log, events.rec, gains one line at a time and none is edited. Event 1: an agent proposes the invariant billing-owns-invoices, and it shows under proposed. " +
      "Event 2: an agent proposes the assumption card-payments-only, also proposed. Event 3: Ada annotates billing-owns-invoices; the note loops back and its status does not move. " +
      "Event 4: Ada accepts billing-owns-invoices, and it moves to standing. Event 5: Ada rejects card-payments-only, and it moves to rejected. " +
      "Event 6: an agent proposes invoice-writers, which replaces billing-owns-invoices. Event 7: Ada accepts it, and it stands; event 8 supersedes billing-owns-invoices, which moves to superseded.",
    still: 90,
  });
}
