# Style Factory Website — Project Status & Scope Audit

**Client:** Style Factory (stylefactory.hr) — fashion designer, non-technical
**Stack:** Next.js 14.2.22 (Pages Router), TypeScript, Chakra UI + Tailwind v4, next-intl (en/hr), Firebase (Firestore + Storage + Auth), Vercel
**Prepared by:** Innovaft
**Last updated:** 2026-07-29

---

## 1. Access & environment — what we have, what we still need

| Item | Status | Detail / action |
|---|---|---|
| Source code | ✅ Have | Delivered as `web-next-main.zip`, contains a git repo. Branch `main`. |
| GitHub | ⏳ To do | Push to the **Innovaft** account now; transfer to the client's GitHub once they create it. |
| Vercel | ⚠️ Blocked on client | `.vercel/project.json` points at project `stylefactory` under org `team_DRUvoLzhSL7Dxhd4OsQNYcxc` — the **previous developer's** Vercel team. Client must create a Vercel account, connect their GitHub repo, then we re-point the `stylefactory.hr` domain. |
| Domain | ⏳ To do | DNS currently points at the old Vercel project. Cut over only after the new deployment is verified. |
| Canva mockups (4) | 🚫 **Not accessible to us** | The share link needs a signed-in Canva account with the invite accepted. **We cannot see the designs yet** — this blocks the homepage rebuild (scope item 1). Please accept the invite on team.innovaft@gmail.com, or ask the client to export the 4 boards as PDF/PNG. |
| Google Analytics | ⚠️ Check first | `config.ts` already contains `measurementId: "G-M2B2J01G6Z"` inside the Firebase config — a **GA4 property may already exist** under the previous developer's Firebase project. Confirm ownership before creating a new one, otherwise historical data is lost/split. Analytics is **not initialised anywhere in the code** today. |
| Google Search Console | ⏳ To do | Not set up. Needs domain verification (DNS TXT) after the domain migration. |
| **Firebase project** | 🔴 **Not in the client's list — flag it** | All blog/trends content lives in Firestore project `stylefactory-fed11`, plus image/video storage and the admin login. **Whoever owns that Google account owns the client's content.** Ownership must be transferred alongside Vercel, or the client is one account-deletion away from losing every post. |

---

## 2. Scope items — status at a glance

| # | Scope item | Status | Notes |
|---|---|---|---|
| 1 | Homepage redesign to match Canva (desktop + mobile, HR + EN) | 🚫 Blocked | Can't start without the mockups. Groundwork done (see §4). |
| 2 | Fixed layout frame consistency (navbar + sidebar) | 🔍 Diagnosed | Root cause identified, see §3.1. |
| 3 | Remove "Improve your brand image" from Assortment hero | 🔍 Diagnosed | One component, one line to remove. See §3.2. |
| 4 | Hero headline stays English in both languages | ⚠️ Needs confirmation | See §3.3 — the current site says something different. |
| 5 | Consistency & spacing audit, all pages, mobile→desktop | ⏳ Not started | Needs the Canva designs as the reference for "correct". |
| 6 | Fix 404 pages (`/trends/corporate-wear` + likely more) | 🔍 **Root causes found** | Three separate causes, see §3.4. |
| 7 | Language switcher broken on blog posts | 🔍 **Root cause found** | One-line bug, see §3.5. |
| 8 | Contact form actually submits | ✅ **Done** | Resend-backed API route built and tested. See §4. |
| 9 | Performance / SEO | 🟡 Partly done | Homepage done; rest of site outstanding. See §3.6. |
| 10 | Analytics, Search Console, sitemap, robots.txt | 🟡 Partly present | `robots.txt` ✅ and dynamic `sitemap.xml` ✅ already exist. GA + GSC outstanding. |

---

## 3. Technical findings (verified against the code)

### 3.1 Fixed frame inconsistency — scope item 2

`NavigationLayout` renders the left sidebar (logo, "Professional Uniforms", social/contact icons) for **every** page, homepage included — that part is already consistent.

The difference is the **top navbar**:

- On `/trends`, `/blog`, `/about`, the navbar is rendered by `NavigationLayout` and positioned against the layout column, which does not scroll. It stays fixed while content scrolls behind it. ✔ correct behaviour
- On the homepage, the navbar is rendered *inside* the page's own scrolling shell (`.homeShell`, `position: relative; max-width: 1440px; overflow: hidden`). Because it is anchored to that scrolling element, **it scrolls away with the content** and is capped at 1440px instead of the full column width.

**Fix direction:** move the homepage navbar out of the scrolling shell so it shares the layout's fixed frame. This *will* change the homepage's current appearance (navbar becomes persistent, full-width) — which is what the client is asking for, and it will be resolved as part of the Canva rebuild anyway. There is already a `showDesktopNavigation` switch on `NavigationLayout` for this.

