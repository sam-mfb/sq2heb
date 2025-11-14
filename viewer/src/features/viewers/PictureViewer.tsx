import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PicEditor, PicEditorControlContext } from '@agikit/react-editors'
import type { EditingPictureResource } from '@agikit/react-editors/dist/EditingPictureTypes'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loadPictureResource } from '../resources/resourcesSlice'

export function PictureViewer() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { currentResource } = useAppSelector((state) => state.resources)

  useEffect(() => {
    if (id) {
      dispatch(loadPictureResource(parseInt(id, 10)))
    }
  }, [dispatch, id])

  if (currentResource.loading) {
    return <div style={{ padding: '20px' }}>Loading picture {id}...</div>
  }

  if (currentResource.error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error loading picture {id}: {currentResource.error}
      </div>
    )
  }

  if (!currentResource.data || currentResource.type !== 'pic') {
    return <div style={{ padding: '20px' }}>No picture loaded</div>
  }

  const pictureResource = currentResource.data as EditingPictureResource

  // Provide read-only context for PicEditor
  const contextValue = {
    confirm: async (message: string) => window.confirm(message),
    addCommands: () => {
      // Read-only: do nothing
    },
    deleteCommand: () => {
      // Read-only: do nothing
    },
    setCommandsEnabled: () => {
      // Read-only: do nothing
    },
    setProjectConfig: () => {
      // Read-only: do nothing
    },
  }

  return (
    <div>
      <h2 style={{ padding: '0 20px' }}>Picture {id}</h2>
      <PicEditorControlContext.Provider value={contextValue}>
        <PicEditor pictureResource={pictureResource} />
      </PicEditorControlContext.Provider>
    </div>
  )
}
