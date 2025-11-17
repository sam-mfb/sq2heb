#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { readPictureJSON } from '@agikit-slim/core/dist/Extract/Picture/PictureJSON.js';
import { buildPicture } from '@agikit-slim/core/dist/Build/BuildPicture.js';

/**
 * Compile an .agipic JSON file to binary .agp format
 * Usage: vite-node scripts/compile-picture.ts <input.agipic> <output.agp> [--compress]
 */

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: vite-node scripts/compile-picture.ts <input.agipic> <output.agp> [--compress]');
  console.error('Example: vite-node scripts/compile-picture.ts starmap.agipic starmap.agp');
  console.error('');
  console.error('Options:');
  console.error('  --compress    Use color number compression (default: no compression)');
  process.exit(1);
}

const inputPath = resolve(process.cwd(), args[0]);
const outputPath = resolve(process.cwd(), args[1]);
const compress = args.includes('--compress');

try {
  console.log(`📖 Reading JSON picture file: ${inputPath}`);
  const pictureJSON = JSON.parse(readFileSync(inputPath, 'utf-8'));

  console.log(`🔧 Converting JSON to Picture object...`);
  console.log(`   Commands: ${pictureJSON.commands.length}`);
  const picture = readPictureJSON(pictureJSON);

  console.log(`🔨 Compiling to binary format...`);
  console.log(`   Compression: ${compress ? 'enabled' : 'disabled'}`);
  const binaryData = buildPicture(picture, compress);

  console.log(`💾 Writing to: ${outputPath}`);
  console.log(`   Size: ${binaryData.length} bytes`);
  writeFileSync(outputPath, binaryData);

  console.log(`✅ Successfully compiled picture!`);
} catch (error) {
  console.error(`❌ Error compiling picture:`, error);
  process.exit(1);
}