**Related:** the homepage scroll container (`Scroll`) uses a `direction: rtl` trick to move the scrollbar, and sets `h="100vh"` while the hero uses `h-dvh`. On mobile this causes jitter as the browser URL bar hides/shows. Worth correcting during the rebuild.

### 3.2 "Improve your brand image" — scope item 3

- Component: `src/components/ShapeYourBrandtext/ShapeYourBrandText.tsx`
- Rendered at: `src/pages/trends/index.tsx:74` (the Assortment page)
- Text source: `common.shape` in `src/locales/en.json` / `hr.json` (the Croatian file also holds the English string)
- It is `position: fixed`, `zIndex: 100`, hidden below `md` — which is why it floats over the hero awkwardly on desktop only.

**Fix:** remove the `<ShapeYourBrandText/>` usage, delete the component and the now-unused `common.shape` keys. Low risk, no other page uses it.

### 3.3 Hero headline — scope item 4 ⚠️

The scope says the headline must read **"Uniform Collection for Modern Brands"**, English in both languages.

The site currently reads **"Beyond Uniforms. / It's Your Brand Identity."**

These are different strings. We have kept the existing wording for now (changing copy was out of scope for the stabilisation pass) and wired it so it renders the **same English text in both locales**, which satisfies the "not translated" requirement. The headline text itself will be swapped to the Canva wording during the homepage rebuild.

**Confirm:** is "Uniform Collection for Modern Brands" the final headline from the Canva mockup?

### 3.4 404 pages — scope item 6

Three independent causes, all in the dynamic post routes (`/trends/[id]`, `/blog/[id]`):

1. **A post missing one language 404s completely.**
   `src/pages/trends/[id].tsx:28` (and the blog equivalent) does:
   ```ts
   if (!blog?.eng || !blog?.cro) return { notFound: true };
   ```
   Any post the client published with only English *or* only Croatian content is unreachable in **both** languages. This is the most likely cause of `/trends/corporate-wear`.

2. **URLs are generated from the post title at runtime, and nothing is stored.**
   `src/utils/posts.ts:36` derives the slug from the title unless an explicit `slug` field exists in Firestore. If the client edits a post title, **its URL silently changes** and the old link 404s — including any link already shared, indexed by Google, or printed.

3. **Adding a post can change an existing post's URL.**
   `getUniquePostSlug()` (`posts.ts:42`) appends a short id suffix *only when two posts share a base slug*. Publishing a second post with a similar title retroactively changes the first post's URL from `/trends/x` to `/trends/x-abc123`.

