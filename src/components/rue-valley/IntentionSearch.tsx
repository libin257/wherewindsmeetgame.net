'use client'

import { useEffect, useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { Search, Copy, Check } from 'lucide-react'

interface Intention {
  intention: string
  loop: number
  npc: string
  prerequisite: string
  reward: string
}

export function IntentionSearch() {
  const [intentions, setIntentions] = useState<Intention[]>([])
  const [searchResults, setSearchResults] = useState<Intention[]>([])
  const [searchText, setSearchText] = useState('')
  const [selectedNPC, setSelectedNPC] = useState<string>('all')
  const [selectedLoop, setSelectedLoop] = useState<string>('all')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize data and search engine
  useEffect(() => {
    fetch('/data/intentions.json')
      .then((res) => res.json())
      .then((data: Intention[]) => {
        setIntentions(data)
        setSearchResults(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load intentions:', error)
        setLoading(false)
      })
  }, [])

  // Get unique NPCs and Loops for filters
  const uniqueNPCs = Array.from(new Set(intentions.map((i) => i.npc).filter(Boolean))).sort()
  const uniqueLoops = Array.from(new Set(intentions.map((i) => i.loop))).sort((a, b) => a - b)

  // Initialize Fuse.js with useMemo to avoid recreation
  const fuse = useMemo(() => new Fuse(intentions, {
    keys: ['intention', 'npc', 'prerequisite', 'reward'],
    threshold: 0.3,
    includeScore: true,
  }), [intentions])

  // Handle search
  useEffect(() => {
    if (!intentions.length) return

    let results = intentions

    // Apply text search
    if (searchText.trim()) {
      results = fuse.search(searchText).map((result) => result.item)
    }

    // Apply NPC filter
    if (selectedNPC !== 'all') {
      results = results.filter((i) => i.npc === selectedNPC)
    }

    // Apply Loop filter
    if (selectedLoop !== 'all') {
      results = results.filter((i) => i.loop === parseInt(selectedLoop))
    }

    setSearchResults(results)
  }, [searchText, selectedNPC, selectedLoop, intentions, fuse])

  // Copy to clipboard
  const copyToClipboard = (intention: Intention, index: number) => {
    const text = `【${intention.intention}】
Loop: ${intention.loop}
NPC: ${intention.npc}
Prerequisite: ${intention.prerequisite}
Reward: ${intention.reward}`

    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    })
  }

  if (loading) {
    return (
      <section className="mb-16">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <p className="text-center text-gray-400">Loading intentions...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center text-white mb-4">Intention Tree Quick Search</h2>
      <p className="text-center text-gray-300 mb-8">Enter keywords to instantly locate quest lines!</p>

      <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-8 border border-gray-700">
        {/* Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Search Input */}
          <div className="md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search intentions, NPCs, rewards..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25AB2B] focus:border-transparent"
              />
            </div>
          </div>

          {/* NPC Filter */}
          <div>
            <select
              value={selectedNPC}
              onChange={(e) => setSelectedNPC(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#25AB2B] focus:border-transparent"
            >
              <option value="all">All NPCs</option>
              {uniqueNPCs.map((npc) => (
                <option key={npc} value={npc}>
                  {npc}
                </option>
              ))}
            </select>
          </div>

          {/* Loop Filter */}
          <div>
            <select
              value={selectedLoop}
              onChange={(e) => setSelectedLoop(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#25AB2B] focus:border-transparent"
            >
              <option value="all">All Loops</option>
              {uniqueLoops.map((loop) => (
                <option key={loop} value={loop}>
                  Loop {loop}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-400">
            Found {searchResults.length} intention tasks
          </p>
        </div>

        {/* Results List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {searchResults.length === 0 ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 text-center">
              <p className="text-gray-400">No matching intention tasks found</p>
              <p className="text-sm text-gray-500 mt-2">Try different keywords or filter criteria</p>
            </div>
          ) : (
            searchResults.map((intention, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-[#25AB2B] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {intention.intention}
                    </h3>
                    <div className="flex gap-3 text-sm">
                      <span className="bg-[#25AB2B]/20 text-[#25AB2B] px-3 py-1 rounded-full">
                        Loop {intention.loop}
                      </span>
                      {intention.npc && (
                        <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                          {intention.npc}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(intention, index)}
                    className="ml-4 p-2 bg-gray-700 hover:bg-[#25AB2B] rounded-lg transition-colors"
                    title="Copy guide"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <Copy className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400 font-medium">Prerequisite:</span>
                    <span className="text-gray-300"> {intention.prerequisite}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-medium">Reward:</span>
                    <span className="text-[#25AB2B]"> {intention.reward}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
