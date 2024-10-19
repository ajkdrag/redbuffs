import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";
import style from "./styles/backlinks.scss";
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
      <ul class="overflow">
        {backlinkFiles.length > 0
          ? (
            backlinkFiles.map((f) => (
              <li>
                <a
                  href={resolveRelative(fileData.slug!, f.slug!)}
                  class="internal"
                >
                  {f.frontmatter?.title}
                  <svg
                    aria-hidden="true"
                    class="external-icon"
                    style="max-width:0.8em;max-height:0.8em;"
                    viewBox="0 0 512 512"
                  >
                    <path d="M320 0H288V64h32 82.7L201.4 265.4 178.7 288 224 333.3l22.6-22.6L448 109.3V192v32h64V192 32 0H480 320zM32 32H0V64 480v32H32 456h32V480 352 320H424v32 96H64V96h96 32V32H160 32z">
                    </path>
                  </svg>
                </a>
              </li>
            ))
          )
          : <li>{i18n(cfg.locale).components.backlinks.noBacklinksFound}</li>}
      </ul>
    </div>
  );
};

Backlinks.css = style;
export default (() => Backlinks) satisfies QuartzComponentConstructor;
