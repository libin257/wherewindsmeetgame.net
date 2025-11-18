import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-muted-foreground border-t">
      <div className="flex flex-col justify-center items-center max-w-7xl text-center mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:text-start">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 w-full">
          <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start">
            <h3 className="text-sm font-bold tracking-normal">
              <Link href="/" className="flex items-center space-x-2">
                <span className="inline-block font-bold">Where Winds Meet Info</span>
              </Link>
            </h3>
            <p className="mt-4 text-xs">
              Your ultimate Where Winds Meet companion - Complete Wuxia RPG guides, character builds, boss strategies,
              weapon tier lists, and community insights for the martial arts adventure.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Game Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/guides/class-overview/" className="text-base">Getting Started</Link></li>
              <li><Link href="/builds/best-builds/" className="text-base">Best Builds</Link></li>
              <li><Link href="/guides/weapons-guide/" className="text-base">Weapons Guide</Link></li>
              <li><Link href="/news/price/" className="text-base">Buy Game</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Community</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/community/discord/" className="text-base">Discord</Link></li>
              <li><Link href="/bosses/" className="text-base">Boss Guides</Link></li>
              <li><Link href="/news/" className="text-base">News & Updates</Link></li>
              <li><Link href="/pc/performance-settings/" className="text-base">Performance Tips</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/privacy/" className="text-base">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="text-base">Terms of Service</Link></li>
            </ul>
            <p className="mt-6 text-xs text-gray-400">
              An epic Wuxia martial arts adventure
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 w-full">
          <p className="text-base text-center">
            © 2025 Where Winds Meet Info. All Rights Reserved. Unofficial fan site.
          </p>
        </div>
      </div>
    </footer>
  )
}
