function toggleCallout(this: HTMLElement) {
  const outerBlock = this.parentElement!;
  outerBlock.classList.toggle("is-collapsed");
}

function setupCallout() {
  const collapsible = document.getElementsByClassName(
    `callout is-collapsible`,
  ) as HTMLCollectionOf<HTMLElement>;

  for (const div of collapsible) {
    const title = div.firstElementChild as HTMLElement;
    if (title) {
      title.addEventListener("click", toggleCallout);
      window.addCleanup(() => title.removeEventListener("click", toggleCallout));
    }
  }
}

document.addEventListener("nav", setupCallout);
window.addEventListener("resize", setupCallout);
