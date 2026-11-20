# Mongolian Architectural Archives

A React + Vite website for the Mongolian Architectural Archives project.

## Run locally

1. Install Node.js (LTS recommended).
2. Open this folder in Visual Studio Code.
3. Open **Terminal → New Terminal**.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Main files

- `src/App.tsx` — website content and interactions
- `src/index.css` — global styling, theme variables and fonts
- `public/assets/` — images and icons
- `index.html` — page metadata and HTML shell
- `vite.config.ts` — standard Vite configuration

This project no longer depends on Figma Make's `.figma/` runtime/configuration.
