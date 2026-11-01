// Every SVG diagram the site draws, by name, each a function of its layout.
import { check } from "./check";
import { events } from "./events";
import { fits } from "./fits";
import { hero } from "./hero";
import type { Layout } from "./kit";

export const diagrams: Record<string, (layout: Layout) => string> = {
  hero,
  events,
  check,
  fits,
};
