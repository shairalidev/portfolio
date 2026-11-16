# SEO launch checklist: shairali.com

Goal: rank #1 for **Shair Ali**, **Shair Ali developer**, **Shair Ali full stack developer** and **Shair developer**, get the portrait into Google Images, and bring in client traffic through the service pages.

Honest expectation:
- **"Shair Ali developer" and "Shair Ali full stack":** realistic within weeks of indexing.
- **"Shair Ali" alone:** achievable, but you compete with other people's LinkedIn and Instagram profiles. Backlinks (step 3) decide it.
- **"Ali" alone:** not realistically rankable by anyone.

## Status on 16 Nov 2026

| Step | Status |
|---|---|
| 1. Cloudflare www redirect | Done (301 to shairali.com, tested) |
| 1. Crawler Hints | Done (switched on) |
| 2. Search Console: verify, sitemap | Done (20 pages read) |
| 2. Request indexing | Done. Home, About, Work, Contact and the service pages are on Google |
| 2. Rich Results | Profile page and image metadata detected as valid |
| 3. Bing Webmaster Tools | **Not done** |
| 4. GitHub | Done (website link + profile README) |
| 4. LinkedIn | Mostly done (website link, headline, About, experience, Featured, services). Photo still to upload; see `docs/LINKEDIN-TODO.md` |
| 4. X, Fiverr | Check the bio link and use the same portrait |
| 4. dev.to / Medium posts | **Not done** |
| 4. "Built by Shair Ali" on client sites | **Not done** (none of the three live client sites has it) |
| 4. Riphah, Google Business Profile | Optional, not done |

## Already done in the code

- Your name is in the home page H1, the intro text and every page title.
- **Person data for Google:** name variants (Shair, devshair, shairalidev), portrait image, job, university, award, Fiverr/GitHub/LinkedIn/X profiles.
- The home page is marked as your **profile page**, and the site name is set to "Shair Ali".
- Photos carry creator and copyright info in the files and have JPG copies; all images have descriptive alt text.
- The sitemap lists 20 pages, 77 images and 5 PDFs. Regenerate it with `node scripts/generate-sitemap.mjs`.
- New favicon in every size Google uses (it appears next to your result).
- 5 service pages for in-demand searches: `/services/ai-app-rescue`, `/deployment-devops`, `/ai-chatbot-whatsapp`, `/ai-automation`, `/realtime-video-apps`.
- `*.pages.dev` copies of the site are blocked from indexing.

## 1. Cloudflare (10 minutes, do first)

1. **Redirect www to the bare domain.** Cloudflare dashboard, then shairali.com, then **Rules**, then **Redirect Rules**, then *Create rule*:
   - **When:** Hostname equals `www.shairali.com`
   - **Then:** Dynamic redirect, expression `concat("https://shairali.com", http.request.uri.path)`, status **301**, preserve query string.

   Without it Google sees two copies of the site.
2. **Turn on Crawler Hints.** Caching, then Configuration, then **Crawler Hints**. It notifies Bing and Yandex (IndexNow) whenever pages change.

## 2. Google Search Console (15 minutes)

1. Go to https://search.google.com/search-console, then Add property, then **Domain**, and enter `shairali.com`.
2. Verify with the **DNS TXT record**. Cloudflare can add it automatically if you choose "Cloudflare" as the provider.
3. **Sitemaps:** submit `https://shairali.com/sitemap.xml`.
4. **URL inspection:** request indexing for these, one by one:
   - `https://shairali.com/`
   - `https://shairali.com/about`
   - `https://shairali.com/achievements`
   - `https://shairali.com/work`
   - `https://shairali.com/services/ai-app-rescue` and the other 4 service pages
5. After 3–7 days, check **Performance**, then Queries, for "shair ali", and check **Pages** for anything "Not indexed".
6. Test the structured data at https://search.google.com/test/rich-results with `https://shairali.com/`. It should show Profile page, Breadcrumbs and FAQ.

## 3. Bing Webmaster Tools (5 minutes)

https://www.bing.com/webmasters, then **Import from Google Search Console**. That brings the site and sitemap across in one click. Bing also feeds ChatGPT search and Copilot.

## 4. Backlinks and profiles: this is what wins "Shair Ali"

Use the **same name, same photo (the portrait) and the same one-line headline** everywhere, and link back to `https://shairali.com`:

- [ ] **LinkedIn** (linkedin.com/in/shairali2): set Website to shairali.com and the headline to "Shair Ali – Full-Stack & AI Developer". Add the case studies under Featured.
- [ ] **GitHub** (github.com/shairalidev): set the profile website to shairali.com. Create a profile README (a repo named `shairalidev`) with a short bio and a link to the site.
- [ ] **Fiverr** (fiverr.com/devshair): use the same photo and name. Fiverr doesn't allow external links in gigs, so just keep the name and photo consistent.
- [ ] **X** (@AliShair45057): add shairali.com to the bio.
- [ ] **dev.to and Medium:** create author profiles linking to the site. Write 2–3 short posts from real work, for example:
  - "How I moved a Lovable app to my own server"
  - "Per-minute billing that can't drift"
  - "Deploying Next.js with Nginx + PM2 + GitHub Actions"

  Each post links back to the matching service page.
- [ ] **Client sites:** ask clients if you can add a small "Built by Shair Ali" footer link to shairali.com. Ask Rivelya, Cover Me, Tenant Certification, Grand Hotel Selinunte and the Austrian barber client. Even one or two of these are very strong signals.
- [ ] **Riphah:** if the university or RSCI publishes alumni or award news, ask them to link to shairali.com.
- [ ] **Google Business Profile** (optional, as a service-area business with no address shown): "Shair Ali – Web Developer". It helps local searches in Pakistan.

## 5. Ongoing (monthly)

- Add new Fiverr reviews to `src/data/fiverr.json` and new projects to `src/data/projects.json`, then regenerate the sitemap and deploy.
- One new case study or article a month beats any one-off trick.
- Watch Search Console queries. If a service phrase starts getting impressions, strengthen that page with more detail and FAQs.

## Market research summary (November 2026)

Fastest-growing services that match your proven work:

| Service | Evidence |
|---|---|
| Claude Code specialists | +938% (Fiverr, June 2026) |
| AI integration into existing apps | +178% (Upwork 2026) |
| AI automation (n8n) | +136% (Fiverr, Fall 2025) |
| AI chatbots | +71% (Upwork 2026) |
| Vibe-coding / AI app rescue | +61% (Fiverr, June 2026) |
| WhatsApp AI assistants | Meta launched its WhatsApp Business AI globally in June 2026 |
| Full-stack development | #1 most in-demand coding skill (Upwork 2026) |

Long-tail phrases a solo developer can realistically rank for (each now has a page):

- "fix lovable app", "vibe coded app rescue"
- "deploy next.js app to digitalocean", "nginx pm2 ssl setup"
- "whatsapp ai chatbot for hotel", "ai chatbot for website developer"
- "n8n automation expert", "hire n8n developer"
- "webrtc developer for hire", "pay per minute video consultation app"
