// The start page: the ledger and its views, in one 22 s loop. Two claims
// stand. An agent proposes an invariant and a person accepts it; the status
// of each record is read from the events, and the views are computed again.
// Then an agent proposes a decision that supersedes an assumption, a person
// accepts it, the assumption leaves, and the views follow.
//
// Timeline, percent of the loop:
//   8-30 propose and accept · 31-40 the views · 50-70 a supersession · 71-80 the views
import { Diagram, esc, type Layout } from "./kit";

const T = 22;

// The records: name, kind and statement.
const RECORDS: [string, string][] = [
  ["invoices-final", "invariant · An issued invoice is never edited."],
  ["one-currency", "assumption · Every order is in one currency."],
  ["billing-owns-invoices", "invariant · Only billing writes invoices."],
  ["money-has-currency", "decision · Every amount carries its currency."],
];

// The events: the line, its event's colour, the actor, when it is appended.
const EVENTS: [string, string, string, string, number][] = [
  ["#1", "accepted", "invoices-final", "Ada", 0],
  ["#2", "accepted", "one-currency", "Ada", 0],
  ["#3", "proposed", "billing-owns-invoices", "agent", 13],
  ["#4", "accepted", "billing-owns-invoices", "Ada", 29],
  ["#5", "proposed", "money-has-currency", "agent", 55],
  ["#6", "accepted", "money-has-currency", "Ada", 69],
];

// Each command: who runs it, when it fires, and the event it appends.
const RUNS = [
  { who: 0, at: 8, row: 2 },
  { who: 1, at: 24, row: 3 },
  { who: 0, at: 50, row: 4 },
  { who: 1, at: 64, row: 5 },
];

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

function geometry(layout: Layout) {
  if (layout === "wide") {
    const view = (i: number): Box => ({ x: 488, y: 44 + i * 64, w: 216, h: 56 });
    return {
      W: 720,
      H: 472,
      n: false,
      heads: [
        ["WHO WRITES", 16, 30],
        ["THE LEDGER", 192, 30],
        ["VIEWS, COMPUTED", 488, 30],
      ] as [string, number, number][],
      actor: (i: number): Box => ({ x: 16, y: 44 + i * 112, w: 160, h: 96 }),
      ledger: { x: 192, y: 44, w: 280, h: 360 } as Box,
      recY: (i: number) => 78 + i * 40,
      evHead: 268,
      evY: (i: number) => 290 + i * 19,
      view,
      // From a command's pill to its event's line in the ledger.
      route: (who: number, row: number) => {
        const a = 44 + who * 112 + 70;
        const y = 290 + row * 19 - 4;
        return [
          { x: 150, y: a },
          { x: 184, y: a },
          { x: 184, y },
          { x: 200, y },
        ];
      },
      bus: (i: number) => {
        const v = view(i);
        return `M472,224 L480,224 L480,${v.y + v.h / 2} L${v.x},${v.y + v.h / 2}`;
      },
      note: { x: 16, y: 290 },
      caps: (i: number) => ({ x: 16 + (i % 2) * 356, y: 432 + Math.floor(i / 2) * 26 }),
    };
  }
  const view = (i: number): Box => ({ x: 8, y: 572 + i * 54, w: 344, h: 48 });
  return {
    W: 360,
    H: 948,
    n: true,
    heads: [
      ["WHO WRITES", 12, 24],
      ["THE LEDGER", 12, 150],
      ["VIEWS, COMPUTED", 12, 562],
    ] as [string, number, number][],
    actor: (i: number): Box => ({ x: 8 + i * 176, y: 34, w: 168, h: 96 }),
    ledger: { x: 8, y: 160, w: 344, h: 356 } as Box,
    recY: (i: number) => 194 + i * 40,
    evHead: 384,
    evY: (i: number) => 406 + i * 19,
    view,
    route: (who: number, row: number) => {
      const x = 8 + who * 176 + 84;
      const y = 406 + row * 19 - 4;
      return [
        { x, y: 126 },
        { x, y: 146 },
        { x: 4, y: 146 },
        { x: 4, y },
        { x: 16, y },
      ];
    },
    // The ledger above feeds the views below it.
    bus: (_: number) => "M180,516 L180,572",
    note: null,
    caps: (i: number) => ({ x: 8, y: 872 + i * 20 }),
  };
}

