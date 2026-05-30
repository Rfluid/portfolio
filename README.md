# Ruy Vieira — Portfolio

A modern, animated portfolio built with **React + TypeScript + Vite + Tailwind CSS v4 + Motion**, deployed to **GitHub Pages** at **https://rfluid.astervia.tech**.

## Features

- 🌐 **i18n** — English, Portuguese & Spanish, with automatic browser-locale detection and a manual switcher
- 🌗 **Dark / light mode** — auto-detects `prefers-color-scheme`, with a toggle that persists your choice
- 📱 **Responsive**, mobile-first layout
- ✨ Smooth scroll-reveal animations, animated gradient background, typewriter hero
- 🐙 **Live GitHub data** — project cards pull stars/languages live from the GitHub API for both `Rfluid` and the `Astervia` org (1h cache), on top of hand-curated featured projects
- 🚀 GitHub Pages deploy via GitHub Actions + custom domain (CNAME)

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # type-checks + outputs static site to dist/
npm run preview  # preview the production build locally
```

## Deploy (GitHub Pages + custom domain)

1. Create a repo (any name, e.g. `portfolio`) and push this project to `main`.
2. **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. **Settings → Pages → Custom domain** → enter `rfluid.astervia.tech` and save (or rely on the committed `public/CNAME`, which Vite copies into `dist/`).
4. Add this DNS record at your `astervia.tech` DNS provider:

   | Type  | Name (host) | Value               |
   | ----- | ----------- | ------------------- |
   | CNAME | `rfluid`    | `rfluid.github.io.` |

   (If your provider needs the apex differently, the host is the `rfluid` subdomain pointing at `<your-username>.github.io`.)

5. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds & deploys automatically. Enable **Enforce HTTPS** once the cert is issued.

> `base` in `vite.config.ts` is `/` because the site is served from the root of a custom domain.

## Customizing

- **Featured projects & blurbs:** `src/data/projects.ts` (each has `owner`, `repo`, and `en`/`pt`/`es` blurbs)
- **Which repos appear live:** fetched in `src/hooks/useGitHubRepos.ts` (Rfluid user + Astervia org)
- **Social links:** `src/data/socials.ts` (set `EMAIL` to enable an "Email me" link — empty by default so your address isn't published unintentionally)
- **Copy / translations:** `src/locales/{en,pt,es}.json`
- **Tech-stack chips:** `STACK` array in `src/components/About.tsx`
- **Colors / animations:** the `@theme` block in `src/index.css`
