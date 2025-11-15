import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parseObjectFile } from '../object-parser.js';
import { indexObjects } from '../object-indexer.js';

const fixturesDir = join(__dirname, 'fixtures');

describe('indexObjects', () => {
  const objectContent = readFileSync(join(fixturesDir, 'test-object.json'), 'utf-8');
  const objects = parseObjectFile(objectContent).objects;

  it('should replace exact object name matches with iN references', () => {
    const logicContent = readFileSync(join(fixturesDir, 'objects.agilogic'), 'utf-8');
    const result = indexObjects(logicContent, objects);

    // "Rock" at index 1 should become i1
    expect(result.content).toContain('print(i1);');
    expect(result.content).not.toContain('print("Rock");');

    // "Key" at index 2 should become i2
    expect(result.content).toContain('display(0, 0, i2);');
    expect(result.content).not.toContain('display(0, 0, "Key");');

    // "Flashlight" at index 4 should become i4
    expect(result.content).toContain('set.menu(i4);');
    expect(result.content).not.toContain('set.menu("Flashlight");');
  });

  it('should skip said() commands entirely', () => {
    const logicContent = readFileSync(join(fixturesDir, 'objects.agilogic'), 'utf-8');
    const result = indexObjects(logicContent, objects);

    // said() commands should not be touched
    expect(result.content).toContain('said("examine", "Rock")');
  });

  it('should use exact matching (including quotes)', () => {
    const logicContent = readFileSync(join(fixturesDir, 'objects.agilogic'), 'utf-8');
    const result = indexObjects(logicContent, objects);

    // "The Rock is heavy" should NOT match object "Rock"
    expect(result.content).toContain('"The Rock is heavy"');
    expect(result.content).not.toContain('i1 is heavy');

    // "Key ring" should NOT match object "Key"
    expect(result.content).toContain('"Key ring"');
    expect(result.content).not.toContain('i2 ring');
  });

  it('should count replaced objects correctly', () => {
    const logicContent = readFileSync(join(fixturesDir, 'objects.agilogic'), 'utf-8');
    const result = indexObjects(logicContent, objects);

    // Should count:
    // - "Rock" (2x): print("Rock"), set.string("Rock")
    // - "Key" (2x): display("Key"), get.num("Key")
    // - "Flashlight" (1x): set.menu("Flashlight")
    // Total: 5
    // Note: said("Rock") is skipped
    expect(result.stats.replacedObjects).toBe(5);
  });

  it('should handle get.num command', () => {
    const logicContent = readFileSync(join(fixturesDir, 'objects.agilogic'), 'utf-8');
    const result = indexObjects(logicContent, objects);

    expect(result.content).toContain('get.num(i2, v1);');
    expect(result.content).not.toContain('get.num("Key", v1);');
  });

  it('should handle set.string command', () => {
    const logicContent = readFileSync(join(fixturesDir, 'objects.agilogic'), 'utf-8');
    const result = indexObjects(logicContent, objects);

    expect(result.content).toContain('set.string(s1, i1);');
    expect(result.content).not.toContain('set.string(s1, "Rock");');
  });

  it('should handle multiple commands with the same object', () => {
    const content = `
print("Rock");
display(0, 0, "Rock");
set.menu("Rock");
return();
`;
    const result = indexObjects(content, objects);

    expect(result.content).toContain('print(i1);');
    expect(result.content).toContain('display(0, 0, i1);');
    expect(result.content).toContain('set.menu(i1);');
    expect(result.stats.replacedObjects).toBe(3);
  });

  it('should not replace objects that are not in the object list', () => {
    const content = `
print("Unknown Object");
return();
`;
    const result = indexObjects(content, objects);

    expect(result.content).toContain('"Unknown Object"');
    expect(result.stats.replacedObjects).toBe(0);
  });

  it('should handle empty logic file', () => {
    const content = 'return();';
    const result = indexObjects(content, objects);

    expect(result.content).toBe('return();');
    expect(result.stats.replacedObjects).toBe(0);
  });

  it('should handle logic file with no object references', () => {
    const content = `
if (f5) {
  print("Hello");
}
return();
`;
    const result = indexObjects(content, objects);

    expect(result.content).toContain('print("Hello");');
    expect(result.stats.replacedObjects).toBe(0);
  });

  it('should handle empty object list', () => {
    const content = `
print("Rock");
return();
`;
    const result = indexObjects(content, []);

    expect(result.content).toContain('"Rock"');
    expect(result.stats.replacedObjects).toBe(0);
  });

  it('should preserve escaped quotes in object names', () => {
    const objectsWithQuotes = [
      { index: 1, name: 'Say "Hello"' }
    ];
    const content = `
print("Say \\"Hello\\"");
return();
`;
    const result = indexObjects(content, objectsWithQuotes);

    expect(result.content).toContain('print(i1);');
    expect(result.stats.replacedObjects).toBe(1);
  });

  it('should not replace in messages section', () => {
    const content = `
print("Rock");
return();

// messages
#message 1 "Rock"
`;
    const result = indexObjects(content, objects);

    // Should replace in code section
    expect(result.content).toContain('print(i1);');

    // Should NOT replace in messages section
    expect(result.content).toContain('#message 1 "Rock"');

    expect(result.stats.replacedObjects).toBe(1);
  });

  it('should handle multiple said() commands without replacing them', () => {
    const content = `
if (said("get", "Rock")) {
  print("Rock");
}

if (said("examine", "Key") || said("look", "Key")) {
  display(0, 0, "Key");
}
return();
`;
    const result = indexObjects(content, objects);

    // said() should not be touched
    expect(result.content).toContain('said("get", "Rock")');
    expect(result.content).toContain('said("examine", "Key")');
    expect(result.content).toContain('said("look", "Key")');

    // Other commands should be replaced
    expect(result.content).toContain('print(i1);');
    expect(result.content).toContain('display(0, 0, i2);');

    expect(result.stats.replacedObjects).toBe(2);
  });
});
