# Omasan Etsano — Portfolio

Personal portfolio site, live at https://omasan-etsano.vercel.app. Built with Next.js 16, React 19 and Motion, deployed on Vercel.

## Run locally

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing content

- `content/site.ts`: profile, experience, education, skills, projects, services and FAQs. Most changes happen here.
- `public/projects/`: project screenshots. `public/brands/`: project logos and tech icons used by `TechBadge`.
- `public/Omasan_Etsano_CV.pdf`: the CV linked from the About page.
- `components/portfolio-home.tsx`: shared header, footer, project visuals and the home page.
- `app/globals.css`: the design system and responsive layout.
- `app/works`, `app/about`, `app/contact`: the other routes. `/blog` redirects to `/works` until there are posts.

Adding a project to `projects` in `content/site.ts` gives it a card, a case page at `/works/<slug>` and a sitemap entry.

## Contact form

`app/api/contact/route.ts` sends messages through [Resend](https://resend.com). Set these on Vercel:

- `RESEND_API_KEY`
- `CONTACT_TO`: the inbox that receives messages
- `CONTACT_FROM`: a sender address on a domain verified in Resend

Without them the form falls back to opening the visitor's email app.
