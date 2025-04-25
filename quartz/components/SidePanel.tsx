import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface ProfileConfig {
  name: string
  avatar: string
  bio: string
}

interface NavigationLink {
  text: string
  link: string
  icon: "github" | "resume" | "problemsets" | "contact" | "zettels"
  external?: boolean
}

interface NavigationConfig {
  links: NavigationLink[]
}

interface PanelProps {
  profile: ProfileConfig
  navigation: NavigationConfig
}

const icons = {
  zettels: (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path style="stroke:none;stroke-width:2;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" d="M0 0h24v24H0z" /><rect style="stroke:currentColor;stroke-width:2;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" x="-7" y="-9" rx="2" ry="2" width="14" height="18" transform="translate(12 12)" /><path style="stroke:currentColor;stroke-width:2;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="translate(12 7)" d="M-3 0h6" /><path style="stroke:currentColor;stroke-width:2;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="translate(12 11)" d="M-3 0h6" /><path style="stroke:currentColor;stroke-width:2;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="translate(11 15)" d="M-2 0h4" /></svg>),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  resume: (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path style="stroke:currentColor;stroke-width:1.8072289156626506;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="matrix(.83 0 0 .83 2.165 2.165)" d="M12.876 22.876h-11a1 1 0 0 1-1-1v-20a1 1 0 0 1 1-1h16.5a1 1 0 0 1 1 1v8" stroke-linecap="round"/><path style="stroke:currentColor;stroke-width:1.8072289156626506;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="matrix(.83 0 0 .83 7.46 13.137)" d="M-2.5 0h5"/><path style="stroke:currentColor;stroke-width:1.8072289156626506;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="matrix(.83 0 0 .83 7.46 16.167)" d="M-2.5 0h5"/><path style="stroke:currentColor;stroke-width:1.8072289156626506;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="matrix(.83 0 0 .83 6.887 9.012)" d="M-1.81 0h3.62"/><circle style="stroke:currentColor;stroke-width:1.8072289156626506;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" r="4.529" transform="matrix(.83 0 0 .83 15.992 15.992)"/><path style="stroke:currentColor;stroke-width:1.8072289156626506;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="matrix(.83 0 0 .83 20.01 20.01)" d="m1.624 1.624-3.248-3.248"/><circle style="stroke:currentColor;stroke-width:1.8072289156626506;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" r="1.486" transform="matrix(.83 0 0 .83 13.519 5.941)"/><path style="stroke:currentColor;stroke-width:1.8072289156626506;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="matrix(.83 0 0 .83 2.173 2.165)" d="M16.11 9.009a2.507 2.507 0 0 0-4.857 0" stroke-linecap="round"/><path style="stroke:currentColor;stroke-width:1.8072289156626506;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="matrix(.83 0 0 .83 6.232 6.248)" d="M-1.017 0h2.034"/></svg>  ),
  problemsets: (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path style="stroke:none;stroke-width:2;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="matrix(.83 0 0 .83 .04 .04)" d="M0 0h28.8v28.8H0z" /><path style="stroke:currentColor;stroke-width:1.8072289156626506;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="matrix(.83 0 0 .83 -.043 -.043)" d="M12 14.4H10.8v6h1.2m4.8 -6h1.2v6h-1.2m0 -16.8v4.8a1.2 1.2 0 0 0 1.2 1.2h4.8" stroke-linecap="round" /><path style="stroke:currentColor;stroke-width:1.8072289156626506;stroke-dasharray:none;stroke-linecap:round;stroke-dashoffset:0;stroke-linejoin:round;stroke-miterlimit:4;fill:none;fill-rule:nonzero;opacity:1" transform="matrix(.83 0 0 .83 -.043 -.043)" d="M20.4 25.2H8.4a2.4 2.4 0 0 1 -2.4 -2.4V6a2.4 2.4 0 0 1 2.4 -2.4h8.4l6 6v13.2a2.4 2.4 0 0 1 -2.4 2.4" stroke-linecap="round" /></svg>
  ),
  contact: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  ),
}

export default ((opts: PanelProps) => {
  function SidePanel(props: QuartzComponentProps) {
    const { displayClass } = props

    return (
      <div class={classNames(displayClass, "drawer-container")}>
        {displayClass === "mobile-only" && (
          <button class="drawer-button" aria-label="Toggle menu" aria-expanded="false">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}

        <div class="panel-container">
          {/* En version mobile, affiche le profil DANS panel-container */}
          {displayClass === "mobile-only" && (
            <div class="profile">
              <img src={opts.profile.avatar} alt={opts.profile.name} class="avatar" />
              <h2 class="name">{opts.profile.name}</h2>
              <p class="bio">{opts.profile.bio}</p>
            </div>
          )}

          <nav class="navigation">
            {opts.navigation.links.map((link) => (
              <a
                href={link.link}
                class={link.external ? "nav-link external" : "nav-link"}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span class="icon">{icons[link.icon]}</span>
                <span class="text">{link.text}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* En version desktop, affiche le profil en dehors de panel-container */}
        {displayClass === "desktop-only" && (
          <div class="profile">
            <img src={opts.profile.avatar} alt={opts.profile.name} class="avatar" />
            <h2 class="name">{opts.profile.name}</h2>
            <p class="bio">{opts.profile.bio}</p>
          </div>
        )}
      </div>
    )
  }

  // Mobile drawer setup
  SidePanel.afterDOMLoaded = `
    function setupMobileDrawer() {
      const drawerContainer = document.querySelector('.mobile-only.drawer-container')
      if (!drawerContainer) return
      
      const button = drawerContainer.querySelector('.drawer-button')
      const panel = drawerContainer.querySelector('.panel-container')
      
      if (!button || !panel) return
      
      function toggleDrawer(e) {
        e.stopPropagation()
        panel.classList.toggle('open')
        button.setAttribute('aria-expanded', panel.classList.contains('open'))
        document.body.style.overflow = panel.classList.contains('open') ? 'hidden' : ''
      }
      
      function closeDrawer(e) {
        if (!panel.contains(e.target) && !button.contains(e.target)) {
          panel.classList.remove('open')
          button.setAttribute('aria-expanded', 'false')
          document.body.style.overflow = ''
        }
      }
      
      button.addEventListener('click', toggleDrawer)
      document.addEventListener('click', closeDrawer)
    }
    
    setupMobileDrawer()
  `

  // Removed SidePanel.css. All styles are now in quartz/styles/components/_side-panel.scss

  return SidePanel
}) satisfies QuartzComponentConstructor<PanelProps>
