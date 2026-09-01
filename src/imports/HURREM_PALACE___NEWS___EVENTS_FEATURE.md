# 

## Complete Product + Figma + Admin Brief

The News & Events feature should not feel like a generic corporate “blog.”

For Hurrem Palace, it should feel like an **official royal journal** documenting the journey of the palace — from construction milestones and announcements to investor events, partnerships, press coverage and destination-related updates.

The feature should be designed from the beginning as a **market-ready CMS-driven content system**, so the company team can manage everything without touching code.

---

# 01 — FEATURE PURPOSE

The feature has two connected experiences:

### Public website

Visitors can discover:

- latest news
- project updates
- events
- announcements
- press/media coverage
- investor events
- construction milestones
- partnerships
- exhibitions
- official notices

### Admin dashboard

Authorized administrators can:

- create news
- create events
- edit content
- upload images
- attach video links
- manage locations
- schedule publishing
- categorize posts
- feature selected posts
- archive posts
- manage SEO
- manage images
- preview before publishing

The public website and admin panel should use the **same content system**.

---

# 02 — NAVIGATION

Add:

```
HOME
ABOUT ↓
ARCHITECTURE
INVESTMENT
NEWS & EVENTS
CONTACT
```

The **News & Events** item should be directly visible in desktop navigation.

In the About dropdown, don't put it.

It deserves its own top-level navigation item because the project will continuously generate new content.

---

# 03 — FOOTER

Add:

```
NEWS & EVENTS
```

under the Explore column.

Recommended footer structure:

```
EXPLORE
Our Story
Project & Location
Company Details
Architecture
Investment
News & Events
Contact
```

---

# 04 — HOMEPAGE NEWS & EVENTS SECTION

The homepage should not show a giant blog grid.

It should be an elegant **“Latest From the Palace”** section.

---

## Section heading

```
NEWS & EVENTS

FROM THE PALACE
```

Then:

> The latest milestones, stories and moments from Hurrem Palace.

Keep the copy minimal.

---

# 05 — HOMEPAGE LAYOUT

I recommend a **featured editorial layout**.

### Desktop

One large featured story:

```
┌───────────────────────────────────────────────┐
│                                               │
│                FEATURED IMAGE                 │
│                                               │
│                                               │
└───────────────────────────────────────────────┘

PROJECT UPDATE

CONSTRUCTION BEGINS AT SHAMUK BEACH

A short 1–2 line description...

READ STORY →
```

Beside or underneath it:

two smaller items.

```
02
EVENT

Investor Meet & Welcome Evening

READ →


03
NEWS

Hurrem Palace announces...

READ →
```

This is far more premium than:

```
Card Card Card Card
```

---

# 06 — HOMEPAGE PARADOX EFFECT

Because your homepage is built around paradox scrolling, the News & Events section should participate in the same visual language.

As the user enters the section:

### Background

Deep royal red.

### Featured image

Moves slightly upward.

### Secondary stories

Move at a different speed.

### Gold vertical line

Draws itself as the section enters.

### Heading

Moves slightly opposite to the image.

The section should feel like a **royal journal opening**.

---

# 07 — HOMEPAGE FEATURED CONTENT

The admin should be able to mark an item:

### `Featured on Homepage`

Only one item should be allowed as the **primary featured story**.

You can optionally allow up to 3 homepage highlights.

Admin UI:

```
Homepage Display

[✓] Featured on Homepage

Position:
[ Primary Featured ▼ ]
```

---

# 08 — HOMEPAGE FILTER

Do not show filters on the homepage.

Instead show:

```
ALL JOURNAL
→
```

which takes users to:

# NEWS & EVENTS

---

# 09 — NEWS & EVENTS PAGE

URL:

```
/news-events
```

or:

```
/news
```

I prefer:

### `/news-events`

because it clearly accommodates both content types.

---

# 10 — NEWS & EVENTS PAGE HERO

Full-width royal-red hero.

Minimal typography:

```
NEWS & EVENTS

THE JOURNAL
OF HURREM PALACE
```

Then:

> Stories, milestones, announcements and events from the journey.

A subtle Ottoman arch or gold line can sit behind the heading.

---

# 11 — PAGE CONTENT STRUCTURE

The page should have:

### Featured story

Large editorial image.

### Latest stories

Grid/list.

### Events

Upcoming events.

### Archive

Older content.

---

# 12 — CONTENT FILTERING

At the top:

```
ALL     NEWS     EVENTS     ANNOUNCEMENTS     PROJECT UPDATES
```

Do not make these colorful pill buttons.

Use:

thin text navigation.

