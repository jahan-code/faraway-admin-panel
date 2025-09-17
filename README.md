# Faraway Admin Panel — Desktop App (Tauri)

This repository contains the Faraway Admin Panel built with Next.js and Tauri.
It ships as a native Windows desktop application via Tauri (small installer, low memory).

## Scripts

- `npm run dev` — Next.js dev server (http://localhost:3001)
- `npm run dev:tauri` — Next.js + Tauri in development
- `npm run build` — Next.js production build
- `npm run build:tauri` — Build Windows installer/bundle via Tauri

## Development

1) Install prerequisites (Windows):
   - Rust toolchain (MSVC) via https://rustup.rs
   - Visual Studio Build Tools ("Desktop development with C++")
2) Install Node dependencies: `npm ci`
3) Run Tauri dev: `npm run dev:tauri`

Tauri dev will open a desktop window that loads your Next dev server.

## Production Build

Build the desktop app:

```powershell
npm ci
npm run build
npx tauri build
```

By default, dev loads `http://localhost:3001`. For production, you can:
- Use static export (no SSR) and point Tauri to static files, or
- Run a local server (sidecar) for SSR and point the Tauri window to `http://127.0.0.1:<port>`.

## Notes

- Voice utilities are available under `tools/voice/` for local TTS/STT.
