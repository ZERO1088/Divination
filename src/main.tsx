// ============================================================
// 应用入口 —— StrictMode 包裹
// BrowserRouter 由 App.tsx 内部管理
// ============================================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
