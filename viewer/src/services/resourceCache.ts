// Resource cache to store non-serializable data outside of Redux state
// This allows us to store binary buffers and other complex objects

type ResourceData = any // Can be EditingPictureResource, EditingView, etc.

class ResourceCache {
  private cache: Map<string, ResourceData> = new Map()

  private getCacheKey(type: string, id: number): string {
    return `${type}:${id}`
  }

  set(type: string, id: number, data: ResourceData): void {
    const key = this.getCacheKey(type, id)
    this.cache.set(key, data)
  }

  get(type: string, id: number): ResourceData | undefined {
    const key = this.getCacheKey(type, id)
    return this.cache.get(key)
  }

  has(type: string, id: number): boolean {
    const key = this.getCacheKey(type, id)
    return this.cache.has(key)
  }

  clear(): void {
    this.cache.clear()
  }

  delete(type: string, id: number): void {
    const key = this.getCacheKey(type, id)
    this.cache.delete(key)
  }
}

// Export a singleton instance
export const resourceCache = new ResourceCache()
