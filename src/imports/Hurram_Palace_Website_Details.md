
# 1. The core design concept

I would name the design direction:

## **“The Imperial Coast”**

The central visual idea:

**Ottoman Imperial Heritage × Bay of Bengal × Contemporary Luxury**

Not:

> “A website about a hotel.”

But:

> **“An experience of discovering a palace that seems to have emerged from history and landed on the coast of Bangladesh.”**

That distinction should drive every Figma decision.

The website should feel:

**Dark → cinematic → mysterious → elegant → architectural → expensive → calm.**

Avoid making it look like a traditional “red and gold Islamic website.” That would become cliché very quickly.

Instead, Ottoman references should appear as **details inside an extremely modern luxury interface**.

---

# 2. The biggest change from the existing HTML

Your current prototype uses:

- white backgrounds
- pale cream sections
- conventional 3-column cards
- obvious borders
- lots of explanatory text
- red/gold gradients
- standard reveal animations

For the real website, I would move toward:

### 75% visual

### 20% typography

### 5% interface elements

The content already supports this approach.

For example, the existing story describes Hurrem Palace as much more than a hotel and positions it as a destination intended to put Bangladesh on the tourism map.

That should **not** appear as a giant paragraph.

It should become:

> enormous visual  
> ↓  
> one sentence  
> ↓  
> cinematic transition  
> ↓  
> architectural detail

---

# 3. Color system

I would make the entire visual identity darker than the HTML prototype.

### Primary palette

|Token|Hex|Usage|
|---|---|---|
|Imperial Black|`#0A0807`|Main background|
|Palace Black|`#11100E`|Secondary background|
|Ottoman Crimson|`#5E0F1A`|Brand accent|
|Deep Burgundy|`#35070E`|Large crimson surfaces|
|Antique Gold|`#B38A3E`|Primary luxury accent|
|Champagne Gold|`#D4B56A`|Highlights|
|Aged Ivory|`#E8E0D2`|Main text|
|Muted Sand|`#A99D8B`|Secondary text|
|Brass Line|`#725C31`|Borders/dividers|

The existing prototype already establishes crimson around `#8b1e2d` and gold around `#b8860b`, so the new direction should **retain those associations while making them darker and more sophisticated** rather than abandoning the established identity.

### Important rule

**Gold should never dominate the UI.**

Gold should appear like:

> jewelry

not:

> paint.

Use maybe **8–12% of the visual interface as gold**.

---

# 4. Typography

Your existing prototype already chose a good family combination:

- Cinzel
- Playfair Display
- Cormorant Garamond
- Jost

I would keep the concept but establish much stricter hierarchy.

### Display

**Cinzel**

Use for:

- HURREM PALACE
- navigation labels
- large numerical markers
- small Ottoman-inspired headings
- chapter numbers

### Main editorial heading

**Playfair Display**

Use for:

- H1
- H2
- major storytelling statements

### Heritage / poetic text

**Cormorant Garamond Italic**

Use sparingly for:

> “Where empire meets the sea.”

or

> “A legacy worthy of tomorrow.”

### UI

**Jost**

Use for:

- buttons
- navigation
- captions
- metadata
- investment information

---

# 5. Figma foundation

Before designing any page, create a **Design System page**.

Structure:

00 — Cover

01 — Design Principles

02 — Colors

03 — Typography

04 — Grid

05 — Buttons

06 — Navigation

07 — Cards

08 — Ottoman Motifs

09 — Image Treatment

10 — Motion

11 — Components

12 — Desktop Pages

13 — Mobile Pages

---

# 6. Figma grid

Desktop:

### 1440 × 1024

Use:

- 12 columns
- 80px outer margin
- 20px gutter

For very large screens:

### max content width: 1280–1320px

Don't make the page content stretch from edge to edge.

The **visuals** can go full width.

Text should remain controlled.

---

# 7. Navigation

This should be one of the strongest parts of the website.

### Initial state

Transparent over video.

HURREM PALACE                 ABOUT   ARCHITECTURE   INVESTMENT     CONTACT

                                 ↓

                        [ Request Information ]

But make the logo **centered**, rather than left aligned.

