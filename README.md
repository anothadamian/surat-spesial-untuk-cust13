# For Nadira

A Next.js remake of the apology website. The original static version is kept in `legacy/`; the Next.js experience is the current version.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. For a static production export, run `npm run build`; the result is in `out/`.

The exact letter is read from `data.txt` at build time. The supplied photograph is copied into `public/photos/` without image edits. The supplied song is copied unchanged into `public/music/` and starts when the visitor opens the letter; the player remains available if the browser declines playback. A small Play/Pause control stays available while reading and on the question and forgiveness screens. Choosing Yes shows a thank-you screen, where the visitor can choose to open a WhatsApp draft for Aya and decide whether to send it.
# surat-spesial-untuk-cust13
