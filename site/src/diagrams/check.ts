// boom check: three layers, cheapest first, in one 20 s loop, read from the
// top down. A change to refunds and billing comes in. Scope keeps three of
// the twelve standing claims. A rule settles one, violated. A reviewer
// reads the diff against the other two, and both hold. The violation blocks
// the merge, and the agent has two ways on: fix the code, or propose a
// claim to replace it, which waits on a person.
//
// Timeline, percent of the loop:
//   8-18 scope · 18-24 to the rules · 24-36 the rules · 38-44 to prose
//   44-62 prose · 64 the outcome · 74 and 82 the two ways on
import { Diagram, type Frames, type Layout } from "./kit";

const T = 20;
const END = 96;

const FILES = [
  "src/refunds/credit.rs",
  "src/refunds/mod.rs",
  "src/billing/mod.rs",
  "tests/refunds.rs",
];

// The claims in scope: name, the layer that settles it, the outcome, when.
const CLAIMS: [string, number, string, number][] = [
  ["billing-owns-invoices", 2, "violated", 32],
  ["invoices-final", 3, "holds", 56],
  ["money-has-currency", 3, "holds", 60],
];
// Which of the twelve scope chips are the three kept.
const KEPT = [1, 6, 8];

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface Pt {
  x: number;
  y: number;
}

function geometry(layout: Layout) {
  if (layout === "wide") {
    const band = (i: number): Box => ({ x: 16, y: 16 + i * 100, w: 688, h: 88 });
    return {
      W: 720,
      H: 576,
      n: false,
      band,
      // Where a band's own text starts, and where its figures do.
      text: (i: number): Pt => ({ x: 28, y: band(i).y }),
      fig: (i: number): Pt => ({ x: 244, y: band(i).y }),
      chip: (i: number): Box => ({
        x: 244 + (i % 6) * 72,
        y: band(1).y + 22 + Math.floor(i / 6) * 22,
        w: 64,
        h: 14,
      }),
      pill: (layer: number, k: number): Pt => ({ x: 244 + k * 156, y: band(layer).y + 18 }),
      pillW: 148,
      // The outcome's word: under the pill.
      word: (p: Pt): Pt => ({ x: p.x + 8, y: p.y + 42 }),
      out: { x: 16, y: 420, w: 688, h: 140 } as Box,
      way: (k: number): Box => ({ x: 248 + k * 232, y: 436, w: 220, h: 112 }),
      // The map's rule, under the claim's own.
      map: (): Pt => ({ x: 28, y: band(2).y + 76 }),
      bar: null as null | ((layer: number) => number),
    };
  }
  const tops = [16, 148, 292, 508];
  const hs = [120, 132, 204, 150];
  const band = (i: number): Box => ({ x: 8, y: tops[i], w: 344, h: hs[i] });
  return {
    W: 360,
    H: 1032,
    n: true,
    band,
    text: (i: number): Pt => ({ x: 20, y: band(i).y }),
    fig: (i: number): Pt => ({ x: 20, y: band(i).y + 52 }),
    chip: (i: number): Box => ({
      x: 20 + (i % 6) * 54,
      y: band(1).y + 76 + Math.floor(i / 6) * 22,
      w: 48,
      h: 14,
    }),
    pill: (layer: number, k: number): Pt => ({ x: 20, y: band(layer).y + 76 + k * 30 }),
    pillW: 196,
    // The outcome's word: right of the pill.
    word: (p: Pt): Pt => ({ x: p.x + 206, y: p.y + 15 }),
    out: { x: 8, y: 672, w: 344, h: 352 } as Box,
    way: (k: number): Box => ({ x: 18, y: 804 + k * 108, w: 324, h: 100 }),
    map: (): Pt => ({ x: 20, y: band(2).y + 190 }),
    // Where a layer's progress runs, under its pills.
    bar: (layer: number) => band(layer).y + (layer === 2 ? 168 : 136),
  };
}

