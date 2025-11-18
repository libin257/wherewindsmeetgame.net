'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Build {
  buildName: string
  weapon: string
  role: 'DPS' | 'Tank' | 'Healer'
  votes: number
  description: string
}

export function BuildBarChart() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [maxVotes, setMaxVotes] = useState(0)

  useEffect(() => {
    // Load build data
    fetch('/data/build_popularity.json')
      .then(res => res.json())
      .then((data: Build[]) => {
        // Sort by votes and take top 8
        const topBuilds = data.sort((a, b) => b.votes - a.votes).slice(0, 8)
        setBuilds(topBuilds)
        if (topBuilds.length > 0) {
          setMaxVotes(topBuilds[0].votes)
        }
      })
      .catch(err => {
        console.error('Failed to load build data:', err)
      })
  }, [])

  // Get color based on role
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'DPS':
        return 'bg-gradient-to-r from-red-500 to-orange-500'
      case 'Tank':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500'
      case 'Healer':
        return 'bg-gradient-to-r from-green-500 to-emerald-500'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600'
    }
  }

  // Get role icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'DPS':
        return '⚔️'
      case 'Tank':
        return '🛡️'
      case 'Healer':
        return '💚'
      default:
        return '✨'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-[#F4B860] to-[#D99B3C] text-black px-4 py-2 rounded-full text-sm font-bold mb-4">
          🔥 REAL-TIME DATA FROM FEXTRALIFE
        </div>
      </div>

      {/* Build Ranking List */}
      <div className="space-y-4">
        {builds.map((build, index) => {
          const percentage = maxVotes > 0 ? (build.votes / maxVotes) * 100 : 0

          return (
            <div
              key={index}
              className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-5 border border-gray-700 hover:border-[#F4B860]/50 transition-all group"
            >
              {/* Rank Badge */}
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-2xl ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black' :
                  index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-black' :
                  'bg-gray-700 text-white'
                }`}>
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Build Name and Role */}
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#F4B860] transition-colors truncate">
                      {build.buildName}
                    </h3>
                    <span className="flex-shrink-0 text-2xl" title={build.role}>
                      {getRoleIcon(build.role)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-3">
                    {build.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="h-8 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getRoleColor(build.role)} transition-all duration-1000 ease-out flex items-center justify-end pr-4`}
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-white font-bold text-sm drop-shadow-lg">
                          {build.votes} votes
                        </span>
                      </div>
                    </div>

                    {/* Weapon Tag */}
                    <div className="absolute -top-2 left-4 bg-[#1E3A34] px-3 py-1 rounded-full text-xs font-semibold text-white border border-[#F4B860]/30">
                      {build.weapon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
        <div className="flex flex-wrap gap-6 justify-center text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚔️</span>
            <span className="text-gray-300">DPS - Damage Dealer</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="text-gray-300">Tank - Defender</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💚</span>
            <span className="text-gray-300">Healer - Support</span>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          Data updated from community votes • Click any build to view detailed guide
        </p>
      </div>

      {/* View All Link */}
      <div className="text-center mt-8">
        <Link
          href="/builds/best-builds/"
          className="inline-flex items-center gap-2 text-[#F4B860] hover:text-[#D99B3C] font-semibold text-lg group"
        >
          <span>View All Builds & Detailed Guides</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  )
}
