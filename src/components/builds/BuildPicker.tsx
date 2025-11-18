'use client'

import { useState, useEffect } from 'react'

interface Build {
  buildName: string
  weapon: string
  role: 'DPS' | 'Tank' | 'Healer'
  votes: number
  description: string
}

export function BuildPicker() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [weapons, setWeapons] = useState<string[]>([])
  const [selectedWeapon, setSelectedWeapon] = useState<string>('')
  const [selectedRole, setSelectedRole] = useState<'DPS' | 'Tank' | 'Healer'>('DPS')
  const [recommendations, setRecommendations] = useState<Build[]>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    // Load build data
    fetch('/data/build_popularity.json')
      .then(res => res.json())
      .then((data: Build[]) => {
        setBuilds(data)

        // Extract unique weapons
        const uniqueWeapons = Array.from(new Set(data.map(b => b.weapon))).sort()
        setWeapons(uniqueWeapons)

        // Set first weapon as default
        if (uniqueWeapons.length > 0) {
          setSelectedWeapon(uniqueWeapons[0])
        }
      })
      .catch(err => {
        console.error('Failed to load build data:', err)
      })
  }, [])

  const handleRecommend = () => {
    // Filter by weapon and role
    const filtered = builds.filter(b =>
      b.weapon === selectedWeapon && b.role === selectedRole
    )

    // Sort by votes and take top 3
    const topThree = filtered.sort((a, b) => b.votes - a.votes).slice(0, 3)

    setRecommendations(topThree)
    setShowResults(true)
  }

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'DPS':
        return 'border-red-500 bg-red-500/10 text-red-300'
      case 'Tank':
        return 'border-blue-500 bg-blue-500/10 text-blue-300'
      case 'Healer':
        return 'border-green-500 bg-green-500/10 text-green-300'
      default:
        return 'border-gray-500 bg-gray-500/10 text-gray-300'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'DPS': return '⚔️'
      case 'Tank': return '🛡️'
      case 'Healer': return '💚'
      default: return '✨'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
          ⚡ 2-STEP BUILD RECOMMENDER
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-8 border border-gray-700 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Step 1: Select Weapon */}
          <div>
            <label className="block text-white font-semibold mb-3">
              <span className="text-[#F4B860]">Step 1:</span> Choose Your Weapon
            </label>
            <select
              value={selectedWeapon}
              onChange={(e) => setSelectedWeapon(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#F4B860] focus:outline-none focus:ring-2 focus:ring-[#F4B860]/20"
            >
              {weapons.map(weapon => (
                <option key={weapon} value={weapon}>
                  {weapon}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-2">
              Select the weapon you want to use
            </p>
          </div>

          {/* Step 2: Select Role */}
          <div>
            <label className="block text-white font-semibold mb-3">
              <span className="text-[#F4B860]">Step 2:</span> Choose Your Playstyle
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['DPS', 'Tank', 'Healer'] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all border-2 ${
                    selectedRole === role
                      ? getRoleColor(role) + ' scale-105'
                      : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{getRoleIcon(role)}</div>
                  <div className="text-sm">{role}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              DPS: Damage • Tank: Defense • Healer: Support
            </p>
          </div>
        </div>

        {/* Recommend Button */}
        <button
          onClick={handleRecommend}
          className="w-full bg-gradient-to-r from-[#F4B860] to-[#D99B3C] hover:from-[#D99B3C] hover:to-[#C88B2E] text-black font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          🎯 Get Top 3 Builds Now
        </button>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            📊 Top Recommendations for {selectedWeapon} ({selectedRole})
          </h3>

          {recommendations.length > 0 ? (
            recommendations.map((build, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-6 border-2 border-gray-700 hover:border-[#F4B860]/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Rank */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black' :
                    'bg-gradient-to-br from-orange-400 to-orange-600 text-black'
                  }`}>
                    #{index + 1}
                  </div>

                  <div className="flex-1">
                    {/* Build Name */}
                    <h4 className="text-xl font-bold text-white mb-2">
                      {build.buildName}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-300 mb-3">
                      {build.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 items-center">
                      <span className="bg-[#F4B860]/20 text-[#F4B860] px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐ {build.votes} votes
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getRoleColor(build.role)}`}>
                        {getRoleIcon(build.role)} {build.role}
                      </span>
                      <span className="text-gray-400 text-sm">
                        Community Approved
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-800/30 rounded-lg p-8 border border-gray-700 text-center">
              <p className="text-gray-400 text-lg">
                😕 No builds found for <span className="text-white font-semibold">{selectedWeapon}</span> with <span className="text-white font-semibold">{selectedRole}</span> role.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try selecting a different weapon or playstyle combination.
              </p>
            </div>
          )}

          {/* Try Again Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowResults(false)}
              className="text-[#F4B860] hover:text-[#D99B3C] font-semibold underline"
            >
              ← Try Different Combination
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-300 mb-3">💡 Pro Tips</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• <span className="text-white">DPS builds</span> focus on maximizing damage output</li>
          <li>• <span className="text-white">Tank builds</span> prioritize defense and crowd control</li>
          <li>• <span className="text-white">Healer builds</span> support your team with healing and buffs</li>
          <li>• Rankings are based on <span className="text-white">community votes</span> from experienced players</li>
        </ul>
      </div>
    </div>
  )
}
