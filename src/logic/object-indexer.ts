import { InventoryObject, ObjectIndexResult } from './object-types.js';

export function indexObjects(
  logicContent: string,
  objects: InventoryObject[]
): ObjectIndexResult {
  let content = logicContent;
  let replacedObjects = 0;

  // Separate code section from messages section
  const messagesSectionStart = content.indexOf('// messages');
  let codeSection = messagesSectionStart !== -1
    ? content.substring(0, messagesSectionStart)
    : content;
  const messagesSection = messagesSectionStart !== -1
    ? content.substring(messagesSectionStart)
    : '';

  // Create a map of object names to their indices
  const objectMap = new Map<string, number>();
  for (const obj of objects) {
    objectMap.set(obj.name, obj.index);
  }

  // Find all hardcoded strings in commands (except said())
  const lines = codeSection.split('\n');
  const processedLines: string[] = [];

  for (const line of lines) {
    let processedLine = line;

    // Skip said() commands entirely
    if (line.includes('said(')) {
      processedLines.push(line);
      continue;
    }

    // Find all quoted strings in this line
    const stringPattern = /"(?:[^"\\]|\\.)*"/g;
    const matches = line.match(stringPattern);

    if (matches) {
      for (const match of matches) {
        // Remove quotes to get the actual string content
        const quotedString = match;
        const stringContent = match.slice(1, -1); // Remove surrounding quotes

        // Check if this string matches any object name
        // We need to handle escaped quotes in the string
        const unescapedString = stringContent.replace(/\\"/g, '"');

        if (objectMap.has(unescapedString)) {
          const objectIndex = objectMap.get(unescapedString)!;
          const replacement = `i${objectIndex}`;

          // Replace the quoted string with the object reference
          processedLine = processedLine.replace(quotedString, replacement);
          replacedObjects++;
        }
      }
    }

    processedLines.push(processedLine);
  }

  // Reconstruct the content
  codeSection = processedLines.join('\n');
  content = messagesSection ? codeSection + messagesSection : codeSection;

  return {
    content,
    stats: {
      replacedObjects
    }
  };
}
