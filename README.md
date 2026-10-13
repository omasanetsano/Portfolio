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

## GitHub activity

The home page shows the GitHub contribution graph for `site.githubUser`, refreshed every 6 hours.

- It shows what your public GitHub profile shows. To include private-repository work (counts only, no repo names), open your GitHub profile, choose **Contribution settings → Private contributions**. The site picks it up within 6 hours.
- Optional: set `GITHUB_TOKEN` on Vercel (a classic token with only the `read:user` scope) to read the calendar from GitHub's official API instead of the public mirror.

If GitHub can't be reached, the section is hidden rather than showing an error.