Think luxury resort / fashion house.

### Better version

MENU                              HURREM PALACE                         CONTACT

On desktop, hovering `MENU` opens the main navigation.

I would actually prefer this over a traditional large horizontal nav because your website is supposed to feel editorial and cinematic.

But if you want traditional navigation:

HURREM PALACE

  

HOME     ABOUT ↓     ARCHITECTURE     INVESTMENT     CONTACT

### About dropdown

This is important.

Make it a **large editorial mega-dropdown**, not a tiny browser-style dropdown.

When hovering:

**ABOUT**

the screen should reveal:

ABOUT HURREM PALACE

  

01

OUR STORY

  

02

PROJECT & LOCATION

  

03

COMPANY DETAILS

And on the right:

a large architectural image/video.

This alone will immediately make the site feel more premium.

---

# 8. Hero section — this should be spectacular

This is where I would spend the most design effort.

Your prototype currently has an abstract arch-based hero composition.

For the actual website:

## Fullscreen video

**100vh–100svh**

Video:

- aerial coast
- waves
- cinematic approach
- palace architecture
- marble
- dome
- chandelier
- sunset
- close-up details
- architectural renders

### Color grade

Dark.

Slight burgundy shadows.

Warm highlights.

Very subtle film grain.

---

## Hero composition

Don't put a large paragraph in the middle.

Instead:

                    HURREM PALACE

  

             AN OTTOMAN LEGACY

             ON BANGLADESH'S COAST

  

                    2027 — 2032

Then bottom left:

SHAMUK BEACH

COX'S BAZAR

BANGLADESH

Bottom right:

DISCOVER THE PALACE

        ↓

And possibly a tiny vertical:

SCROLL TO ENTER

---

# 9. Hero animation

This is where your “paradox style” idea can become powerful.

I assume by **paradox** you mean a highly layered **parallax / depth-based interaction**.

Do this:

### Layer 1

Video background

### Layer 2

Dark gradient

### Layer 3

Ottoman geometric pattern

### Layer 4

Large typography

### Layer 5

Fine gold frame

### Layer 6

Floating architectural detail

As the user scrolls:

Video zooms

        ↓

Typography moves opposite direction

        ↓

Gold frame expands

        ↓

Video transitions into next image

        ↓

Architecture emerges

The website should feel almost like a **digital film**.

---

# 10. Transition from Hero

Don't immediately go to a normal white statistics section.

Instead:

## “THE PALACE IS COMING”

Full black screen.

Huge text:

> **NOT A HOTEL.**

pause

> **A DESTINATION.**

Then the next word:

> **A LEGACY.**

This messaging is directly supported by the project's source content, which repeatedly positions Hurrem Palace as more than a hotel and as an international tourism destination.

---

# 11. Homepage structure

I would design the homepage as a continuous cinematic story.

## Section 01 — Hero

**Full-screen video**

---

## Section 02 — Manifesto

Black background.

Huge serif typography.

NOT A HOTEL.

  

A PALACE.

A DESTINATION.

A LEGACY.

Scroll animation reveals each line.

---

## Section 03 — The Coast

Full-screen coastline image/video.

Left:

SHAMUK BEACH

COX'S BAZAR

Right:

large serif:

> Where the hills meet the sea.

The source material describes the location as Shamuk Beach along the Cox's Bazar–Teknaf Marine Drive, with hills to the east and the Bay of Bengal to the west.

### Animation

As user scrolls:

Beach image moves slowly left.

Map line draws itself.

A tiny gold Ottoman ornament follows the path.

---

# 12. “The Story” section

Instead of the prototype's normal split layout, use:

### 60/40 composition

Left:

massive photograph/render.

Right:

OUR STORY

  

BANGLADESH'S FIRST

OTTOMAN-INSPIRED

FIVE-STAR PALACE

Then only 2–3 lines.

Button:

**DISCOVER OUR STORY →**

The detailed story remains available on the dedicated page rather than being dumped onto the homepage.

---

# 13. Signature Architecture section

This should be visually huge.

The architecture content contains excellent names:

