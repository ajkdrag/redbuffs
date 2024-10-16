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
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Nunito",
        body: "AR One Sans",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "rgb(230, 228, 217)",
          lightgray: "rgb(206, 205, 195)",
          gray: "#878580",
          darkgray: "rgb(52, 51, 49)",
          dark: "rgb(28, 27, 26)",
          secondary: "rgb(28, 27, 26)",
          tertiary: "rgb(248, 131, 121)",
          highlight: "rgb(220, 20, 60)",
          textHighlight: "rgb(220, 20, 60)",
        },
        darkMode: {
          light: "rgb(16, 15, 15)", // background
          lightgray: "rgb(52, 51, 49)", // borders
          gray: "rgb(87, 86, 83)", // graph links, heavier borders
          darkgray: "rgb(206, 205, 195)", // body text
          dark: "rgb(230, 228, 217)", // header text and icons
          secondary: "rgb(230, 228, 217)", // link color, curr graph node
          tertiary: "rgb(128, 0, 32)", // hover states, visited graph nodes

          highlight: "rgb(220, 20, 60)", // internal link bg, highlighted text, highlighted codes
          textHighlight: "rgb(220, 20, 60)", // markdown highlighted text bg
        },
      },
      // colors: {
      //   lightMode: {
      //     light: "#faf8f8",
      //     lightgray: "#e5e5e5",
      //     gray: "#b8b8b8",
      //     darkgray: "#4e4e4e",
      //     dark: "#2b2b2b",
      //     secondary: "#284b63",
      //     tertiary: "#84a59d",
      //     highlight: "rgba(143, 159, 169, 0.15)",
      //     textHighlight: "#fff23688",
      //   },
      //   darkMode: {
      //     light: "#0a0705",
      //     lightgray: "#993833",
      //     gray: "#ab94a3",
      //     darkgray: "#f9e8e8",
      //     dark: "#fff",
      //     secondary: "#a35656",
      //     tertiary: "#993833",
      //     highlight: "rgba(122, 162, 247, 0.2)", // Translucent secondary color
      //     textHighlight: "#a35656",
      //     calloutColor: "#f89838"
      //   },
      // },
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
