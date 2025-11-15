#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync, cpSync, rmSync } from 'fs';
import { join } from 'path';
import { log } from './utils/logger.js';
import { importObjects } from '../src/translation/import-objects.js';
import type { ObjectsFile } from '../src/translation/types.js';

/**
 * Import translations from JSON files into game source files
 */
function importTranslations(projectDir: string): void {
  log.info(`Importing translations for: ${projectDir}`);

  const tmpSrcDir = join(projectDir, 'tmp', 'src');
  const finalDir = join(projectDir, 'final');
  const finalSrcDir = join(finalDir, 'src');
  const projectName = projectDir.split('/').pop() || projectDir;
  const translationsDir = join('translations', projectName);

  // Verify tmp/src exists
  if (!existsSync(tmpSrcDir)) {
    log.error(`Indexed source directory not found: ${tmpSrcDir}`);
    log.error('Run indexing first: npm run index or npm run example:index');
    process.exit(1);
  }

  // Verify translations directory exists
  if (!existsSync(translationsDir)) {
    log.error(`Translations directory not found: ${translationsDir}`);
    log.error('Run extraction first: npm run extract-translations');
    process.exit(1);
  }

  // Create final directory (clean if exists)
  if (existsSync(finalDir)) {
    log.info('Cleaning existing final directory...');
    rmSync(finalDir, { recursive: true, force: true });
  }
  mkdirSync(finalDir, { recursive: true });

  // Copy tmp/src to final/src
  log.info(`Copying ${tmpSrcDir} → ${finalSrcDir}...`);
  cpSync(tmpSrcDir, finalSrcDir, { recursive: true });
  log.success('Source files copied');

  // Import object translations
  log.info('Importing object translations...');
  const objectsStats = importObjectTranslations(translationsDir, finalSrcDir);

  if (objectsStats.translated > 0) {
    log.success(`Imported ${objectsStats.translated} object translations (${objectsStats.skipped} skipped)`);
  } else {
    log.info('No object translations to import (all translation fields empty)');
  }

  log.newline();
  log.success('Translation import complete!');
  log.info(`Final source ready in: ${finalSrcDir}`);
  log.info(`To build: agikit build ${finalDir}`);
}

/**
 * Import object translations
 */
function importObjectTranslations(
  translationsDir: string,
  finalSrcDir: string
): { translated: number; skipped: number } {
  const objectsJsonPath = join(translationsDir, 'objects.json');
  const targetObjectPath = join(finalSrcDir, 'object.json');

  // Read translation file
  const translationsContent = readFileSync(objectsJsonPath, 'utf-8');
  const translationsFile: ObjectsFile = JSON.parse(translationsContent);

  // Read target object.json
  const objectJsonContent = readFileSync(targetObjectPath, 'utf-8');

  // Apply translations
  const result = importObjects(objectJsonContent, translationsFile.objects);

  // Write result
  writeFileSync(targetObjectPath, result, 'utf-8');

  // Calculate stats
  const translated = translationsFile.objects.filter(
    obj => obj.translation && obj.translation.trim() !== ''
  ).length;
  const skipped = translationsFile.objects.length - translated;

  return { translated, skipped };
}

// Main execution
const projectDir = process.argv[2];

if (!projectDir) {
  log.error('Usage: vite-node scripts/import-translations.ts <project-directory>');
  log.error('Example: vite-node scripts/import-translations.ts project');
  process.exit(1);
}

importTranslations(projectDir);
