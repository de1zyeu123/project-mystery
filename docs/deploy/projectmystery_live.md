# Project Mystery Live Deploy

## Target

- Public path: `https://de1zyeu.tech/projectmystery/`
- Primary deploy: Vercel project `project-mystery`
- Public route on `de1zyeu.tech`: Vercel project-level rewrite from `online-financial-agent`
- Keep `NoToast` (`/notoast`) independent from `Project Mystery` (`/projectmystery`) when editing routes.
- Local fallback: Docker container `project-mystery` on port `4173`

## Runtime Env

Do not commit secrets.

Use `.env.local` locally or set the same variables on the server:

```dotenv
PORT=4173
ROADMAP_COPY_PROVIDER=dashscope
# Empty means auto-select by key prefix.
# sk-sp-* -> Singapore endpoint.
# other keys -> Beijing endpoint.
DASHSCOPE_BASE_URL=
DASHSCOPE_MODEL=qwen3.6-plus
DASHSCOPE_API_KEY=
DASHSCOPE_TIMEOUT_MS=30000
```

## Vercel Deploy

Deploy this project:

```bash
npx --yes vercel deploy --prod --yes
```

Then publish project-level routes on the `de1zyeu.tech` owner project. Use rewrites so the browser stays on `de1zyeu.tech`:

```bash
npx --yes vercel routes add "Project Mystery Assets" \
  --cwd "/Users/zhen/Desktop/Agent/Online Financial Agent/website/web" \
  --src "^/assets/generated/life-road-atlas-v2/(.*)$" \
  --src-syntax regex \
  --action rewrite \
  --dest "https://<project-mystery-production-url>/assets/generated/life-road-atlas-v2/$1" \
  --position start \
  --yes

npx --yes vercel routes add "Project Mystery Root" \
  --cwd "/Users/zhen/Desktop/Agent/Online Financial Agent/website/web" \
  --src "/projectmystery" \
  --src-syntax equals \
  --action rewrite \
  --dest "https://<project-mystery-production-url>/projectmystery/" \
  --position start \
  --yes

npx --yes vercel routes add "Project Mystery App" \
  --cwd "/Users/zhen/Desktop/Agent/Online Financial Agent/website/web" \
  --src "^/projectmystery/(.*)$" \
  --src-syntax regex \
  --action rewrite \
  --dest "https://<project-mystery-production-url>/projectmystery/$1" \
  --position start \
  --yes

npx --yes vercel routes publish \
  --cwd "/Users/zhen/Desktop/Agent/Online Financial Agent/website/web" \
  --yes
```

Current production app URL:

```text
https://project-mystery.vercel.app/projectmystery/
```

## Docker Fallback

```bash
SSH_USER=root SSH_HOST=de1zyeu.tech bash deploy.sh
```

Optional:

```bash
SSH_KEY=~/.ssh/id_rsa HOST_PORT=4173 bash deploy.sh
```

## Nginx Reverse Proxy Fallback

Add this on the server that serves `de1zyeu.tech`:

```nginx
location = /projectmystery {
  return 301 /projectmystery/;
}

location /projectmystery/ {
  proxy_pass http://127.0.0.1:4173/projectmystery/;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}

location /projectmystery/api/ {
  proxy_pass http://127.0.0.1:4173/projectmystery/api/;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

## Health Check

```bash
curl https://de1zyeu.tech/projectmystery/
curl https://de1zyeu.tech/projectmystery/api/health
```

If `/projectmystery/api/health` is not routed through the same proxy, check the container directly:

```bash
curl http://127.0.0.1:4173/api/health
```
