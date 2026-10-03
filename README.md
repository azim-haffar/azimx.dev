# Azim Haffar — Portfolio

Personal engineering portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

## Development

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run lint
npm run build
```

## Maintaining content

- `src/data/projects.ts`: project order, capabilities, limitations, repository links, and engineering notes. Move entries to change the showcase order.
- `src/data/experience.ts`: professional experience.
- `src/data/site.ts`: public contact details, résumé link, and metadata.
- `src/components/sections/Hero.tsx`: positioning and internship availability.
- `src/components/sections/About.tsx`: education and languages.
- `public/Azim_Haffar_Portfolio_Resume.pdf`: the portfolio résumé; keep it aligned with the site before publishing.

Only enable demo links after checking them. Keep planned work separate from implemented features, and distinguish source inspection from runtime verification. Employer/client material is limited to names and high-level contributions.

The site supports light and dark themes, reduced motion, and an explicit background-motion control. Publishing requires a separate review.
