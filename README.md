# rpoletti-website

Ross Poletti's personal website — a multi-page React site (client-side routed) with
an Express backend for spam-guarded contact and service-request forms.

## Tech Stack

| Layer | Stack |
| --- | --- |
| Frontend | React 19 + Vite 7 + React Router 7 |
| Backend | Node.js + Express |
| Contact / service-request delivery | Nodemailer (SMTP) |
| Packaging | Docker (multi-stage build), npm workspaces |
| CI/CD | GitHub Actions, building/pushing to GHCR |

## Project Structure

```
├── client/           React frontend (Vite)
│   └── src/
│       ├── components/   Nav, Footer (shared chrome)
│       ├── pages/         Home, About, Experience, Certifications, Projects,
│       │                  Services, Blog, BlogPost, Contact — one per route
│       └── data/          posts.js (blog post content)
├── server/           Express API + contact/service-request handling
│   └── src/
├── Dockerfile         Multi-stage build: install → build client → run server
└── .github/workflows  GitHub Actions build/publish pipeline
```

Routing is client-side (React Router), with the Express server serving the built
SPA and falling back to `index.html` for any non-API path, so direct loads/refreshes
on any route work correctly.

## Content To Personalize

A few spots are intentionally left as placeholders — search for `EDIT ME` in
`client/src/pages/`:

- `Home.jsx` — hero body copy, sidebar bio, and swapping the initials avatar for a
  real photo.
- `About.jsx` — bio copy.
- `Projects.jsx` — add a `repoUrl` to any project to show a "View source" link.
- `Services.jsx` — service-area description.
- `Certifications.jsx` — add a date/verify link to any entry if you want one shown.
- `data/posts.js` — replace the seed post with real ones.

## Environment Variables

Copy `.env.example` to `.env` and fill in your values.

| Variable | Description |
| --- | --- |
| `PORT` | Port the Express server listens on. Default `4000`. |
| `MAIL_HOST` | SMTP host used to deliver contact form messages. |
| `MAIL_PORT` | SMTP port. Default `587`. |
| `MAIL_SECURE` | `true` for implicit TLS (port 465), `false` otherwise. |
| `MAIL_USER` | SMTP auth username. |
| `MAIL_PASS` | SMTP auth password (an app password works well for Gmail/Workspace). |
| `CONTACT_TO_EMAIL` | Inbox that receives contact form submissions. |
| `CONTACT_FROM_EMAIL` | From address on outgoing contact mail. Defaults to `MAIL_USER`. |
| `SERVICE_REQUEST_TO_EMAIL` | Inbox that receives service-request submissions. Defaults to `CONTACT_TO_EMAIL`. |
| `SERVICE_REQUEST_FROM_EMAIL` | From address on outgoing service-request mail. Defaults to `MAIL_USER`. |

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

This runs the Express API (with `--watch`) and the Vite dev server concurrently.
The Vite dev server proxies `/api` requests to the Express server on port 4000.

Run backend tests:

```bash
npm test
```

### Run With Docker

1. Copy `.env.example` to `.env` and fill in your SMTP values.
2. Build the image:

   ```bash
   docker build -t rpoletti-website .
   ```

3. Run the container:

   ```bash
   docker run --env-file .env -p 4000:4000 rpoletti-website
   ```

4. Open `http://localhost:4000`.

## API

| Endpoint | Description |
| --- | --- |
| `GET /api/health` | Liveness check, returns `{ ok: true }`. |
| `POST /api/contact` | Validates and emails a contact form submission (`name`, `email`, `message`). |
| `POST /api/service-request` | Validates and emails a service request (`name`, `email`, `phone`, `serviceType`, `message`). |

## CI/CD

[`.github/workflows/build.yaml`](.github/workflows/build.yaml) runs on pushes to
`staging` or `main`:

1. `npm ci`
2. Run backend tests (`npm test -w server`)
3. Build the React frontend (`npm run build -w client`)
4. Build and push a Docker image to `ghcr.io/<owner>/rpoletti-website`, tagged
   `staging` or `latest` to match the branch
