import type { MessagesFile, ObjectsFile, VocabularyFile } from '@/types/translations';

const BASE_PATH = '/translations/project';

export async function fetchMessages(): Promise<MessagesFile> {
  const response = await fetch(`${BASE_PATH}/messages.json`);
  if (!response.ok) {
    throw new Error(`Failed to load messages: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchObjects(): Promise<ObjectsFile> {
  const response = await fetch(`${BASE_PATH}/objects.json`);
  if (!response.ok) {
    throw new Error(`Failed to load objects: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchVocabulary(): Promise<VocabularyFile> {
  const response = await fetch(`${BASE_PATH}/vocabulary.json`);
  if (!response.ok) {
    throw new Error(`Failed to load vocabulary: ${response.statusText}`);
  }
  return response.json();
}
