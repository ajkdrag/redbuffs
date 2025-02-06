import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = () => {
  return (
    <article>
      <script>
        {`window.location.href = window.location.href;`}
      </script>
      <noscript>
        <meta http-equiv="refresh" content="0; url=" />
      </noscript>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
