// ============================================================
// App 根组件 —— ErrorBoundary + AppProvider + BrowserRouter + Routes
// ============================================================

import { type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ModeSelector } from './components/ModeSelector';
import IChingPage from './components/IChing/IChingPage';
import TarotPage from './components/Tarot/TarotPage';

function AppRoutes(): ReactNode {
  return (
    <div className="min-h-screen flex flex-col">
      <ModeSelector />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/iching" replace />} />
          <Route path="/iching" element={<IChingPage />} />
          <Route path="/tarot" element={<TarotPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App(): ReactNode {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
