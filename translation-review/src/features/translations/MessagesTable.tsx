import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadMessages, updateMessageTranslation, updateMessageNotes, resetMessages } from './translationsSlice';
import type { TranslationMessage } from '@/types/translations';
import './MessagesTable.css';

export function MessagesTable() {
  const dispatch = useAppDispatch();
  const { data, loading, loaded, error } = useAppSelector((state) => state.translations.messages);

  useEffect(() => {
    if (!loaded && !loading) {
      dispatch(loadMessages());
    }
  }, [loaded, loading, dispatch]);

  const handleReset = () => {
    if (confirm('לאפס את כל תרגומי ההודעות לערכים המקוריים? לא ניתן לבטל פעולה זו.')) {
      dispatch(resetMessages());
      // Reload fresh data from server
      dispatch(loadMessages());
    }
  };

  const handleExport = () => {
    if (!data) return;

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'messages.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="loading">טוען הודעות...</div>;
  }

  if (error) {
    return <div className="error">שגיאה: {error}</div>;
  }

  if (!data || !data.messages.length) {
    return <div className="empty">לא נמצאו הודעות</div>;
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>הודעות ({data.messages.length})</h2>
        <div className="header-buttons">
          <button onClick={handleReset} className="reset-button">
            איפוס לברירת מחדל
          </button>
          <button onClick={handleExport} className="export-button">
            ייצוא messages.json
          </button>
        </div>
      </div>

      <table className="translations-table">
        <thead>
          <tr>
            <th>קובץ לוגיקה</th>
            <th>מס׳ הודעה</th>
            <th>מקור</th>
            <th>תרגום</th>
            <th>הערות</th>
            <th>משתנים</th>
          </tr>
        </thead>
        <tbody>
          {data.messages.map((message: TranslationMessage) => (
            <tr key={`${message.logicFile}-${message.messageNumber}`}>
              <td className="logic-file">{message.logicFile}</td>
              <td className="message-number">{message.messageNumber}</td>
              <td className="original">{message.original}</td>
              <td className="translation">
                <input
                  type="text"
                  value={message.translation}
                  onChange={(e) =>
                    dispatch(
                      updateMessageTranslation({
                        logicFile: message.logicFile,
                        messageNumber: message.messageNumber,
                        translation: e.target.value,
                      })
                    )
                  }
                  placeholder="הזן תרגום..."
                />
              </td>
              <td className="notes">
                <input
                  type="text"
                  value={message.notes}
                  onChange={(e) =>
                    dispatch(
                      updateMessageNotes({
                        logicFile: message.logicFile,
                        messageNumber: message.messageNumber,
                        notes: e.target.value,
                      })
                    )
                  }
                  placeholder="הערות..."
                />
              </td>
              <td className="placeholders">
                {message.placeholders.length > 0 ? (
                  <div className="placeholder-badges">
                    {message.placeholders.map((placeholder: string) => (
                      <span key={placeholder} className="badge">
                        {placeholder}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="no-placeholders">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
