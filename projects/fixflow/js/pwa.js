(() => {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(err => console.warn('Offline support could not be registered:', err)));
  }
  let installPrompt = null;
  const installButton = document.getElementById('installButton');
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault(); installPrompt = event;
    if (installButton) installButton.hidden = false;
  });
  if (installButton) installButton.addEventListener('click', async () => {
    if (!installPrompt) {
      alert('To install FixFlow, open this site in a supported browser menu and choose Install app or Add to Home screen. The site must be hosted on HTTPS or localhost.');
      return;
    }
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null; installButton.hidden = true;
  });
  window.addEventListener('appinstalled', () => { if (installButton) installButton.hidden = true; });
})();
