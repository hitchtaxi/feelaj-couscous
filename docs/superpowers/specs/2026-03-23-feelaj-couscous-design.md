# Feelaj Couscous — Website Design Spec
**Date:** 2026-03-23
**Project:** Wife's Tunisian food delivery business
**Location:** Western Sydney, delivering Sydney-wide

---

## 1. Business Overview

**Business name:** Feelaj Couscous
**"Feelaj"** — an old Tunisian word for a rural marketplace in the outskirts of Tunisia. Chosen to honour the origin of the food and the tradition behind it.

**What they sell:** Authentic Tunisian home-cooked food, delivered across all of Sydney (Western, Eastern, Southern, Northern suburbs, CBD, Northern Beaches).

**Hero product:** Tunisian-style couscous — red, harissa-based, wedding-style. Distinct from Moroccan and Algerian couscous. Topped with chickpeas, sultanas, slow-cooked meat (lamb on the bone), and saffron broth.

**Sides:** Tunisian Tagine (not Moroccan), Salata Mishweya (roasted pepper & tomato salad), Green salad.

**Drinks available:** Coke, Solo, V Green, Water, Sunkist. (Range to expand later.)

**The chef:** Amal — daughter of an organic farmer and home cook from the Béja region of northwest Tunisia (Gboulat, Mjaz el Bab, Testour, El Kef, Béja). She carries recipes passed down through generations of humble, organic cooking. She moved to Sydney, saw the absence of authentic Tunisian food, and built Feelaj to bring it here.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Particle explosion | HTML5 Canvas (custom) |
| Fonts | Cormorant Garamond (headlines), DM Sans (body) — Google Fonts |
| Images | Unsplash stock (Tunisian couscous, rural Tunisia landscapes) |
| Deployment | Vercel |

---

## 3. Visual Identity

**Theme:** Dark & dramatic — premium restaurant aesthetic.

| Token | Value |
|---|---|
| Background | `#0a0a0a` (near-black charcoal) |
| Surface | `#141414` |
| Text primary | `#f5f0e8` (warm off-white) |
| Gold accent | `#c9a84c` |
| Tunisian red | `#8b1a1a` |
| White section bg | `#faf8f4` (warm cream) |

**Typography:**
- Headlines: Cormorant Garamond — elegant, old-world, premium
- Body: DM Sans — clean, modern, highly readable
- Logo "Feelaj Couscous" — Cormorant Garamond in gold, letter-spaced

**Overall feel:** A website people would pay $10,000+ for. Dark, cinematic, intentional. Not AI-generated looking. Every section has a reason to exist.

---

## 4. Page Structure (Single Page, Full Scroll)

### 4.1 Navigation (Sticky)
- Transparent on load → dark `#0a0a0a` with gold bottom border on scroll
- Left: "Feelaj Couscous" logotype in gold
- Right links: Menu · Deals · Our Story · Order Now
- "Order Now" is a gold-bordered button that scrolls to contact section
- Mobile: hamburger menu, full-screen overlay

### 4.2 Hero Section
- Full viewport height
- Dark background, large cinematic couscous image (overhead shot)
- Headline: **"Couscous, the way it was meant to be."**
- Subheadline: *"Authentic Tunisian home cooking, delivered across Sydney."*
- Two CTAs: `Order Now` (gold filled) + `See Our Deals` (outlined)
- Subtle particle/grain animation in background (ambient, not distracting)
- Smooth scroll indicator (arrow, pulsing gold) at bottom

### 4.3 The Couscous Interactive Explosion ⭐ (Hero Interaction)
This is the centrepiece. The most memorable section of the site.

**Before interaction:**
- Full dark section
- Large overhead photo of Tunisian wedding-style couscous bowl — centred, glowing softly
- Subtle steam animation drifting upward
- Small gold pulsing text below bowl: *"Click the bowl"*
- Section headline above: **"What's inside matters."**

**On click — the explosion:**
1. Bowl image briefly shakes (scale pulse)
2. Canvas particle burst: physics-based semolina grain particles and spice-dust particles fly outward in all directions, have weight, drift, and settle at the edges
3. Eight ingredient labels animate in on curved SVG lines that draw themselves from bowl to label:
   - **Semolina** — *hand-rolled, fine-grain*
   - **Harissa** — *fire-roasted Tunisian chilli paste*
   - **Chickpeas** — *slow-soaked, tender*
   - **Sultanas** — *for sweetness & depth*
   - **Lamb** — *slow-cooked on the bone*
   - **Saffron broth** — *golden, aromatic*
   - **Ras el Hanout** — *12-spice blend*
   - **Fresh coriander** — *finish & fragrance*
