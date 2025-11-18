下⾯⽤**中文说明整体逻辑**，但把真正会放到⻚⾯上的⽂案保持为全英文——这样既满足你对 SEO 的英⽂需求，也方便你核对。⼤致区块顺序与版⾯排布都严格对应你给出的 A 模板。

---

## 核心摘要

基于当前《Where Winds Meet》搜索趋势⾼居 **Release Date / System Requirements / Builds / Trailer** 等关键词榜首﻿([Steam Store][1])，我为首页设计了“⼀钩⼦ Hero＋⻢上能点的 Quick Nav＋双柱主功能（计算/指南）＋视频与社区讨论”四段式结构，并为每个按钮嵌入了你 Excel ⾥的内链 URL；同时挑选了 YouTube 官方预告与 Reddit 热帖作外链，引导深度讨论。以下所有英⽂ copy 均可直接贴到代码中。

---

## 1. 顶部导航（粘性 Header）

| 菜单名称（英文）            | URL                   |
| ------------------- | --------------------- |
| **Home**            | `/`                   |
| **Guides**          | `/guides/`            |
| **Builds**          | `/builds/`            |
| **Systems**         | `/system/`            |
| **PC & Tech**       | `/pc/`                |
| **Community**       | `/community/`         |
| **Get Started**（按钮） | `/news/release-date/` |

> 逻辑：六条主线呼应一级目录；“Get Started” 直接跳到发布日期页，引流转化。发布日期页是当前最高搜索量词组之一﻿([TechRadar][2])。

---

## 2. Hero 区（3 s Hook）

```text
H1: Where Winds Meet
Tagline: Master open-world Wuxia in just 3 minutes.
Sub-copy: Bite-size guides, build calculators & real-time tools crafted by veteran martial-arts gamers.
CTA-1 (primary): Launch Countdown  → /news/release-countdown/
CTA-2 (secondary): Best Build Tier List → /builds/best-builds/
CTA-3 (ghost): Can My PC Run It? → /system/system-requirements/
```

*释义*：

* “3 minutes” 给用户省时间的承诺（模板里的 3 min master 借鉴）
* 三个按钮直指趋势痛点：开服时间、流派强度、配置检测。Countdown 信息源自官方公告﻿([PlayStation.Blog][3])；系统配置来自 SRL ﻿([systemrequirementslab.com][4])。

---

## 3. Quick Navigation（信息 / 下载导航区）

| 链接标题 (英文)                   | Slogan                                             | URL                         |
| --------------------------- | -------------------------------------------------- | --------------------------- |
| **Release Date & Times**    | “Mark your calendar — global launch slots inside.” | `/news/release-date/`       |
| **Interactive World Map**   | “Zoom & discover every shrine and waypoint.”       | `/guides/world-map/`        |
| **Weapon Tier List**        | “Don’t waste XP — pick the S-tiers first.”         | `/guides/weapon-tier-list/` |
| **Perfect Parry Guide**     | “Turn every strike into your opening.”             | `/guides/parry-guide/`      |
| **PC Performance Settings** | “60 FPS on a toaster? Yes, with these tweaks.”     | `/pc/performance-settings/` |
| **Discord Hub**             | “Party-up, trade gear & share screenshots.”        | `/community/discord/`       |

> 每条 slogan 简短有冲击⼒，并贴合来源：
>
> * Weapon Tier List 参考 Game8 排名﻿([Game8][5])
> * Parry Guide 对应 YouTube 实机弹反教学﻿([youtube.com][6])
> * Discord 页面关联 Sub-Reddit 与官方服务器﻿([Reddit][7])

---

## 4. 主功能区块

### 4.1  **Builds Quick-Pick Calculator**

> 位置对应 A 模板的“Winter Survival Calculator”。
> 英⽂文案示例：

```text
H2: Build Finder
Sub-copy: Filter by weapon & playstyle, get the top-rated builds in one click.
CTA: See Full Tier List → /builds/best-builds/
```

