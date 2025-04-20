import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";
import style from "../styles/components/_backlinks.scss";
import { resolveRelative, simplifySlug } from "../util/path";
import { i18n } from "../i18n";
import { classNames } from "../util/lang";

const Backlinks: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  const slug = simplifySlug(fileData.slug!);
  const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug));
  return (
    <div class={classNames(displayClass, "backlinks")}>
      <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
      <div class="backlinks-container">
        <ul class="overflow">
          {backlinkFiles.length > 0
            ? (
              backlinkFiles.map((f) => (
                <li>
                  <a
                    href={resolveRelative(fileData.slug!, f.slug!)}
                    class="internal" title={f.frontmatter?.title}
                  >
                    {f.frontmatter?.title}
                  </a>
                </li>
              ))
            )
            : <li>{i18n(cfg.locale).components.backlinks.noBacklinksFound}</li>}
        </ul>
      </div>
    </div>
  );
};

Backlinks.css = style;
export default (() => Backlinks) satisfies QuartzComponentConstructor;
