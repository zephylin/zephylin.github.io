/**
 * main.js — Shared functionality across all pages
 * 
 * HOW THIS FILE WORKS (for learning):
 * - This file runs on EVERY page of your portfolio
 * - It injects the navigation bar and footer (so you write them once, not 5 times)
 * - It handles the dark/light theme toggle
 * - It handles the mobile hamburger menu
 * 
 * KEY CONCEPTS:
 * - document.querySelector('.class') = find an HTML element by its class
 * - element.innerHTML = '...' = replace the content inside an element
 * - element.addEventListener('click', function) = "when clicked, run this function"
 * - localStorage.getItem/setItem = save/read data that persists across page loads
 */

// ============================================
// NAVIGATION & FOOTER INJECTION
// ============================================
// Instead of copying the nav HTML into every page,
// we define it once here and inject it via JavaScript.
// This means if you want to add a new page link, 
// you change it in ONE place (here).

function getNavHTML(currentPage) {
  // currentPage tells us which link to highlight as "active"
  const pages = [
    { href: 'index.html', label: 'Home', id: 'home' },
    { href: 'about.html', label: 'About', id: 'about' },
    { href: 'projects.html', label: 'Projects', id: 'projects' },
    { href: 'research.html', label: 'Research', id: 'research' },
    { href: 'contact.html', label: 'Contact', id: 'contact' },
  ];

  const links = pages.map(page => {
    const activeClass = page.id === currentPage ? ' active' : '';
    return `<a href="${page.href}" class="nav-link${activeClass}">${page.label}</a>`;
  }).join('');

  return `
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <div class="container">
        <a href="index.html" class="nav-brand">Zephylin D.</a>
        <div class="nav-links" id="nav-links">
          ${links}
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
            <svg id="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
        <button class="nav-mobile-btn" id="nav-mobile-btn" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  `;
}

function getFooterHTML() {
  const year = new Date().getFullYear();
  return `
    <footer class="footer">
      <div class="container">
        <p class="footer-text">&copy; ${year} Zephylin Dusengimana</p>
        <div class="footer-links">
          <a href="https://www.linkedin.com/in/zephylin-d/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
            </svg>
          </a>
          <a href="https://github.com/zephylin" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12 12 0 0 0 12 .3z"/>
            </svg>
          </a>
          <a href="mailto:dzephylin@gmail.com" aria-label="Email" title="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m2 7 10 6 10-6"></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  `;
}

// ============================================
// INITIALIZE PAGE
// ============================================
// This function runs when any page loads.
// It injects the nav/footer and sets up interactivity.

function initPage(currentPage) {
  // 1. Inject navigation at the top of <body>
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) {
    navPlaceholder.innerHTML = getNavHTML(currentPage);
  }

  // 2. Inject footer at the bottom
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = getFooterHTML();
  }

  // 3. Initialize theme toggle
  initTheme();

  // 4. Initialize mobile menu
  initMobileMenu();

  // 5. Initialize typed role effect (home page)
  initTypedRole();
}

// ============================================
// THEME TOGGLE (Light/Dark Mode)
// ============================================
// We save the user's preference in localStorage
// so it persists even after closing the browser.

function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  // Load saved theme, default to 'light'
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(icon, saved);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(icon, next);
    });
  }
}

function updateThemeIcon(icon, theme) {
  if (!icon) return;
  // Moon icon for light mode (click to go dark), Sun icon for dark mode (click to go light)
  if (theme === 'dark') {
    icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  } else {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  }
}

// ============================================
// MOBILE MENU
// ============================================
// On small screens, nav links are hidden behind
// a hamburger button. Clicking it toggles the menu.

function initMobileMenu() {
  const btn = document.getElementById('nav-mobile-btn');
  const links = document.getElementById('nav-links');

  if (btn && links) {
    btn.addEventListener('click', () => {
      links.classList.toggle('open');
      // Animate hamburger icon to X
      btn.classList.toggle('active');
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        btn.classList.remove('active');
      });
    });
  }
}

// ============================================
// TYPED ROLE EFFECT
// ============================================
function initTypedRole() {
  const el = document.getElementById('typed-role');
  if (!el) return;

  const roles = ['AI Software Engineer', 'Researcher', 'ML Engineer', 'Mathematics Enthusiast'];
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseAfterType = 1800;
  const pauseAfterDelete = 400;
  let roleIndex = 0;
  let charIndex = 0;

  function type() {
    const role = roles[roleIndex];
    if (charIndex < role.length) {
      el.textContent += role.charAt(charIndex);
      charIndex++;
      setTimeout(type, typeSpeed);
    } else {
      setTimeout(erase, pauseAfterType);
    }
  }

  function erase() {
    if (charIndex > 0) {
      el.textContent = el.textContent.slice(0, -1);
      charIndex--;
      setTimeout(erase, deleteSpeed);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, pauseAfterDelete);
    }
  }

  type();
}

// ============================================
// UTILITY: Set page title
// ============================================
function setPageMeta(title, description) {
  document.title = title + ' | Zephylin Dusengimana';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  }
}
