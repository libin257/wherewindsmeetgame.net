import Link from 'next/link'

interface RelatedArticle {
  title: string
  href: string
  category: string
}

interface RelatedArticlesProps {
  category: string
  currentSlug: string
}

// 预定义的相关文章映射
const relatedArticlesMap: Record<string, RelatedArticle[]> = {
  builds: [
    { title: 'Best Builds Guide', href: '/builds/best-builds', category: 'Builds' },
    { title: 'Dual Blades Build', href: '/builds/dual-blades-build', category: 'Builds' },
    { title: 'Long Spear Build', href: '/builds/long-spear-build', category: 'Builds' },
    { title: 'Blade Build', href: '/builds/blade-build', category: 'Builds' },
    { title: 'Meteor Hammer Build', href: '/builds/meteor-hammer-build', category: 'Builds' }
  ],
  bosses: [
    { title: 'Boss Strategy Guides', href: '/bosses', category: 'Bosses' },
    { title: 'Jiang Yue Strategy', href: '/bosses/jiang-yue', category: 'Bosses' },
    { title: 'Boss Mechanics Guide', href: '/guides/combat-mechanics', category: 'Guides' }
  ],
  guides: [
    { title: 'Combat Mechanics', href: '/guides/combat-mechanics', category: 'Guides' },
    { title: 'Beginner Guide', href: '/guides/beginner-guide', category: 'Guides' },
    { title: 'Best Builds', href: '/builds/best-builds', category: 'Builds' }
  ],
  news: [
    { title: 'Release Date', href: '/news/release-date', category: 'News' },
    { title: 'Beta Signup', href: '/news/beta-signup', category: 'News' },
    { title: 'Price Information', href: '/news/price', category: 'News' }
  ],
  pc: [
    { title: 'Performance Settings', href: '/pc/performance-settings', category: 'PC' },
    { title: 'FPS Cap Guide', href: '/pc/fps-cap', category: 'PC' },
    { title: 'Benchmark Test', href: '/pc/benchmark-test', category: 'PC' },
    { title: 'Ultrawide Support', href: '/pc/ultrawide-support', category: 'PC' }
  ],
  system: [
    { title: 'System Requirements', href: '/system/system-requirements', category: 'System' },
    { title: 'Server Status', href: '/system/server-status', category: 'System' },
    { title: 'Controller Mapping', href: '/system/controller-mapping', category: 'System' },
    { title: 'Crossplay Guide', href: '/system/crossplay', category: 'System' }
  ]
}

export function RelatedArticles({ category, currentSlug }: RelatedArticlesProps) {
  const articles = relatedArticlesMap[category] || []
  const filteredArticles = articles.filter(article => !currentSlug.includes(article.href))
  const displayArticles = filteredArticles.slice(0, 3)

  if (displayArticles.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-[#F4B860]">📚</span>
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayArticles.map((article, index) => (
          <Link
            key={index}
            href={article.href}
            className="group bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700 hover:border-[#F4B860] transition-all hover:shadow-lg hover:shadow-[#F4B860]/20"
          >
            <span className="text-xs text-[#F4B860] font-semibold uppercase tracking-wide">
              {article.category}
            </span>
            <h4 className="text-lg font-semibold text-white mt-2 group-hover:text-[#F4B860] transition-colors">
              {article.title}
            </h4>
            <span className="inline-flex items-center gap-1 text-sm text-gray-400 mt-3 group-hover:text-white transition-colors">
              Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
