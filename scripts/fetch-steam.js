// scripts/fetch-steam.js
import fs from 'node:fs/promises'

const STEAM_APP_ID = '2126190'
const API_URL = `https://steamspy.com/api.php?request=appdetails&appid=${STEAM_APP_ID}`
const OUTPUT_PATH = './public/data/steamspy.json'

async function fetchSteamData() {
  try {
    console.log('🔄 Fetching SteamSpy data...')

    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const raw = await response.json()

    const data = {
      fetchedAt: Date.now(),
      name: raw.name,
      positive: raw.positive,
      negative: raw.negative,
      owners: raw.owners,
      price: raw.price,
      scoreRank: raw.score_rank
    }

    // Ensure directory exists
    await fs.mkdir('./public/data', { recursive: true })

    // Write file
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(data, null, 2))

    console.log('✅ Steam data saved to', OUTPUT_PATH)
    console.log('📊 Data summary:')
    console.log(`   - Game name: ${data.name}`)
    console.log(`   - Positive: ${data.positive}`)
    console.log(`   - Negative: ${data.negative}`)
    console.log(`   - Positive rate: ${((data.positive / (data.positive + data.negative)) * 100).toFixed(1)}%`)
    console.log(`   - Estimated owners: ${data.owners}`)

  } catch (error) {
    console.error('❌ Failed to fetch Steam data:', error.message)
    process.exit(1)
  }
}

fetchSteamData()
