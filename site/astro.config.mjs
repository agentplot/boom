// boom's site, built by Astro with Starlight and published to GitHub Pages
// at https://agentplot.github.io/boom by .github/workflows/pages.yml. The SVG
// diagrams are drawn at build time by src/diagrams/*.ts and inlined, so they
// follow the theme toggle and need no script.

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";

export default defineConfig({
  site: "https://agentplot.github.io",
  base: "/boom",
  integrations: [
    starlight({
      title: "boom",
      description:
        "A ledger of what a project has claimed about itself, with every view of it computed, and a check that reads each change against the claims that hold.",
      logo: {
        light: "./src/assets/mark-light.svg",
        dark: "./src/assets/mark-dark.svg",
        alt: "boom",
      },
      favicon: "/favicon.svg",
      // The family's header (its bar above Starlight's) and footer, from
      // @agentplot/site-theme. The banner, saying boom is designed and not
      // built, and the start page's hero, with the animated diagram, are
      // boom's own: the family list does not name boom yet.
      components: {
        Header: "@agentplot/site-theme/starlight/Header.astro",
        Footer: "@agentplot/site-theme/starlight/Footer.astro",
        Banner: "./src/components/Banner.astro",
        Hero: "./src/components/Hero.astro",
      },
      // The family's type, ink and accent, then the diagrams' palette.
      customCss: ["@agentplot/site-theme/starlight.css", "./src/styles/brand.css"],
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/agentplot/boom" }],
      editLink: {
        baseUrl: "https://github.com/agentplot/boom/edit/main/site/",
      },
      plugins: [starlightLinksValidator()],
      sidebar: [
        { label: "Start", link: "/" },
        { label: "How it's used", link: "/how-its-used/" },
        { label: "Configuration", link: "/configuration/" },
        { label: "Commands", link: "/commands/" },
        { label: "boom check", link: "/check/" },
        {
          label: "Walkthroughs",
          items: [
            { label: "Your first claims", link: "/guides/first-claims/" },
            { label: "An agent proposes, you accept", link: "/guides/an-agent-proposes/" },
            { label: "A change breaks a claim", link: "/guides/a-change-breaks-a-claim/" },
            { label: "Importing your ADRs", link: "/guides/importing-adrs/" },
          ],
        },
        { label: "Integrations", link: "/integrations/" },
        { label: "Roadmap and open questions", link: "/roadmap/" },
      ],
    }),
  ],
});
