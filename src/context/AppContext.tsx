// ============================================================
// 全局应用 Context —— 极简设计
// 仅负责透传跨页面共享的非控制类数据（question、isLoading）
// 严禁在此维护 mode 状态（mode 由 URL 路由唯一决定）
// ============================================================

import { createContext, useContext, useState, type ReactNode } from 'react';

interface AppContextType {
  question: string;
  setQuestion: (q: string) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }): ReactNode {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider value={{ question, setQuestion, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within <AppProvider>');
  }
  return ctx;
}
