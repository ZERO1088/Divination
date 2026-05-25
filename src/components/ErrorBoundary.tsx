// ============================================================
// ErrorBoundary —— 全局错误边界
// 捕获子组件树中未处理的异常，防止整个页面白屏
// ============================================================

import { Component, type ReactNode, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary] 捕获到未处理异常:', error);
    console.error('[ErrorBoundary] 组件栈:', info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0c0f] px-4">
          <div className="glass-card p-8 max-w-md text-center">
            <h1 className="text-2xl text-amber-200 font-serif mb-4">玄机未显</h1>
            <p className="text-stone-400 mb-6">请稍后再试</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn-primary"
            >
              重新尝试
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
