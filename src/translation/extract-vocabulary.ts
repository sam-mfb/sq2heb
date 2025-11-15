import type { TranslationVocabulary, VocabularySynonym } from './types.js';

/**
 * Extract translatable vocabulary from words.txt content
 * Format: <word_number>: <synonym1> <synonym2> "multi word" ...
 */
export function extractVocabulary(wordsContent: string): TranslationVocabulary[] {
  const vocabulary: TranslationVocabulary[] = [];
  const lines = wordsContent.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    // Parse line format: <number>: <words>
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) {
      continue;
    }

    const wordNumberStr = trimmed.substring(0, colonIndex).trim();
    const wordsStr = trimmed.substring(colonIndex + 1).trim();

    const wordNumber = parseInt(wordNumberStr, 10);
    if (isNaN(wordNumber)) {
      continue;
    }

    // Parse synonyms (space-separated, with quoted multi-word phrases)
    const synonyms = parseSynonyms(wordsStr);

    vocabulary.push({
      wordNumber,
      synonyms,
      notes: ''
    });
  }

  return vocabulary;
}

/**
 * Parse space-separated synonyms, handling quoted multi-word phrases
 */
function parseSynonyms(wordsStr: string): VocabularySynonym[] {
  const synonyms: VocabularySynonym[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < wordsStr.length; i++) {
    const char = wordsStr[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ' ' && !inQuotes) {
      // Space outside quotes - word boundary
      if (current.trim()) {
        synonyms.push({
          original: current.trim(),
          translation: '',
          notes: ''
        });
        current = '';
      }
    } else {
      current += char;
    }
  }

  // Add last word
  if (current.trim()) {
    synonyms.push({
      original: current.trim(),
      translation: '',
      notes: ''
    });
  }

  return synonyms;
}
