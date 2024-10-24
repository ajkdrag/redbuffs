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
    theme: {
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
          light: "rgb(230, 228, 217)",
          lightgray: "rgb(206, 205, 195)",
          gray: "#878580",
          darkgray: "rgb(52, 51, 49)",
          dark: "rgb(28, 27, 26)",
          secondary: "rgb(28, 27, 26)",
          tertiary: "#ff4d6b",
          highlight: "#ff1a40",
          textHighlight: "rgb(220, 20, 60)",
        },
        darkMode: {
          // light: "rgb(16, 15, 15)", // background
          light: "black", // background
          lightgray: "rgb(28, 27, 26)", // borders
          gray: "rgb(87, 86, 83)", // graph links, heavier borders
          // darkgray: "rgb(206, 205, 195)", // body text
          darkgray: "#d2d5db", // body text
          // dark: "rgb(230, 228, 217)", // header text and icons
          dark: "#e5e7eb",
          secondary: "rgb(230, 228, 217)", // link color, curr graph node
          tertiary: "#ff4d6b", // hover states, visited graph nodes

          highlight: "rgb(220, 20, 60)", // internal link bg, highlighted text, highlighted codes
          textHighlight: "rgb(220, 20, 60)", // markdown highlighted text bg
        },
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
