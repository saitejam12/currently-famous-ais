# Hand-over notes: editing and republishing this page

These notes are for whoever owns this page after the developers hand it
over. You do not need to know React, TypeScript or any other framework to
follow them. If you can open a text file, change some words inside quote
marks, and follow a short checklist, you can do this.

**Read this first:** there is no admin screen, no login, no dashboard and no
database behind this page. It does not pull data from anywhere automatically.
Every company, every model and the "as of" date are typed directly into one
source file by hand. To change what the page shows, you edit that file
yourself, then republish the page the same way it was published the first
time. That is the whole workflow — there is nothing else running behind it.

## 1. Where the content lives

Everything you can edit is in one file:

```
frontend/src/screens/Home.tsx
```

This file is not the finished HTML page itself — it is the source that gets
turned into the HTML page when the site is built (see "Publish an edit"
below). You never need to touch the built HTML directly; you edit this
source file and rebuild.

Open it in any plain text editor (Notepad, TextEdit, VS Code, etc.). Near the
top you will find three things, in this order:

1. `PAGE_META` — the "as of" date and the one-line notice under it.
2. `COMPANIES` — a list of company entries. Each company has its own list of
   models nested inside it.
3. Further down, the code that lays the page out on screen. **You should not
   need to touch anything below the `COMPANIES` list.**

## 2. Changing the "as of" date

Find this near the very top of the file:

```
const PAGE_META = {
  as_of_date: "14 August 2026",
  snapshot_notice:
    "A hand-authored point-in-time snapshot of the AI landscape. It is not continuously updated and does not read from any live data feed.",
};
```

Replace the text between the quote marks after `as_of_date` with the new
date, written the same way (e.g. `"3 September 2026"`). You can also reword
`snapshot_notice` the same way, but leave the quote marks and the comma
exactly where they are.

## 3. Adding or editing a company

Companies live in the `COMPANIES` list, just below `PAGE_META`. Each company
is one block that looks like this:

```
{
  id: "openai",
  name: "OpenAI",
  description: "The San Francisco lab that put generative AI in front of everyone with ChatGPT.",
  logo_src: "OA",
  logo_alt: "OpenAI logo",
  prominence_order: 1,
  models: [ ... ],
},
```

- **To edit a company**, change the text inside the quote marks for `name`
  or `description`. Leave `id` alone if the company already has models —
  other parts of the file refer to it by that `id`.
- **`prominence_order`** is the number that decides the company's position
  in the index and on the page (1 is shown first). If you insert a company
  in the middle, renumber the companies after it so the numbers stay in
  order with no gaps or repeats.
- **`logo_src`** is a short 2–3 letter monogram shown in a black square
  (e.g. `"OA"`). Set it to `null` (no quote marks) if you don't want a
  monogram, as several companies already do. `logo_alt` is the description
  read out by screen readers — set it to `null` too if `logo_src` is `null`.
- **To add a new company**, copy one whole block from the opening `{` to the
  closing `},`, paste it either before the first company or after the last
  one inside the square brackets `[ ... ]` that hold the whole `COMPANIES`
  list, then edit every field including `id` (pick a short, unique,
  lowercase, hyphenated value such as `"cohere"`) and `prominence_order`.
- **To remove a company**, delete its whole block, from its opening `{` to
  its closing `},`, then renumber the remaining `prominence_order` values.

Every `{`, `}`, `[`, `]`, `"` and `,` matters — if the page stops working
after an edit, the most common cause is a missing comma between entries or a
missing closing `}` or `]`. Compare your edit against a company block you
did not touch and match the punctuation exactly.

## 4. Adding or editing a model

Inside every company block is a `models: [ ... ]` list. Each model is one
block that looks like this:

```
{
  id: "gpt-5",
  company_id: "openai",
  name: "GPT-5",
  description: "The current flagship general-purpose model behind ChatGPT.",
  release_year: 2025,
  official_url: "https://openai.com/index/introducing-gpt-5/",
},
```

- **`name`** and **`description`** — the model's name and its one-line
  description. Edit the text inside the quote marks.
- **`release_year`** — a plain number, no quote marks (e.g. `2025`). If the
  model doesn't have a clear release year, use `null` (no quote marks, as
  `Claude Code` and `Codestral` already do).
- **`official_url`** — the outbound link the model's name uses. Paste the
  vendor's own page for that model, including `https://`, inside the quote
  marks.
- **`company_id`** must match the `id` of the company block the model sits
  inside — leave it as it is when copying a model within the same company.
- **To add a model**, copy one whole model block, paste it inside the same
  company's `models: [ ... ]` list, and edit `id` (unique, lowercase,
  hyphenated), `name`, `description`, `release_year` and `official_url`.
- **To remove a model**, delete its whole block.

## 5. Checking your edit before publishing

After saving the file, it is worth having a developer (or anyone comfortable
running a terminal command once) run:

```
npm run build
```

from the `frontend` folder. If you made a punctuation mistake, this command
will fail and print roughly where the problem is, which is much faster to
fix than discovering it after publishing.

## 6. Publishing your edit

This page is a static site: `npm run build` turns the `frontend` folder into
a plain folder of HTML, CSS and JS files (`frontend/dist`), and that folder
is what the public actually sees. There is no server-side step and nothing
to deploy other than copying that folder to the host.

The chosen host for this page is **AWS S3 with CloudFront in front of it**
(an AWS static-hosting setup, free or near-free at this page's traffic
level). To publish an edit:

1. From the `frontend` folder, run `npm run build`. This produces the
   `frontend/dist` folder.
2. Upload the contents of `frontend/dist` to the S3 bucket that was set up
   to hold this site, replacing what is already there. This can be done
   from the AWS S3 console by opening the bucket and using "Upload", or with
   the AWS CLI command `aws s3 sync dist/ s3://<the-bucket-name> --delete`
   if one has been set up for you.
3. Once the upload finishes, open the CloudFront console, find the
   distribution pointed at that bucket, and invalidate its cache (create an
   invalidation for path `/*`). CloudFront caches pages globally for speed,
   so without this step visitors may keep seeing the old content for a
   while.

**Where the public URL is:** the page is served at the domain name shown on
that CloudFront distribution's page in the AWS console (labelled "Domain
name"), or at a custom domain if one was pointed at it — ask whoever set up
the AWS account if you don't have console access, since that URL is not
recorded inside this repository.

## 7. What this page deliberately does not have

- No admin screen, no login and no content-management system. The only way
  to change what visitors see is to edit `frontend/src/screens/Home.tsx` by
  hand and republish, as described above.
- No database and no live data feed. Nothing updates automatically — if a
  company ships a new model, someone has to type it in.
- No forms, no accounts and no collection of visitor data. The page only
  ever serves the same static files to everyone.
