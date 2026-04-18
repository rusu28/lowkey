# Supabase + Google + Resend Setup

## 1. Environment variables
Create `.env` from `.env.example`:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_SITE_URL=https://lowkaic.xyz
```

## 2. Database schema
Run `supabase/schema.sql` in Supabase SQL Editor.

## 3. Google OAuth in Supabase
In Supabase Dashboard:
1. Go to `Authentication -> Providers -> Google`.
2. Enable Google provider.
3. Add your Google Client ID and Client Secret there (do not hardcode in frontend).
4. Add redirect URLs:
   - `https://<your-project-ref>.supabase.co/auth/v1/callback`
   - `https://lowkaic.xyz/signin` (or your frontend URL)

## 4. Email functions
Deploy edge functions:

```bash
supabase functions deploy send-email
supabase functions deploy send-oauth-welcome
```

Set function secrets:

```bash
supabase secrets set RESEND_API_KEY=...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
supabase secrets set SUPABASE_URL=...
supabase secrets set SITE_URL=https://lowkaic.xyz
```

## 5. 24h reset-link expiration
Set token/session expiration in Supabase Auth settings to 24h for recovery links.

## 6. Git LF/CRLF warnings
`.gitignore` and `.gitattributes` were added. If `node_modules` was already tracked in a previous commit, run:

```bash
git rm -r --cached node_modules dist
git add .gitattributes .gitignore
git commit -m "Normalize line endings and ignore generated folders"
```
