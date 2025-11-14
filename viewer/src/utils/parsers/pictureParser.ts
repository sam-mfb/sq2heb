import { nanoid } from 'nanoid'
import type { EditingPictureResource } from '@agikit/react-editors/dist/EditingPictureTypes'

export async function parsePictureResource(fileContent: string): Promise<EditingPictureResource> {
  const parsed = JSON.parse(fileContent)

  // Add UUID and enabled flag to each command
  const commands = parsed.commands.map((cmd: any) => ({
    ...cmd,
    uuid: nanoid(),
    enabled: true,
  }))

  return {
    commands,
  }
}
