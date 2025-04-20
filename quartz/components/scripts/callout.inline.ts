function toggleCallout(this: HTMLElement) {
  const outerBlock = this.parentElement!;
  outerBlock.classList.toggle("is-collapsed");
  const collapsed = outerBlock.classList.contains("is-collapsed");
  const title = this;
  const buffer = 6; // px
  const height = collapsed ? title.offsetHeight + buffer : outerBlock.scrollHeight;
  outerBlock.style.maxHeight = height + "px";

  // walk and adjust height of all parents
  let current = outerBlock;
  let parent = outerBlock.parentElement;
  while (parent) {
    if (!parent.classList.contains("callout")) {
      return;
    }
    const collapsed = parent.classList.contains("is-collapsed");
    const height = collapsed ? parent.offsetHeight + buffer : parent.scrollHeight + current.scrollHeight;
    parent.style.maxHeight = height + "px";
    current = parent;
    parent = parent.parentElement;
  }
}

function setupCallout() {
  const collapsible = document.getElementsByClassName(
    `callout is-collapsible`,
  ) as HTMLCollectionOf<HTMLElement>;
  const buffer = 19; // px
  for (const div of collapsible) {
    const title = div.firstElementChild as HTMLElement;
    if (title) {
      title.addEventListener("click", toggleCallout);
      window.addCleanup(() => title.removeEventListener("click", toggleCallout));
      const collapsed = div.classList.contains("is-collapsed");
      // Always add buffer for collapsed state
      const height = collapsed ? title.offsetHeight + buffer : div.scrollHeight;
      div.style.maxHeight = height + "px";
    }
  }
}

document.addEventListener("nav", setupCallout);
window.addEventListener("resize", setupCallout);