- Imperial Arrival Hall
- Hürrem Royal Hammam
- Topkapi Royal Dining
- Glass Bridge of the Bosphorus
- Infinity Pool of the Sultana
- Jahan Mosque

Don't show these as six ordinary cards.

### Do this instead:

Large horizontal scrolling gallery.

01

IMPERIAL

ARRIVAL HALL

  

        [ HUGE IMAGE ]

  

              →

Then:

02

HÜRREM

ROYAL HAMMAM

Then:

03

TOPKAPI

ROYAL DINING

The image takes approximately **75–80% of the viewport**.

Text overlays the image.

---

# 14. Ottoman motif system

This is where we can make the website uniquely Hurrem Palace.

Do **not** cover the entire site in Islamic patterns.

Create perhaps **six signature motifs**.

### 01 — Ottoman arch

Already present in the source prototype.

Turn it into a recurring UI element.

### 02 — Tulip motif

Very subtle.

Used near headings.

### 03 — Iznik-inspired geometric pattern

Use as a masked texture.

### 04 — Ottoman window silhouette

Use for image cropping.

### 05 — Palace seal

Create a custom circular Hurrem Palace emblem.

### 06 — Brass ornamental corner

Tiny corner ornaments around selected imagery.

---

# 15. The visual trick I strongly recommend

Create an **Ottoman arch mask component** in Figma.

Example:

┌──────────────────────┐

│                      │

│       IMAGE          │

│                      │

│        ╭────╮        │

│       ╱      ╲       │

│      │        │      │

└──────┴────────┴──────┘

Images should sometimes be cropped through this arch.

This creates the feeling that you are looking **through palace architecture**.

That can become one of the Hurrem Palace website's signature visual devices.

---

# 16. About Us — 3 pages

You specified:

### ABOUT

→ Our Story  
→ Project & Location Details  
→ Company Details

I agree with this.

The existing About prototype already contains the story, project facts, Hürrem Sultan inspiration, location and chairman statement.

---

## About / Our Story

Hero:

full-screen palace image/video.

Text:

OUR STORY

  

A dream inspired by

heritage.

Then a chronological narrative.

### Timeline interaction

THE IDEA

     ↓

THE VISION

     ↓

THE LAND

     ↓

THE PALACE

     ↓

THE LEGACY

Large years animate as scrolling chapters.

---

# 17. Project & Location Details

This should feel almost like a **luxury architectural presentation**.

Start with:

### Fullscreen aerial map

Then reveal:

4 ACRES

PRIVATE LAND

  

SHAMUK BEACH

COX'S BAZAR

  

BAY OF BENGAL

The supplied project data gives four acres, company-owned land, 40,000 authorized shares, construction start in 2027 and target opening in 2032.

Then:

### Interactive map section

Use:

**Bangladesh → Cox's Bazar → Shamuk Beach**

with a thin gold line connecting locations.

---

# 18. Company Details

Make this much more corporate and trustworthy.

Because the project includes an investment proposition, this page shouldn't be as experimental as the homepage.

Use:

### dark editorial hero

then:

HURREM PALACE LIMITED

  

A private limited company

building a destination for

the next generation.

Then company facts.

Then leadership.

Then chairman.

The chairman statement already provides a strong narrative around his business experience and motivation for the project.

Use a large **black-and-white portrait**, not a colorful corporate headshot.

---

# 19. Architecture page

This should be the **most visually immersive page after the homepage**.

Opening:

ARCHITECTURE

  

SIX CENTURIES OF

OTTOMAN CRAFT

BUILT FOR TODAY

Then huge architectural render.

The supplied architecture content explicitly positions the project around domes, marble and hand-carved teak and describes Turkish and Bangladeshi architectural supervision.

Then the facility experience becomes a sequence.

---

## Architecture interaction

Instead of:

Card Card Card

Card Card Card

Do:

──────────────────────────────

  

01                  IMPERIAL

                    ARRIVAL HALL

  

[ FULL SCREEN IMAGE ]

  

──────────────────────────────

Then horizontal scroll.

This is where you can use **Framer Motion / GSAP-style horizontal storytelling later in development**.

---

# 20. Facility Directory