Active category:

**gold underline**

Example:

```
ALL   NEWS   EVENTS   ANNOUNCEMENTS   PROJECT UPDATES
────
```

---

# 13 — SEARCH

For a market-ready implementation, include search.

Search field:

```
SEARCH THE JOURNAL
──────────────────────────── 🔍
```

Search should work against:

- title
- summary
- content
- category
- location
- tags

---

# 14 — SORTING

Default:

### Latest first

Optional:

```
Newest
Oldest
Featured
```

For events:

```
Upcoming
Past Events
```

---

# 15 — NEWS CARD

Every item should contain:

```
CATEGORY

TITLE

SHORT EXCERPT

DATE

LOCATION

READ STORY →
```

Example:

```
PROJECT UPDATE

FIRST PHASE OF PALACE DEVELOPMENT REVEALED

18 AUGUST 2026
SHAMUK BEACH, COX'S BAZAR

READ STORY →
```

---

# 16 — EVENT CARD

Events need slightly different metadata.

```
EVENT

INVESTOR INFORMATION EVENING

24
SEP
2026

Dhaka, Bangladesh

VIEW EVENT →
```

This makes events immediately distinguishable from news.

---

# 17 — NEWS DETAIL PAGE

Every published item gets a dedicated URL.

Example:

```
/news-events/investor-information-evening
```

or better:

```
/news-events/investor-information-evening-2026
```

Use a unique slug generated from the title.

---

# 18 — DETAIL PAGE HERO

Full-width image or video.

Overlay:

```
EVENT

INVESTOR INFORMATION EVENING

24 SEPTEMBER 2026
DHAKA, BANGLADESH
```

Then content begins below.

---

# 19 — ARTICLE CONTENT

Support rich content:

- headings
- paragraphs
- images
- image galleries
- quotes
- videos
- links
- lists
- captions
- embedded content

The admin should not be limited to a single text box.

---

# 20 — VIDEO SUPPORT

Admin can provide:

### YouTube URL

or

### Vimeo URL

or potentially a hosted video URL.

Admin field:

```
VIDEO

Video URL
[____________________________]

Provider
● YouTube
○ Vimeo
○ Direct Video
```

The frontend automatically generates the correct embed/player.

Do not require admins to paste embed HTML.

---

# 21 — IMAGE MANAGEMENT

Admin should be able to upload:

### Cover image

### Gallery images

### Social sharing image

Recommended automatic image variants:

- original
- desktop
- tablet
- mobile
- thumbnail

The system should optimize images automatically.

Support:

- JPG
- PNG
- WebP
- AVIF

Set reasonable file-size limits and show upload progress.

---

# 22 — IMAGE CROPPING

This is particularly important for the design.

After upload, admin should be able to define:

### Focal point

For example:

```
┌────────────────────────────┐
│                            │
│          ●                 │
│       focal point          │
│                            │
└────────────────────────────┘
```

This prevents a person's face, building or important architectural detail from getting cropped incorrectly across responsive layouts.

---

# 23 — CONTENT TYPES

Don't build News and Events as exactly the same object.

Create:

## NEWS

Typical fields:

- title
- category
- date
- location
- summary
- content
- cover image
- gallery
- video
- author
- tags
- featured
- status
- SEO

## EVENT

Additional fields:

- event date
- start time
- end time
- location
- venue
- registration URL
- RSVP status
- event type
- speakers
- event image
- event video

---

# 24 — EVENT STATUS

Events should automatically support:

### Upcoming

### Happening Today

### Past

Based on date/time.

Admin should not need to manually change the status.

For example:

```
24 SEP 2026
UPCOMING
```

After the event:

```
24 SEP 2026
PAST EVENT
```

---

# 25 — EVENT LOCATION

Don't use plain text only.

Support:

```
Location Name
Venue
Address
Google Maps URL
Latitude
Longitude
```

Frontend can show:

```
DHaka
HURREM PALACE OFFICE

VIEW ON MAP →
```

This also leaves room for future map integration.

---

# 26 — EVENT REGISTRATION

Optional field:

```
Registration URL
```

Button automatically becomes:

**REGISTER FOR EVENT →**

If no registration URL exists:

**EVENT DETAILS →**

This avoids broken or empty buttons.

---

# 27 — ADMIN DASHBOARD

Create a dedicated route:

```
/admin
```

or:

```
/admin/news-events
```

But do not expose this through the public website.

---

# 28 — ADMIN DASHBOARD HOME

Dashboard overview:

```
NEWS & EVENTS

12
Published

03
Drafts

02
Scheduled

04
Upcoming Events
```