**Fix direction:** store a permanent `slug` on each post at creation time; fall back to the id; render a post if *either* language exists (using the fallback logic that already exists in `getPostTitle`/`getPostMarkdown`); add a redirect map for known legacy URLs; add a branded 404 page (the site currently uses Next's default).

**To enumerate every broken route** we need read access to the Firestore `blogs`/`trends` collections — then we can diff live URLs against Google Search Console's coverage report and the old sitemap.

### 3.5 Language switcher — scope item 7 (root cause confirmed)

`src/components/LanguagePicker.tsx:79`:
```ts
router.push(router.pathname, router.pathname, { locale: val })
```

`router.pathname` is the **route pattern**, not the current URL. On a static page (`/about`) the two are identical, so it works. On a post page the pattern is the literal string `/trends/[id]`, so switching language navigates to a URL containing `[id]` → broken page.

**Fix:** use `router.asPath` (or pass `{ pathname: router.pathname, query: router.query }`) so the current post's id/slug is preserved. Small, self-contained change; should be verified on both `/blog/[id]` and `/trends/[id]`.

### 3.6 Performance & SEO — scope item 9

Already in place: per-page `SeoHead` with canonical + hreflang + Open Graph + Twitter cards, JSON-LD (Organization, WebSite, WebPage, Article, Breadcrumb), `robots.txt`, dynamic `sitemap.xml` with image entries and locale alternates, `/login` correctly `noindex`.

Outstanding:

| Issue | Where | Impact |
|---|---|---|
| Every page except the homepage is server-rendered per request (`getServerSideProps`) | `about`, `blog`, `blog/[id]`, `trends`, `trends/[id]` | No CDN caching → slow TTFB. `/about` is fully static and should be `getStaticProps`. |
| `Math.random()` during render | `blog/[id].tsx:62`, `trends/[id].tsx:62` | Server and client disagree → React hydration mismatch, layout can visibly jump. |
| 10 unoptimised `<Img>` tags | `about/index.tsx` | No responsive sizing, no lazy loading, no WebP. Several are full-viewport images. |
| No image config | `next.config.mjs` | No formats/device-sizes/remote patterns set; Firebase Storage images aren't optimised at all. |
| Heavy shared bundle (198 kB) | all pages | Chakra + Emotion + framer-motion + Tailwind all ship together. `/blog` and `/trends` reach ~670–700 kB first load, largely the MDX editor pulled in by the admin-only create/update forms — these should be dynamically imported so visitors never download them. |
| Firebase keys committed | `config.ts` | Firebase web keys are public by design, so this is not a leak — but access must be locked down with Firestore/Storage **security rules**, which should be reviewed. |

---

## 4. Work completed so far (homepage stabilisation pass)

Done before the Canva designs arrived, chosen so none of it is wasted by the rebuild:

- **Contact form now actually works (scope item 8).** Replaced the `mailto:` form — which silently did nothing in Chrome and Edge — with a real `POST /api/contact` route that sends through Resend, with server-side validation, length limits, HTML escaping and `reply_to` set to the sender. Verified: `405` on GET, `400` with field errors on bad input, `500` with a clear message when unconfigured. **Set `RESEND_API_KEY` in Vercel to switch it on** (see `.env.example`); until then the form reports a failure to the visitor rather than pretending to succeed.
- **Full HR/EN translation coverage on the homepage.** Every string moved into `next-intl` (`home.*` in both locale files). Previously the whole redesigned homepage was hard-coded English, so `/hr` showed an English page.
- **Homepage is now statically generated** (`getStaticProps`) instead of server-rendered per request.
- **Hero image optimised** — was a 369 KB unoptimised PNG as the LCP element; now responsive WebP with `priority` and `sizes`.
- **Accessibility/SEO fixes** — single `<h1>` (there was none), labelled form fields, `tel:`/`mailto:` links, `prefers-reduced-motion` respected, decorative images given accessible names.
- **Two rendering bugs fixed** — decorative medallions were invisible (`opacity-1` = 1% in Tailwind v4, not 100%), and two elements carried both `relative` and `absolute` so the mobile visuals never took their intended positions.
- **Desktop navigation restored on `/about`, `/blog`, `/trends`** — it had been moved into the homepage only, leaving the other pages with no desktop nav.
- **Dead code removed** — CSS module 1706 → 860 lines, duplicate components consolidated.

All changes were verified by pixel-diffing the running build against the previous build at four viewport widths; the clients, contact and journey sections came back **0 pixels changed**.

---

## 5. Recommended sequence

1. **Unblock access** — Canva export, Vercel account, GitHub repo, Firebase + GA ownership. Nothing below is safe to ship without the deployment path settled.
2. **Quick wins, independent of the designs** — language switcher (§3.5), remove "Improve your brand image" (§3.2), 404 root causes (§3.4), `Math.random()` hydration bug, branded 404 page.
3. **Homepage rebuild to Canva** (item 1) + fixed frame (item 2) + headline (item 4) — one piece of work, since all three touch the same layout.
4. **Site-wide spacing/consistency audit** (item 5) using the Canva boards as reference.
5. **Performance & SEO sweep** (item 9) — static generation, image pipeline, bundle splitting for the admin editor.
6. **Analytics & Search Console** (item 10) — after the domain is live on the client's Vercel, so verification and data collection start clean.
7. **Content safety net** — export the Firestore collections before any migration.

---

## 6. Open questions for the client

1. Can we get the 4 Canva boards exported (PDF/PNG) as well as the invite? Working from an export avoids blocking on account access.
2. Is "Uniform Collection for Modern Brands" the exact final headline? (§3.3)
3. Which Google account owns the Firebase project `stylefactory-fed11`, and can it be transferred? (§1)
4. Is the existing GA4 property `G-M2B2J01G6Z` theirs, and do they want to keep its history? (§1)
5. For `/trends/corporate-wear` — was that page ever live, and is there a list of other URLs known to be broken (Search Console, or links shared with partners)?
6. Which email address should contact-form submissions go to — `info@stylefactory.hr`, or somewhere else?
7. Do posts that exist in only one language need to be hidden, or shown with the other language as a fallback? (§3.4, cause 1)

---

## 7. Local development

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build      # production build
yarn lint
```

Environment variables — copy `.env.example` to `.env.local`:

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes, for the contact form | Resend API key |
| `CONTACT_TO_EMAIL` | no | Recipient (default `info@stylefactory.hr`) |
| `CONTACT_FROM_EMAIL` | no | Verified sender; must be a domain verified in Resend before go-live |

Note: `next build` fails while `next dev` is running against the same folder — stop the dev server first.
