# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Where Winds Meet Info is a comprehensive fan-made guide website for the game *Where Winds Meet*. Built with Next.js 15 (App Router), it features 78+ SEO-optimized MDX pages, interactive build tools, boss strategies, weapon tier lists, and community content aggregation.

**Live Site**: https://wherewindsmeet.info

## Development Commands

### Core Development
```bash
npm run dev          # Start dev server on 0.0.0.0:3000
npm run build        # Production build with static generation
npm run start        # Start production server
npm run lint         # TypeScript check + ESLint
npm run format       # Format code with Biome
```

### Data Fetching (External APIs)
```bash
npm run fetch:builds     # Fetch build data from Fextralife Wiki
npm run test:urls        # Test all page URLs for 200 status
```

## Architecture Overview

### Next.js 15 App Router Architecture

This project uses Next.js 15's App Router with **full static site generation**. All 78+ pages are pre-rendered at build time using `generateStaticParams()`.

**Key Pattern**: Dynamic catch-all route handles all MDX content
- Route: `src/app/[...slug]/page.tsx`
- Content: `src/content/**/*.mdx`
- URL mapping: `/builds/sword-build` → `src/content/builds/sword-build.mdx`

### Directory Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage with build tools
│   ├── [...slug]/page.tsx          # Dynamic MDX content renderer (MAIN ROUTE)
│   ├── builds/page.tsx             # Builds list page
│   ├── bosses/page.tsx             # Bosses list page
│   ├── guides/page.tsx             # Guides list page
│   ├── news/page.tsx               # News list page
│   ├── pc/page.tsx                 # PC guides list page
│   ├── system/page.tsx             # System requirements list page
│   ├── sitemap.xml/route.ts        # Dynamic sitemap generator
│   ├── robots.ts                   # robots.txt generator
│   └── layout.tsx                  # Root layout with GA/Clarity tracking
│
├── components/
│   ├── builds/
│   │   ├── BuildBarChart.tsx       # Build popularity rankings (client)
│   │   └── BuildPicker.tsx         # Quick build recommender (client)
│   ├── Header.tsx                  # Site navigation
│   ├── Footer.tsx                  # Site footer
│   └── Breadcrumb.tsx              # Breadcrumb navigation
│
├── content/                        # 78+ MDX files with frontmatter
│   ├── builds/                     # Character build guides
│   ├── bosses/                     # Boss strategy guides
│   ├── guides/                     # Game guides & tutorials
│   ├── news/                       # News & announcements
│   ├── pc/                         # PC performance guides
│   ├── system/                     # System requirements
│   ├── store/                      # Store & editions info
│   ├── support/                    # Support & help
│   ├── media/                      # Media & videos
│   └── community/                  # Community resources
│
└── data/ (currently unused)

