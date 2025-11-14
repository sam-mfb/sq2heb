import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PicEditor, PicEditorControlContext } from '@agikit/react-editors'
import type { EditingPictureResource } from '@agikit/react-editors/dist/EditingPictureTypes'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loadPictureResource } from '../resources/resourcesSlice'
import { resourceCache } from '../../services/resourceCache'

export function PictureViewer() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { currentResource } = useAppSelector((state) => state.resources)
  const [pictureResource, setPictureResource] = useState<EditingPictureResource | null>(null)

  useEffect(() => {
    if (id) {
      dispatch(loadPictureResource(parseInt(id, 10)))
    }
  }, [dispatch, id])

  // Get data from cache when loaded
  useEffect(() => {
    if (currentResource.loaded && currentResource.type === 'pic' && currentResource.id !== null) {
      const data = resourceCache.get('pic', currentResource.id) as EditingPictureResource
      setPictureResource(data)
    }
  }, [currentResource.loaded, currentResource.type, currentResource.id])

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

  if (!pictureResource || currentResource.type !== 'pic') {
    return <div style={{ padding: '20px' }}>No picture loaded</div>
  }

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
