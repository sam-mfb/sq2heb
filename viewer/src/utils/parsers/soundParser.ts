import { readIBMPCjrSoundResource } from '@agikit/core'
import type { IBMPCjrSound } from '@agikit/core'

export async function parseSoundResource(fileContent: ArrayBuffer): Promise<IBMPCjrSound> {
  // Convert ArrayBuffer to Node.js Buffer
  const buffer = Buffer.from(fileContent)

  // Parse the binary sound resource into IBMPCjrSound format
  const sound = readIBMPCjrSoundResource(buffer)

  return sound
}