Keep the long facility list from the prototype, but don't expose everything immediately.

Use categories:

DINING

BANQUET

POOLS

WELLNESS

FAMILY

LIBRARY

SHOPPING

FAITH

BEACH

PRESIDENTIAL

Click category:

the list unfolds elegantly.

The source already organizes the facilities this way, including dining, banquet, pools, wellness, family, library, shopping/faith, beach and presidential/medical areas.

This makes a huge amount of information feel manageable.

---

# 21. Investment page

This deserves a **different emotional tone**.

Homepage:

> dream

Architecture:

> beauty

Investment:

> trust

Don't make the investment page overly artistic.

The user needs confidence.

Hero:

OWN THE LAND.

OWN THE LEGACY.

The current investment content explicitly frames the model around halal/Sharia-compliant land-backed ownership and fractional interest in the project land.

---

# 22. Investment UI

First:

## Why invest

Six benefits.

But instead of six cards:

large numbers:

01

LAND-BACKED

  

02

LONG-TERM

  

03

TRANSFERABLE

  

04

OPERATIONAL

OPPORTUNITY

  

05

PRIVILEGES

  

06

INHERITANCE

Click → corresponding text appears.

---

# 23. Share packages

This should be an **extremely elegant financial UI**.

Use three large packages.

### SINGLE

`1 SHARE`

### PREMIUM

`5–9 SHARES`

### PRIVATE

`10+ SHARES`

Then a segmented payment selector:

FULL PAYMENT | 12 MONTHS | 24 MONTHS

The actual supplied pricing should be kept exactly as the source content currently defines it, e.g. single-share base price ৳5,00,000, with its listed full-payment and installment options.

Do **not** make this look like an e-commerce checkout.

It should feel like a **private investment dossier**.

---

# 24. Investment process

Use a giant horizontal line:

01

CHOOSE

      ───────

02

BOOK

      ───────

03

CERTIFICATE

      ───────

04

SUB-KABALA

The current content already defines these four stages.

---

# 25. Contact page

Very minimal.

Dark background.

Left:

LET'S TALK

  

About the palace.

About ownership.

About the future.

Right:

large premium form.

Fields:

NAME

PHONE

EMAIL

INTEREST

MESSAGE

Button:

**REQUEST A PRIVATE CONSULTATION**

Then location:

DHaka office

Shamuk Beach project

Cox's Bazar

Your supplied prototype contains the Dhaka office contact details, email and phone, so those can be incorporated once the final production information is confirmed.

---

# 26. Footer

Do not use the current big cream footer.

Use:

## almost-black footer

At top:

large:

**HURREM PALACE**

Then:

HOME

ABOUT

ARCHITECTURE

INVESTMENT

CONTACT

Then:

OUR STORY

PROJECT & LOCATION

COMPANY DETAILS

Then contact.

At bottom:

thin gold line.

Tiny copyright.

---

# 27. Imagery direction

This is extremely important.

Don't use generic hotel stock photos.

You need **cinematic editorial imagery**.

### Image categories

1. Palace exterior
2. Dome
3. Marble
4. Ottoman arches
5. Chandelier
6. Hammam
7. Turkish tiles
8. Coastline
9. Sunset
10. Ocean
11. Architecture close-ups
12. aerial landscape
13. luxurious bedroom
14. dining
15. Ottoman decorative objects

Ottoman interiors are naturally rich in arches, gilded decoration, blue/red tilework, marble, patterned surfaces and warm metal details, so these references can inform the motif library without making the website visually overloaded.