* 计算器本体读取 `/public/data/build_popularity.json`（你已生成）。
* 引导到完整 Tier List 页面（数据源 Game8 + Fextralife ﻿([Game8][5])）。

### 4.2 **PC Specs Checker**

> 对应模板的 Crafting Finder 区。
> 英⽂文案示例：

```text
H2: PC Specs Checker
Sub-copy: Enter your GPU & CPU to see if you’re battle-ready.
CTA: Full Requirements Sheet → /system/system-requirements/
```

* 文案呼应 SystemRequirementsLab 数据﻿([systemrequirementslab.com][4])；
* 提供 JSON/API 解析式本地运算。

---

## 5. 媒体 & 社区

### 5.1 **Featured Videos**

嵌入两条官方⾼质量 YouTube：

1. Open-World Gameplay Trailer（turn0search0）
   `https://www.youtube.com/watch?v=gyjHNix6x9E` ([youtube.com][6])
2. PS5 Gameplay Trailer（turn0search5）
   `https://www.youtube.com/watch?v=NhgJ7UFubTc` ([youtube.com][8])

文案示例：

```text
H3: Featured Videos
Caption-1: “5-min deep dive into traversal & combat.”
Caption-2: “PS5 footage — see next-gen Wuxia in action.”
```

### 5.2 **Community Discussions**

| 主题链接 (英文)                              | 来源                                            |
| -------------------------------------- | --------------------------------------------- |
| “Is Where Winds Meet worth your time?” | Reddit reviews megathread — turn0search1      |
| “Show off your best outfits!”          | r/wherewindsmeet_ — turn0search6              |
| “Looking for guild members (NA/EU)”    | r/wherewindsmeet_ recruit post — turn0search6 |

> 每条附上 `target="_blank" rel="noopener"`；加强外链信任度。

---

## 6. Core Features & FAQ

按模板列三张卡片：*Wuxia Mobility / Deep Crafting / Branching Story* — 信息可摘自 Steam 商店页与 TechRadar 报道﻿([Steam Store][1])。

FAQ 段落可用 4 个高频问题（What is the game / How hard / Controller support / PC specs），答案里再塞内链指向相应页面。

---

## 7. Footer CTA

```text
Ready to write your own Wuxia legend?
Start exploring builds, maps & tech guides in one click.
Button: Get Started → /news/release-date/
```

---

### 最后提醒

1. **Hero、Quick Nav、CTA** 都已嵌入 Excel 中的实际 URL；上线时保持路径一致即可。
2. 外部媒体链接全部为真实可访问资源，利于 E-E-A-T 与外链多样性。
3. 面包屑、顶部导航、同级/下级列表记得在组件层实现，确保内链深度，让 Google 更快抓取。

[1]: https://store.steampowered.com/app/3564740/Where_Winds_Meet/?utm_source=chatgpt.com "Where Winds Meet"
[2]: https://www.techradar.com/gaming/stunning-open-world-chinese-fantasy-rpg-where-winds-meet-gets-an-official-release-date?utm_source=chatgpt.com "Stunning open-world Chinese fantasy RPG Where Winds Meet gets an official release date"
[3]: https://blog.playstation.com/2025/08/20/where-winds-meet-launches-november-14/?utm_source=chatgpt.com "Where Winds Meet launches November 14"
[4]: https://www.systemrequirementslab.com/cyri/requirements/where-winds-meet/27433?utm_source=chatgpt.com "Where Winds Meet system requirements"
[5]: https://game8.co/games/Where-Winds-Meet/archives/564672?utm_source=chatgpt.com "Best Builds and Class Tier List | Where Winds Meet"
[6]: https://www.youtube.com/watch?v=gyjHNix6x9E&utm_source=chatgpt.com "Where Winds Meet - Official Open World Gameplay Trailer ..."
[7]: https://www.reddit.com/r/wherewindsmeet_/?utm_source=chatgpt.com "wherewindsmeet_"
[8]: https://www.youtube.com/watch?v=NhgJ7UFubTc&utm_source=chatgpt.com "Where Winds Meet - Gameplay Trailer | PS5 Games"
