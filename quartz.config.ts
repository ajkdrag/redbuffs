import { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "redbuffs",
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
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Merriweather",
        code: "Source Code Pro",
      },
      colors: {
        lightMode: {
          light: "#fff",
          lightgray: "#f6f8fa",
          gray: "#888",
          darkgray: "#222",
          dark: "#111",
          secondary: "#0074d9",
          tertiary: "#14b8a6", // changed from purple to teal
          highlight: "rgba(0, 116, 217, 0.07)",
          textHighlight: "rgba(20, 184, 166, 0.2)",
        },
        darkMode: {
          light: "#181a1b",
          lightgray: "#252525",
          gray: "#888",
          dark: "#f8f8f8",
          darkgray: "#eee",
          secondary: "#7fdbff",
          tertiary: "#14b8a6", // changed from purple to teal
          highlight: "rgba(127, 219, 255, 0.08)",
          textHighlight: "rgba(20, 184, 166, 0.25)",
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
