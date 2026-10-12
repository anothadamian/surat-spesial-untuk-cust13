# For Nadira

A Next.js remake of the apology website. The original static version is kept in `legacy/`; the Next.js experience is the current version.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. For a static production export, run `npm run build`; the result is in `out/`.

The exact letter is read from `data.txt` at build time. The supplied photograph is copied into `public/photos/` without image edits. The supplied song is copied unchanged into `public/music/` and plays from the letter's music player after the visitor chooses Read; the player remains available if the browser declines playback. Choosing Yes opens a WhatsApp draft for Aya, and the visitor decides whether to send it.
# surat-spesial-untuk-cust13
