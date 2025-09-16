# Faraway Admin Panel — Desktop App

[![Build Windows Installer](https://github.com/jahan-code/faraway-admin-panel/actions/workflows/build-windows.yml/badge.svg)](https://github.com/jahan-code/faraway-admin-panel/actions/workflows/build-windows.yml)

This repository contains the Faraway Admin Panel built with Next.js + Electron. It ships as a native Windows desktop application (NSIS installer) using `electron-builder` with `output: "standalone"` for offline support.

## Scripts

- `npm run dev` — Next.js dev server
- `npm run dev:electron` — Next.js + Electron in development
- `npm run build` — Next.js production build (standalone)
- `npm run build:installer` — Build Windows installer (NSIS)
- `run-faraway.bat` — Quick launcher for the unpacked app using the production URL
- `rebuild-and-package.bat` — Full local rebuild on D: (uses caches on `D:/dev-cache/`, disables Tailwind oxide, builds NSIS installer)

## Clean CI Build (Recommended)

We build clean installers in GitHub Actions on Windows runners to avoid local locks and disk issues.

Workflow: `.github/workflows/build-windows.yml`
- Installs deps with `npm ci`
- Builds Next.js (`output: standalone`)
- Packages with `electron-builder --win nsis`
- Uploads `dist/` as an artifact

How to use:
1. Push the repo to GitHub (ensure the workflow file is included).
2. Open the "Actions" tab → run "Build Windows Installer".
3. Download artifact `faraway-admin-panel-dist` → inside `dist/` you will find:
  - `win-unpacked/electron.exe` (unpacked app)
  - `Faraway Admin Panel-<version>.exe` (Windows installer)

## Local Build on D: (Offline App)

If you prefer building locally on Windows, use `rebuild-and-package.bat` from an Administrator PowerShell:

```powershell
Set-Location "d:\\farway admin\\faraway-admin-panel"
.\\rebuild-and-package.bat
```

What it does:
- Uses caches on `D:\\dev-cache\\...` and disables Tailwind native oxide
- Removes `node_modules`, `.next`, `dist`
- `npm ci` → `npm run build` → `npx electron-builder --win nsis`

Outputs:
- `dist\\win-unpacked\\electron.exe`
- `dist\\Faraway Admin Panel-<version>.exe`

## Packaging Notes

- `electron-builder.yml`
  - `asar: true`, `asarUnpack` for `backend/**/*` and native `.node` files
  - Includes: `electron/**`, `backend/**`, `.next/standalone/**`, `.next/static/**`, `public/**`, `package.json`, `next.config.ts`
  - NSIS configured with `build/installer.nsh`
- `next.config.ts` sets `output: "standalone"` for offline runtime inside Electron.
- In dev, Electron uses `ELECTRON_START_URL` (set by scripts). In production, Electron spawns `.next/standalone/server.js` and serves on `http://localhost:3000` inside the app window.

## Troubleshooting

- Antivirus locking native binaries (e.g., Tailwind oxide) can break installs. Our CI disables oxide via `TAILWIND_DISABLE_OXIDE=1`. The local rebuild script also disables it and force‑cleans locks.
- Low disk on `C:`: caches are redirected to `D:` in local scripts.

## Roadmap (optional)

- Code signing for the installer (via CI secrets)
- Auto‑updates using GitHub Releases and `electron-updater`