public/
├── data/
│   └── build_popularity.json       # Build voting data from Fextralife
├── images/
│   ├── backgrounds/                # Site background images
│   ├── hero.png                    # Homepage hero image
│   └── logo.png                    # Site logo
└── favicon.ico                     # Site favicon
```

## Content Management System

### MDX Frontmatter Structure

All MDX files in `src/content/` use this frontmatter format:

```yaml
---
title: "Page Title for SEO"
description: "Meta description (150-160 chars)"
keywords: "comma, separated, keywords"
category: "Guide|Build|Boss|News|PC"
priority: 1-100                    # Lower = higher priority
date: "2025-11-18"                 # Optional: Last updated date
reference: "https://external-source.com"  # Optional: External reference
---
```

### Content Organization

Content is organized by category in `src/content/`:

- **builds/** - Character build guides for all weapon types and playstyles
- **bosses/** - Boss strategy guides with weaknesses and drop tables
- **guides/** - General gameplay guides (combat, exploration, progression)
- **news/** - News articles and announcements
- **pc/** - PC performance guides and optimization tips
- **system/** - System requirements and technical information
- **store/** - Store editions and purchasing information
- **support/** - Support and troubleshooting guides
- **media/** - Media galleries and videos
- **community/** - Community resources and Discord information

### Dynamic Routing Pattern

The `[...slug]/page.tsx` catch-all route:
- Reads MDX files from `src/content/`
- Parses frontmatter with `gray-matter`
- Renders markdown with `marked`
- Generates structured data for SEO
- Creates breadcrumb navigation automatically

**Example**: URL `/builds/best-builds/` maps to `src/content/builds/best-builds.mdx`

## Interactive Build Tools

### BuildBarChart (`src/components/builds/BuildBarChart.tsx`)

**Client-side component** that displays build popularity rankings:
- Fetches data from `/data/build_popularity.json` (Fextralife Wiki API)
- Shows top 8 most popular builds by community votes
- Displays role indicators (DPS ⚔️, Tank 🛡️, Healer 💚)
- Color-coded weapon categories
- Real-time vote counts and percentages

**Data Structure**:
```json
{
  "builds": [
    {
      "name": "Swift Blade Dancer",
      "votes": 1250,
      "weapon": "Sword",
      "role": "DPS",
      "description": "Fast-paced melee combat..."
    }
  ],
  "lastUpdated": "2025-11-18T10:00:00Z"
}
```

**Key Features**:
- Bar chart visualization with vote percentages
- Role badges and weapon categories
- Responsive design
- Fallback mock data if fetch fails

### BuildPicker (`src/components/builds/BuildPicker.tsx`)

**Client-side component** for build recommendations:
- Step 1: Select weapon type
- Step 2: Choose playstyle (DPS/Tank/Healer)
- Instantly displays top 3 community-approved builds
- Shows detailed descriptions and vote counts
- Links to full build guides

**Features**:
- 2-step selection process
- Client-side filtering for instant results
- Weapon-specific recommendations
- Community vote validation

## SEO Implementation

### Structured Data (Schema.org)

All pages include JSON-LD structured data:
- Homepage: `WebSite`, `Organization`, `WebPage`
- Articles: `Article` with author, publisher, datePublished
- Breadcrumbs: `BreadcrumbList` for all pages

### Dynamic Sitemap

Generated at build time from all MDX files:
- Route: `/sitemap.xml`
- Priority: Homepage (1.0) > Builds (0.9) > Guides (0.9) > Bosses (0.8) > Others (0.6-0.7)
- Updates: `changefreq: weekly`, `lastmod: current date`

### Metadata Generation

Root `layout.tsx` includes:
- OpenGraph tags
- Twitter Card tags
- Robots directives
- Canonical URLs
- Google Site Verification

## Environment Variables

Required in `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://wherewindsmeet.info
NEXT_PUBLIC_SITE_NAME=Where Winds Meet
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX              # Google Analytics
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX           # Microsoft Clarity
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...    # Google Search Console
```

## Data Fetching Scripts

Located in `scripts/`:

### `fetch-builds.cjs`
- Fetches build popularity data from Fextralife Wiki API
- Outputs to `public/data/build_popularity.json`
- Includes fallback mock data
- No API key required (public data)

### `test-urls.sh`
- Tests all generated routes for HTTP 200 status
- Requires dev server running (`npm run dev`)
- Outputs results to terminal

## TypeScript Configuration

### Path Aliases

```typescript
"@/*": ["./src/*"]
```

**Example**: `import { Header } from '@/components/Header'`

### JSX Import Source

Uses `same-runtime` for JSX transformation:
```json
"jsxImportSource": "same-runtime/dist"
```

**Important**: The `same-runtime` library is loaded via CDN in `layout.tsx` and required for proper rendering.

## Styling System

### Tailwind CSS

**Key Colors**:
- Primary: `#F4B860` (warm gold/amber)
- Background: `#1C162D` to `#0D0A16` (dark purple gradients)
- Accent: `#1E3A34` (dark teal)
- Text: `text-white`, `text-gray-200`, `text-gray-300`

**Theme**: Dark mode enforced with `className="dark"` on `<html>` tag

### Background Images

