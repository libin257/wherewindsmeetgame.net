#!/usr/bin/env node

/**
 * 批量创建 MDX 文件（仅优先级 1-2）
 * 从 test2.md 提取数据
 */

const fs = require('fs');
const path = require('path');

const TEST2_MD_PATH = path.join(__dirname, '../tools/demand/test2.md');
const CONTENT_DIR = path.join(__dirname, '../src/content');

console.log('📖 Reading test2.md file...\n');

const content = fs.readFileSync(TEST2_MD_PATH, 'utf8');
const lines = content.split('\n');

const mdxFiles = [];

lines.forEach((line, index) => {
  // 跳过空行和标题行
  if (!line.trim() || line.includes('Priority\tKeyword\tURL')) {
    return;
  }

  // 移除 "以 markdown 格式输出：" 前缀
  let cleanedLine = line.replace('以 markdown 格式输出：', '').trim();

  // 匹配格式: 优先级\t关键词\tURL\t标题\t参考链接
  const parts = cleanedLine.split('\t').filter(p => p.trim());

  if (parts.length >= 4) {
    const priority = parseInt(parts[0]);

    // 仅处理优先级 1 和 2
    if (priority === 1 || priority === 2) {
      const keywords = parts[1];
      const url = parts[2];
      const title = parts[3];

      // 从 URL 提取目录和文件名
      // 例如: /bosses/azure-dragon/ => bosses/azure-dragon
      const urlParts = url.split('/').filter(p => p);

      if (urlParts.length >= 2) {
        const directory = urlParts[0]; // bosses
        const filename = urlParts[1]; // azure-dragon

        mdxFiles.push({
          priority,
          keywords,
          url,
          title,
          directory,
          filename,
          filePath: path.join(CONTENT_DIR, directory, `${filename}.mdx`)
        });
      }
    }
  }
});

console.log(`✅ Found ${mdxFiles.length} files to create (priority 1-2)\n`);

// 按目录分组统计
const byDirectory = mdxFiles.reduce((acc, file) => {
  acc[file.directory] = (acc[file.directory] || 0) + 1;
  return acc;
}, {});

console.log('📊 Files per directory:');
Object.entries(byDirectory).forEach(([dir, count]) => {
  console.log(`   ${dir}: ${count} files`);
});
console.log('');

// 创建 MDX 文件
let created = 0;
let skipped = 0;

mdxFiles.forEach(file => {
  const dir = path.dirname(file.filePath);

  // 确保目录存在
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 检查文件是否已存在
  if (fs.existsSync(file.filePath)) {
    console.log(`⚠️  Skipping ${file.directory}/${file.filename}.mdx (already exists)`);
    skipped++;
    return;
  }

  // 生成 frontmatter（不包含 reference 字段）
  const category = file.directory.charAt(0).toUpperCase() + file.directory.slice(1);
  const today = new Date().toISOString().split('T')[0];

  const mdxContent = `---
title: "${file.title}"
description: "Learn about ${file.keywords}. This comprehensive guide covers everything you need to know."
keywords: "${file.keywords}"
category: "${category}"
priority: ${file.priority}
date: "${today}"
---

# ${file.title}

Content coming soon...

## Overview

<!-- Add your detailed overview here -->

## Key Points

- Important point 1
- Important point 2
- Important point 3

## Guide

<!-- Add your step-by-step guide here -->
`;

  // 写入文件
  fs.writeFileSync(file.filePath, mdxContent, 'utf8');
  created++;

  if (created % 10 === 0) {
    console.log(`   Created ${created} files...`);
  }
});

console.log('\n✅ MDX file creation complete!\n');
console.log(`📝 Summary:`);
console.log(`   Created: ${created} files`);
console.log(`   Skipped: ${skipped} files (already exist)`);
console.log(`   Total: ${mdxFiles.length} files\n`);
