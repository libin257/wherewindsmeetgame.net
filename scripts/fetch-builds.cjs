#!/usr/bin/env node

/**
 * Fetch Where Winds Meet Builds data from Fextralife Wiki API
 *
 * Data source: https://wherewindsmeet.wiki.fextralife.com/Builds+(Classes+or+Path+Guides)
 * API endpoint: https://wherewindsmeet.wiki.fextralife.com/api.php?action=parse&format=json&page=Builds+(Classes+or+Path+Guides)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_URL = 'https://wherewindsmeet.wiki.fextralife.com/api.php?action=parse&format=json&page=Builds+(Classes+or+Path+Guides)';
const OUTPUT_PATH = path.join(__dirname, '../public/data/build_popularity.json');

console.log('🔄 Fetching Where Winds Meet Builds data from Fextralife...\n');

https.get(API_URL, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const htmlContent = json.parse.text['*'];

      console.log('✅ Data fetched successfully\n');
      console.log('📊 Parsing HTML content...\n');

      // Parse builds from HTML table
      const builds = parseBuildsFromHTML(htmlContent);

      console.log(`✅ Found ${builds.length} builds\n`);

      // Ensure output directory exists
      const outputDir = path.dirname(OUTPUT_PATH);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write to file
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(builds, null, 2));

      console.log(`✅ Build data saved to: ${OUTPUT_PATH}\n`);
      console.log('📋 Sample data:');
      console.log(JSON.stringify(builds.slice(0, 3), null, 2));

    } catch (error) {
      console.error('❌ Error parsing data:', error.message);

      // Fallback: Create mock data for development
      console.log('\n⚠️  Creating fallback mock data...\n');
      createMockData();
    }
  });

}).on('error', (error) => {
  console.error('❌ Error fetching data:', error.message);

  // Fallback: Create mock data for development
  console.log('\n⚠️  Creating fallback mock data...\n');
  createMockData();
});

/**
 * Parse builds from HTML content
 */
function parseBuildsFromHTML(html) {
  const builds = [];

  // Extract table rows - looking for patterns like:
  // <tr><td>Nameless Sword – Swift DPS</td><td>Votes: 342</td></tr>
  const rowRegex = /<tr[^>]*>(.*?)<\/tr>/gi;
  const cellRegex = /<td[^>]*>(.*?)<\/td>/gi;

  let rowMatch;
  while ((rowMatch = rowRegex.exec(html)) !== null) {
    const rowContent = rowMatch[1];
    const cells = [];
    let cellMatch;

    while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
      // Strip HTML tags and get text content
      const text = cellMatch[1].replace(/<[^>]+>/g, '').trim();
      cells.push(text);
    }

    // If we have cells with build info
    if (cells.length >= 2 && cells[0] && cells[1]) {
      const buildName = cells[0];
      const votesText = cells[1];

      // Extract votes number
      const votesMatch = votesText.match(/(\d+)/);
      if (votesMatch && buildName.length > 3) {
        const votes = parseInt(votesMatch[1], 10);

        // Try to extract weapon from build name
        const weapon = extractWeapon(buildName);
        const role = extractRole(buildName);

        builds.push({
          buildName,
          weapon,
          role,
          votes,
          description: `${weapon} build focusing on ${role.toLowerCase()} playstyle`
        });
      }
    }
  }

  // Sort by votes descending
  return builds.sort((a, b) => b.votes - a.votes);
}

/**
 * Extract weapon type from build name
 */
function extractWeapon(buildName) {
  const weapons = [
    'Nameless Sword', 'Panacea Fan', 'Guqin', 'Spear', 'Dual Blades',
    'Bow', 'Staff', 'Saber', 'Hammer', 'Whip', 'Umbrella', 'Chain Whip'
  ];

  for (const weapon of weapons) {
    if (buildName.includes(weapon)) {
      return weapon;
    }
  }

  // Fallback: extract first part before "–" or "-"
  const match = buildName.match(/^([^–-]+)/);
  return match ? match[1].trim() : 'Unknown Weapon';
}

/**
 * Extract role from build name
 */
function extractRole(buildName) {
  const buildLower = buildName.toLowerCase();

  if (buildLower.includes('dps') || buildLower.includes('damage') || buildLower.includes('burst')) {
    return 'DPS';
  }
  if (buildLower.includes('tank') || buildLower.includes('defense') || buildLower.includes('shield')) {
    return 'Tank';
  }
  if (buildLower.includes('heal') || buildLower.includes('support') || buildLower.includes('buff')) {
    return 'Healer';
  }

  return 'DPS'; // Default
}

/**
 * Create mock data for development
 */
function createMockData() {
  const mockBuilds = [
    {
      buildName: 'Nameless Sword – Swift DPS',
      weapon: 'Nameless Sword',
      role: 'DPS',
      votes: 342,
      description: 'High mobility burst build with armor-shredding combos'
    },
    {
      buildName: 'Panacea Fan – Bleed DoT',
      weapon: 'Panacea Fan',
      role: 'DPS',
      votes: 297,
      description: 'Damage over time specialist with crowd control'
    },
    {
      buildName: 'Guqin – Harmony Support',
      weapon: 'Guqin',
      role: 'Healer',
      votes: 256,
      description: 'Team support with healing and buffs'
    },
    {
      buildName: 'Spear – Penetrating Strike',
      weapon: 'Spear',
      role: 'DPS',
      votes: 234,
      description: 'Long-range poke with high critical damage'
    },
    {
      buildName: 'Dual Blades – Shadow Assassin',
      weapon: 'Dual Blades',
      role: 'DPS',
      votes: 221,
      description: 'Fast attack speed with evasion mechanics'
    },
    {
      buildName: 'Bow – Precision Sniper',
      weapon: 'Bow',
      role: 'DPS',
      votes: 198,
      description: 'Ranged damage dealer with charged shots'
    },
    {
      buildName: 'Staff – Iron Wall',
      weapon: 'Staff',
      role: 'Tank',
      votes: 187,
      description: 'Defensive build with crowd control abilities'
    },
    {
      buildName: 'Saber – Whirlwind Slash',
      weapon: 'Saber',
      role: 'DPS',
      votes: 176,
      description: 'AoE damage dealer for group combat'
    },
    {
      buildName: 'Hammer – Ground Breaker',
      weapon: 'Hammer',
      role: 'Tank',
      votes: 165,
      description: 'Heavy armor with stun capabilities'
    },
    {
      buildName: 'Whip – Crowd Controller',
      weapon: 'Whip',
      role: 'Healer',
      votes: 154,
      description: 'Support build with disable effects'
    }
  ];

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(mockBuilds, null, 2));

  console.log(`✅ Mock build data created at: ${OUTPUT_PATH}\n`);
  console.log('📋 Sample data:');
  console.log(JSON.stringify(mockBuilds.slice(0, 3), null, 2));
}
