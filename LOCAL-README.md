# Portfolio Site

Local source copy of the personal portfolio website.

## Run locally

```powershell
npm install
npm run dev
```

Then open http://localhost:5173/.

## Main editable files

- `content/site.ts` — profile, projects, services and FAQ content
- `components/portfolio-home.tsx` — shared UI, navigation, motion and homepage
- `app/globals.css` — design system and responsive layout
- `app/works`, `app/blog`, `app/contact` — supporting routes

The contact form is intentionally a local demo until an email provider is connected.