Then:

### Recent activity

```
Today
Published "Project Update..."

Yesterday
Edited "Investor Evening"

28 Aug
Scheduled "Launch Announcement"
```

---

# 29 — ADMIN CONTENT TABLE

Main screen:

```
CONTENT

[ + Create New ]

Search ______________________

All ▼   Published ▼   All Categories ▼

--------------------------------------------------------
TITLE              TYPE     DATE       STATUS     ACTION
--------------------------------------------------------
Project Update     NEWS     28 Aug     Published   ...
Investor Evening   EVENT    24 Sep     Scheduled   ...
New Partnership    NEWS     20 Aug     Draft       ...
--------------------------------------------------------
```

---

# 30 — ACTION MENU

For each content item:

```
View
Edit
Duplicate
Preview
Feature
Unpublish
Archive
Delete
```

Delete should require confirmation.

For market readiness, I recommend **soft deletion/archive** rather than immediately destroying the content.

---

# 31 — CREATE CONTENT

Primary button:

### `+ CREATE NEW`

Opens:

```
What would you like to create?

[ NEWS ]

[ EVENT ]
```

Then loads the corresponding editor.

---

# 32 — NEWS EDITOR

Structure:

```
CREATE NEWS

Title
[_____________________________________]

Slug
[_____________________________________]

Category
[ Project Update ▼ ]

Short Description
[_____________________________________]
[_____________________________________]

Cover Image
[ Upload Image ]

Content
[ Rich Text Editor ]

Gallery
[ + Add Images ]

Video
[ Add Video ]

Location
[_____________________________________]

Tags
[ architecture ] [ project ] [ tourism ] +

Publication
○ Draft
○ Publish now
○ Schedule

[Save Draft]       [Preview]       [Publish]
```

---

# 33 — EVENT EDITOR

Same structure, plus:

```
EVENT DATE
[ 24 / 09 / 2026 ]

START TIME
[ 06:00 PM ]

END TIME
[ 09:00 PM ]

VENUE
[________________]

LOCATION
[________________]

MAP LINK
[________________]

REGISTRATION LINK
[________________]

EVENT STATUS
Automatic
```

---

# 34 — RICH TEXT EDITOR

Don't build a complicated Word-style editor.

Keep it elegant.

Toolbar:

```
B   I   H2   H3   Quote   Link
Image   Video   List   Divider
```

Allow:

- text
- headings
- quotes
- images
- videos
- links
- lists

---

# 35 — CONTENT STATUS SYSTEM

Use:

### Draft

Content isn't publicly visible.

### Scheduled

Content automatically publishes at specified date/time.

### Published

Publicly visible.

### Archived

Removed from primary listings but retained.

This is important for a market-ready CMS.

---

# 36 — SCHEDULED PUBLISHING

Admin can choose:

```
Publish

○ Now

○ Schedule

Date: 05/10/2026
Time: 10:00 AM
Timezone: Asia/Dhaka
```

The backend automatically publishes at the scheduled time.

---

# 37 — FEATURED CONTENT SYSTEM

Admin should be able to mark:

### Featured

And:

### Homepage Feature

Separate controls are better.

For example:

```
[✓] Featured in News & Events
[✓] Featured on Homepage
```

This gives the content team control.

---

# 38 — CATEGORY SYSTEM

Create a manageable category collection.

Initial categories:

### News

### Project Update

### Construction

### Announcement

### Partnership

### Investment

### Hospitality

### Press

### Event

Admin should be able to add/edit categories later.

Do not hard-code them into the frontend.

---

# 39 — TAG SYSTEM

Tags can be free-form:

```
Cox's Bazar
Shamuk Beach
Architecture
Investment
Tourism
Ottoman
Construction
```

Useful for:

- search
- related content
- filtering
- SEO

---

# 40 — RELATED CONTENT

At the bottom of an article:

### MORE FROM THE PALACE

Show three related stories.

Recommendation logic:

1. same category
2. matching tags
3. recent content

This keeps users inside the site.

---

# 41 — SOCIAL SHARING

Every article should have:

```
SHARE

Facebook
WhatsApp
LinkedIn
Copy Link
```

But keep icons minimal.

Also generate proper Open Graph metadata.

---

# 42 — SEO CMS

Every item needs:

### SEO title

### Meta description

### URL slug

### Social image

### Canonical URL

### Index / no-index

### Open Graph title

### Open Graph description

Admin should be able to preview:

```
Google Search Preview

Hurrem Palace announces...
hurrempalace.com/news-events/...
Latest updates from...
```

---

# 43 — STRUCTURED DATA

