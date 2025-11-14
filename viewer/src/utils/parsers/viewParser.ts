import { readViewResource } from '@agikit/core'
import { buildEditingView } from '@agikit/react-editors/dist/EditingViewTypes'
import type { EditingView } from '@agikit/react-editors/dist/EditingViewTypes'

export async function parseViewResource(fileContent: ArrayBuffer): Promise<EditingView> {
  // Convert ArrayBuffer to Node.js Buffer
  const buffer = Buffer.from(fileContent)

  // Parse the binary view resource into AGIView format
  const agiView = readViewResource(buffer)

  // Convert to EditingView format for the editor
  const editingView = buildEditingView(agiView)

  return editingView
}
