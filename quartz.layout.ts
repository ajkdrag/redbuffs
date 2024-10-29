import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.MobileOnly(Component.SidePanel({
      profile: {
        name: "Altamash Khan",
        bio: "Did the war forge the spear that remained? No. All it did was identify the spear that wouldn't break",

        avatar: "/static/avatar.jpeg"
      },
      navigation: {
        links: [
          {
            text: "Articles",
            link: "/4-Articles/index",
            icon: "articles",
          },
          {
            text: "Zettels",
            link: "/2-Zettels/index",
            icon: "articles",
          },
          {
            text: "Resume",
            link: "/5-Site/my-resume",
            icon: "resume",
          },
          {
            text: "Contact",
            link: "mailto:altukhan43@gmail.com",
            icon: "contact",
          }
        ]
      }
    })),
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
        themeUrl: "https://ajkdrag.in/static",
        lightTheme: "giscus_light",
        darkTheme: "giscus_dark",
      },
    }),
    Component.Backlinks(),
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
    // Component.TagList(),
  ],
  left: [
    Component.DesktopOnly(Component.SidePanel({
      profile: {
        name: "Altamash Khan",
        bio: "Did the war forge the spear that remained? No. All it did was identify the spear that wouldn't break",
        avatar: "/static/avatar.jpeg"
      },
      navigation: {
        links: [
          {
            text: "Articles",
            link: "/4-Articles/index",
            icon: "articles",
          },
          {
            text: "Zettels",
            link: "/2-Zettels/index",
            icon: "articles",
          },
          {
            text: "Resume",
            link: "/5-Site/my-resume",
            icon: "resume",
          },
          {
            text: "Contact",
            link: "mailto:altukhan43@gmail.com",
            icon: "contact",
          }
        ]
      }
    })),
  ],
  right: [
    Component.DesktopOnly(Component.Spacer()),
    Component.DesktopOnly(Component.TableOfContents()),
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
