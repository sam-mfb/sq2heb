import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { MessagesTable } from '@/features/translations/MessagesTable';
import { ObjectsTable } from '@/features/translations/ObjectsTable';
import { VocabularyTable } from '@/features/translations/VocabularyTable';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1>Translation Review</h1>
          <nav className="tab-navigation">
            <NavLink to="/messages" className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
              Messages
            </NavLink>
            <NavLink to="/objects" className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
              Objects
            </NavLink>
            <NavLink to="/vocabulary" className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
              Vocabulary
            </NavLink>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/messages" replace />} />
            <Route path="/messages" element={<MessagesTable />} />
            <Route path="/objects" element={<ObjectsTable />} />
            <Route path="/vocabulary" element={<VocabularyTable />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
