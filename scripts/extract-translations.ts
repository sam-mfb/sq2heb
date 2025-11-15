#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { log } from './utils/logger.js';
import { extractMessages } from '../src/translation/extract-messages.js';
import { extractObjects } from '../src/translation/extract-objects.js';
import { extractVocabulary } from '../src/translation/extract-vocabulary.js';
import type { MessagesFile, ObjectsFile, VocabularyFile } from '../src/translation/types.js';

/**
 * Extract all translatable content from AGI game files
 */
function extractTranslations(projectDir: string): void {
  log.info(`Extracting translations from: ${projectDir}`);

  const srcDir = join(projectDir, 'src');
  const projectName = projectDir.split('/').pop() || projectDir;
  const translationsDir = join('translations', projectName);

  // Verify src directory exists
  if (!existsSync(srcDir)) {
    log.error(`Source directory not found: ${srcDir}`);
    log.error('Run setup first: npm run setup or npm run example:setup');
    process.exit(1);
  }

  // Create translations subdirectory for this project
  if (!existsSync(translationsDir)) {
    mkdirSync(translationsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString();

  // Extract messages from all logic files
  log.info('Extracting messages from logic files...');
  const messagesResult = extractAllMessages(srcDir, timestamp);
  const messagesPath = join(translationsDir, 'messages.json');
  writeFileSync(messagesPath, JSON.stringify(messagesResult, null, 2), 'utf-8');
  log.success(`Extracted ${messagesResult.messages.length} messages → ${messagesPath}`);

  // Extract objects
  log.info('Extracting objects...');
  const objectsResult = extractObjectsFile(srcDir, timestamp);
  const objectsPath = join(translationsDir, 'objects.json');
  writeFileSync(objectsPath, JSON.stringify(objectsResult, null, 2), 'utf-8');
  log.success(`Extracted ${objectsResult.objects.length} objects → ${objectsPath}`);

  // Extract vocabulary
  log.info('Extracting vocabulary...');
  const vocabularyResult = extractVocabularyFile(srcDir, timestamp);
  const vocabularyPath = join(translationsDir, 'vocabulary.json');
  writeFileSync(vocabularyPath, JSON.stringify(vocabularyResult, null, 2), 'utf-8');
  log.success(`Extracted ${vocabularyResult.vocabulary.length} word groups → ${vocabularyPath}`);

  log.newline();
  log.success('Translation extraction complete!');
  log.info('Edit the JSON files in translations/ directory to add translations');
}

/**
 * Extract messages from all logic files
 */
function extractAllMessages(srcDir: string, timestamp: string): MessagesFile {
  const logicDir = join(srcDir, 'logic');
  const messages: MessagesFile = {
    version: '1.0',
    metadata: {
      gameName: '',
      contentType: 'messages',
      sourceLanguage: 'en',
      targetLanguage: '',
      extractedDate: timestamp,
      totalMessages: 0
    },
    messages: []
  };

  if (!existsSync(logicDir)) {
    return messages;
  }

  const files = readdirSync(logicDir)
    .filter(f => f.endsWith('.agilogic'))
    .sort((a, b) => {
      const aNum = parseInt(a.replace('.agilogic', ''), 10);
      const bNum = parseInt(b.replace('.agilogic', ''), 10);
      return aNum - bNum;
    });

  for (const file of files) {
    const content = readFileSync(join(logicDir, file), 'utf-8');
    const fileMessages = extractMessages(file, content);
    messages.messages.push(...fileMessages);
  }

  messages.metadata.totalMessages = messages.messages.length;
  return messages;
}

/**
 * Extract objects from object.json
 */
function extractObjectsFile(srcDir: string, timestamp: string): ObjectsFile {
  const objectPath = join(srcDir, 'object.json');

  if (!existsSync(objectPath)) {
    log.error(`object.json not found: ${objectPath}`);
    process.exit(1);
  }

  const content = readFileSync(objectPath, 'utf-8');
  const parsed = JSON.parse(content);
  const objects = extractObjects(content);

  const result: ObjectsFile = {
    version: '1.0',
    metadata: {
      gameName: '',
      contentType: 'objects',
      sourceLanguage: 'en',
      targetLanguage: '',
      extractedDate: timestamp,
      totalObjects: objects.length,
      maxAnimatedObjects: parsed.maxAnimatedObjects
    },
    objects
  };

  return result;
}

/**
 * Extract vocabulary from words.txt
 */
function extractVocabularyFile(srcDir: string, timestamp: string): VocabularyFile {
  const wordsPath = join(srcDir, 'words.txt');

  if (!existsSync(wordsPath)) {
    log.error(`words.txt not found: ${wordsPath}`);
    process.exit(1);
  }

  const content = readFileSync(wordsPath, 'utf-8');
  const vocabulary = extractVocabulary(content);

  const result: VocabularyFile = {
    version: '1.0',
    metadata: {
      gameName: '',
      contentType: 'vocabulary',
      sourceLanguage: 'en',
      targetLanguage: '',
      extractedDate: timestamp,
      totalWordGroups: vocabulary.length
    },
    vocabulary
  };

  return result;
}

// Main execution
const projectDir = process.argv[2];

if (!projectDir) {
  log.error('Usage: vite-node scripts/extract-translations.ts <project-directory>');
  log.error('Example: vite-node scripts/extract-translations.ts project');
  process.exit(1);
}

extractTranslations(projectDir);