export function hero(layout: Layout, opts: { id?: string; standalone?: boolean } = {}) {
  const g = geometry(layout);
  const n = g.n;
  const d = new Diagram(T);
  const add = (s: string) => d.add(s);
  const END = 96;

  add(`<rect class="bg" width="${g.W}" height="${g.H}" rx="10"/>`);
  for (const [s, x, y] of g.heads) add(`<text class="hd" x="${x}" y="${y}">${s}</text>`);

  // ---- who writes: an agent proposes, a person accepts
  const ACTORS = [
    ["an agent", "proposes, never accepts", "boom propose"],
    ["a person", "accepts or rejects", "boom accept"],
  ];
  ACTORS.forEach(([who, line, cmd], i) => {
    const A = g.actor(i);
    const lit = RUNS.filter((r) => r.who === i);
    d.kf(`ab${i}`, [
      [0, "stroke:var(--dg-rule)"],
      ...lit.flatMap((r): [number, string][] => [
        [r.at - 0.5, "stroke:var(--dg-rule)"],
        [r.at, "stroke:var(--dg-accent)"],
        [r.at + 6, "stroke:var(--dg-accent)"],
        [r.at + 6.5, "stroke:var(--dg-rule)"],
      ]),
      [100, "stroke:var(--dg-rule)"],
    ]);
    add(
      `<rect class="box ${d.anim(`ab${i}`)}" x="${A.x}" y="${A.y}" width="${A.w}" height="${A.h}" rx="8"/>`,
    );
    add(`<text class="t b sm" x="${A.x + 12}" y="${A.y + 24}">${who}</text>`);
    add(`<text class="m xxs" x="${A.x + 12}" y="${A.y + 42}">${line}</text>`);
    const P = { x: A.x + 12, y: A.y + 58, w: A.w - 24, h: 24 };
    add(`<rect class="box2" x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12"/>`);
    add(
      `<text class="t mono xs" x="${P.x + P.w / 2}" y="${P.y + 16}" text-anchor="middle">${cmd}</text>`,
    );
    lit.forEach((r, k) => {
      add(
        `<g class="${d.show(`pl${i}${k}`, r.at, r.at + 6)}"><rect class="chip" x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" rx="12"/>` +
          `<text class="chipt mono xs" x="${P.x + P.w / 2}" y="${P.y + 16}" text-anchor="middle">${cmd}</text></g>`,
      );
    });
  });
  if (g.note) {
    const { x, y } = g.note;
    [
      "A status is never stored:",
      "boom reads it from the",
      "events. Nothing in the",
      "ledger is edited.",
    ].forEach((l, k) => {
      add(`<text class="m xs" x="${x}" y="${y + k * 18}">${l}</text>`);
    });
  }

  // ---- the ledger: the records, their status read from the events
  const L = g.ledger;
  add(`<rect class="panel" x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="8"/>`);
  add(`<text class="hd" x="${L.x + 14}" y="${L.y + 22}">RECORDS</text>`);
  add(
    `<text class="m xxs" x="${L.x + L.w - 14}" y="${L.y + 22}" text-anchor="end">status, read from the events</text>`,
  );
  const right = L.x + L.w - 14;
  RECORDS.forEach(([name, line], i) => {
    const y = g.recY(i);
    // Records 2 and 3 arrive with their proposals; 0 and 1 stand from the start.
    const from = i === 2 ? 13 : i === 3 ? 55 : 0;
    const row = from ? d.show(`rec${i}`, from, END) : "";
    add(`<g class="${row}">`);
    add(`<rect class="box2" x="${L.x + 8}" y="${y - 4}" width="${L.w - 16}" height="36" rx="6"/>`);
    add(`<text class="t mono xs" x="${L.x + 16}" y="${y + 11}">${name}</text>`);
    if (i === 3) {
      // While it is proposed, the decision shows what it supersedes.
      add(
        `<text class="ac b xxs ${d.show("supt", 55, 70)}" x="${L.x + 16}" y="${y + 26}">decision · supersedes one-currency</text>`,
      );
      add(
        `<text class="m xxs ${d.show("stmt3", 70, END)}" x="${L.x + 16}" y="${y + 26}">${esc(line)}</text>`,
      );
    } else add(`<text class="m xxs" x="${L.x + 16}" y="${y + 26}">${esc(line)}</text>`);
    add("</g>");
    // A status shown for the whole loop is drawn still.
    const status = (cls: string, word: string, a: number, b: number, k: string) => {
      const when = a <= 0 && b >= 100 ? "" : d.show(`st${i}${k}`, a, b);
      add(
        `<text class="${cls} b xxs ${when}" x="${right - 2}" y="${y + 11}" text-anchor="end">${word}</text>`,
      );
    };
    if (i === 0) status("ok", "standing", 0, 100, "s");
    if (i === 1) {
      status("ok", "standing", 0, 70, "s");
      status("m", "superseded", 70, END, "x");
      const w = name.length * 6.9;
      add(
        `<line class="strike ${d.show("strike1", 70, END)}" x1="${L.x + 14}" y1="${y + 7}" x2="${L.x + 18 + w}" y2="${y + 7}"/>`,
      );
    }
    if (i === 2) {
      status("warn", "proposed", 13, 30, "p");
      status("ok", "standing", 30, END, "s");
    }
    if (i === 3) {
      status("warn", "proposed", 55, 70, "p");
      status("ok", "standing", 70, END, "s");
    }
  });
  // The decision names the assumption it supersedes.
  {
    const y1 = g.recY(1) + 14;
    const y3 = g.recY(3) + 14;
    const x = L.x + L.w - 4;
    add(
      `<path class="dash ${d.show("sup", 55, END)}" d="M${x - 4},${y3} C${x + 4},${y3} ${x + 4},${y1} ${x - 4},${y1}"/>`,
    );
  }

  add(`<text class="hd" x="${L.x + 14}" y="${g.evHead}">EVENTS, APPENDED</text>`);
  EVENTS.forEach(([no, ev, name, who, at], i) => {
    const y = g.evY(i);
    const cls = ev === "accepted" ? "ok" : "warn";
    add(`<g class="${at ? d.show(`ev${i}`, at, END) : ""}">`);
    add(
      `<text class="mono xxs" x="${L.x + 14}" y="${y}"><tspan class="m">${no}</tspan> <tspan class="${cls}">${ev}</tspan> <tspan class="t">${name}</tspan></text>`,
    );
    add(`<text class="m xxs" x="${right}" y="${y}" text-anchor="end">${who}</text>`);
    add("</g>");
  });

  // Each command's event, carried from its pill into the ledger.
  RUNS.forEach((r, k) => {
    const pts = g.route(r.who, r.row);
    d.route(`fly${k}`, pts, r.at + 1, r.at + 4.6, r.at + 5.2);
    const end = pts[pts.length - 1];
    add(
      `<circle class="fly${k}" cx="${end.x}" cy="${end.y}" r="5" style="fill:var(--dg-accent)"/>`,
    );
  });

  // ---- the views: computed from the ledger, never stored as the truth
  const VIEWS: { title: string; lines: [string, number, number][] }[] = [
    {
      title: "rules for a scope",
      lines: [
        ["docs/rules.md · 1 invariant", 0, 33],
        ["docs/rules.md · 2 invariants", 33, END],
      ],
    },
    {
      title: "decision records",
      lines: [
        ["docs/adr/ · no decision yet", 0, 73],
        ["0001-money-has-currency.md", 73, END],
      ],
    },
    { title: "design book", lines: [["mdBook source, by record id", 0, 100]] },
    { title: "context map", lines: [["shop, one context", 0, 100]] },
    {
      title: "boom check",
      lines: [
        ["reads 1 standing claim", 0, 34],
        ["reads 2 standing claims", 34, 74],
        ["reads 3 standing claims", 74, END],
      ],
    },
  ];
  const recompute = [
    [31, 39],
    [71, 79],
  ];
  VIEWS.forEach((v, i) => {
    const V = g.view(i);
    const busy = i !== 3;
    if (busy) {
      d.kf(`vb${i}`, [
        [0, "stroke:var(--dg-rule)"],
        ...recompute.flatMap(([a, b]): [number, string][] => [
          [a, "stroke:var(--dg-rule)"],
          [a + 1, "stroke:var(--dg-accent)"],
          [b, "stroke:var(--dg-accent)"],
          [b + 1, "stroke:var(--dg-rule)"],
        ]),
        [100, "stroke:var(--dg-rule)"],
      ]);
    }
    add(
      `<rect class="box ${busy ? d.anim(`vb${i}`) : ""}" x="${V.x}" y="${V.y}" width="${V.w}" height="${V.h}" rx="8"/>`,
    );
    add(`<text class="t b xs" x="${V.x + 12}" y="${V.y + (n ? 19 : 22)}">${v.title}</text>`);
    v.lines.forEach(([s, a, b], k) => {
      const cls = v.lines.length > 1 ? d.show(`vl${i}${k}`, a, b) : "";
      add(`<text class="m mono xxs ${cls}" x="${V.x + 12}" y="${V.y + (n ? 36 : 40)}">${s}</text>`);
    });
    if (busy)
      recompute.forEach(([a, b], k) => {
        add(
          `<text class="ac b xxs ${d.show(`vr${i}${k}`, a + 1, b)}" x="${V.x + V.w - 12}" y="${V.y + (n ? 19 : 22)}" text-anchor="end">computed</text>`,
        );
      });
  });
  // The ledger feeds every view.
  const buses = n ? [0] : VIEWS.map((_, i) => i);
  for (const i of buses) add(`<path class="wire" d="${g.bus(i)}"/>`);
  recompute.forEach(([a, b], k) => {
    for (const i of buses)
      add(`<path class="dash ${d.show(`bus${k}${i}`, a, b)}" d="${g.bus(i)}"/>`);
  });

  // ---- captions
  const caps = [
    "An agent proposes a claim.",
    "A person accepts it: it stands.",
    "Every view is computed again.",
    "A new claim supersedes an old one.",
  ];
  const windows = [
    [6, 24],
    [24, 31],
    [31, 50],
    [50, 96],
  ];
  caps.forEach((txt, i) => {
    const c = g.caps(i);
    const cls = d.keep(d.show(`cap${i}`, windows[i][0], windows[i][1], 0.35));
    add(
      `<g class="${cls}"><circle class="badge" cx="${c.x + 11}" cy="${c.y - 4}" r="${n ? 8 : 10}"/>`,
    );
    add(`<text class="badget" x="${c.x + 11}" y="${c.y}" text-anchor="middle">${i + 1}</text>`);
    add(`<text class="t ${n ? "xs" : "sm"}" x="${c.x + 28}" y="${c.y}">${txt}</text>`);
    add("</g>");
  });

  return d.render({
    id: opts.id ?? (n ? "hn" : "hw"),
    width: g.W,
    height: g.H,
    standalone: opts.standalone,
    title: "The ledger and its views",
    desc:
      "The ledger holds two standing claims: the invariant invoices-final, an issued invoice is never edited, and the assumption one-currency, every order is in one currency. " +
      "An agent runs boom propose, and event 3 proposes the invariant billing-owns-invoices, only billing writes invoices; its status reads proposed. " +
      "A person, Ada, runs boom accept, and event 4 accepts it; its status now reads standing. The views are computed again from the ledger: " +
      "the rules for a scope list two invariants, and boom check reads two standing claims. " +
      "An agent then proposes the decision money-has-currency, every amount carries its currency, which supersedes one-currency, and Ada accepts it. " +
      "one-currency reads superseded, the decision records gain docs/adr/0001-money-has-currency.md, and boom check reads three standing claims. " +
      "The design book and the context map are computed the same way. No status is stored and no event is edited.",
    still: 90,
  });
}
