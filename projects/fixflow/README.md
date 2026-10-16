# FixFlow — IT Troubleshooting Assistant (PWA)

A guided HTML/CSS/JavaScript troubleshooting web app with installable Progressive Web App (PWA) support and an offline app shell.

## Run locally

1. Open this folder in VS Code.
2. Start a local web server (for example, the VS Code Live Server extension) and open the served URL. Service workers do not work when opening `index.html` directly using `file://`.
3. Try the issue cards and follow the guided steps.

## Install on a device

The app must be served from **HTTPS** (or localhost for development). Deploy this folder to a static host such as GitHub Pages, Cloudflare Pages, or Vercel. Open the deployed URL in a supported browser. When the browser offers installation, use the **Install app** button or the browser menu's **Install app / Add to Home screen** option. Browser support and installation UI vary by device.

## Offline behavior

The service worker caches the app shell after the first successful online load. The guided troubleshooting screens can then open offline, but external fonts may not be available offline. If you change files, the cache version in `sw.js` can be incremented to force a fresh cache.

## Safety

FixFlow gives general guidance and does not remotely diagnose devices. Avoid opening power supplies, removing internal parts, disabling security tools, or deleting unfamiliar system files. Seek help from a trusted technician for suspected malware, data loss, overheating, or electrical damage.
