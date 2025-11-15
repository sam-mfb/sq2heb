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
    if (confirm('Reset all message translations to original values? This cannot be undone.')) {
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
    return <div className="loading">Loading messages...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!data || !data.messages.length) {
    return <div className="empty">No messages found</div>;
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Messages ({data.messages.length})</h2>
        <div className="header-buttons">
          <button onClick={handleReset} className="reset-button">
            Reset to Defaults
          </button>
          <button onClick={handleExport} className="export-button">
            Export messages.json
          </button>
        </div>
      </div>

      <table className="translations-table">
        <thead>
          <tr>
            <th>Logic File</th>
            <th>Msg #</th>
            <th>Original</th>
            <th>Translation</th>
            <th>Notes</th>
            <th>Placeholders</th>
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
                  placeholder="Enter translation..."
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
                  placeholder="Notes..."
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
