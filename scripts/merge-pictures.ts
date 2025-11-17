#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Merge two AGI picture files - background first, then foreground on top
 * Usage: vite-node scripts/merge-pictures.ts <background.agipic> <foreground.agipic> <output.agipic>
 */

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error('Usage: vite-node scripts/merge-pictures.ts <background.agipic> <foreground.agipic> <output.agipic>');
  console.error('Example: vite-node scripts/merge-pictures.ts starmap.agipic title.agipic combined.agipic');
  process.exit(1);
}

const [backgroundPath, foregroundPath, outputPath] = args.map(p => resolve(process.cwd(), p));

try {
  console.log(`📖 Reading background: ${backgroundPath}`);
  const background = JSON.parse(readFileSync(backgroundPath, 'utf-8'));

  console.log(`📖 Reading foreground: ${foregroundPath}`);
  const foreground = JSON.parse(readFileSync(foregroundPath, 'utf-8'));

  console.log(`🔧 Merging pictures...`);
  console.log(`   Background commands: ${background.commands.length}`);
  console.log(`   Foreground commands: ${foreground.commands.length}`);

  // Combine commands: background first, then foreground
  const combined = {
    commands: [
      ...background.commands,
      ...foreground.commands
    ]
  };

  console.log(`💾 Writing combined picture to: ${outputPath}`);
  console.log(`   Total commands: ${combined.commands.length}`);
  writeFileSync(outputPath, JSON.stringify(combined, null, 2));

  console.log(`✅ Successfully merged pictures!`);
} catch (error) {
  console.error(`❌ Error merging pictures:`, error);
  process.exit(1);
}
