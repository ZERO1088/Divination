// ============================================================
// App 根组件 —— ErrorBoundary + AppProvider + BrowserRouter + Routes
// 路由: / → LandingPage | /iching → IChingPage | /tarot → TarotPage
// ============================================================

import { type ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ModeSelector } from './components/ModeSelector';
import LandingPage from './components/Landing/LandingPage';
import IChingPage from './components/IChing/IChingPage';
import TarotPage from './components/Tarot/TarotPage';

function AppRoutes(): ReactNode {
  return (
    <div className="min-h-screen flex flex-col bg-brand-void">
      <ModeSelector />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
