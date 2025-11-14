import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadLogicResource } from '../resources/resourcesSlice'
import type { RootState, AppDispatch } from '../../app/store'
import { resourceCache } from '../../services/resourceCache'
import './LogicViewer.css'

export function LogicViewer() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { currentResource } = useSelector((state: RootState) => state.resources)
  const [logicScript, setLogicScript] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      dispatch(loadLogicResource(Number(id)))
    }
  }, [id, dispatch])

  // Get data from cache when loaded
  useEffect(() => {
    if (currentResource.loaded && currentResource.type === 'logic' && currentResource.id !== null) {
      const data = resourceCache.get('logic', currentResource.id) as string
      setLogicScript(data)
    }
  }, [currentResource.loaded, currentResource.type, currentResource.id])

  if (currentResource.loading) {
    return <div style={{ padding: '20px' }}>Loading logic {id}...</div>
  }

  if (currentResource.error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error loading logic {id}: {currentResource.error}
      </div>
    )
  }

  if (!logicScript || currentResource.type !== 'logic') {
    return <div style={{ padding: '20px' }}>No logic script loaded</div>
  }

  return (
    <div className="logic-viewer">
      <h2>Logic Script {id}</h2>
      <div className="logic-script-container">
        <pre className="logic-script">{logicScript}</pre>
      </div>
    </div>
  )
}