4. The word **TUNISIAN** appears in bold gold, underlined, with the note: *"Not Moroccan. Not Algerian. Tunisian."*
5. A reset icon (subtle circular arrow) allows user to collapse and re-explode

**Implementation:** HTML5 Canvas for particles (physics sim — gravity, drag, randomised velocity). SVG animated paths for ingredient lines. Framer Motion for label entry animations.

**This section must feel alive, not like a CSS trick.** The physics make it real.

### 4.4 Why Tunisian — Amal's Story (White/Cream Section)
**Background:** `#faf8f4` — full contrast break from dark theme. Feels like opening a book.

**Layout:** Two-column on desktop (text left, image right). Stacked on mobile.

**Image:** Warm, grainy photograph of rural northwest Tunisia — wheat fields, terracotta rooftops, a simple kitchen.

**The Story (editorial tone — honest, not marketing):**

*The land:*
The Béja region of northwest Tunisia — Gboulat, Mjaz el Bab, Testour, El Kef — is where Tunisia's wheat has grown for centuries. These are not wealthy towns. The people here have very little. But from those humble kitchens comes food so majestically crafted, so deeply flavoured, that it silences a table. When you have less, you cook with more intention. Every grain is counted. Every spice is earned. That's where couscous comes from — not a restaurant, not a factory. A family kitchen, a wood fire, and hands that know exactly what they're doing.

*Testour* — a town built by Andalusian refugees in the 17th century, still carrying the mark of their craftsmanship in its architecture and its malouf music tradition.
*El Kef* — one of the oldest continuously inhabited cities in Tunisia, sitting above a valley on a Byzantine fortress hill.
*Mjaz el Bab and Gboulat* — river-valley towns along the Medjerda, the lifeblood of Tunisian agriculture.

*Amal's story:*
Amal grew up in that world. Her father farmed the land organically — the old way, no shortcuts. Her mother cooked the same way. The recipes Amal learned weren't written down anywhere. They lived in the hands, the smell, the sound of a pot. She came to Sydney, and she looked around. She found Lebanese food, Turkish food, Moroccan food. But nothing Tunisian. Nothing real. She saw that gap not as a problem — but as an opportunity. She was optimistic from the start. She built Feelaj — the old word for the rural marketplace where people gathered to trade and eat — and she brought those recipes here.

**The tone** must honour both the poverty and the pride. These people had little, but what they made was extraordinary. That is the whole story.

### 4.5 The Menu
Three cards on dark background.

**Couscous** (largest card, centred, gold border glow):
- Overhead photo of Tunisian wedding-style couscous
- Description: *"Tunisian-style couscous — red, harissa-based, slow-cooked. Topped with chickpeas, sultanas, and lamb on the bone. The way it's served at weddings in northwest Tunisia."*
- Badge: **"Our Signature"**

**Tunisian Tagine** (flanking card):
- Photo of Tunisian tagine (baked egg-based, distinct from Moroccan stew)
- Description: *"Don't confuse this with the Moroccan version. Tunisian tagine is a baked, layered dish — deeply spiced, rich, and unlike anything else."*

**Salata Mishweya** (flanking card):
- Photo of roasted pepper & tomato salad
- Description: *"Fire-roasted peppers, tomatoes, garlic, olive oil. A Tunisian classic that cuts through the richness of the couscous perfectly."*

### 4.6 The Deals
Section headline: **"Feed yourself. Feed your family. Feed the whole event."**

Deal cards in a responsive grid — gold borders, dark surface, subtle hover glow.

| Deal | Includes | Price |
|---|---|---|
| **Solo Meal** | Couscous + Tunisian Tagine + Salata Mishweya + Salad + 1 drink | $22 |
| **Meal for Two** | Full meal for 2 + 2 drinks | $38 |
| **Family of 4** | Full spread + 4 drinks | $60 |
| **Family of 7** | Full spread + 7 drinks | $105 |
| **Family of 10** | Full spread + 10 drinks | $150 |
| **Event of 20** | Full spread + drinks | $300 |
| **Wedding / Large Event** | On-site cooking, fresh couscous at your venue | Contact for quote |

**Drinks available:** Coke · Solo · V Green · Water · Sunkist

