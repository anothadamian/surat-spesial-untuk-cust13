# For Nadira

A Next.js remake of the apology website. The original static version is kept in `legacy/`; the Next.js experience is the current version.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. For a static production export, run `npm run build`; the result is in `out/`.

The exact letter is read from `data.txt` at build time. The supplied photograph is copied into `public/photos/` without image edits. No music file was provided, so the site has no music player.
