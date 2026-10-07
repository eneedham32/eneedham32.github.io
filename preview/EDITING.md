# Editing the website preview

Preview address: https://eamonnneedham.com/preview/

This folder contains a first design with sample images and draft wording. The current homepage is in the repository's root folder. Saving changes within `preview/` updates the preview automatically through GitHub Pages.

## The files you will use

| File | Purpose |
| --- | --- |
| `content.js` | Your introduction, biography, links, photo captions, project descriptions, publications, and document paths |
| `assets/` | Photographs, figures, your CV, and your poster PDF |
| `styles.css` | Colours, fonts, spacing, and layout |
| `site.js` | Page templates, navigation, gallery filters, hover previews, and the image viewer |

For most updates, edit **content.js**. It is a labelled list of content, loaded by all six page templates, with no build command required. Keep its quotation marks, commas, and brackets intact.

## Edit a sentence

1. Open `preview/content.js` in GitHub and click the pencil icon.
2. Find the field you want, such as `introduction` or `biography`.
3. Change the text between quotation marks.
4. Click **Commit changes**, describe your change, and commit to `main`.
5. Allow GitHub Pages to finish publishing, then refresh the preview.

Use apostrophes freely inside text. If you need double quotation marks inside a value, write them as `\"`.

## Replace a sample photograph

1. Open the `preview/assets` folder on GitHub and choose **Add file → Upload files**.
2. Upload your photo using a simple filename, for example `field-sierra.jpg`.
3. In `content.js`, find the image entry you want to replace. Keep its `id` so existing pages still find it.
4. Update the fields below:

```js
{
  id: "sierra",
  title: "Your photograph title",
  category: "Field & landscapes",
  thumbnail: "assets/field-sierra.jpg",
  full: "assets/field-sierra.jpg",
  alt: "A brief description of what is visible in the photograph.",
  caption: "Where this was taken and what visitors should notice.",
  credit: "Photo: Éamonn Needham",
  placeholder: false,
  source: "https://eamonnneedham.com/"
}
```

The `thumbnail` is shown on the page; `full` is opened in the viewer. They may point to the same file initially. For a large collection, use a smaller copy for `thumbnail`. Original scientific images should retain the complete frame, labels, and scale bars. The image viewer and hover preview display the full frame; some page thumbnails are cropped to fit their layout.

To add a gallery image, copy an entire photo entry, give it a unique `id`, and add it to the `photos` list. The gallery is populated automatically and creates filters from the `category` values. Add an image ID to a project's `gallery` list to show it there too.

## Add your portrait, email, CV, or poster

These optional fields are near the top of `content.js`. Empty values show clearly labelled spaces for future material.

```js
email: "your-preferred-public-email@example.com",
portrait: "assets/portrait.jpg",
cv: "assets/eamonn-needham-cv.pdf",
poster: "assets/conference-poster.pdf",
```

Upload the corresponding files into `assets/`. Use an email address you want to publish.

## Add a publication

Add entries to the `publications` list. Preserve commas between entries.

```js
publications: [
  {
    year: "2026",
    title: "Your actual paper title",
    authors: "The author list",
    journal: "Journal name and citation details",
    url: "https://doi.org/YOUR-DOI"
  }
]
```

No publication records are invented in this preview. They will be added from your CV or a list you supply.

## What to send for the next version

- One portrait or a field photograph of you.
- About 8–15 favourite field, laboratory, specimen, and microscopy images, with rough captions and photo credits.
- Your current CV or publication list.
- The poster PDF for visitors arriving through the QR code.
- Your preferred public contact email and corrections to the draft research descriptions.

You can send these in batches. Rough filenames and notes are enough to begin.

## Preview image credits

All current photographs are reference placeholders, individually labelled and credited in `content.js` and the image viewer. Sierra Nevada: G. Thomas via USGS, public domain. Thin section: USGS Core Research Center, public domain. Lava fountain: USGS Hawaiian Volcano Observatory, public domain. Vesicular basalt: USGS, public domain. Apollo 17 lunar scene and Earth: NASA. Source links are stored with each image entry.

## Undoing an accidental edit

GitHub keeps the history of each file. Open **History**, inspect the earlier version, and restore its contents with a new commit. If needed, ask for help restoring the previous version rather than deleting the repository or changing the domain settings.
