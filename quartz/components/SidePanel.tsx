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
  icon: "github" | "resume" | "articles" | "contact"
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
  resume: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  github: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  articles: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path><path d="M8 6h9"></path><path d="M8 10h9"></path><path d="M8 14h9"></path></svg>,
  contact: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
}



export default ((opts: PanelProps) => {
  function SidePanel(props: QuartzComponentProps) {
    const { displayClass } = props

    return (
      <div class={classNames(displayClass, "drawer-container")}>
        {/* Only show button for mobile */}
        {displayClass === "mobile-only" && (
          <button 
            class="drawer-button"
            aria-label="Toggle menu"
            aria-expanded="false"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}

        
                  <div class="panel-content">
            <div class="profile">
              <img src={opts.profile.avatar} alt={opts.profile.name} class="avatar"/>
              <h2 class="name">{opts.profile.name}</h2>
              <p class="bio">{opts.profile.bio}</p>
            </div>

        <div class="panel-container">

            
        <nav class="navigation">
  {opts.navigation.links.map((link) => (
 <a 
 href={link.link} 
 class={link.external ? "nav-link external" : "nav-link"} //
 {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
>
 <span class="icon">{icons[link.icon]}</span>
 <span class="text">{link.text}</span>
</a>
  ))}
</nav>

          </div>
        </div>
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

  SidePanel.css = `
    .drawer-container {
  display: flex;
  flex-direction: column;
}

.drawer-button:hover {
  background: var(--highlight);
}

/* Styles Desktop */
.drawer-container.desktop-only {
  margin-left: auto; /* Alignement à droite sur les grands écrans */

  .panel-container {
    position: fixed; /* Fixe le panneau à droite */
    top: 0;
    right: 0; /* Aligne à droite */
    width: 250px;
    height: 100vh;
    background: var(--light);
    border-left: 1px solid var(--lightgray);
    padding: 2rem 1.5rem;
    overflow-y: auto;
  }

  .panel-containerr {
  display: flex;
  flex-direction: column;
  background: var(--light);
  padding: 20px; /* Ajoute un peu de padding pour espacer le contenu */
}
}

/* Styles Mobile */
.drawer-container.mobile-only {
  .panel-container {
    position: fixed;
    top: 0;
    right: 0; /* Aligne à droite pour les mobiles */
    width: 250px;
    height: 100vh;
    background: var(--light);
    border-left: 1px solid var(--lightgray);
    transform: translateX(100%); /* Hors de l'écran à droite */
    transition: transform 0.3s ease;
    z-index: 99;
    padding: 2rem 1.5rem;
    overflow-y: auto;
  }

  .panel-container.open {
    transform: translateX(0); /* Affiche le panneau */
  }
}

/* Contenu du panneau */
.panel-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Profil */
.profile {
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  object-fit: cover;
}

.name {
  font-family: var(--headerFont);
  font-size: 1.5rem;
  margin: 1rem 0 0.5rem;
  color: var(--dark);
}

.bio {
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--gray);
  margin: 0;
}

/* Navigation */
.navigation {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
background: color-mix(in srgb, var(--secondary) 4%, transparent);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  color: var(--dark);
  font-family: var(--headerFont);
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: var(--highlight);
  color: var(--secondary);
}

.nav-link .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  color: inherit;
}
  `

  return SidePanel
}) satisfies QuartzComponentConstructor<PanelProps>
