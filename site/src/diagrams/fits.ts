// Integrations: one engine, and the tools that run it, in one 18 s loop.
// In turn, the Claude Code plugin, sluice, flume, millpond and the herdr
// plugin each run boom by its command line, and boom runs mdbook to build a
// design book. A call that proposes a claim appends to the ledger, which is
// all boom writes.
//
// Timeline, percent of the loop: six turns of 15, from 2 to 92.
import { Diagram, type Layout } from "./kit";

const T = 18;

// Each tool: name, its colour class, its two lines, what boom runs for it,
// whether it writes the ledger, and its side and row in the wide layout.
const TOOLS: {
  name: string;
  tone: string;
  lines: [string, string];
  runs: string;
  writes: boolean;
  side: 0 | 1;
  row: number;
}[] = [
  {
    name: "Claude Code plugin",
    tone: "ac",
    lines: ["boom mcp", "skills: plan, edit, hand off"],
    runs: "boom mcp · propose",
    writes: true,
    side: 0,
    row: 0,
  },
  {
    name: "sluice",
    tone: "sl",
    lines: ["boom check, in the gate", "boom sync, after a merge"],
    runs: "boom check",
    writes: false,
    side: 0,
    row: 1,
  },
  {
    name: "flume",
    tone: "fl",
    lines: ["boom query <paths> --json", "boom propose, from a run"],
    runs: "boom query --json",
    writes: false,
    side: 1,
    row: 1,
  },
  {
    name: "millpond",
    tone: "pd",
    lines: ["boom propose, boom challenge", "boom query --status proposed"],
    runs: "boom propose",
    writes: true,
    side: 0,
    row: 2,
  },
  {
    name: "herdr plugin",
    tone: "ac",
    lines: ["boom mcp", "for agents run in herdr"],
    runs: "boom mcp · query",
    writes: false,
    side: 1,
    row: 0,
  },
  {
    name: "mdBook",
    tone: "m",
    lines: ["run by boom render book,", "where it is installed"],
    runs: "boom render book",
    writes: false,
    side: 1,
    row: 2,
  },
];
const BOXCLS: Record<string, string> = {
  ac: "box",
  sl: "slbox",
  fl: "flbox",
  pd: "pondbox",
  m: "box",
};
const turn = (i: number) => 2 + i * 15;

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
    const boom: Box = { x: 260, y: 132, w: 200, h: 96 };
    const tool = (side: number, row: number): Box => ({
      x: side ? 492 : 16,
      y: 40 + row * 120,
      w: 212,
      h: 84,
    });
    return {
      W: 720,
      H: 432,
      n: false,
      boom,
      ledger: { x: 260, y: 300, w: 200, h: 64 } as Box,
      tool: (i: number) => tool(TOOLS[i].side, TOOLS[i].row),
      // The wire from a tool to boom, as points from the tool's end.
      wire: (i: number): Pt[] => {
        const t = tool(TOOLS[i].side, TOOLS[i].row);
        const y = t.y + t.h / 2;
        const by = boom.y + 24 + TOOLS[i].row * 24;
        return TOOLS[i].side
          ? [
              { x: t.x, y },
              { x: 476, y },
              { x: 476, y: by },
              { x: boom.x + boom.w, y: by },
            ]
          : [
              { x: t.x + t.w, y },
              { x: 244, y },
              { x: 244, y: by },
              { x: boom.x, y: by },
            ];
      },
      cap: { x: 16, y: 410 },
    };
  }
  const boom: Box = { x: 8, y: 34, w: 344, h: 90 };
  const tool = (i: number): Box => ({ x: 40, y: 214 + i * 96, w: 312, h: 84 });
  return {
    W: 360,
    H: 846,
    n: true,
    boom,
    ledger: { x: 40, y: 140, w: 312, h: 56 } as Box,
    tool,
    wire: (i: number): Pt[] => {
      const t = tool(i);
      const y = t.y + 24;
      return [
        { x: t.x, y },
        { x: 22, y },
        { x: 22, y: boom.y + boom.h },
      ];
    },
    cap: { x: 12, y: 806 },
  };
}

