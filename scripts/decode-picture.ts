#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { readPictureResource } from '@agikit-slim/core/dist/Extract/Picture/ReadPicture.js';
import { buildPictureJSON } from '@agikit-slim/core/dist/Extract/Picture/PictureJSON.js';

/**
 * Decode a binary .agp file to .agipic JSON format
 * Usage: vite-node scripts/decode-picture.ts <input.agp> <output.agipic>
 */

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: vite-node scripts/decode-picture.ts <input.agp> <output.agipic>');
  console.error('Example: vite-node scripts/decode-picture.ts translations/sq2/pic/titleheb.agp translations/sq2/pic/titleheb.agipic');
  process.exit(1);
}

const [inputPath, outputPath] = args.map(p => resolve(process.cwd(), p));

try {
  console.log(`📖 Reading binary picture file: ${inputPath}`);
  let binaryData = readFileSync(inputPath);

  // Try different approaches if initial decode fails
  const attempts = [
    { name: 'Direct read', data: binaryData, compress: true },
    { name: 'Direct read (no compress)', data: binaryData, compress: false },
    { name: 'Skip 2-byte header', data: binaryData.subarray(2), compress: true },
    { name: 'Skip 5-byte header', data: binaryData.subarray(5), compress: true },
  ];

  let success = false;
  for (const attempt of attempts) {
    try {
      console.log(`🔍 Attempting: ${attempt.name}...`);
      const picture = readPictureResource(attempt.data, attempt.compress);

      console.log(`📝 Converting to JSON format...`);
      const pictureJSON = buildPictureJSON(picture);

      console.log(`💾 Writing to: ${outputPath}`);
      writeFileSync(outputPath, JSON.stringify(pictureJSON, null, 2));

      console.log(`✅ Successfully decoded picture with: ${attempt.name}`);
      console.log(`   Commands: ${pictureJSON.commands.length}`);
      console.log(`   File size: ${attempt.data.length} bytes`);
      success = true;
      break;
    } catch (err) {
      console.log(`   ❌ Failed: ${(err as Error).message}`);
    }
  }

  if (!success) {
    throw new Error('All decode attempts failed');
  }
} catch (error) {
  console.error(`\n❌ Error decoding picture:`, error);
  process.exit(1);
}
