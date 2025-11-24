#!/usr/bin/env node

/**
 * 图片转换脚本 - 将大型 PNG/JPG 转换为 WebP 格式
 * 用于优化 Where Winds Meet 网站性能
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToConvert = [
  // 背景图片 (高优先级)
  {
    input: 'public/images/backgrounds/winter-night.png',
    output: 'public/images/backgrounds/winter-night.webp',
    quality: 80,
  },
  {
    input: 'public/images/backgrounds/hero-bg.jpg',
    output: 'public/images/backgrounds/hero-bg.webp',
    quality: 75,
  },
  {
    input: 'public/images/hero.png',
    output: 'public/images/hero.webp',
    quality: 80,
  },
  // 超大截图 (极高优先级 - 9.4MB!)
  {
    input: 'public/images/screenshots/snowy-forest.png',
    output: 'public/images/screenshots/snowy-forest.webp',
    quality: 75,
  },
  {
    input: 'public/images/screenshots/cozy-interior.png',
    output: 'public/images/screenshots/cozy-interior.webp',
    quality: 75,
  },
];

async function convertImage(config) {
  const { input, output, quality } = config;

  try {
    // 检查输入文件是否存在
    if (!fs.existsSync(input)) {
      console.log(`⏭️  跳过: ${input} (文件不存在)`);
      return;
    }

    // 获取原始文件大小
    const originalStats = fs.statSync(input);
    const originalSize = originalStats.size;

    // 转换为 WebP
    await sharp(input)
      .webp({ quality })
      .toFile(output);

    // 获取转换后文件大小
    const newStats = fs.statSync(output);
    const newSize = newStats.size;

    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    const originalMB = (originalSize / 1024 / 1024).toFixed(2);
    const newMB = (newSize / 1024 / 1024).toFixed(2);

    console.log(`✅ ${path.basename(input)}`);
    console.log(`   ${originalMB}MB → ${newMB}MB (减少 ${reduction}%)`);
  } catch (error) {
    console.error(`❌ 转换失败: ${input}`);
    console.error(`   错误: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 开始图片转换...\n');

  for (const config of imagesToConvert) {
    await convertImage(config);
  }

  console.log('\n✨ 转换完成！');
  console.log('\n📝 下一步:');
  console.log('1. 更新 src/app/layout.tsx 中的背景图片路径');
  console.log('2. 测试生产构建: npm run build');
  console.log('3. 验证性能: PageSpeed Insights');
}

main().catch(console.error);
