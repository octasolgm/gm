# GM Rehman — Full Stack Portfolio

Professional portfolio website for **Ghulam Muhammad** — Senior Full Stack Developer.

- **Frontend:** React + Vite + Tailwind CSS (static build)
- **Backend:** NestJS + Prisma + MySQL
- **Features:** Contact form, email/WhatsApp automations, event tracking

## Project Structure

```
gmrehman/
├── apps/
│   ├── web/          # React portfolio (deploy to public_html)
│   └── api/          # NestJS API (deploy via cPanel Node.js App)
├── packages/
│   └── shared-data/  # Portfolio content (profile, projects, skills)
```

## Local Development

### Prerequisites

- Node.js 18+
- MySQL (local or remote)

### Setup

```bash
# Install dependencies
npm install

# API environment
cp apps/api/.env.example apps/api/.env
# Edit DATABASE_URL and SMTP settings

# Web environment
cp apps/web/.env.local.example apps/web/.env.local

# Database
cd apps/api
npx prisma generate
npx prisma db push
cd ../..

# Run both (two terminals)
npm run dev:api   # http://localhost:4000
npm run dev:web   # http://localhost:3000
```

In dev, Vite proxies `/api/*` to the NestJS API on port 4000.

## Deploy to Unique Links cPanel (gmrehman.com)

### Step 1 — MySQL Database

1. cPanel → **MySQL Databases**
2. Create database: `gmrehman_portfolio`
3. Create user and assign ALL PRIVILEGES
4. Note connection string: `mysql://user:pass@localhost:3306/gmrehman_portfolio`

### Step 2 — Deploy NestJS API

1. cPanel → **Git Version Control** → Clone repo to `/home/gmrehman/api`
2. cPanel → **Setup Node.js App**
   - Node version: 18 or 20
   - Application root: `api/apps/api`
   - Application URL: `api.gmrehman.com` (create subdomain first)
   - Application startup file: `dist/main.js`
3. Set environment variables in Node.js App panel (from `.env.example`)
4. Run via SSH or cPanel terminal:

```bash
cd ~/api
npm install
npm run build:api
cd apps/api
npx prisma generate
npx prisma migrate deploy
npm run build
```

5. Restart Node.js app in cPanel

API health check: `https://api.gmrehman.com/api/health`

### Step 3 — Deploy Frontend

1. Build locally or on server:

```bash
# Set production API URL
echo "VITE_API_URL=https://api.gmrehman.com/api" > apps/web/.env.local
npm run build:web
```

2. Upload contents of `apps/web/dist/` to `/home/gmrehman/public_html/`
3. Ensure `.htaccess` is included (from `apps/web/public/.htaccess`)

Site live at: `https://gmrehman.com`

### GitHub Actions auto-deploy (FTP)

See **[DEPLOY.md](./DEPLOY.md)** for the full setup guide.

**Quick setup — add these GitHub Secrets** (Settings → Secrets → Actions):

| Secret | Value |
|--------|--------|
| `FTP_WEB_USERNAME` | `admin@gmrehman.com` |
| `FTP_WEB_PASSWORD` | your web FTP password |
| `FTP_API_USERNAME` | `admin@api.gmrehman.com` |
| `FTP_API_PASSWORD` | your API FTP password |

Optional: `FTP_WEB_DIR` (`/public_html/`), `FTP_API_DIR` (`/api/apps/api/`), `VITE_API_URL`

Push to `main` to deploy. Manual run: Actions → **Deploy Portfolio** → **Run workflow**

### Step 4 — Email & WhatsApp Automations

**Email (cPanel SMTP):**
```
SMTP_HOST=mail.gmrehman.com
SMTP_PORT=587
SMTP_USER=contact@gmrehman.com
SMTP_PASS=your_password
OWNER_EMAIL=soomrogm@gmail.com
```

**WhatsApp (CallMeBot — free):**
1. Visit https://www.callmebot.com/blog/free-api-whatsapp-messages/
2. Activate API for your WhatsApp number
3. Set `WHATSAPP_PHONE=923313543210` and `CALLMEBOT_API_KEY=...`

### View Contact Messages

```bash
curl -H "x-admin-key: YOUR_ADMIN_KEY" https://api.gmrehman.com/api/contact/messages
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/portfolio` | Full portfolio JSON |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/contact/track` | Track click events |
| GET | `/api/contact/messages` | Admin: list messages |

## License

Private — © Ghulam Muhammad
