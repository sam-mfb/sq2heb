import type { LogicFile, IndexResult, LogicMessage } from './types.js';

/**
 * Index messages in a logic file by replacing hardcoded strings with message references
 * and adding new messages for strings that don't have matches
 */
export function indexMessages(logicFile: LogicFile): IndexResult {
  const originalMessageCount = logicFile.messages.length;
  let content = logicFile.content;
  let replacedStrings = 0;

  // Build a map of message text to message number for exact matching
  const messageMap = new Map<string, number>();
  for (const msg of logicFile.messages) {
    messageMap.set(msg.text, msg.number);
  }

  // Track new messages to add
  const newMessages: Array<{ text: string; number: number }> = [];
  const maxMessageNumber = logicFile.messages.length > 0
    ? Math.max(...logicFile.messages.map(m => m.number))
    : 0;
  let nextMessageNumber = maxMessageNumber + 1;

  // Process each unique hardcoded string
  const processedStrings = new Set<string>();
  const matchedReplacements = new Map<string, number>(); // Strings matching existing messages
  const newReplacements = new Map<string, number>();     // Strings needing new messages

  for (const hardcoded of logicFile.hardcodedStrings) {
    // Skip if we already processed this exact string
    if (processedStrings.has(hardcoded.text)) {
      continue;
    }

    let messageNumber: number;

    // Check if we already have this string as a message
    if (messageMap.has(hardcoded.text)) {
      messageNumber = messageMap.get(hardcoded.text)!;
      matchedReplacements.set(hardcoded.text, messageNumber);
    } else {
      // Add as new message
      messageNumber = nextMessageNumber++;
      newMessages.push({ text: hardcoded.text, number: messageNumber });
      messageMap.set(hardcoded.text, messageNumber);
      newReplacements.set(hardcoded.text, messageNumber);
    }

    processedStrings.add(hardcoded.text);
  }

  // Apply all replacements in code section only
  const messagesSectionStart = content.indexOf('// messages');
  let codeSection = messagesSectionStart !== -1 ? content.substring(0, messagesSectionStart) : content;
  const messagesSection = messagesSectionStart !== -1 ? content.substring(messagesSectionStart) : '';

  // Replace matched strings (count these as replacedStrings)
  for (const [text, messageNumber] of matchedReplacements) {
    const escapedForRegex = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const countBefore = (codeSection.match(new RegExp(`"${escapedForRegex}"`, 'g')) || []).length;
    codeSection = replaceStringInCommand(codeSection, text, messageNumber);
    replacedStrings += countBefore;
  }

  // Replace new strings (don't count these as replacedStrings, they're newMessagesAdded)
  for (const [text, messageNumber] of newReplacements) {
    codeSection = replaceStringInCommand(codeSection, text, messageNumber);
  }

  // Reconstruct the content
  content = codeSection + messagesSection;

  // Add new messages to the file
  if (newMessages.length > 0) {
    content = addNewMessages(content, newMessages);
  }

  const stats = {
    replacedStrings,
    newMessagesAdded: newMessages.length,
    originalMessageCount,
    finalMessageCount: originalMessageCount + newMessages.length,
  };

  return { content, stats };
}

/**
 * Replace a hardcoded string with a message reference in the content
 */
function replaceStringInCommand(
  content: string,
  text: string,
  messageNumber: number
): string {
  // Escape special regex characters in the text, including the quotes we'll add
  const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create pattern to match the exact string literal with quotes
  // We need to escape the quotes and any backslashes
  const pattern = new RegExp(`"${escapedText}"`, 'g');
  return content.replace(pattern, `m${messageNumber}`);
}

/**
 * Add new messages to the messages section
 */
function addNewMessages(
  content: string,
  newMessages: Array<{ text: string; number: number }>
): string {
  // Find the messages section
  const lines = content.split('\n');
  const messagesSectionIndex = lines.findIndex(line => line.trim() === '// messages');

  if (messagesSectionIndex === -1) {
    // No messages section exists, create one
    const newMessagesText = newMessages
      .map(m => `#message ${m.number} "${m.text}"`)
      .join('\n');

    return content + '\n\n// messages\n' + newMessagesText + '\n';
  } else {
    // Append to existing messages section
    const newMessagesText = newMessages
      .map(m => `#message ${m.number} "${m.text}"`)
      .join('\n');

    // Add after the last line (before final newline if present)
    return content.trimEnd() + '\n' + newMessagesText + '\n';
  }
}
