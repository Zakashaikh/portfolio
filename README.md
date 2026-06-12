# zakaurrehman.shaikh — soc.portfolio

Personal portfolio for Zakaurrehman Shaikh — MSc Cyber Security (University of Surrey,
2026), aspiring Tier 1 SOC Analyst. Single-page app with a security-operations
aesthetic: an interactive terminal hero (type `help` in it), projects presented as
incident tickets with triage timelines, cursor spotlight, decode-on-scroll headings,
and full `prefers-reduced-motion` support.

**Stack:** React 19 · Vite · Tailwind CSS 4 · Framer Motion

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repo settings, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` — the included workflow (`.github/workflows/deploy.yml`) builds and
   deploys automatically.

Asset paths are relative (`base: './'` in `vite.config.js`), so the site works at any
repo path — `username.github.io/repo-name/` or a custom domain.

## Before you ship

- Point project ticket links at individual repos if you want per-project links
  (currently they link to the GitHub profile).
