import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadSoundResource } from '../resources/resourcesSlice'
import type { RootState, AppDispatch } from '../../app/store'
import { SoundEditor } from '@agikit/react-editors/dist/SoundEditor'
import type { IBMPCjrSound } from '@agikit/core'
import { resourceCache } from '../../services/resourceCache'

export function SoundViewer() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { currentResource } = useSelector((state: RootState) => state.resources)
  const [soundResource, setSoundResource] = useState<IBMPCjrSound | null>(null)

  useEffect(() => {
    if (id) {
      dispatch(loadSoundResource(Number(id)))
    }
  }, [id, dispatch])

  // Get data from cache when loaded
  useEffect(() => {
    if (currentResource.loaded && currentResource.type === 'sound' && currentResource.id !== null) {
      const data = resourceCache.get('sound', currentResource.id) as IBMPCjrSound
      setSoundResource(data)
    }
  }, [currentResource.loaded, currentResource.type, currentResource.id])

  if (currentResource.loading) {
    return <div style={{ padding: '20px' }}>Loading sound {id}...</div>
  }

  if (currentResource.error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error loading sound {id}: {currentResource.error}
      </div>
    )
  }

  if (!soundResource || currentResource.type !== 'sound') {
    return <div style={{ padding: '20px' }}>No sound loaded</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sound {id}</h2>
      <SoundEditor sound={soundResource} />
    </div>
  )
}