For production, the implementation should generate appropriate structured data:

### NewsArticle

for news posts.

### Event

for events.

This helps search engines understand the content.

---

# 44 — EVENT REMINDER / CALENDAR

A useful future-ready feature:

On upcoming event detail:

```
ADD TO CALENDAR
```

Support:

- Google Calendar
- Apple/ICS download
- Outlook

This is particularly useful for investor events.

---

# 45 — ADMIN ROLES

Do not give every administrator identical permissions.

Start with:

## Super Admin

Everything.

## Content Manager

Create/edit/publish content.

## Editor

Create/edit drafts but cannot publish.

This provides basic production safety.

---

# 46 — ADMIN SECURITY

For market readiness:

### Login required

### Secure authentication

### Role-based access

### Session expiration

### Audit logging

### Password reset

### Optional 2FA

Most importantly, the public frontend must **never expose admin functions or unpublished content**.

---

# 47 — AUDIT LOG

Track important operations:

```
Md. Rahman
Published "New Project Update"
31 Aug 2026 — 10:42 AM
```

Also log:

- created
- edited
- published
- unpublished
- archived
- deleted
- scheduled changes

This becomes extremely useful once multiple employees manage content.

---

# 48 — VERSION SAFETY

For important published stories, keep revision history.

Example:

```
VERSION HISTORY

v3 — 31 Aug
v2 — 29 Aug
v1 — 28 Aug
```

Admin can:

**Restore Version**

This protects against accidental content edits.

---

# 49 — FRONTEND ARTICLE UX

On desktop:

```
CATEGORY

ARTICLE TITLE

DATE · LOCATION

[ HUGE COVER IMAGE ]

------------------------------------------------

ARTICLE CONTENT

                    [content]

                    [content]

                    [video]

                    [gallery]

------------------------------------------------

RELATED STORIES
```

Keep the reading experience extremely clean.

---

# 50 — ARTICLE PARADOX EFFECT

Do not use the extreme homepage interaction throughout the article.

Use only subtle motion:

- hero image zoom
- title fade
- gold line reveal
- image parallax
- gallery movement

This maintains readability.

---

# 51 — NEWS & EVENTS PAGE PARADOX EFFECT

This page can have a more sophisticated editorial scroll.

Example:

### Hero

Royal-red background.

↓

### Featured story

Image moves vertically.

↓

### Latest stories

Images move horizontally at different speeds.

↓

### Upcoming events

Dates animate into place.

↓

### Archive

Normal scrolling.

The effect becomes progressively calmer as the user reaches older content.

---

# 52 — EVENT VISUAL LANGUAGE

Events can have an elegant **date-first design**.

Example:

```
24
SEP
2026

INVESTOR
INFORMATION
EVENING

DHAKA
```

The large date becomes a visual anchor.

Gold date.

Ivory title.

Royal-red background.

---

# 53 — EMPTY STATES

Market-ready means thinking about empty states.

If there are no upcoming events:

```
NO UPCOMING EVENTS

New events from Hurrem Palace
will appear here.
```

If a category has no stories:

```
NO STORIES YET
```

Don't leave blank grids.

---

# 54 — RESPONSIVE DESIGN

### Desktop

Editorial multi-column layouts.

### Tablet

2-column layout.

### Mobile

Single-column storytelling.

For mobile:

```
NEWS & EVENTS

[Image]

CATEGORY
TITLE
DATE

READ →
```

Events:

```
24 SEP

EVENT TITLE
LOCATION

VIEW EVENT →
```

No horizontal overflowing cards.

---

# 55 — ADMIN MOBILE

The admin dashboard should be desktop-first, but responsive enough for:

- checking status
- approving drafts
- editing small fields
- publishing emergencies

Full rich editing can remain optimized for desktop.

---

# 56 — Figma COMPONENTS

Create these components:

```
NEWS/
  News Card
  Featured News
  News Meta
  News Category
  News Detail Hero
  News Gallery

EVENT/
  Event Card
  Event Date
  Event Meta
  Event Detail Hero
  Event Status
  Registration CTA

ADMIN/
  Content Table
  Content Editor
  Image Upload
  Image Gallery
  Rich Text Editor
  Date Picker
  Time Picker
  Category Selector
  Tag Input
  Status Selector
  SEO Panel
  Preview
```

---

# 57 — ADMIN FIGMA SCREENS

Design these separately:

```
ADMIN — LOGIN

ADMIN — DASHBOARD

ADMIN — NEWS & EVENTS

ADMIN — CREATE NEWS

ADMIN — EDIT NEWS

ADMIN — CREATE EVENT

ADMIN — EDIT EVENT

ADMIN — MEDIA LIBRARY

ADMIN — PREVIEW

ADMIN — PUBLISH / SCHEDULE

ADMIN — REVISION HISTORY
```