export function fits(layout: Layout) {
  const g = geometry(layout);
  const n = g.n;
  const d = new Diagram(T);
  const add = (s: string) => d.add(s);

  add(`<rect class="bg" width="${g.W}" height="${g.H}" rx="10"/>`);
  if (!n) {
    add(`<text class="hd" x="16" y="28">TOOLS BESIDE BOOM, EACH BY ITS COMMAND LINE</text>`);
  } else {
    add(`<text class="hd" x="12" y="24">ONE ENGINE</text>`);
    add(`<text class="hd" x="12" y="208">EACH TOOL, BY BOOM'S COMMAND LINE</text>`);
  }

  // ---- the wires, under everything
  const order = TOOLS.map((_, i) => i);
  for (const i of order) {
    const pts = g.wire(i);
    const path = `M${pts.map((p) => `${p.x},${p.y}`).join(" L")}`;
    add(`<path class="wire" d="${path}"/>`);
    const a = turn(i);
    add(`<path class="dash ${d.show(`wl${i}`, a, a + 12)}" d="${path}"/>`);
    // The call travels to boom; for mdBook, boom's call travels out.
    const route = TOOLS[i].name === "mdBook" ? [...pts].reverse() : pts;
    d.route(`dot${i}`, route, a + 1, a + 5, a + 5.6);
    const end = route[route.length - 1];
    add(
      `<circle class="dot${i}" cx="${end.x}" cy="${end.y}" r="5" style="fill:var(--dg-accent)"/>`,
    );
  }

  // ---- boom
  {
    const B = g.boom;
    add(`<rect class="accbox" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" rx="10"/>`);
    add(`<text class="ac h" x="${B.x + 14}" y="${B.y + 28}">boom</text>`);
    add(`<text class="m xxs" x="${B.x + 14}" y="${B.y + 46}">one engine: the command line,</text>`);
    add(`<text class="m xxs" x="${B.x + 14}" y="${B.y + 60}">--json on every command</text>`);
    TOOLS.forEach((tool, i) => {
      const a = turn(i);
      add(
        `<text class="t mono xxs ${d.show(`run${i}`, a + 5, a + 13)}" x="${B.x + 14}" y="${B.y + 80}">${tool.runs}</text>`,
      );
    });
  }

  // ---- the ledger: all boom writes
  {
    const L = g.ledger;
    add(`<rect class="box" x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="8"/>`);
    add(`<text class="t b xs" x="${L.x + 12}" y="${L.y + 22}">the ledger</text>`);
    add(`<text class="m xxs" x="${L.x + 12}" y="${L.y + 40}">its own Git repository</text>`);
    TOOLS.forEach((tool, i) => {
      if (!tool.writes) return;
      const a = turn(i);
      add(
        `<text class="ac b xxs ${d.show(`app${i}`, a + 6, a + 13)}" x="${L.x + L.w - 12}" y="${L.y + 22}" text-anchor="end">appended</text>`,
      );
    });
    if (!n) {
      const B = g.boom;
      add(`<path class="edge" d="M${B.x + B.w / 2},${B.y + B.h} L${L.x + L.w / 2},${L.y - 4}"/>`);
      add(
        `<path class="edge" d="M${L.x + L.w / 2 - 5},${L.y - 9} L${L.x + L.w / 2},${L.y - 4} L${L.x + L.w / 2 + 5},${L.y - 9}"/>`,
      );
      add(
        `<text class="m xxs" x="${L.x + L.w / 2 + 8}" y="${(B.y + B.h + L.y) / 2 + 4}">writes only this</text>`,
      );
    }
  }

  // ---- the tools
  TOOLS.forEach((tool, i) => {
    const t = g.tool(i);
    const a = turn(i);
    const cls = BOXCLS[tool.tone];
    add(`<rect class="${cls}" x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="8"/>`);
    add(
      `<rect class="${d.show(`lit${i}`, a, a + 13)}" x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="8" style="fill:none;stroke:var(--dg-accent);stroke-width:2.5"/>`,
    );
    add(`<text class="${tool.tone} b sm" x="${t.x + 12}" y="${t.y + 24}">${tool.name}</text>`);
    tool.lines.forEach((l, k) => {
      const mono = l.startsWith("boom");
      add(
        `<text class="${mono ? "t mono" : "m"} xxs" x="${t.x + 12}" y="${t.y + 46 + k * 18}">${l.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text>`,
      );
    });
  });

  // ---- the claim
  const c = g.cap;
  const claim = n
    ? [
        "Each tool runs boom by its command line;",
        "none builds on its code. boom writes only its ledger.",
      ]
    : [
        "Each tool runs boom by its command line, and none builds on its code. boom writes only its ledger.",
      ];
  claim.forEach((l, k) => {
    add(`<text class="t xs" x="${c.x}" y="${c.y + k * 18}">${l}</text>`);
  });

  return d.render({
    id: n ? "fn" : "fw",
    width: g.W,
    height: g.H,
    title: "The tools beside boom, each by its command line",
    desc:
      "boom is one engine, its command line, with --json on every command, and it writes only its ledger, a Git repository of its own. " +
      "In turn: the Claude Code plugin runs boom mcp, with skills to plan, to look up what applies before an edit, and to check before handing off, and its proposals are appended to the ledger. " +
      "sluice runs boom check in its merge gate, and boom sync after a merge. flume runs boom query on the paths of a piece of work, with --json, and the agent proposes from the run. " +
      "millpond runs boom propose and boom challenge, and reads what waits on a person with boom query --status proposed. The herdr plugin runs boom mcp for agents run in herdr. " +
      "boom render book runs mdbook where it is installed. No tool builds on boom's code.",
    still: 10,
  });
}
