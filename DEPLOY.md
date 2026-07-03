# GitHub Actions Deploy Setup

Auto-deploy on every push to `main` using your cPanel FTP accounts.

## Your FTP accounts (cPanel)

| Account | Server root | Destination folder |
|---------|-------------|-------------------|
| `admin@gmrehman.com` | `/` | `public_html` → **gmrehman.com** |
| `admin@api.gmrehman.com` | `/` | `public_html/api.gmrehman.com` |

- **FTP server:** `ftp.gmrehman.com`
- **Port:** `21` (FTPS)

> **Important:** The NestJS Node.js app runs at `api/apps/api` (not inside `public_html/api.gmrehman.com`).  
> For API deploy, use **`admin@gmrehman.com`** with folder `/api/apps/api/` — not the api subdomain FTP home.

---

## Step 1 — Push code to GitHub

If not already on GitHub:

```bash
cd c:\Users\Hp\Documents\GitHub\gmrehman
git init
git add .
git commit -m "Portfolio with GitHub Actions deploy"
git branch -M main
git remote add origin https://github.com/octasolgm/gm.git
git push -u origin main
```

Use your real GitHub repo URL if different.

---

## Step 2 — Add GitHub Secrets

1. Open your repo on **GitHub.com**
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret below:

### Required secrets

| Secret name | Value |
|-------------|--------|
| `FTP_WEB_USERNAME` | `admin@gmrehman.com` |
| `FTP_WEB_PASSWORD` | your FTP password (from cPanel) |
| `FTP_API_USERNAME` | `admin@gmrehman.com` |
| `FTP_API_PASSWORD` | same FTP password |
| `FTP_WEB_DIR` | `/public_html/` |
| `FTP_API_DIR` | `/api/apps/api/` |

> Use the **main** account (`admin@gmrehman.com`) for both web and API uploads.  
> The `admin@api.gmrehman.com` account only reaches `public_html/api.gmrehman.com`, which is not the Node.js app folder.

### Optional secrets

| Secret name | Default | When to change |
|-------------|---------|----------------|
| `VITE_API_URL` | `https://api.gmrehman.com/api` | API URL changes |

---

## Step 3 — Find correct FTP folders (FileZilla)

Connect each account once and note the folder you land in.

### Website (`admin@gmrehman.com`)

- Upload target: **`public_html`**
- Set `FTP_WEB_DIR` to `/public_html/` (or what FileZilla shows)

### API (`admin@api.gmrehman.com`)

Your Node.js app in cPanel uses **Application root:** `api/apps/api`

That is usually:

```
/home/gmrehman/api/apps/api/
```

**If** the API FTP account only opens `public_html/api.gmrehman.com`, that folder is for the subdomain website — **not** the NestJS app. Then either:

- Use `admin@gmrehman.com` for API deploy too and set `FTP_API_DIR` to `/api/apps/api/`, **or**
- Point the API FTP account to the correct folder in cPanel → FTP Accounts

Set `FTP_API_DIR` to the folder that should contain `dist/main.js` and `prisma/`.

---

## Step 4 — First-time API on server

GitHub Actions uploads `dist/` and `prisma/` only. You still need **once** on the server:

1. Full project at `~/api` (clone or FileZilla)
2. cPanel → **Setup Node.js App** → root `api/apps/api`, startup `dist/main.js`
3. **Run NPM Install** in Node.js panel
4. Add env vars (DATABASE_URL, SMTP, etc.)
5. **Restart** app

After that, each deploy updates `dist` + `prisma` via FTP.

---

## Step 5 — Run deploy

### Automatic
Push to `main`:

```bash
git add .
git commit -m "Update portfolio"
git push
```

### Manual
GitHub → **Actions** → **Deploy Portfolio** → **Run workflow**

---

## Step 6 — Verify

| Check | URL |
|-------|-----|
| Website | https://gmrehman.com |
| API health | https://api.gmrehman.com/api/health |
| Contact form | Submit on website |

After API deploy → **Restart** Node.js app in cPanel.

---

## Troubleshooting

### FTP login failed
- Confirm username is full email: `admin@gmrehman.com`
- Reset password in cPanel → **FTP Accounts**
- Try `protocol: ftp` instead of `ftps` in `.github/workflows/deploy.yml` if FTPS fails

### Website works, API 502
- Restart Node.js app in cPanel
- Check `dist/main.js` exists on server
- Run **NPM Install** again in Node.js panel

### Wrong folder uploaded
- Fix `FTP_WEB_DIR` / `FTP_API_DIR` secrets
- Re-run workflow from Actions tab

### Build failed on GitHub
- Open failed run → read logs
- Usually `npm ci` or build error — fix locally first, then push

---

## What the workflow does

```
Push to main
    │
    ├─► Build React (Vite) → FTP → public_html (admin@gmrehman.com)
    │
    └─► Build NestJS API → FTP → api folder (admin@api.gmrehman.com)
```

---

## Security

- Never commit FTP passwords to git
- Only store passwords in **GitHub Secrets**
- Rotate FTP passwords if exposed
