document.addEventListener('nav', () => {
  const drawerButton = document.querySelector('.drawer-button');
  const panel = document.querySelector('.panel-container.mobile-only');
  const overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  document.body.appendChild(overlay);

  function toggleDrawer() {
    panel?.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = panel?.classList.contains('open') ? 'hidden' : '';
  }

  function closeDrawer() {
    panel?.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  drawerButton?.addEventListener('click', toggleDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Close drawer on navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  window.addCleanup(() => {
    drawerButton?.removeEventListener('click', toggleDrawer);
    overlay.removeEventListener('click', closeDrawer);
    overlay.remove();
  });
});
