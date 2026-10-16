// Progressive enhancement: backend contact submission; static portfolio still works without PHP.
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initContactForm === 'function') {
    initContactForm();
  }
});
