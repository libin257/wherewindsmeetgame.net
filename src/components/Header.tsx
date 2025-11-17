import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-700/50 bg-black/30 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-white drop-shadow-md">
              Rue Valley
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/guide"
              className="text-gray-200 hover:text-[#25AB2B] transition-colors px-3 py-2"
            >
              Guide
            </Link>
            <Link
              href="/buy"
              className="text-gray-200 hover:text-[#25AB2B] transition-colors px-3 py-2"
            >
              Buy
            </Link>
            <Link
              href="/review"
              className="text-gray-200 hover:text-[#25AB2B] transition-colors px-3 py-2"
            >
              Review
            </Link>
            <Link
              href="/technical"
              className="text-gray-200 hover:text-[#25AB2B] transition-colors px-3 py-2"
            >
              Technical
            </Link>
            <Link
              href="/community"
              className="text-gray-200 hover:text-[#25AB2B] transition-colors px-3 py-2"
            >
              Community
            </Link>
            <Link
              href="/download"
              className="text-gray-200 hover:text-[#25AB2B] transition-colors px-3 py-2"
            >
              Download
            </Link>
            <Link
              href="/info"
              className="text-gray-200 hover:text-[#25AB2B] transition-colors px-3 py-2"
            >
              Info
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/guide/gameplay-overview"
            className="bg-[#25AB2B] hover:bg-[#1E8923] text-black font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
