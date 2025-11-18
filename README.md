# Where Winds Meet Info

> Your complete Wuxia RPG companion for *Where Winds Meet* - Interactive build tools, boss guides, and comprehensive walkthroughs for mastering the martial arts world.

🌐 **Live Site**: [https://wherewindsmeet.info](https://wherewindsmeet.info)

---

## 📖 About This Project

Where Winds Meet Info is a comprehensive fan-made guide website dedicated to helping players master *Where Winds Meet*, the open-world Wuxia action RPG. The site features:

- ✅ **Build Popularity Rankings** - Real-time community voting data from Fextralife Wiki
- ✅ **Quick Build Recommender** - 2-step tool to find the perfect build for your playstyle
- ✅ **Boss Strategy Guides** - Complete guides for all major boss encounters
- ✅ **Weapon Tier Lists** - Community-approved rankings for all weapon types
- ✅ **PC Performance Guides** - Optimization tips for smooth 60 FPS gameplay
- ✅ **78+ SEO-optimized pages** - Covering builds, bosses, guides, news, PC settings, and more
- ✅ **System Requirements Checker** - Verify if your PC can run the game
- ✅ **Release Date Countdown** - Global launch time tracker

---

## 🏗️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Interactive Tools**: Build popularity chart & recommendation system
- **Data Source**: Fextralife Wiki API
- **Content**: MDX + gray-matter
- **Deployment**: Vercel

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wherewindsmeet.info.git
cd wherewindsmeet.info

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Build for Production

```bash
# Build the site
npm run build

# Start production server
npm run start
```

---

## 📂 Project Structure

```
├── public/
│   ├── data/
│   │   └── build_popularity.json    # Community build voting data
│   └── images/
│       ├── backgrounds/             # Site background images
│       └── hero.png                 # Homepage hero image
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Homepage with build tools
│   │   ├── [...slug]/page.tsx       # Dynamic MDX page routes
│   │   ├── bosses/page.tsx          # Boss list page
│   │   ├── builds/page.tsx          # Builds list page
│   │   ├── guides/page.tsx          # Guides list page
│   │   ├── news/page.tsx            # News list page
│   │   ├── pc/page.tsx              # PC guides list page
│   │   ├── system/page.tsx          # System info list page
│   │   └── sitemap.xml/route.ts     # Dynamic sitemap generator
│   ├── components/
│   │   ├── Header.tsx               # Site navigation
│   │   ├── Footer.tsx               # Site footer
│   │   └── builds/
│   │       ├── BuildBarChart.tsx    # Build popularity rankings
│   │       └── BuildPicker.tsx      # Quick build recommender
│   ├── content/                     # 78+ MDX content files
│   │   ├── bosses/                  # Boss strategy guides
│   │   ├── builds/                  # Character build guides
│   │   ├── guides/                  # Game guides & tutorials
│   │   ├── news/                    # News & announcements
│   │   ├── pc/                      # PC performance guides
│   │   ├── store/                   # Store & editions info
│   │   ├── support/                 # Support & help
│   │   ├── system/                  # System requirements
│   │   ├── media/                   # Media & videos
│   │   └── community/               # Community resources
├── scripts/
│   ├── create-mdx-files.cjs         # Batch MDX file generator
│   ├── fetch-builds.cjs             # Fextralife data fetcher
│   └── test-urls.sh                 # URL accessibility testing
└── tools/
    └── demand/                      # Project requirements & assets
        ├── test2.md                 # URL structure definition
        └── hero.png                 # Homepage hero image
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev                  # Start dev server
npm run lint                 # Run TypeScript + ESLint checks
npm run format               # Format code with Biome

# Production
npm run build                # Build for production
npm run start                # Start production server

# Data Generation
npm run fetch:builds         # Fetch build data from Fextralife

# Testing
npm run test:urls            # Test all page URLs for accessibility
```

---

## 🎨 Key Features

### 1. **Build Popularity Rankings**

Interactive visualization showing:
- Top 8 most popular builds by community votes
- Role indicators (DPS ⚔️, Tank 🛡️, Healer 💚)
- Weapon categories with color coding
- Real-time data from Fextralife Wiki

Uses JSON data fetched from the Fextralife API with fallback mock data.

### 2. **Quick Build Recommender**

2-step recommendation system:
- Step 1: Select your weapon
- Step 2: Choose your playstyle (DPS/Tank/Healer)
- Instantly get top 3 community-approved builds
- Detailed descriptions and vote counts

Powered by client-side filtering with instant results.

### 3. **78+ SEO-Optimized Pages**

Automatically generated MDX pages covering:
- Character build guides for all weapons
- Boss strategy guides with weaknesses & drops
- Comprehensive game guides
- PC performance optimization
- System requirements & technical info
- News & release information

Each page includes:
- Structured frontmatter (title, description, keywords, priority)
- Responsive layout with dark theme
- Breadcrumb navigation
- SEO metadata and OpenGraph tags

### 4. **Dynamic Sitemap**

Automatically generates `sitemap.xml` with all 78+ pages, optimized for search engines and updated on every build.

---

## 📊 Data Sources

- **Build Data**: Fextralife Wiki API (with fallback mock data)
- **Game Information**: Official sources and community research
- **Community Content**: Curated guides and strategies

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Follow the existing code style (enforced by Biome)
2. Ensure TypeScript types are properly defined
3. Test builds locally before submitting PR (`npm run build`)
4. Run URL tests before deployment (`npm run test:urls`)
5. Update documentation for new features

---

## 📝 License

This project is a fan-made resource and is not officially affiliated with the creators of Where Winds Meet. All game-related content belongs to its respective owners.

The codebase itself is open for community contributions.

---

## 🙏 Acknowledgments

- **Where Winds Meet Developers** - For creating this epic Wuxia RPG
- **Fextralife Wiki** - For community build data and guides
- **Community Contributors** - For strategies and feedback

---

## 🔗 Links

- **Live Site**: [https://wherewindsmeet.info](https://wherewindsmeet.info)
- **Build Tier List**: [https://wherewindsmeet.info/builds/best-builds](https://wherewindsmeet.info/builds/best-builds)
- **Boss Guides**: [https://wherewindsmeet.info/bosses](https://wherewindsmeet.info/bosses)
- **Getting Started**: [https://wherewindsmeet.info/guides/class-overview](https://wherewindsmeet.info/guides/class-overview)

---

## 📧 Contact

For questions, suggestions, or bug reports, please:
- Open an issue on GitHub
- Visit the community section on the website

---

*Built with ❤️ for the Where Winds Meet community*