![https://images.openai.com/static-rsc-4/dkNvKv0aHjv2mkzd2azop9RPVfgCG3dxuOwohtzkOT5xxF-3VAstjhLn8HiVv6dSCgJ5rwyk193BzB9Mez8Ed6tmix2UpQdXLze12LZeXo47mnmF7DLy27nvNcidTihYavxorbyqnIcfVIqKrFp6w14-_kmxoTOCO2-oty1-t9K7PjoKS7-dgC5SgdIQH6Tj?purpose=fullsize](https://images.openai.com/static-rsc-4/dkNvKv0aHjv2mkzd2azop9RPVfgCG3dxuOwohtzkOT5xxF-3VAstjhLn8HiVv6dSCgJ5rwyk193BzB9Mez8Ed6tmix2UpQdXLze12LZeXo47mnmF7DLy27nvNcidTihYavxorbyqnIcfVIqKrFp6w14-_kmxoTOCO2-oty1-t9K7PjoKS7-dgC5SgdIQH6Tj?purpose=fullsize)

![https://images.openai.com/static-rsc-4/4Otl1Nqriln-k0uHh5mphcWjeNdlsQh0CggJNb-Ek20AW2FFHwmR1rD4sBG9M-dFGKbxDBvleq9NO1kbTu24JIuerpfGSDTgr289YQ169Zlh7-J5A_jBwxRWfIVMOe7h5Rf7_FX0SY9YIqc627Orhoy6sBBDpN6AhgHYCKZmnCCnq1Gf1WNbFGfHEMGxnn38?purpose=fullsize](https://images.openai.com/static-rsc-4/4Otl1Nqriln-k0uHh5mphcWjeNdlsQh0CggJNb-Ek20AW2FFHwmR1rD4sBG9M-dFGKbxDBvleq9NO1kbTu24JIuerpfGSDTgr289YQ169Zlh7-J5A_jBwxRWfIVMOe7h5Rf7_FX0SY9YIqc627Orhoy6sBBDpN6AhgHYCKZmnCCnq1Gf1WNbFGfHEMGxnn38?purpose=fullsize)

![https://images.openai.com/static-rsc-4/qsQdTNP_Py46x_pVs1zEtTNLCNmjxTZc2ngZ66_cIlApVmG7SPNg-JUU2Nj4x_QHy8tTelaD72xvN8FEnTF7z7NwdPZJe7WAoalqZga9cttLKGxrIKt7uOupkWHgwiO--jYpz-m4ckwcQ2EaCxDcXMD-COS9hz89TZOCb_q-DJEOEfig9UFvK0o0CP4_xtEN?purpose=fullsize](https://images.openai.com/static-rsc-4/qsQdTNP_Py46x_pVs1zEtTNLCNmjxTZc2ngZ66_cIlApVmG7SPNg-JUU2Nj4x_QHy8tTelaD72xvN8FEnTF7z7NwdPZJe7WAoalqZga9cttLKGxrIKt7uOupkWHgwiO--jYpz-m4ckwcQ2EaCxDcXMD-COS9hz89TZOCb_q-DJEOEfig9UFvK0o0CP4_xtEN?purpose=fullsize)

---

# 28. Image treatment

Every image should have a consistent treatment.

### Example

Normal:

`PHOTO`

Hurrem Palace:

`PHOTO + BLACK GRADIENT + FILM GRAIN + SLIGHT DESATURATION + WARM GOLD HIGHLIGHTS`

This makes completely different photos feel like one brand.

---

# 29. Parallax / scroll language

This is where the website can become memorable.

Use approximately:

### 1. Image scale animation

Image:

`100% → 110%`

while scrolling.

### 2. Typography displacement

Heading moves slightly slower than image.

### 3. Mask reveal

Image starts inside an Ottoman arch and expands to full-screen.

### 4. Horizontal galleries

Architecture and facilities.

### 5. Text split animation

Each line enters separately.

### 6. Gold line drawing

Use thin gold SVG lines that draw themselves.

### 7. Number morphing

Investment/project numbers animate from small to monumental.

---

# 30. Don't animate everything

This is critical.

Luxury design is about **restraint**.

The current HTML has basic `.reveal` animation everywhere.

Don't reproduce that everywhere.

Instead:

### Hero

10/10 motion

### Homepage

8/10

### Architecture

9/10

### About

6/10

### Investment

4/10

### Contact

2/10

The less animated pages actually make the highly animated pages feel more special.

---

# 31. Motion timing

Use:

### Elegant

`0.8–1.2s`

rather than flashy:

`0.2–0.4s`

Recommended easing:

cubic-bezier(.16, 1, .3, 1)

For image movements:

slow continuous interpolation.

No bounce.

No exaggerated scaling.

No flashy neon effects.

---

# 32. One particularly powerful idea

Create a recurring **“Palace Door” transition**.

Imagine:

        ╭──────────╮

       /            \

      │              │

      │              │

      │              │

      ╰──────────────╯

Every major section begins behind this shape.

As the user scrolls:

**door opens → image reveals → section enters**

This can become a signature Hurrem Palace interaction.

---

# 33. Another signature element: Imperial Seal

Create a custom emblem.

Circular:

        HURREM PALACE

             ◇

        COX'S BAZAR

with an Ottoman-inspired central symbol.

Don't overcomplicate it.

Use it:

- hero
- page transitions
- footer
- loading screen
- section dividers

---

# 34. Loading screen

Definitely add one.

Black background.

Gold seal slowly appears.

Then:

HURREM PALACE

under it:

AN OTTOMAN LEGACY

ON BANGLADESH'S COAST

Then the seal fades into the hero.

This is a very effective way to establish the luxury mood before the website begins.

---

# 35. Figma page naming

I would structure the actual Figma file like this:

HURREM PALACE — WEBSITE

  

01 Foundations

   Colors

   Typography

   Grid

   Spacing

   Shadows

  

02 Components

   Navigation

   Buttons

   Cards

   Forms

   Gallery

   Accordion

   Investment Table

   Footer

  

03 Ottoman Assets

   Arch

   Tulip

   Geometric Pattern

   Seal

   Corner Ornament

   Dividers

  

04 Homepage

   Desktop 1440

   Desktop 1920

   Tablet

   Mobile 390

  

05 About

   Our Story

   Project & Location

   Company Details

  

06 Architecture

  

07 Investment

  

08 Contact

  

09 Responsive

  

10 Prototype / Interactions

---

# 36. Desktop frame sequence

For the initial design sprint, don't try to finish every page.

Make these first:

### Frame 01

Homepage Hero

### Frame 02

Homepage Manifesto

### Frame 03

Homepage Architecture

### Frame 04

Homepage Investment

### Frame 05

Homepage Final CTA

### Frame 06

About Hero

### Frame 07

Architecture Hero

### Frame 08

Investment Hero

### Frame 09

Contact

Once these nine frames establish the language, the remaining page sections become much easier.


# 37. The visual ratio I recommend

For **homepage**:

VIDEO / IMAGE       65%

TYPOGRAPHY          25%

UI / DETAILS        10%

For **About**:

IMAGE               50%

TEXT                35%

UI                  15%

For **Architecture**:

IMAGE               70%

TEXT                20%

UI                  10%

For **Investment**:

CONTENT             55%

TYPOGRAPHY          25%

IMAGE               20%

For **Contact**:

TYPOGRAPHY          35%

FORM                35%

IMAGE / MAP         30%

---

# 38. The final emotional journey

The whole site should feel like this:

### ENTER

Black screen.

↓

### DISCOVER

Cinematic coastal video.

↓

### WONDER

Ottoman architecture.

↓

### UNDERSTAND

Story and location.

↓

### EXPLORE

Facilities.

↓

### DESIRE

Rooms / lifestyle / destination.

↓

### TRUST

Company.

↓

### INVEST

Ownership.

↓

### CONNECT

Contact.

That is much stronger than simply:

> Hero → About → Features → Cards → Investment → Footer.

---

# 49. The final art-direction sentence for your Figma file

Put this at the top of the **Design Principles** page:

> **Hurrem Palace is not designed as a real-estate website. It is designed as the digital entrance to a palace — where Ottoman heritage, coastal landscape and contemporary luxury meet through cinematic imagery, restrained typography, deep crimson, antique gold and immersive movement.**

The source material strongly supports this positioning: the project describes itself as an Ottoman-inspired five-star destination on Bangladesh's coast, with the ambition to become an international tourism destination rather than simply another hotel.

And I would use **Ananta Terraces as a benchmark for information architecture and premium project storytelling, not as something to imitate visually**. Its current site uses a compact project-oriented navigation covering the project, amenities, residences, location, sustainability, team and contact, while presenting the development as a lifestyle/destination experience.
