# rpoletti-website

Ross Poletti's personal website — a single-page React site with an Express backend
for a spam-guarded contact form.

## Tech Stack

| Layer | Stack |
| --- | --- |
| Frontend | React 19 + Vite 7 |
| Backend | Node.js + Express |
| Contact delivery | Nodemailer (SMTP) |
| Packaging | Docker (multi-stage build), npm workspaces |
| CI/CD | GitHub Actions, building/pushing to GHCR |

## Project Structure

```
├── client/           React frontend (Vite)
│   └── src/
│       └── components/   Nav, Hero, About, Projects, Homelab, Contact, Footer
├── server/           Express API + contact form handling
│   └── src/
├── Dockerfile         Multi-stage build: install → build client → run server
└── .github/workflows  GitHub Actions build/publish pipeline
```

## Content To Personalize

A few spots are intentionally left as placeholders — search for `EDIT ME` in
`client/src/components/`:

- `Hero.jsx` / `About.jsx` — bio copy.
- `Projects.jsx` — add a `repoUrl` to any project to show a "View source" link.
- `Homelab.jsx` — add hardware/setup detail if you want it.

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
| `CONTACT_FROM_EMAIL` | From address on outgoing mail. Defaults to `MAIL_USER`. |

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

## CI/CD

[`.github/workflows/build.yaml`](.github/workflows/build.yaml) runs on pushes to
`staging` or `main`:

1. `npm ci`
2. Run backend tests (`npm test -w server`)
3. Build the React frontend (`npm run build -w client`)
4. Build and push a Docker image to `ghcr.io/<owner>/rpoletti-website`, tagged
   `staging` or `latest` to match the branch
