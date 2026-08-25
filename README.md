# Portfolio Site

A single-page portfolio built with plain HTML, CSS, and JavaScript — no build
tools, no frameworks, no `npm install`. Dark theme with an animated "warp
speed" canvas background, glassmorphic cards, and gradient type.

## Files

```
index.html      → all page content and structure
styles.css       → all styling (colors, layout, animations)
script.js        → canvas background animation, nav behavior, scroll reveals
assets/          → put resume.pdf and any images here
```

## 1. Content status

This copy is already filled in with your real info from your resume
(experience, projects, skills, education, achievements, contact links) and
`assets/resume.pdf` is your actual resume — the download buttons work as-is.

A few things worth double-checking / filling in yourself:

- **GitHub repo links for OpsMind AI and the Trading Engine** — I only had live demo
  URLs and project details for these two (not their exact repo URLs), so both
  currently link to your GitHub profile (`github.com/Divyansh670`) instead of
  the specific repo. Update the `href` in each `.project-card__links` block in
  `index.html` once you have the exact repo links. CryptoTrack and the CLI
  Login System link straight to their real repos since you gave me those URLs.
- **LeetCode URL** — built as `leetcode.com/Divyansh_Srivastav`; confirm this
  matches your actual profile URL.
- The OpsMind AI dashboard screenshot you sent is already in
  `assets/opsmind-dashboard.png` and shown inside that project's "More
  information" panel — swap it out any time with a fresher one.

Otherwise, to edit anything further: Hero copy is at the top of `<main>`,
About in `#about`, Skills in `#skills`, Projects in `#projects`, Experience in
`#experience`, Achievements in `#achievements`, Contact in `#contact`.

## 2. Customize the look (optional)

All colors and fonts are CSS variables at the top of `styles.css`:

```css
:root {
  --bg: #05070d;        /* background */
  --cyan: #4cf3ff;       /* accent 1 */
  --violet: #b84fff;     /* accent 2 */
  --gold: #ffd166;       /* small highlight accent */
  ...
}
```

Change these and the whole site re-colors — gradients, buttons, tags, and the
canvas streaks all pull from the same variables.

To change the density/speed of the background animation, edit these two lines
near the top of `script.js`:

```js
const STAR_COUNT = 380;   // more = denser field
const SPEED = 0.55;       // higher = faster streaks
```

## 3. Preview locally

No build step needed. Just open `index.html` directly in a browser, or run a
tiny local server (recommended, avoids some browser file:// restrictions):

```bash
# Python
python3 -m http.server 8000
# then visit http://localhost:8000

# or Node
npx serve .
```

## 4. Push to GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 5. Deploy (pick one)

### Option A — GitHub Pages (free, simplest, ties to your repo)
1. In your GitHub repo, go to **Settings → Pages**
2. Under "Build and deployment", set **Source: Deploy from a branch**
3. Branch: `main`, folder: `/ (root)` → Save
4. Your site goes live at `https://<your-username>.github.io/<repo-name>/`
   after a minute or two

### Option B — Vercel (free, custom domain support, faster global CDN)
1. Go to vercel.com → **Add New Project** → import your GitHub repo
2. Framework preset: **Other** (it's static, no build command needed)
3. Deploy — you get a `<project>.vercel.app` URL immediately, and can attach
   a custom domain in project settings

### Option C — Netlify (free, similar to Vercel)
1. Go to app.netlify.com → **Add new site → Import an existing project**
2. Connect your GitHub repo, leave build command empty, publish directory `/`
3. Deploy

Any of the three work well for a static site like this — GitHub Pages is the
most "recruiter-friendly" if you want the URL to visibly show your GitHub
username; Vercel/Netlify are marginally faster and make custom domains easier.

## 6. Before you send it to recruiters

- [ ] Replace every placeholder (name, email, links, resume PDF)
- [ ] Test on mobile width (the nav collapses to a hamburger menu under 860px)
- [ ] Check all project/social links actually work (no more `href="#"`)
- [ ] Run it through Lighthouse in Chrome DevTools (aim for 90+ performance)
- [ ] Add a custom domain if you have one — looks more polished than a
      `.vercel.app` / `.github.io` URL, though neither hurts you
