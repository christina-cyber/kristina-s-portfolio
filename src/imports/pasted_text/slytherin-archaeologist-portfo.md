Design a full tech portfolio website called "The Slytherin Archaeologist" for a developer/designer passionate about history, archaeology, dinosaurs, Harry Potter (Slytherin house), and cats. The site must feel like a candlelit wizarding study meets natural history museum — mysterious, intellectual, deeply personal, and rich with character. This is not a minimal tech portfolio. This is a world.

VISUAL STYLE & AESTHETIC
Dark Academia meets Wizarding World. Think: a Hogwarts library at midnight crossed with an archaeological dig site. Stone textures, cracked fossil patterns, aged parchment, candlelight warmth, floating magical particles. The design is layered, atmospheric, and lived-in — never cold or corporate. The tech is what this person does. The history, magic, and cats are who they are. Both must feel equally weighted.

COLOR PALETTE — WIZARDING WORLD (HIGH CONTRAST, FULLY READABLE)
Backgrounds (dark to light)

#0D0D0D — Great Hall Midnight (deepest backgrounds, hero section)
#1C1A14 — Aged Parchment Dark (alternating section backgrounds)
#2A2416 — Candlelit Stone (cards, panels, elevated surfaces)
#3D3520 — Dungeon Wall (borders, dividers, subtle containers)

Primary Text (always high contrast on dark backgrounds)

#F5EDD6 — Parchment Cream (primary body text — warm off-white, never harsh pure white)
#E8D5A3 — Old Vellum (secondary text, captions, metadata)
#C4A882 — Faded Ink (tertiary text, placeholders, muted labels)

Accent Colors (pulled from across the wizarding world)

#2A5C2A — Slytherin Green (Slytherin crest, snake motifs, primary CTA backgrounds ONLY)
#7BC67B — Lumos Green (hover states, active nav, terminal cursor — readable green)
#C8A84B — Fossil Gold / Gryffindor Gold (highlights, CTA borders, hover glows, wax seals, icons)
#8B1A1A — Restricted Section Red ("archived" status, errors — use sparingly)
#1A3A5C — Ravenclaw Midnight (code blocks, terminal background, info badges)
#4A90C4 — Enchanted Blue (links, GitHub icons, interactive elements)
#5C3A7A — Divination Purple (decorative accents, blog tags, fossil illustrations)
#8B6914 — Ancient Brass (icon fills, skill brick borders, metallic details)

CRITICAL READABILITY RULES:

Body text is ALWAYS #F5EDD6 or #E8D5A3 on dark backgrounds (#0D0D0D, #1C1A14)
NEVER use dark green #2A5C2A as text — it fails contrast. Use #7BC67B for any green text.
Links are #4A90C4 blue → hover to #C8A84B gold
All text meets WCAG AA contrast minimum (4.5:1)
Slytherin Green is reserved for Slytherin-specific elements only, not site-wide


TYPOGRAPHY

Headings: Cinzel (Roman-inscribed, classical, commanding) — 500 weight
Body: EB Garamond (old-book warmth, readable, editorial) — 400 weight
No modern sans-serifs. Everything must feel ancient and deliberate.
Heading sizes: H1 = 48px, H2 = 32px, H3 = 24px, H4 = 18px
Body = 16px, line-height 1.7


ANIMATIONS & MOVING PARTS (Prototyping / Lottie / CSS specs)

Hero entrance — Page title fades in letter-by-letter as if carved into stone. Slytherin snake SVG slowly coils/uncoils in background on loop.
Parallax scrolling — Background stone/fossil texture layers scroll at different speeds creating depth.
Floating particles — Tiny golden dust particles (like ancient spores or magical motes) drift slowly upward throughout the site, especially in Hero and Contact.
Cat blink animation — Cat silhouette in bottom-right corner occasionally blinks and flicks tail on randomized idle loop.
Exhibit card hover — Collection interest cards lift slightly with glowing #C8A84B border and reveal handwritten note, as if lifting a glass museum case.
Timeline dig reveal — Project cards in Excavation Log animate upward from below the fold (unearthing motion) when scrolled into view.
Parchment scroll unfurl — Contact/Owl Post section begins with scroll that unfurls open as user scrolls in.
Navigation serpent underline — Nav links get an underline that draws left-to-right like a snake sliding across text on hover.
Fossil spinner loader — Page loading screen shows ammonite fossil that slowly rotates until site loads.
Dinosaur footprint trail — On Projects page, subtle T-Rex footprint trail animates across background left-to-right, very slowly, on loop.
Terminal typewriter — Hero terminal window types and clears on loop (see Hero section below).
Brick chisel hover — Arsenal skill bricks pulse on hover as if being struck by chisel.
GitHub dig grid — If used in Field Notes, contribution squares animate in row by row on scroll, like soil being brushed away.
Status wax seal stamp — On project card load, status seal animates with quick stamp-down motion (scale from 0 → 1.1 → 1).
Live site trowel cursor — On Projects section only, cursor changes to custom trowel icon.


