import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadObjects, updateObjectTranslation, updateObjectNotes } from './translationsSlice';
import type { TranslationObject } from '@/types/translations';
import './ObjectsTable.css';

export function ObjectsTable() {
  const dispatch = useAppDispatch();
  const { data, loading, loaded, error } = useAppSelector((state) => state.translations.objects);

  useEffect(() => {
    if (!loaded && !loading) {
      dispatch(loadObjects());
    }
  }, [loaded, loading, dispatch]);

  const handleExport = () => {
    if (!data) return;

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'objects.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="loading">Loading objects...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!data || !data.objects.length) {
    return <div className="empty">No objects found</div>;
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Objects ({data.objects.length})</h2>
        <button onClick={handleExport} className="export-button">
          Export objects.json
        </button>
      </div>

      <table className="translations-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Original</th>
            <th>Translation</th>
            <th>Starting Room</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {data.objects.map((object: TranslationObject) => (
            <tr key={object.index}>
              <td className="object-index">{object.index}</td>
              <td className="original">{object.original}</td>
              <td className="translation">
                <input
                  type="text"
                  value={object.translation}
                  onChange={(e) =>
                    dispatch(
                      updateObjectTranslation({
                        index: object.index,
                        translation: e.target.value,
                      })
                    )
                  }
                  placeholder="Enter translation..."
                />
              </td>
              <td className="starting-room">{object.startingRoom}</td>
              <td className="notes">
                <input
                  type="text"
                  value={object.notes}
                  onChange={(e) =>
                    dispatch(
                      updateObjectNotes({
                        index: object.index,
                        notes: e.target.value,
                      })
                    )
                  }
                  placeholder="Notes..."
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
