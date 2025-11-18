import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-700/50 bg-black/30 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-white drop-shadow-md">
              Where Winds Meet
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/builds/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Builds
            </Link>
            <Link
              href="/bosses/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Bosses
            </Link>
            <Link
              href="/guides/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              Guides
            </Link>
            <Link
              href="/news/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              News
            </Link>
            <Link
              href="/pc/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              PC
            </Link>
            <Link
              href="/system/"
              className="text-gray-200 hover:text-[#F4B860] transition-colors px-3 py-2"
            >
              System
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/news/release-date/"
            className="bg-[#F4B860] hover:bg-[#D99B3C] text-black font-semibold py-2 px-4 rounded-lg transition-colors"
            aria-label="Get Started with Where Winds Meet Guide"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
