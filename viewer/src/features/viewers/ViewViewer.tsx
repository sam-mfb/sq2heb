import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadViewResource } from '../resources/resourcesSlice'
import type { RootState, AppDispatch } from '../../app/store'
import { ViewEditor } from '@agikit/react-editors/dist/ViewEditor'
import { ViewEditorControlContext } from '@agikit/react-editors/dist/ViewEditorControlContext'
import type { ViewEditorCommand } from '@agikit/react-editors/dist/ViewEditorCommands'

export function ViewViewer() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { currentResource } = useSelector((state: RootState) => state.resources)
  const [zoom, setZoom] = useState(2)

  useEffect(() => {
    if (id) {
      dispatch(loadViewResource(Number(id)))
    }
  }, [id, dispatch])

  if (currentResource.loading) {
    return <div style={{ padding: '20px' }}>Loading view {id}...</div>
  }

  if (currentResource.error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error loading view {id}: {currentResource.error}
      </div>
    )
  }

  if (!currentResource.data || currentResource.type !== 'view') {
    return <div style={{ padding: '20px' }}>No view loaded</div>
  }

  // Provide read-only context for the view editor
  const contextValue = {
    confirm: async (message: string) => window.confirm(message),
    addCommands: (_commands: ViewEditorCommand[]) => {
      // Read-only: do nothing
    },
    zoom,
    setZoom,
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>View {id}</h2>
      <ViewEditorControlContext.Provider value={contextValue}>
        <ViewEditor view={currentResource.data} />
      </ViewEditorControlContext.Provider>
    </div>
  )
}