- Global background: `/images/backgrounds/winter-night.png`
- Applied in `layout.tsx` with fixed positioning and blur overlay

## Testing

### URL Testing

`npm run test:urls` or `bash scripts/test-urls.sh`:
- Tests all generated routes for HTTP 200 status
- Requires dev server running (`npm run dev`)
- Validates that all MDX files are accessible

## Common Development Patterns

### Adding a New MDX Page

1. Create MDX file in appropriate `src/content/` subdirectory
2. Add required frontmatter (title, description, keywords, category, priority)
3. Write content in Markdown format
4. File automatically becomes available at `/path/to/file/` URL
5. Run `npm run build` to verify static generation
6. Sitemap updates automatically

### Modifying Build Data

1. Edit `public/data/build_popularity.json` directly, or
2. Run `npm run fetch:builds` to fetch latest from Fextralife
3. Restart dev server to see changes
4. JSON file is fetched client-side (no build required)

### Adding New List Pages

List pages (like `builds/page.tsx`, `bosses/page.tsx`) follow this pattern:
- Async server component
- Read all MDX files in subdirectory
- Parse frontmatter with `gray-matter`
- Sort by priority (lower number = higher priority)
- Render cards with links to individual pages

## Build Process

1. `npm run build` - Next.js build with:
   - Static generation of all MDX pages via `generateStaticParams()`
   - Dynamic sitemap generation
   - Image optimization
   - TypeScript compilation
   - CSS optimization
2. Output: `.next/` directory with static exports

## Deployment

- Platform: Vercel
- Configuration: `vercel.json`
- Build Command: `npm run build`
- Output Directory: `.next`
- Environment Variables: Set in Vercel dashboard

## Key Implementation Notes

### Image Optimization

Next.js Image component configured with:
- Formats: AVIF, WebP
- Priority loading for hero images
- Responsive sizing

### Analytics Integration

Both Google Analytics and Microsoft Clarity are loaded:
- Strategy: `afterInteractive` for better performance
- Conditional loading based on env vars
- Configured in `src/app/layout.tsx`

### Static Generation

All pages use `force-static` export:
- No dynamic server rendering
- All routes pre-rendered at build time
- Fast page loads and excellent SEO
- Deployed as static assets on CDN

### Markdown Rendering

Uses `marked` library for MDX content:
- Converts Markdown to HTML
- Renders with `dangerouslySetInnerHTML`
- Styled with Tailwind prose classes: `prose prose-invert prose-lg`

## Important Constraints

1. **All interactive tools must be client components** - Mark with `'use client'` directive
2. **MDX files must have valid frontmatter** - Missing fields will cause build errors
3. **JSON data files are required** - Build tools fail without them
4. **same-runtime must be loaded** - Required for JSX transformation
5. **Environment variables are required for analytics** - GA_ID and CLARITY_ID must be set in production

## Content Categories

### Builds
Character build guides for all weapon types:
- Sword builds
- Spear builds
- Bow builds
- Dual blades builds
- Mixed weapon builds

### Bosses
Boss strategy guides including:
- Attack patterns
- Weaknesses
- Recommended builds
- Drop tables

### Guides
General gameplay guides:
- Combat mechanics
- Exploration tips
- Progression guides
- Crafting systems
- Quest walkthroughs

### PC
PC-specific content:
- Performance optimization
- Graphics settings
- Keybindings
- Mods (if applicable)

### System
Technical information:
- System requirements
- Compatibility
- Installation guides
- Troubleshooting

## Quick Reference

### File Locations
- Homepage: `src/app/page.tsx`
- Main content router: `src/app/[...slug]/page.tsx`
- List pages: `src/app/{category}/page.tsx`
- Content: `src/content/{category}/{page}.mdx`
- Components: `src/components/`
- Public assets: `public/`

### Common Tasks
- Add news article: Create `src/content/news/{slug}.mdx`
- Update build data: Run `npm run fetch:builds`
- Test all URLs: Run `npm run test:urls`
- Build for production: Run `npm run build`
