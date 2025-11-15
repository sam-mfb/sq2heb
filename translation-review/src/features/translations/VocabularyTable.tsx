import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadVocabulary, updateVocabularyTranslatedSynonyms, updateVocabularyNotes, resetVocabulary } from './translationsSlice';
import type { TranslationVocabulary } from '@/types/translations';
import './VocabularyTable.css';

export function VocabularyTable() {
  const dispatch = useAppDispatch();
  const { data, loading, loaded, error } = useAppSelector((state) => state.translations.vocabulary);

  useEffect(() => {
    if (!loaded && !loading) {
      dispatch(loadVocabulary());
    }
  }, [loaded, loading, dispatch]);

  const handleReset = () => {
    if (confirm('לאפס את כל תרגומי אוצר המילים לערכים המקוריים? לא ניתן לבטל פעולה זו.')) {
      dispatch(resetVocabulary());
      // Reload fresh data from server
      dispatch(loadVocabulary());
    }
  };

  const handleExport = () => {
    if (!data) return;

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vocabulary.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSynonymsChange = (wordNumber: number, value: string) => {
    // Parse comma-separated input into array
    const synonyms = value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    dispatch(
      updateVocabularyTranslatedSynonyms({
        wordNumber,
        translatedSynonyms: synonyms,
      })
    );
  };

  if (loading) {
    return <div className="loading">טוען אוצר מילים...</div>;
  }

  if (error) {
    return <div className="error">שגיאה: {error}</div>;
  }

  if (!data || !data.vocabulary.length) {
    return <div className="empty">לא נמצא אוצר מילים</div>;
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>אוצר מילים ({data.vocabulary.length} קבוצות מילים)</h2>
        <div className="header-buttons">
          <button onClick={handleReset} className="reset-button">
            איפוס לברירת מחדל
          </button>
          <button onClick={handleExport} className="export-button">
            ייצוא vocabulary.json
          </button>
        </div>
      </div>

      <table className="translations-table">
        <thead>
          <tr>
            <th>מס׳ מילה</th>
            <th>מילה</th>
            <th>מילים נרדפות מקוריות</th>
            <th>מילים נרדפות מתורגמות</th>
            <th>הערות</th>
          </tr>
        </thead>
        <tbody>
          {data.vocabulary.map((vocab: TranslationVocabulary) => (
            <tr key={vocab.wordNumber}>
              <td className="word-number">{vocab.wordNumber}</td>
              <td className="word">{vocab.word}</td>
              <td className="original-synonyms">
                {vocab.originalSynonyms.length > 0 ? (
                  <div className="synonym-list">
                    {vocab.originalSynonyms.map((syn: string, idx: number) => (
                      <span key={idx} className="synonym-badge">
                        {syn}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="no-synonyms">—</span>
                )}
              </td>
              <td className="translated-synonyms">
                <input
                  type="text"
                  value={vocab.translatedSynonyms.join(', ')}
                  onChange={(e) => handleSynonymsChange(vocab.wordNumber, e.target.value)}
                  placeholder="מילים נרדפות מופרדות בפסיקים..."
                />
              </td>
              <td className="notes">
                <input
                  type="text"
                  value={vocab.notes}
                  onChange={(e) =>
                    dispatch(
                      updateVocabularyNotes({
                        wordNumber: vocab.wordNumber,
                        notes: e.target.value,
                      })
                    )
                  }
                  placeholder="הערות..."
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
