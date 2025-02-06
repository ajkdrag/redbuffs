import { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "𖤍 ",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "ajkdrag.in",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",

    // in quartz.config.ts
    theme: {
      // ... other theme options like typography ...
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Nunito",
        // body: "AR One Sans",
        body: "Nunito Sans",
        code: "Fira Code",
      },

      colors: {
        lightMode: {
          light: "#FCFAEE",          // Base background
          lightgray: "#E8E6D7",      // Borders, code block backgrounds
          gray: "#788896",           // Subtle text, icons
          darkgray: "#384B70",       // Main text color
          dark: "#2A394F",          // Headings, bold text
          secondary: "#507687",      // Links, accents
          tertiary: "#B8001F",       // Highlights, special elements
          highlight: "rgba(184, 0, 31, 0.15)", // Link hovers, selections
          textHighlight: "rgb(220, 20, 60)",
        },
        darkMode: {
          light: "#1A1E23",
          lightgray: "#2F4158",
          gray: "#9DC2D5",
          dark: "#ECEADD",
          darkgray: "#FCFAEE",
          secondary: "#A2D6F0",
          tertiary: "#FF4D6B",
          highlight: "rgba(255, 77, 107, 0.12)",
          textHighlight: "rgba(220, 20, 60, 0.85)",
        }
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.HardLineBreaks(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
};

export default config;
