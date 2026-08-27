# IB English 11 Learner Portfolio

My learner portfolio, powered by Markdown :D

Built with [Astro](https://astro.build), content driven by Markdown files in
`Build/src/content/portfolio/`, and published to GitHub Pages. It's also a PWA
(installable, works offline) and ships live updates via
[Updato](https://github.com/NellowTCS/updato).

## Add or edit content

Every page is a Markdown file under `Build/src/content/portfolio/`. The folder
structure becomes the navigation.

```txt
src/content/portfolio/
├── home.md                          # the Home page
├── major-works/
│   ├── index.md                     # section landing page
│   ├── slaughterhouse-five.md
│   └── the-underground-railroad.md
├── notes-devices.md
├── ...
└── writing-artifacts/
    ├── index.md
    ├── paper-1-rhetorical-analysis.md
    └── non-literary-text-study/
        ├── index.md
        ├── advertisements.md
        └── ...
```

Each file uses frontmatter:

```md
---
title: Page title shown in the sidebar
description: Short subtitle.
order: 10 # controls sorting within its section
---
```

- `title` is required and shown in the sidebar.
- `order` sorts items; lower numbers appear first.
- A folder's `index.md` is the landing page for that section.

## Run locally

```sh
cd Build
npm install
npm run dev        # dev server at localhost:4321
npm run build      # static build to Build/dist
npm run preview    # preview the built site
npm run check      # type-check
```

## Deploy

Pushing to `main` runs GitHub Actions (see `.github/workflows/`):

- `static.yml`: builds and deploys `Build/dist` to GitHub Pages.
- `updato.yml`: publishes the build to the `cdn` branch so clients auto-update.

Deployed at `https://nellowtcs.github.io/learnerportfolio/` (change `BASE_URL`
in `Build/astro.config.mjs` if you host elsewhere).