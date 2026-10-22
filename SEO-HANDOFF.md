# SEO handoff: giving methodius.media pages search engines can index

Written 2026-10-22. Nothing below has been built yet. This is the plan, so a fresh session can start without re-deriving it.

## Hard constraint from Shalone

**Do not change the homepage's design.** `index.html` keeps its look, layout, player, fonts and seasonal accent colors. New pages must reuse the existing CSS and fonts so they read as the same site. No hidden text and no invisible links on the homepage (spam risk).

Also follow `CLAUDE.md`: keep it simple, no new dependencies, no analytics or cookies, flag the simpler option before adding complexity, and give a 2-3 sentence "how it works" explanation for anything non-trivial.

## Why the site gets no SEO value today

- The whole site is one page. A script in `index.html` fetches `https://media.methodius.media/catalog.json` and draws every album and song in the browser, so the raw HTML has almost no links or content (`llms.txt` says the same).
- `sitemap.xml` lists a single URL (`/`).
- No album, imprint or song has its own URL, title, `<h1>` or description, so nobody searching for a specific album, prayer or chant can land on it.
- Lyrics and chords exist only inside the JSON, never as page text.
- The JSON-LD says `PodcastSeries`; it should also describe the music (`MusicAlbum`, `MusicRecording`).

## Plan

### 1. Generator script (no new dependencies)
- A small Node or Python script run locally before deploying. It reads `catalog.json` (the format is documented in `llms.txt`) and writes static HTML into the repo. Commit the output.
- Skip and report any malformed catalog entry; one bad entry must not break the run (CLAUDE.md rule 1).
- It rewrites `sitemap.xml` to include every generated page.
- Note: `catalog.json` lives off-repo at `media.methodius.media`, and the Claude cloud workspace could not reach it. Either run the script on Shalone's machine or have him attach a copy of the file.

### 2. Album pages: `/albums/<slug>/`
Each page has:
- its own `<title>`, meta description, canonical URL and `<h1>`
- cover art with alt text (`coverThumb` for display, `coverArt` linked)
- a visible tracklist with title, key and bpm where known
- lyrics and chords as visible text where the catalog has them
- an audio player, the album ZIP link (when `zipUrl` is not null), and a "CC0 / public domain" note
- `MusicAlbum` JSON-LD with `MusicRecording` tracks
- a link back to the homepage and to its imprint page
- a short blurb **written by Shalone** (keeps the "made by humans" claim honest). The script should read blurbs from a plain file such as `content/albums.md` or a JSON file and fall back to a simple factual line when there is no blurb yet.

Instrumental versions listed as their own entries in the catalog should be folded into their album page, not given separate pages.

### 3. Imprint pages: `/catholic-lofi/`, `/chapel-pop/`, `/chapel-ambient/`
- A paragraph or two of real text per imprint, written or approved by Shalone, plus links to each album page.
- These target broad searches such as "Catholic lofi".

### 4. Optional later: song pages with lyrics
Many lyrics are prayers, so pages like "[prayer] chant" could rank on their own. This is the most work, so do it only if Shalone wants it after the album pages are live.

### 5. Look and feel
- Copy the CSS variables, `@font-face` rules and nav styling from `index.html` into a shared stylesheet or inline into the generated pages, so the new pages match. Self-hosted fonts only (the CSP in `_headers` allows `'self'` fonts).
- Check the CSP in `_headers` still permits whatever the pages load (audio and images come from `https://media.methodius.media`).
- Check mobile layout on the new pages (CLAUDE.md rule 8).

### 6. Homepage: non-visual edits only
- Improve the JSON-LD (add `MusicGroup` or `Organization`, keep or adjust `PodcastSeries`).
- Optionally add one plain footer text link to the imprint pages, only if Shalone approves. No other visible change.

### 7. Links from outside the site (Shalone's tasks, no social media needed)
- Link to specific album pages from **sdcason.com**, his strongest site, which ranks at the top of its niche.
- Cross-link catholiclofi.com, shalonely.com and the Chapel Pop site to the matching pages.
- Put album-page URLs, not just the homepage, in Bandcamp, Archive.org and YouTube descriptions.
- Submit `https://media.methodius.media/podcast.xml` to Apple Podcasts and Spotify podcast directories for free listings.
- Verify the site in Google Search Console and Bing Webmaster Tools and submit the new sitemap. Both are free and use no visitor tracking.

## Suggested order
1. Generator plus one album page, reviewed by Shalone for look and feel.
2. All album pages and the sitemap.
3. Imprint pages.
4. Homepage JSON-LD tweak and the optional footer link.
5. Outside links and Search Console (Shalone).
6. Decide on song pages.

## Open questions for Shalone
- Where should the generator run (his machine vs. a copy of `catalog.json` attached to a session)?
- Which albums have blurbs, and does he want to write them or have drafts to edit?
- Is a single footer link on the homepage acceptable, or must the homepage stay exactly as is?
- Do the pages go under the folder names above, or does he prefer other URLs?
