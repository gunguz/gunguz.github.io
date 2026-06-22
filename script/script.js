(function() {
  // --- SÜTI KEZELÉS ---
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('acceptCookie');
  const declineBtn = document.getElementById('declineCookie');

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
  }

  function getCookie(name) {
    const c = document.cookie.split('; ');
    for (let item of c) {
      if (item.startsWith(name + '=')) return decodeURIComponent(item.split('=')[1]);
    }
    return null;
  }

  function hideCookieBanner() {
    if (cookieBanner) cookieBanner.classList.add('hidden');
  }

  // Ellenőrizzük a sütiket
  const consent = getCookie('cookieConsent');
  if (consent) {
    hideCookieBanner();
  }
  const savedTheme = getCookie('themeMode');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
  } else {
    document.body.classList.remove('light');
  }

  // Ha elfogadja a sütit
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      setCookie('cookieConsent', 'accepted', 365);
      setCookie('themeMode', document.body.classList.contains('light') ? 'light' : 'dark', 365);
      hideCookieBanner();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function() {
      setCookie('cookieConsent', 'declined', 365);
      hideCookieBanner();
    });
  }

  // --- SÖTÉT/VILÁGOS VÁLTÓ ---
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light');
      const mode = document.body.classList.contains('light') ? 'light' : 'dark';
      setCookie('themeMode', mode, 365);
    });
  }

  // --- HAMBURGER MENU ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // --- KERESÉS ---
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  function searchPage() {
    const term = searchInput.value.toLowerCase().trim();
    if (!term) return;
    const sections = document.querySelectorAll('.section');
    let found = false;
    sections.forEach(section => {
      const text = section.innerText.toLowerCase();
      if (text.includes(term)) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        section.style.borderColor = 'var(--primary)';
        section.style.transition = 'border-color 0.3s';
        setTimeout(() => {
          section.style.borderColor = '';
        }, 3000);
        found = true;
      }
    });
    if (!found) alert('Nem található ilyen tartalom: ' + term);
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', searchPage);
  }
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') searchPage();
    });
  }

  // --- MENÜGOMBOK (gyors ugrás) ---
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        // mobil menü bezárása
        if (navLinks) navLinks.classList.remove('open');
      }
    });
  });

  // --- Online jelentkezés gombok (demo) ---
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const text = this.innerText;
      if (text.includes('jelentkezés') || text.includes('Jelentkezés') || text.includes('Feliratkozom')) {
        e.preventDefault();
        alert('Köszönjük! Az űrlap a következő lépésben jelenik meg.');
      }
    });
  });

  // --- Állami támogatás badge info ---
  console.log('🚗 AutoZone oldal betöltve – sötét/világos mód sütivel mentve.');
})();