**Note on Wedding deal:** Card styled differently — dark gradient, gold headline *"We come to you."* Positioned as premium / special enquiry.

### 4.7 Wedding & Events
Full-width dark section. Positioned as aspirational / available on request.

**Headline:** *"We bring the kitchen to you."*
**Body:** *"For weddings, corporate events, and gatherings of 20 or more — Amal and her team come to your venue and cook fresh on-site. The way it's done at Tunisian weddings: the whole tent fills with the smell of couscous, and everyone eats together."*
**CTA:** `Enquire about your event →` (links to contact section)

### 4.8 Drinks
Simple clean grid on dark background. Small icons/photos for each drink.
Coke · Solo · V Green · Water · Sunkist
**Note:** *"Included in every deal. More options coming soon."*

### 4.9 Order / Contact
Large section. Gold headline: **"Ready to order?"**

**How orders are placed:** Phone call or WhatsApp message. No online checkout in this phase.

- **WhatsApp button** (primary CTA) — opens WhatsApp chat with pre-filled message: *"Hi, I'd like to place an order from Feelaj Couscous."*
- **Phone number** — displayed prominently (placeholder: to be provided by client before launch)
- **Order note:** *"Order the night before — we take orders from 7pm to 11pm. Your food is freshly made and delivered the next morning."*
- **No delivery fee. No minimum order.**
- **Order window:** 7:00pm – 11:00pm (order the evening before)
- **Delivery window:** Next morning (approx 8:00am – 10:00am)
- Delivery note: *"We deliver across all of Sydney — Western Suburbs, Eastern Suburbs, Southern Suburbs, Northern Beaches, CBD, and everywhere in between."*
- **Phone/WhatsApp number:** Placeholder (`+61 4XX XXX XXX`) — to be replaced by client before launch.
- No form fields required — WhatsApp/phone is the full ordering flow.

### 4.10 Footer
Minimal. Dark background.
- Feelaj Couscous — Sydney, Australia
- Small tagline: *"From the kitchens of northwest Tunisia to your door."*
- Links: Menu · Deals · Our Story · Contact

---

## 5. Interactions & Animations

| Interaction | Implementation |
|---|---|
| Couscous particle explosion | HTML5 Canvas — physics-based particles |
| Ingredient label lines | SVG path draw animation |
| Section entry animations | Framer Motion — fade up on scroll |
| Deal card hover | Gold glow (`box-shadow`) + slight scale |
| Nav scroll transition | Framer Motion `useScroll` |
| Hero ambient particles | Canvas — slow-drifting grain particles |
| Steam on couscous bowl | CSS keyframe animation |
| Mobile menu | Framer Motion overlay |

---

## 6. Responsive Design

- Mobile-first Tailwind breakpoints
- Nav collapses to hamburger on mobile
- Couscous explosion works on mobile tap (same Canvas interaction)
- Deal cards stack vertically on mobile
- Menu cards stack vertically on mobile
- Story section stacks (image above text) on mobile

---

## 7. Performance & SEO

- Images: Next.js `<Image>` component with lazy loading + WebP
- Fonts: `next/font` (no layout shift)
- Canvas: lazy-initialised (only when section is in viewport)
- Meta title: "Feelaj Couscous — Authentic Tunisian Delivery, Sydney"
- Meta description: "Order authentic Tunisian couscous, tagine, and Salata Mishweya delivered anywhere in Sydney. Family deals from $22. Feelaj Couscous — Western Sydney."
- OG image: overhead couscous bowl photo

---

## 8. Brand Assets & Favicon

- **Favicon:** Gold "F" lettermark in Cormorant Garamond on dark background — generated as SVG, exported as 32×32 and 180×180 (Apple touch icon)
- **OG image:** Overhead Tunisian couscous bowl photo with "Feelaj Couscous" logotype overlaid in gold
- **Logo:** Text-only logotype — "Feelaj Couscous" in Cormorant Garamond, gold. No icon needed in Phase 1.
- **Photography note:** Unsplash will be used for initial launch (search terms: "Tunisian couscous", "Tunisian food", "North Africa wheat fields", "traditional Tunisian kitchen"). Client should replace with real photos of Amal's food once available — this will dramatically improve authenticity and conversion.

## 9. Out of Scope (for now)

- Online checkout / payment processing
- CMS / admin panel
- Customer accounts
- Reviews system

These can be added in a future phase once the brand is established.