PAGE SECTIONS (Desktop: 1440px wide)

01 — HERO
Background: #0D0D0D with cracked stone/fossil texture overlay. Animated Slytherin snake coiling slowly in background (subtle, not overwhelming). Golden dust particles floating upward. Small cat silhouette bottom-right corner with blinking idle animation.
Content (center-aligned):

Name in large Cinzel (80px), #F5EDD6 color, letter-by-letter fade-in animation
Tagline beneath in EB Garamond (20px), #E8D5A3: "Excavating solutions, one line of code at a time."
Two CTA buttons side-by-side below tagline:

"View Excavations" — #2A5C2A fill, #F5EDD6 text, snake-border animation on hover → scrolls to Projects
"Send Owl" — outlined, #C8A84B border, #C8A84B text → scrolls to Contact


Minimal animated terminal window below buttons — dark glass panel (#1A3A5C background) showing looping typewriter sequence in #7BC67B:
$ whoami
> archaeologist. developer. slytherin. cat person.
$ skills --list
> [loading ancient knowledge...]
(Types out on loop with blinking green cursor)
Scroll-down indicator at bottom — styled as a trowel pointing downward, subtle bounce animation


02 — ABOUT / "THE LORE"
Background: #1C1A14 (alternating from Hero)
Layout: Two-column (60/40 split)
Left column:

Portrait photo inside ornate stone frame (like castle portrait) — #3D3520 border, 4px
Frame has subtle engraved detail (vines, serpents, fossil patterns)

Right column:

Section heading "The Lore" — Cinzel 32px, #F5EDD6
Bio text — EB Garamond 16px, #E8D5A3, 3-4 paragraphs
Below bio: 5 identity badges rendered as wax seals with icons:

Slytherin (snake icon) — #2A5C2A seal
Archaeologist (trowel icon) — #C8A84B seal
Historian (scroll icon) — #5C3A7A seal
Dinosaur Enthusiast (fossil icon) — #8B6914 seal
Cat Person (paw icon) — #4A90C4 seal


Each badge has gentle pulse animation on hover


03 — THE ARSENAL (Skills & Tech Stack)
Background: #0D0D0D
Layout: Stone-wall grid where each tech/skill is engraved on individual stone brick
Section heading: "The Arsenal" — Cinzel 32px, #F5EDD6, center-aligned
Grid clusters by category (stone arch headers above each):

Spellwork (Languages) — Python, JavaScript, TypeScript, etc.
Ancient Tomes (Frameworks) — React, Node.js, Next.js, etc.
Relics (Tools) — Git, Docker, Figma, AWS, etc.
Scrolls (Databases) — PostgreSQL, MongoDB, etc.

Each brick:

#2A2416 background, #3D3520 border
Tech logo monochrome in #8B6914, centered
Name label beneath in small Cinzel caps (12px), #C4A882
On hover: #C8A84B glow, logo tints to #C8A84B, quick chisel-strike pulse animation


04 — THE COLLECTION (Interests)
Background: #1C1A14
Layout: Museum display case grid — 5 cards, 3-column on desktop, 1-column mobile
Section heading: "The Collection" — Cinzel 32px, #F5EDD6, center-aligned
Cards (glass exhibit case style):

Archaeology (trowel + bones icon)
History (scroll icon)
Dinosaurs (T-Rex silhouette icon)
Harry Potter / Slytherin (Slytherin crest icon)
Cats (sleeping cat icon)

Each card:

#2A2416 background, #3D3520 border, 8px border-radius
Hand-drawn style icon at top (80px, #8B6914)
Label beneath in Cinzel (18px), #F5EDD6
On hover: card lifts (translateY -8px), #C8A84B glowing border, personal note fades in below label in EB Garamond italic (14px, #E8D5A3)


05 — EXCAVATION LOG (Projects/Work)
Background: #0D0D0D
Layout: Vertical timeline styled as archaeological stratigraphy diagram — older projects = deeper layers
Section heading: "Excavation Log" — Cinzel 32px, #F5EDD6
Timeline axis (left side): Tech era labels in Cinzel caps (14px, #C4A882):

"The Python Era"
"The React Epoch"
"The Full-Stack Age"

Project cards (right side, stacked vertically):

Each card is a "dig site report" — #2A2416 background, #3D3520 border, 12px border-radius
Card contents:

Site name / Project title — Cinzel 20px, #F5EDD6
Year tag — small badge, #8B6914 background, #0D0D0D text
Category badge — "Web App," "API," "CLI Tool," etc. — pill shape, #1A3A5C background, #4A90C4 text
Description — EB Garamond 14px, #E8D5A3, 2-3 lines
Stratum (Tech stack) — small pill badges in #2A5C2A with #F5EDD6 text (e.g. "React," "Node," "PostgreSQL")
Status wax seal (top-right corner):

"Unearthed" (live) → #C8A84B seal, #0D0D0D text
"In Progress" → #4A90C4 seal, #F5EDD6 text
"Archived" → #8B1A1A seal, #E8D5A3 text
Seal animates with stamp-down motion on card load


Action buttons:

"Live Site" (trowel icon) — #C8A84B color
"GitHub" (scroll icon) — #4A90C4 color





Between cards: Fossil and bone SVG illustrations as decorative layer dividers (#5C3A7A tint)
Animation: Cards animate upward (unearthing motion) on scroll-into-view
Background motif: Subtle T-Rex footprint trail animates left-to-right, very slowly, on loop

06 — FIELD NOTES (Blog / Writing, optional)
Background: #2A2416
Layout: Card grid, 2-column on desktop
Section heading: "Field Notes" — Cinzel 32px, #F5EDD6
Cards (aged journal page style):

Off-white parchment background (#2A2416 with paper texture overlay)
Category tag top-left — handwritten-style pill badge (#5C3A7A background, #F5EDD6 text) — e.g. "React," "Career," "Open Source"
Title — Cinzel 18px, #0D0D0D
Excerpt — EB Garamond 14px, #1C1A14, 2 lines
Quill-and-ink icon bottom-right (#8B6914)
On hover: page corner folds slightly (CSS transform), #C8A84B subtle glow

Alternative if no blog: GitHub contribution graph styled as archaeological dig grid — each contribution square rendered as soil/dirt tile, greener tiles = more active dig days. Animate in row by row on scroll.

07 — OWL POST (Contact)
Background: #1C1A14
Entry animation: Parchment scroll unfurls open as user scrolls into section
Availability banner (top):

Horizontal notice styled as Hogwarts-official pinned to stone wall
Reads: "Open to new expeditions" or "Currently on expedition" — toggle availability
#C8A84B background, #0D0D0D text, nail illustration in corner

Contact form (parchment scroll style):

Scroll has torn/burned edges top and bottom
Form fields with quill-ink underline borders (no box borders — just bottom-line):

Name — placeholder "Your name," #F5EDD6 text
Owl Address (email) — placeholder "your.owl@example.com"
Your Message — textarea, 4 rows


Input text: #F5EDD6, placeholders: #C4A882
Submit button: "Send Owl" with small owl icon — #2A5C2A background, #F5EDD6 text, hover scales slightly

Decoration:

Sleeping cat illustration left of form (#8B6914 line-art style)
Background: deep dungeon stone with faint candlelight glow at top


NAVIGATION (Fixed top navbar)
Background: Transparent initially, becomes slightly opaque #0D0D0D (80% opacity) on scroll
Left: Small Slytherin crest icon + name in Cinzel (18px), #F5EDD6
Right: Nav links — About, Arsenal, Collection, Excavation Log, Field Notes, Owl Post

EB Garamond 15px, #E8D5A3
On hover: #7BC67B color, serpentine underline draws left-to-right

Mobile: Hamburger menu (3 horizontal lines, #C8A84B) → opens full-screen overlay in #1C1A14 with nav links stacked vertically

FOOTER
Background: #0D0D0D
Horizontal snake SVG divider separates footer from last section (#2A5C2A tint)
Content (thin footer, centered):

Left: Social icons styled as ancient rune symbols (#8B6914) — GitHub, LinkedIn, Email
Center: "Crafted in the dungeons — © 2024" — Cinzel 12px, #C4A882
Right: Tiny cat pawprint icon (#C8A84B)


RECURRING MOTIFS (use throughout all sections)

Ammonite fossil spirals as decorative borders and section dividers
Slytherin snake as subtle cursor trail or underline accent
Cat silhouette watching from corners — appears in at least 3 sections
Parchment paper texture overlay on light-background sections
Dinosaur footprints as subtle background watermarks on Projects
Fossil Gold (#C8A84B) used consistently for all interactive/hover highlights
Ancient Brass (#8B6914) for all icon fills throughout


RESPONSIVE BREAKPOINTS

Desktop: 1440px
Tablet: 768px (2-column grids collapse to 1-column)
Mobile: 375px (all grids stack vertically)

Performance: All animations reduce or disable on mobile. Parallax collapses to static textured background. Particle effects reduce count by 70%.

FIGMA-SPECIFIC SETUP

Define all 12 colors as Figma Color Styles with names matching hex labels above
Define Text Styles for Cinzel (headings, 500 weight) and EB Garamond (body, 400 weight) at all sizes
Use Auto Layout on all frames and components
Build animations as Figma Prototype interactions using Smart Animate and scroll triggers
Export animation specs for developer handoff:

Lottie files for: snake coil, cat blink, fossil loader, particle system
CSS keyframes for: parallax, hover states, text reveal, timeline dig


Create Component Library for: cards, buttons, badges, wax seals, form inputs


TONE REMINDER
This is deeply personal, not a corporate tech portfolio. The Harry Potter references, cat motifs, fossil textures, and archaeological framing are not decorations — they are the identity. The tech is what this person does. History, magic, dinosaurs, and cats are who they are. Both must feel equally present and weighted throughout every section. The site should feel like stepping into someone's actual study — cluttered with curiosities, rich with stories, unmistakably theirs.