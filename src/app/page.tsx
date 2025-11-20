import Link from 'next/link'
import Image from 'next/image'
import { BuildBarChart } from '@/components/builds/BuildBarChart'
import { BuildPicker } from '@/components/builds/BuildPicker'
import { ScrollButton } from '@/components/ScrollButton'

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://wherewindsmeetgame.net/#website',
        url: 'https://wherewindsmeetgame.net',
        name: 'Where Winds Meet Info',
        description: 'Complete Wuxia RPG guide and wiki for Where Winds Meet featuring character builds, boss strategies, weapon tier lists, and full walkthrough.',
        publisher: {
          '@id': 'https://wherewindsmeetgame.net/#organization'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://wherewindsmeetgame.net/search?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        '@id': 'https://wherewindsmeetgame.net/#organization',
        name: 'Where Winds Meet Info',
        url: 'https://wherewindsmeetgame.net',
        logo: {
          '@type': 'ImageObject',
          url: 'https://wherewindsmeetgame.net/images/logo.png',
          width: 512,
          height: 512
        },
        sameAs: []
      },
      {
        '@type': 'WebPage',
        '@id': 'https://wherewindsmeetgame.net/#webpage',
        url: 'https://wherewindsmeetgame.net',
        name: 'Where Winds Meet - Complete Wuxia RPG Guide & Wiki',
        isPartOf: {
          '@id': 'https://wherewindsmeetgame.net/#website'
        },
        about: {
          '@id': 'https://wherewindsmeetgame.net/#organization'
        },
        description: 'Master Where Winds Meet with our comprehensive guide featuring character builds, boss strategies, weapon tier lists, PC performance guides, and complete walkthrough.'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto py-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-4">
            Where Winds Meet
          </h1>
          <h2 className="text-3xl lg:text-4xl text-gray-200 drop-shadow-md mb-4">
            Master open-world Wuxia in just 3 minutes
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 mb-6">
            Bite-size guides, build calculators & real-time tools
          </p>
          <p className="text-lg text-gray-300 mb-8">
            Crafted by veteran martial-arts gamers, our comprehensive wiki helps you master combat, explore the vast open world, and optimize your character builds for the ultimate Wuxia experience.
          </p>
          <div className="flex gap-4">
            <ScrollButton
              targetId="build-recommender"
              className="bg-[#F4B860] hover:bg-[#D99B3C] text-black font-bold py-3 px-6 rounded-md transition-colors"
            >
              Launch Countdown
            </ScrollButton>
            <Link
              href="/builds/best-builds/"
              className="bg-white/90 hover:bg-white text-[#1E3A34] font-semibold py-3 px-6 rounded-md transition-colors"
              aria-label="View Best Build Tier List"
            >
              Best Build Tier List
            </Link>
            <Link
              href="/system/system-requirements/"
              className="border border-gray-600 hover:border-[#F4B860] text-gray-200 hover:text-white font-medium py-3 px-6 rounded-md transition-colors"
              aria-label="Check PC Requirements"
            >
              Can My PC Run It?
            </Link>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/hero.png"
            alt="Where Winds Meet - Epic Wuxia martial arts action"
            width={1920}
            height={1080}
            priority
            className="rounded-lg shadow-2xl w-full h-auto"
          />
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Quick Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((item, index) => (
            <Link key={index} href={item.url}>
              <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] hover:ring-4 hover:ring-[#F4B860]/30 rounded-lg p-6 border border-gray-700 transition-all">
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Build Finder Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Build Popularity Rankings
        </h2>
        <p className="text-center text-gray-300 mb-2 max-w-3xl mx-auto text-lg font-semibold">
          江湖一刻千变，谁是真流？一张榜告诉你！
        </p>
        <p className="text-center text-gray-400 mb-8 max-w-3xl mx-auto">
          See which builds dominate the meta with real community votes. Updated daily from Fextralife Wiki data.
        </p>
        <BuildBarChart />
      </section>

      {/* Build Picker Section */}
      <section id="build-recommender" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Quick Build Recommender
        </h2>
        <p className="text-center text-gray-300 mb-2 max-w-3xl mx-auto text-lg font-semibold">
          选武器、定心法，两步出结果——今天就别被队友嫌弃！
        </p>
        <p className="text-center text-gray-400 mb-8 max-w-3xl mx-auto">
          Select your weapon & playstyle, instantly get top 3 community-approved builds optimized for your needs.
        </p>
        <BuildPicker />
      </section>

      {/* Key Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Where Winds Meet Core Features</h2>
        <p className="text-center text-gray-300 mb-8">Why This Open-World Wuxia RPG Is Worth Playing</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Wuxia Mobility</h3>
            <p className="text-gray-300 text-sm">
              Experience fluid martial arts combat with advanced movement mechanics. Wall-run, glide, and grapple through stunning landscapes while mastering legendary kung-fu techniques.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Deep Crafting System</h3>
            <p className="text-gray-300 text-sm">
              Forge powerful weapons, brew medicinal elixirs, and customize your gear. Every item affects your stats and playstyle in meaningful ways.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Branching Story</h3>
            <p className="text-gray-300 text-sm">
              Your choices shape the narrative across multiple factions. Build alliances, forge rivalries, and determine the fate of the martial arts world.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-12 text-center border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Write Your Own Wuxia Legend?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Start exploring builds, maps & tech guides in one click. Master the martial arts, conquer the open world, and forge your path to greatness.
        </p>
        <Link
          href="/news/release-date/"
          className="inline-block bg-[#F4B860] hover:bg-[#D99B3C] text-black font-bold py-3 px-8 rounded-md transition-colors"
          aria-label="Get Started with Where Winds Meet Guide"
        >
          Get Started
        </Link>
      </section>
    </div>
    </>
  )
}

const quickLinks = [
  {
    title: "Release Date & Times",
    subtitle: "Mark your calendar — global launch slots inside.",
    url: "/news/release-date/"
  },
  {
    title: "Interactive World Map",
    subtitle: "Zoom & discover every shrine and waypoint.",
    url: "/guides/world-map/"
  },
  {
    title: "Weapon Tier List",
    subtitle: "Don't waste XP — pick the S-tiers first.",
    url: "/guides/weapon-tier-list/"
  },
  {
    title: "Perfect Parry Guide",
    subtitle: "Turn every strike into your opening.",
    url: "/guides/parry-guide/"
  },
  {
    title: "PC Performance Settings",
    subtitle: "60 FPS on a toaster? Yes, with these tweaks.",
    url: "/pc/performance-settings/"
  },
  {
    title: "Discord Hub",
    subtitle: "Party-up, trade gear & share screenshots.",
    url: "/community/discord/"
  }
]

const faqs = [
  {
    question: "What is Where Winds Meet?",
    answer: "Where Winds Meet is an open-world action RPG set in ancient China's Wuxia universe. Experience breathtaking martial arts combat, explore a massive world filled with secrets, and shape your destiny through meaningful choices. The game features advanced character customization, deep crafting systems, and an engaging story across multiple factions."
  },
  {
    question: "How difficult is the combat system?",
    answer: "Where Winds Meet offers adjustable difficulty with a skill-based combat system. Beginners can start with assisted modes while veterans can challenge themselves with hardcore settings. Our parry guide and build tier list help you master combat mechanics regardless of your skill level. Practice makes perfect in this rewarding martial arts experience."
  },
  {
    question: "Does Where Winds Meet support controllers?",
    answer: "Yes! The game has full controller support for Xbox, PlayStation, and generic gamepads. Many players prefer controllers for the fluid combat system. Check our PC performance settings guide for optimal control configurations and button mapping recommendations."
  },
  {
    question: "What are the minimum PC requirements?",
    answer: "Minimum specs require GTX 1060 (6GB) or equivalent, 16GB RAM, and an i5-8400 processor. For 60 FPS at high settings, we recommend RTX 2060 or better. Use our PC Specs Checker tool above to instantly verify if your system can run the game, and visit our system requirements page for detailed optimization tips."
  }
]
