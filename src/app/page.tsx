import Link from 'next/link'
import { IntentionSearch } from '@/components/rue-valley/IntentionSearch'
import { VideoSection } from '@/components/rue-valley/VideoSection'
import { RedditSection } from '@/components/rue-valley/RedditSection'

export default function HomePage() {
  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-4">
            Rue Valley
          </h1>
          <h2 className="text-3xl lg:text-4xl text-gray-200 drop-shadow-md mb-4">
            Master the 47-Minute Time Loop
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 mb-6">
            Complete Walkthrough, Real-Time Prices & Character Profiles
          </p>
          <p className="text-lg text-gray-300 mb-8">
            Explore the time loop world of Rue Valley, unlock all intention tree tasks, and uncover the secrets of Eugene Harlow and the town.
            We provide comprehensive guides, character psychological analysis, and Steam price tracking to help you break the cycle.
          </p>
          <div className="flex gap-4">
            <Link
              href="/guide/gameplay-overview"
              className="bg-[#25AB2B] hover:bg-[#1E8923] text-black font-bold py-3 px-6 rounded-md transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/buy/steam-price"
              className="bg-white/90 hover:bg-white text-[#1E8923] font-semibold py-3 px-6 rounded-md transition-colors"
            >
              Best Price
            </Link>
            <Link
              href="/guide/full-walkthrough"
              className="border border-gray-600 hover:border-[#25AB2B] text-gray-200 hover:text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Full Guide
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src="/images/steam/official-banner.png"
            alt="Rue Valley Game"
            className="rounded-lg shadow-2xl w-full"
          />
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Quick Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((item, index) => (
            <Link key={index} href={item.url}>
              <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] hover:ring-4 hover:ring-[#25AB2B]/30 rounded-lg p-6 border border-gray-700 transition-all">
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Intention Tree Search */}
      <IntentionSearch />

      {/* Video & Reddit Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* YouTube Videos */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">🎬 Featured Videos</h2>
            <VideoSection />
          </div>

          {/* Reddit Discussions */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">💬 Community Discussions</h2>
            <RedditSection />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Rue Valley Core Features</h2>
        <p className="text-center text-gray-300 mb-8">Why This Time Loop RPG Is Worth Playing</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Intention System</h3>
            <p className="text-gray-300 text-sm">
              Unique intention tree gameplay where each loop allows different tasks, unlocking new areas and character relationships.
              20+ intention tasks await your discovery.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">47-Minute Cycles</h3>
            <p className="text-gray-300 text-sm">
              Each loop is precisely 47 minutes. Explore the town, collect clues, and advance the story within limited time.
              Time management is key to breaking through.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Psychological Narrative</h3>
            <p className="text-gray-300 text-sm">
              Deep character development - Eugene, Dr. Finck, Anitta each have hidden stories.
              Story quality rivals Disco Elysium.
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
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Break the Time Loop?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Start your Rue Valley journey now with our complete walkthroughs, intention tree search tool,
          and character relationship guides to easily solve every loop's puzzles.
        </p>
        <Link
          href="/guide/gameplay-overview"
          className="inline-block bg-[#25AB2B] hover:bg-[#1E8923] text-black font-bold py-3 px-8 rounded-md transition-colors"
        >
          Get Started
        </Link>
      </section>
    </div>
  )
}

const quickLinks = [
  {
    title: "Beginner's Guide",
    subtitle: "3-Minute Primer",
    url: "/guide/gameplay-overview"
  },
  {
    title: "Full Intention Map",
    subtitle: "Visual Loop Guide",
    url: "/guide/full-walkthrough"
  },
  {
    title: "Character Profiles",
    subtitle: "Why They're Trapped",
    url: "/info/characters"
  },
  {
    title: "Patch Notes",
    subtitle: "Latest Updates",
    url: "/news/patch-notes"
  },
  {
    title: "Price Comparison",
    subtitle: "Steam / Switch",
    url: "/buy/steam-price"
  },
  {
    title: "FAQ & Soft-Lock Fixes",
    subtitle: "Don't Get Stuck",
    url: "/community/reddit-highlights"
  }
]

const faqs = [
  {
    question: "What is Rue Valley?",
    answer: "Rue Valley is a time loop narrative RPG where you play as Eugene Harlow, trapped in a 47-minute cycle. You must complete intention tasks, explore the town, and unlock character relationships to break free. The game combines psychological narrative with puzzle elements, with story depth rivaling Disco Elysium."
  },
  {
    question: "How do I start playing Rue Valley?",
    answer: "We recommend reading our beginner's guide first to understand the basic gameplay and intention system. The game is available on Steam (Windows, Mac, Linux), and the first loop includes a tutorial. Use our intention tree search tool to quickly find solutions when stuck."
  },
  {
    question: "How many endings does Rue Valley have?",
    answer: "Rue Valley features multiple endings depending on the intentions you complete, character interaction choices, and hidden clues you discover. Different choices affect Eugene's psychological state and the fate of the town's residents."
  },
  {
    question: "What should I do if I encounter a soft-lock?",
    answer: "Soft-locks usually occur from incorrect task sequencing or missing critical time windows. Check our Reddit discussion section for detailed soft-lock solutions. Common issues like Frank's Room access or Anitta's Car unlock failures all have community-provided answers."
  }
]