export function check(layout: Layout) {
  const g = geometry(layout);
  const n = g.n;
  const d = new Diagram(T);
  const add = (s: string) => d.add(s);

  add(`<rect class="bg" width="${g.W}" height="${g.H}" rx="10"/>`);

  // ---- the four bands, each lit while it works
  const HEADS = ["THE CHANGE", "1 · SCOPE", "2 · RULES", "3 · PROSE"];
  const LIT = [
    [2, 8],
    [8, 18],
    [24, 36],
    [44, 62],
  ];
  HEADS.forEach((h, i) => {
    const B = g.band(i);
    const [a, b] = LIT[i];
    d.kf(`lb${i}`, [
      [0, "stroke:var(--dg-rule)"],
      [a, "stroke:var(--dg-rule)"],
      [a + 0.6, "stroke:var(--dg-accent)"],
      [b, "stroke:var(--dg-accent)"],
      [b + 0.6, "stroke:var(--dg-rule)"],
      [100, "stroke:var(--dg-rule)"],
    ]);
    add(
      `<rect class="box ${d.anim(`lb${i}`)}" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="8"/>`,
    );
    const t = g.text(i);
    add(`<text class="hd" x="${t.x}" y="${t.y + 22}">${h}</text>`);
  });
  // Cheapest first, down the page.
  if (!n) {
    for (let i = 0; i < 3; i++) {
      const y = g.band(i).y + g.band(i).h;
      add(
        `<path class="edge" d="M120,${y + 2} L120,${y + 10} M115,${y + 5} L120,${y + 10} L125,${y + 5}"/>`,
      );
    }
  }

  // ---- the change
  {
    const t = g.text(0);
    add(`<text class="t b xs" x="${t.x}" y="${t.y + 44}">4 changed files</text>`);
    add(`<text class="m xxs" x="${t.x}" y="${t.y + 62}">a diff against main</text>`);
    const f = n ? { x: 20, y: g.band(0).y + 82 } : { x: 244, y: g.band(0).y + 30 };
    FILES.forEach((file, i) => {
      const x = n ? f.x + (i % 2) * 168 : f.x + (i % 2) * 220;
      const y = f.y + Math.floor(i / 2) * 20;
      add(`<text class="t mono xxs" x="${x}" y="${y}">${file}</text>`);
    });
  }

  // ---- 1 · scope: twelve standing claims, three in scope
  {
    const t = g.text(1);
    add(
      `<text class="t b xs ${d.show("s12", 0, 12)}" x="${t.x}" y="${t.y + 44}">12 standing claims</text>`,
    );
    add(
      `<text class="ac b xs ${d.show("s3", 12, END)}" x="${t.x}" y="${t.y + 44}">3 in scope</text>`,
    );
    add(
      `<text class="m xxs" x="${t.x}" y="${t.y + 62}">${n ? "those homed where the change is, and the system's" : "homed where the change is"}</text>`,
    );
    for (let i = 0; i < 12; i++) {
      const c = g.chip(i);
      if (KEPT.includes(i)) {
        add(`<rect class="chip" x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="7"/>`);
      } else {
        d.kf(`sq${i}`, [
          [0, "opacity:1"],
          [8 + i * 0.3, "opacity:1"],
          [9 + i * 0.3, "opacity:.18"],
          [END, "opacity:.18"],
          [END + 1, "opacity:1"],
          [100, "opacity:1"],
        ]);
        add(
          `<rect class="mchip ${d.anim(`sq${i}`)}" x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="7"/>`,
        );
      }
    }
  }

  // ---- 2 · rules
  {
    const t = g.text(2);
    add(`<text class="t b xs" x="${t.x}" y="${t.y + 42}">each claim's own rule</text>`);
    add(
      `<text class="m mono xxs" x="${t.x}" y="${t.y + 58}">deny import src/billing/invoices</text>`,
    );
    const m = g.map();
    add(`<text class="m xxs" x="${m.x}" y="${m.y}">map: no new dependency</text>`);
    add(
      `<text class="ok b xxs ${d.show("map", 34, END)}" x="${m.x + 130}" y="${m.y}">passes</text>`,
    );
  }

  // ---- 3 · prose
  {
    const t = g.text(3);
    add(`<text class="t b xs" x="${t.x}" y="${t.y + 44}">a reviewer model</text>`);
    add(`<text class="m xxs" x="${t.x}" y="${t.y + 62}">reads the diff and those claims</text>`);
  }

  // ---- the claims, from the scope chips down through the layers
  const w = g.pillW;
  CLAIMS.forEach(([name, settles, outcome, at], i) => {
    const chip = g.chip(KEPT[i]);
    const p2 = g.pill(2, i);
    const to = settles === 2 ? p2 : g.pill(3, i - 1);
    const pos = (p: Pt, o: number) =>
      `transform:translate(${p.x - to.x}px,${p.y - to.y}px);opacity:${o}`;
    const fr: Frames = [
      [0, pos(chip, 0)],
      [17 + i, pos(chip, 0)],
      [18 + i, pos(chip, 1)],
      [23 + i, pos(p2, 1)],
    ];
    if (settles === 3) fr.push([38 + i, pos(p2, 1)], [43 + i, pos(to, 1)]);
    fr.push([END, pos(to, 1)], [END + 0.8, pos(to, 0)], [100, pos(to, 0)]);
    d.kf(`cl${i}`, fr);
    add(`<g class="move ${d.anim(`cl${i}`)}">`);
    add(
      `<rect class="accbox" x="${to.x}" y="${to.y}" width="${w}" height="22" rx="11" style="stroke-width:1"/>`,
    );
    add(`<text class="t mono xxs" x="${to.x + 10}" y="${to.y + 15}">${name}</text>`);
    add("</g>");
    const tone = outcome === "violated" ? "bad" : "ok";
    add(
      `<g class="${d.show(`oc${i}`, at, END)}"><rect class="${tone}box" x="${to.x}" y="${to.y}" width="${w}" height="22" rx="11"/>` +
        `<text class="t mono xxs" x="${to.x + 10}" y="${to.y + 15}">${name}</text></g>`,
    );
    const wd = g.word(to);
    add(
      `<text class="${tone} b xs ${d.show(`ow${i}`, at, END)}" x="${wd.x}" y="${wd.y}">${outcome}</text>`,
    );
  });

  // The rule runs, then the reviewer reads.
  const bar = (id: string, layer: number, a: number, b: number) => {
    if (!g.bar) return;
    const y = g.bar(layer);
    const x = 20;
    const bw = 320;
    add(`<rect class="track" x="${x}" y="${y}" width="${bw}" height="4" rx="2"/>`);
    d.kf(id, [
      [0, "transform:scaleX(0)"],
      [a, "transform:scaleX(0)"],
      [b, "transform:scaleX(1)"],
      [END, "transform:scaleX(1)"],
      [END + 1, "transform:scaleX(0)"],
      [100, "transform:scaleX(0)"],
    ]);
    add(`<rect class="bar ${d.anim(id)}" x="${x}" y="${y}" width="${bw}" height="4" rx="2"/>`);
  };
  bar("rbar", 2, 25, 32);
  bar("pbar", 3, 45, 60);

  // ---- the outcome
  {
    const O = g.out;
    add(`<rect class="panel" x="${O.x}" y="${O.y}" width="${O.w}" height="${O.h}" rx="8"/>`);
    add(`<text class="hd" x="${O.x + 12}" y="${O.y + 22}">THE OUTCOME</text>`);
    add(`<g class="${d.show("verdict", 64, END)}">`);
    add(`<text class="bad b sm" x="${O.x + 12}" y="${O.y + 48}">violated: 1 of 3</text>`);
    add(`<text class="t xs" x="${O.x + 12}" y="${O.y + 68}">the merge is blocked</text>`);
    add("</g>");
    const uy = n ? O.y + 92 : O.y + 98;
    add(
      `<text class="m xxs" x="${O.x + 12}" y="${uy}">${n ? "An unclear claim fails too, until a person answers" : "An unclear claim fails too,"}</text>`,
    );
    add(
      `<text class="m xxs" x="${O.x + 12}" y="${uy + 15}">${n ? "for this change:" : "until a person answers:"}</text>`,
    );
    add(`<text class="m mono xxs" x="${O.x + 12}" y="${uy + 30}">boom check --answer</text>`);
    const WAYS: [string, string[], number][] = [
      [
        "a. fix the code",
        ["refunds calls billing's", "issue_credit_note(), and the", "check runs again and holds"],
        74,
      ],
      [
        "b. propose a replacement",
        ["boom supersede: it waits on", "a person, and the old claim", "stands until then"],
        82,
      ],
    ];
    WAYS.forEach(([title, lines, at], k) => {
      const Wy = g.way(k);
      add(
        `<rect class="box2" x="${Wy.x}" y="${Wy.y}" width="${Wy.w}" height="${Wy.h}" rx="8" stroke-dasharray="4 3"/>`,
      );
      add(
        `<text class="m b xs ${d.show(`wt${k}`, 0, at)}" x="${Wy.x + 12}" y="${Wy.y + 24}">${title}</text>`,
      );
      add(`<g class="${d.show(`way${k}`, at, END)}">`);
      add(
        `<rect class="${k === 0 ? "okbox" : "warnbox"}" x="${Wy.x}" y="${Wy.y}" width="${Wy.w}" height="${Wy.h}" rx="8"/>`,
      );
      add(
        `<text class="${k === 0 ? "ok" : "warn"} b xs" x="${Wy.x + 12}" y="${Wy.y + 24}">${title}</text>`,
      );
      lines.forEach((l, j) => {
        add(`<text class="t xxs" x="${Wy.x + 12}" y="${Wy.y + 46 + j * 16}">${l}</text>`);
      });
      add("</g>");
    });
  }

  return d.render({
    id: n ? "cn" : "cw",
    width: g.W,
    height: g.H,
    title: "boom check, three layers, cheapest first",
    desc:
      "A change touches four files: src/refunds/credit.rs, src/refunds/mod.rs, src/billing/mod.rs and tests/refunds.rs. " +
      "Layer 1, scope, keeps three of the twelve standing claims: those homed where the change is, and the claims on the whole system. " +
      "Layer 2, rules, runs each claim's own rule: billing-owns-invoices denies importing src/billing/invoices from outside billing, and the change does, so it is violated. " +
      "The map's rule, no new dependency between contexts, passes. Layer 3, prose: a reviewer model reads the diff and the two claims left, invoices-final and money-has-currency, and both hold. " +
      "The outcome: violated, one of three, and the merge is blocked. An unclear claim fails too, until a person answers with boom check --answer. " +
      "Two ways on: fix the code, so refunds calls billing's issue_credit_note() and the check holds; or propose a replacement with boom supersede, which waits on a person while the old claim stands.",
    still: 90,
  });
}
