# altannic — UI/UX design studio website

> *altannik* (pl.) — the bowerbird. We build interfaces the way bowerbirds build bowers.

An origami-and-handwriting themed single-page site: paper elements that unfold on scroll and
hover, a scroll-driven accordion-fold process strip, an "arrange the bower" drag-and-drop toy,
and an envelope contact form that opens as you arrive.

**Live:** https://www.altannic.design · https://www.altannic.com (see [docs/DOMAINS.md](docs/DOMAINS.md))

## Stack
- React 19 + Vite, Tailwind CSS v4, Framer Motion, Lucide icons
- Fonts: Fraunces (display), Caveat (handwriting), DM Sans (body)
- Origami illustrations in `public/images/` were AI-generated for this project

## Develop
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

## Deploy
Hosted on **AWS Amplify Hosting** (`eu-west-2`, app `d11cxvj966thdw`), connected to this repo.
Every push to `master` builds and deploys automatically.
- `amplify.yml`: build spec (Node 22)
- `customHttp.yml`: security and cache headers

## Structure
```
src/
  components/  Fold.jsx (FoldIn, Accordion, FoldCard, FoldWords) · Origami.jsx · Hand.jsx · UI.jsx
  sections/    Nav, Hero, Ribbon, Story, Services, Process, Bower, Work, Notes, Contact, Footer
```

Project names, stats and testimonials are placeholder demo content.