That gives the developer a clear product specification rather than just a visual page.

---

# 58 — MEDIA LIBRARY

I strongly recommend making this a dedicated admin feature.

Instead of uploading images independently every time:

```
MEDIA LIBRARY

[ Upload ]

Search images...

ALL | IMAGES | VIDEOS

─────────────────────────
[img] [img] [img] [img]
[img] [img] [img] [img]
```

Admin can reuse previous assets.

Each media item can have:

- filename
- alt text
- caption
- upload date
- dimensions
- file size

---

# 59 — ACCESSIBILITY

Every uploaded image should have:

### Alt text

Admin field:

```
Image description / Alt text
[________________________________]
```

Important for accessibility and SEO.

Video content should have an accessible title/description where applicable.

---

# 60 — PERFORMANCE

This feature needs to stay fast despite being image-heavy.

Frontend should use:

- responsive images
- lazy loading
- modern formats
- CDN/image optimization
- lazy-loaded video
- poster images
- pagination/infinite loading where appropriate

Don't autoplay full videos inside every card.

---

# 61 — CMS DATA MODEL

At the product level, I would structure the content roughly like this.

### Content

```
id
type
title
slug
excerpt
content
category_id
status
featured
homepage_featured
published_at
scheduled_at
location_name
location_address
map_url
cover_media_id
video_url
author_id
created_at
updated_at
archived_at
```

### Event-specific

```
event_start
event_end
venue
registration_url
```

### SEO

```
seo_title
seo_description
og_title
og_description
og_image
canonical_url
no_index
```

### Relations

```
gallery_media
tags
related_content
```

The exact database implementation can vary, but the important part is designing the **content model before the UI**.

---

# 62 — PUBLIC URL STRUCTURE

Recommended:

```
/news-events
/news-events/[slug]
```

Examples:

```
/news-events/palace-project-update
/news-events/investor-information-evening-2026
```

Keep URLs permanent.

If a title changes, the slug should not automatically change after publication unless an explicit redirect is created.

---

# 63 — 404 / REMOVED CONTENT

If an article is archived or deleted:

don't simply show a blank page.

Use:

```
THIS STORY IS NO LONGER AVAILABLE.

Explore the latest from Hurrem Palace →

[NEWS & EVENTS]
```

---

# 64 — FINAL HOMEPAGE POSITION

I would place News & Events relatively late on the homepage.

Recommended:

```
Hero
↓
Manifesto
↓
Location
↓
Story
↓
Architecture
↓
Experience
↓
Ownership
↓
NEWS & EVENTS
↓
Final CTA
↓
Footer
```

This means the news section acts as:

### **“The palace is becoming real.”**

The visitor has seen the dream, architecture and ownership story — now they can see evidence of an ongoing journey.

---

# 65 — THE BRAND STORY OF THIS FEATURE

The News & Events section should communicate:

> **The palace is not only a vision. It is a journey that is unfolding.**

That's why this feature is important.

It gives Hurrem Palace a continuously changing layer of **proof, activity and relevance**.

---

# 66 — COMPLETE EXPERIENCE

The final public experience becomes:

```
HOME
 └── Latest From the Palace
       ├── Featured Story
       ├── Latest News
       └── Upcoming Events

NEWS & EVENTS
 ├── All
 ├── News
 ├── Events
 ├── Announcements
 └── Project Updates

ARTICLE
 ├── Hero
 ├── Story
 ├── Gallery
 ├── Video
 ├── Location
 ├── Share
 └── Related Stories

EVENT
 ├── Hero
 ├── Date
 ├── Venue
 ├── Location
 ├── Description
 ├── Video/Gallery
 ├── Registration
 └── Add to Calendar

ADMIN
 ├── Dashboard
 ├── Content
 ├── Create News
 ├── Create Event
 ├── Media Library
 ├── Scheduling
 ├── SEO
 ├── Preview
 ├── Revisions
 └── User Roles
```

## The design principle for the entire feature

**Public side:**

### **“A royal journal.”**

**Admin side:**

### **“A professional newsroom.”**

The visitor gets a highly curated, cinematic editorial experience. The company team gets a practical CMS where publishing a new announcement should take **minutes, not developer involvement**.

For your Figma work, I would therefore create the **News & Events public page, article page, event page, homepage section, admin dashboard, content editor, media library, and preview state as one connected product system**, rather than treating News & Events as just another website page.