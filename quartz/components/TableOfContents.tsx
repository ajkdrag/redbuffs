import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import legacyStyle from "../styles/components/_legacyToc.scss"
import modernStyle from "../styles/components/_toc.scss"
import { classNames } from "../util/lang"

// @ts-ignore
import script from "./scripts/toc.inline"
import { i18n } from "../i18n"

interface Options {
  layout: "modern" | "legacy"
}

const defaultOptions: Options = {
  layout: "modern",
}

const TableOfContents: QuartzComponent = ({
  fileData,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  if (!fileData.toc) {
    return null
  }

  return (
    <div class={classNames(displayClass, "toc")}>
      <button
        type="button"
        id="toc"
        class={fileData.collapseToc ? "collapsed" : ""}
        aria-controls="toc-content"
        aria-expanded={!fileData.collapseToc}
      >
        <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="fold"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div id="toc-content" class={fileData.collapseToc ? "collapsed" : ""}>
        <ul class="overflow">
          {fileData.toc.map((tocEntry) => (
            <li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
              <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
                {tocEntry.text}
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" stroke-width="0.032"></g><g id="SVGRepo_iconCarrier"> <path d="M5 1H4L0 5L4 9H5V6H11C12.6569 6 14 7.34315 14 9C14 10.6569 12.6569 12 11 12H4V14H11C13.7614 14 16 11.7614 16 9C16 6.23858 13.7614 4 11 4H5V1Z" fill="#6B7690"></path> </g></svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
TableOfContents.css = modernStyle
TableOfContents.afterDOMLoaded = script

const LegacyTableOfContents: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
  if (!fileData.toc) {
    return null
  }
  return (
    <details id="toc" open={!fileData.collapseToc}>
      <summary>
        <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
      </summary>
      <ul>
        {fileData.toc.map((tocEntry) => (
          <li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
            <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
              {tocEntry.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
LegacyTableOfContents.css = legacyStyle

export default ((opts?: Partial<Options>) => {
  const layout = opts?.layout ?? defaultOptions.layout
  return layout === "modern" ? TableOfContents : LegacyTableOfContents
}) satisfies QuartzComponentConstructor
