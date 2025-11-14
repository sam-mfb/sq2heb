import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loadFileTree } from '../resources/resourcesSlice'
import './ResourceBrowser.css'

export function ResourceBrowser() {
  const dispatch = useAppDispatch()
  const { fileTree } = useAppSelector((state) => state.resources)

  useEffect(() => {
    if (!fileTree.loaded) {
      dispatch(loadFileTree())
    }
  }, [dispatch, fileTree.loaded])

  if (!fileTree.loaded) {
    return <div className="resource-browser-loading">Loading resources...</div>
  }

  return (
    <div className="resource-browser">
      <div className="resource-group">
        <h3>📷 Pictures ({fileTree.pics.length})</h3>
        <ul>
          {fileTree.pics.map((id) => (
            <li key={id}>
              <Link to={`/pic/${id}`}>{id}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="resource-group">
        <h3>🎨 Views ({fileTree.views.length})</h3>
        <ul>
          {fileTree.views.map((id) => (
            <li key={id}>
              <Link to={`/view/${id}`}>{id}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="resource-group">
        <h3>🔊 Sounds ({fileTree.sounds.length})</h3>
        <ul>
          {fileTree.sounds.map((id) => (
            <li key={id}>
              <Link to={`/sound/${id}`}>{id}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="resource-group">
        <h3>📜 Logic ({fileTree.logics.length})</h3>
        <ul>
          {fileTree.logics.map((id) => (
            <li key={id}>
              <Link to={`/logic/${id}`}>{id}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
