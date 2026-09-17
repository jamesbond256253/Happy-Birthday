# Romantic Love Website

A private, single-page romantic website made with **HTML, CSS, and vanilla JavaScript only**. Open it in a browser — no install, no build, no server.

## How to run

Simply open:

`index.html`

in a modern browser (Chrome, Edge, Firefox, Safari, or a phone browser).

No installation is required. There is no `npm install` and no build command.

## How to customize

Edit `script.js` at the **PERSONALIZATION** section near the top.

You can change:

- **PIN** — `SECRET_PIN` (default is `"1234"`)
- **Partner name** — `PARTNER_NAME`
- **Love letter** — `LOVE_LETTER`
- **Final message** — `FINAL_MESSAGE`
- **Final subtitle** — `FINAL_SUBTITLE`
- **Instagram username** — `SOCIAL_USERNAME`
- **Instagram URL** — `SOCIAL_URL`
- **Background music path** — `BACKGROUND_MUSIC`
- **Photos** — the `PHOTOS` array (image path, caption, rotation)
- **Songs** — the `SONGS` array (title, artist, artwork, link)

## How to add photos

1. Put files inside `images/` (for example `photo1.jpg`, `photo2.jpg`).
2. Update the `PHOTOS` array in `script.js`.

Use **relative** paths only:

```js
image: "images/photo1.jpg"
```

Do not use `C:\...`, `/Users/...`, or a leading slash like `/images/photo1.jpg`.

Placeholder images are included so the site works before you add your own photos. Replace those files with real pictures, keeping the same names, or point the array at new filenames.

## How to add music

1. Put `background.mp3` inside `music/`.
2. Keep (or update) this line in `script.js`:

```js
const BACKGROUND_MUSIC = "music/background.mp3";
```

Music does **not** autoplay. A 🎵 button appears after the correct PIN. If the file is missing, the site still works and the button hides itself.

Song cards open Spotify (or any URL you set) in a new tab. This project does not embed copyrighted tracks.

## GitHub Pages

1. Create a GitHub repository.
2. Upload the entire project (the files in this folder).
3. Go to **Settings**.
4. Go to **Pages**.
5. Select **Deploy from a branch**.
6. Select the **main** branch.
7. Select **/ (root)**.
8. Save.
9. Wait for GitHub Pages to deploy.
10. Open the generated website URL.

No build command is necessary.

If the repository is not at the domain root, relative paths (`images/...`, `style.css`, `script.js`) still work.

## Project structure

```
/
├── index.html
├── style.css
├── script.js
├── README.md
├── .gitignore
├── images/
└── music/
```

## Notes

- Default PIN: **1234**
- The site is designed for phones first, and also works on tablet and desktop.
- Large animations respect `prefers-reduced-motion`.
- Hold **⌫** on the keypad (or press Escape) to clear the PIN.
