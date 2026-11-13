# Projects inbox

Drop your real projects here. One folder per project. Then:

1. Run `npm run projects:import` (or `npm run projects:import -- <folder>` for one project).
   It converts the images to fast `.webp`, shrinks huge files, builds a wide cover for
   phone-only projects, and writes them to `public/work/<folder>/`.
2. Add or update the project in `src/content/work.ts` (short title, one-line summary,
   up to 6 short "what we built" points). Claude can do this step from your `info.md`.

Image names don't matter: `cover.*` is the cover, every other image goes in the gallery
in filename order. Phone screens are shown side by side, desktop screens full width.

```
projects/
  bright-tuition-app/          <- folder name = page URL, lowercase-with-dashes
    info.md                    <- copy from _template/info.md and fill in
    cover.jpg                  <- main image (required)
    01.jpg  02.jpg  03.png ... <- extra screenshots (optional, shown in this order)
```

## Rules of thumb

- **Images:** `.jpg`, `.png` or `.webp`. Cover at least 1600px wide, landscape (16:10 or 16:9).
  Full-page website screenshots and phone screens are fine as extra images.
- **Link:** fill `link` only if the project is live and public. Leave it empty for
  internal tools, apps behind a login, or work you can't link to. The project still
  gets its own page with the images.
- **Confidential client?** Write a description instead of the name, e.g. "Retail chain, Colombo".
- **Only have images?** That's fine. Fill in at least `name` and one line of description.
  Anything you leave out is simply not shown.
- **Numbers:** only real ones. Leave `result` empty rather than guessing.
