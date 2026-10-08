# Decap CMS GitHub OAuth proxy

A minimal Cloudflare Worker that implements the two endpoints Decap CMS's
`github` backend needs for login (`/auth` and `/callback`), since GitHub
Pages can't run this server-side step itself.

## 1. Create a GitHub OAuth App

- Go to https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**
- Homepage URL: `https://garethfisher.com`
- Authorization callback URL: `https://gareth-fisher-cms-oauth.<your-subdomain>.workers.dev/callback`
  (you'll get the exact `<your-subdomain>` after step 2 — come back and
  update this field once you have it)
- Save, then click **Generate a new client secret** and keep both the
  Client ID and Client Secret handy.

## 2. Deploy the Worker

```
cd oauth-proxy
npx wrangler login      # opens a browser tab to authorize the CLI
npx wrangler deploy     # publishes the Worker and prints its URL
```

The printed URL is `https://gareth-fisher-cms-oauth.<your-subdomain>.workers.dev`.

## 3. Set the two secrets

```
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

(each command will prompt you to paste the value)

## 4. Finish the GitHub OAuth App

Go back to the OAuth App from step 1 and set the Authorization callback
URL to the real Worker URL from step 2, with `/callback` on the end.

## 5. Point the CMS at the proxy

In `admin/config.yml`, add `base_url` under `backend`:

```yaml
backend:
  name: github
  repo: garethfisher/gareth-fisher-portfolio
  branch: main
  base_url: https://gareth-fisher-cms-oauth.<your-subdomain>.workers.dev
```

Commit and push. Then visit `https://garethfisher.com/admin/` and log in.
