import { FileTree } from './resourcesSlice'

// Scan resources by loading the manifest file
export async function scanResources(): Promise<Omit<FileTree, 'loaded'>> {
  const response = await fetch('/resources/manifest.json')
  if (!response.ok) {
    throw new Error('Failed to load resource manifest')
  }
  const manifest = await response.json()
  return {
    pics: manifest.pics || [],
    views: manifest.views || [],
    sounds: manifest.sounds || [],
    logics: manifest.logics || [],
  }
}

// Load a specific resource file as text (for JSON-based resources like pictures)
export async function loadResourceFile(
  type: 'pic' | 'view' | 'sound' | 'logic',
  id: number
): Promise<string> {
  const response = await fetch(`/resources/${type}/${id}.agi${type}`)
  if (!response.ok) {
    throw new Error(`Failed to load ${type} ${id}`)
  }
  return await response.text()
}

// Load a specific resource file as binary (for binary resources like views)
export async function loadBinaryResourceFile(
  type: 'pic' | 'view' | 'sound' | 'logic',
  id: number
): Promise<ArrayBuffer> {
  const response = await fetch(`/resources/${type}/${id}.agi${type}`)
  if (!response.ok) {
    throw new Error(`Failed to load ${type} ${id}`)
  }
  return await response.arrayBuffer()
}
