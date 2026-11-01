// boom's accent, a colour for each theme, each 4.5:1 or more against its
// page. The family list in @agentplot/site-theme names no boom yet, so its
// bar sets no accent here; Banner.astro sets this one on every page, and the
// diagrams draw with it. Once the list names boom, its entry replaces this.
import type { Pair } from "@agentplot/site-theme/family";

export const accent: Pair = { light: "#7e3fb8", dark: "#c491ee" };
