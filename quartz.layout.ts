import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(), 
    Component.Search(),
    Component.SocialIcon({
      platform: "GitHub",
      url: "https://github.com/ajkdrag",
    }),
    Component.SocialIcon({
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/altamash-khan-7183681b8",
    }),
    Component.Darkmode(),
  ],
  afterBody: [
    Component.Comments({
      provider: "giscus",
      options: {
        // from data-repo
        repo: "ajkdrag/redbuffs",
        // from data-repo-id
        repoId: "R_kgDOM7w1Rg",
        // from data-category
        category: "Announcements",
        // from data-category-id
        categoryId: "DIC_kwDOM7w1Rs4CjFPn",
        themeUrl: "https://raw.githubusercontent.com/rea1shane/giscus-theme/refs/heads/main",
        lightTheme: "light",
        darkTheme: "dark",
      },
    }),
  ],
  footer: Component.Footer({
    links: {
      Source: "https://github.com/ajkdrag/redbuffs",
    },
  }),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.DesktopOnly(Component.TableOfContents()),
  ],
  left: [
    // Component.MobileOnly(Component.Spacer()),
    // Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    // Component.DesktopOnly(Component.TableOfContents()),
    // Component.Backlinks(),
    // Component.Graph(),
  ],
};

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    // Component.PageTitle(),
    // Component.MobileOnly(Component.Spacer()),
    // Component.Search(),
    // Component.Darkmode(),
    // Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
};
