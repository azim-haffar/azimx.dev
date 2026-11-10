# Azim Haffar — Portfolio

Personal engineering portfolio built with Next.js, React, TypeScript, and Tailwind CSS.

## 60-second portfolio tour

1. [Browse the work](https://www.azimx.dev/#projects): six project case studies explain the problem, contribution and engineering decision.
2. [Explore Skina](https://www.azimx.dev/projects/skina) for deterministic selection and bounded AI explanations, or [MotionTrace](https://www.azimx.dev/projects/motiontrace) for a research comparison that preserves a negative result.
3. [Inspect the content model](src/data/projects.ts): capabilities, screenshots, evidence links and limits are kept together.

**Built with:** Next.js, React, TypeScript and Tailwind CSS. Public case studies are available without an account. Linked projects have separate access and evidence limits; private source and research assets are not included here.

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

## Weekly review (about 30 minutes)

- Check the public résumé download, contact links, mobile menu, and project pages.
- Update capabilities and limits only when source or runtime evidence changes.
- Keep availability and graduation dates consistent with the résumé.
- Reorder projects when a new project supplies stronger engineering evidence.
- Run the checks above and review both themes before publishing visual changes.

OrderFlow has an interactive architecture explanation. It is not connected to its backend and does not substitute for runtime tests or a recorded demonstration.
