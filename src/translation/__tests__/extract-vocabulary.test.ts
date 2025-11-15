import { describe, it, expect } from 'vitest';
import { extractVocabulary } from '../extract-vocabulary.js';

describe('extractVocabulary', () => {
  it('should extract vocabulary with synonyms', () => {
    const content = `0: a an the
2: look examine
5: get take "pick up"
`;
    const result = extractVocabulary(content);

    expect(result).toHaveLength(3);

    expect(result[0]).toEqual({
      wordNumber: 0,
      synonyms: [
        { original: 'a', translation: '', notes: '' },
        { original: 'an', translation: '', notes: '' },
        { original: 'the', translation: '', notes: '' }
      ],
      notes: ''
    });

    expect(result[1]).toEqual({
      wordNumber: 2,
      synonyms: [
        { original: 'look', translation: '', notes: '' },
        { original: 'examine', translation: '', notes: '' }
      ],
      notes: ''
    });

    expect(result[2]).toEqual({
      wordNumber: 5,
      synonyms: [
        { original: 'get', translation: '', notes: '' },
        { original: 'take', translation: '', notes: '' },
        { original: 'pick up', translation: '', notes: '' }
      ],
      notes: ''
    });
  });

  it('should handle multi-word phrases in quotes', () => {
    const content = `20: "check out" examine "look at" inspect`;
    const result = extractVocabulary(content);

    expect(result).toHaveLength(1);
    expect(result[0].synonyms).toHaveLength(4);
    expect(result[0].synonyms[0].original).toBe('check out');
    expect(result[0].synonyms[1].original).toBe('examine');
    expect(result[0].synonyms[2].original).toBe('look at');
    expect(result[0].synonyms[3].original).toBe('inspect');
  });

  it('should handle non-sequential word numbers', () => {
    const content = `1: one
5: five
10: ten
`;
    const result = extractVocabulary(content);

    expect(result).toHaveLength(3);
    expect(result[0].wordNumber).toBe(1);
    expect(result[1].wordNumber).toBe(5);
    expect(result[2].wordNumber).toBe(10);
  });

  it('should handle single synonym per word', () => {
    const content = `1: quit
2: restart
3: save
`;
    const result = extractVocabulary(content);

    expect(result).toHaveLength(3);
    expect(result[0].synonyms).toHaveLength(1);
    expect(result[0].synonyms[0].original).toBe('quit');
  });

  it('should handle empty file', () => {
    const content = '';
    const result = extractVocabulary(content);

    expect(result).toHaveLength(0);
  });

  it('should skip empty lines and comments', () => {
    const content = `
1: one

2: two
# This is a comment
3: three
`;
    const result = extractVocabulary(content);

    expect(result).toHaveLength(3);
  });

  it('should preserve mixed quotes and unquoted words', () => {
    const content = `10: go walk "go to" "walk to" move`;
    const result = extractVocabulary(content);

    expect(result[0].synonyms).toHaveLength(5);
    expect(result[0].synonyms[0].original).toBe('go');
    expect(result[0].synonyms[1].original).toBe('walk');
    expect(result[0].synonyms[2].original).toBe('go to');
    expect(result[0].synonyms[3].original).toBe('walk to');
    expect(result[0].synonyms[4].original).toBe('move');
  });
});
