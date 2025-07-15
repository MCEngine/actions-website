function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');

  if (icon && label) {
    if (theme === 'dark') {
      icon.textContent = '🌙';
      label.textContent = 'Dark Mode';
    } else {
      icon.textContent = '☀️';
      label.textContent = 'Light Mode';
    }
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

(function () {
  // Load theme toggle HTML from external file
  fetch('../theme-toggle.html')
    .then(response => response.text())
    .then(html => {
      const container = document.getElementById('theme-toggle-container');
      container.innerHTML = html;
      const stored = localStorage.getItem('theme');
      if (stored) {
        setTheme(stored);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }
    });
})();
