#!/bin/bash

# Where Winds Meet URL Testing Script
# Tests all major pages and content

BASE_URL="http://localhost:3000"
PASS=0
FAIL=0
TOTAL=0

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "🧪 Where Winds Meet URL Testing"
echo "Base URL: $BASE_URL"
echo "=========================================="
echo ""

# Function to test URL
test_url() {
    local url=$1
    local description=$2
    TOTAL=$((TOTAL + 1))

    printf "Testing: %-50s " "$description"

    # Use curl to test URL (follow redirects, check status code)
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$url")

    if [ "$status_code" == "200" ]; then
        echo -e "${GREEN}✅ PASS${NC} (200)"
        PASS=$((PASS + 1))
    else
        echo -e "${RED}❌ FAIL${NC} ($status_code)"
        FAIL=$((FAIL + 1))
    fi
}

echo "📄 Testing Core Pages..."
echo "----------------------------------------"
test_url "/" "Homepage"
test_url "/robots.txt" "robots.txt"
test_url "/sitemap.xml" "sitemap.xml"

echo ""
echo "⚔️ Testing Build Guides..."
echo "----------------------------------------"
test_url "/builds" "Builds List Page"
test_url "/builds/best-builds" "Best Builds Tier List"
test_url "/builds/blade-build" "Blade Build Guide"
test_url "/builds/dual-blades-build" "Dual Blades Build"
test_url "/builds/long-spear-build" "Long Spear Tank Build"
test_url "/builds/nameless-sword-build" "Nameless Sword Build"

echo ""
echo "🐉 Testing Boss Guides..."
echo "----------------------------------------"
test_url "/bosses" "Bosses List Page"
test_url "/bosses/emperor's-shadow" "Emperor's Shadow Boss"
test_url "/bosses/jiang-yue" "Jiang Yue Boss"
test_url "/bosses/white-wolf" "White Wolf Boss"

echo ""
echo "📚 Testing Game Guides..."
echo "----------------------------------------"
test_url "/guides" "Guides List Page"
test_url "/guides/class-overview" "Class Overview"
test_url "/guides/parry-guide" "Perfect Parry Guide"
test_url "/guides/weapon-tier-list" "Weapon Tier List"
test_url "/guides/world-map" "World Map"

echo ""
echo "📰 Testing News Articles..."
echo "----------------------------------------"
test_url "/news" "News List Page"
test_url "/news/release-date" "Release Date Article"
test_url "/news/beta-signup" "Beta Signup Guide"
test_url "/news/price" "Price & Editions"

echo ""
echo "💻 Testing PC Guides..."
echo "----------------------------------------"
test_url "/pc" "PC Guides List Page"
test_url "/pc/performance-settings" "Performance Settings"
test_url "/pc/benchmark-test" "Benchmark Test"
test_url "/pc/fps-cap" "FPS Cap Unlock"

echo ""
echo "⚙️ Testing System Pages..."
echo "----------------------------------------"
test_url "/system" "System Info List Page"
test_url "/system/system-requirements" "System Requirements"
test_url "/system/crossplay" "Cross-Play Support"
test_url "/system/server-status" "Server Status"

echo ""
echo "🏪 Testing Store Pages..."
echo "----------------------------------------"
test_url "/store/deluxe-edition" "Deluxe Edition"
test_url "/store/collectors-edition" "Collector's Edition"
test_url "/store/preorder-bonus" "Pre-Order Bonus"

echo ""
echo "👥 Testing Community Pages..."
echo "----------------------------------------"
test_url "/community/discord" "Discord Community"

echo ""
echo "=========================================="
echo "📊 Test Summary"
echo "=========================================="
echo -e "Total Tests: ${YELLOW}$TOTAL${NC}"
echo -e "Passed:      ${GREEN}$PASS${NC}"
echo -e "Failed:      ${RED}$FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Please check the errors above.${NC}"
    exit 1
fi
