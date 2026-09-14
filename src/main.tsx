import React, { Component, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent uncaught error crashes in restricted iframe environments
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (!event.reason) {
      event.preventDefault();
    }
  });

  window.addEventListener('error', (event) => {
    if (!event.message || event.message === 'Script error.') {
      event.preventDefault();
    }
  });
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Captured by ErrorBoundary:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F7F4E9] flex items-center justify-center p-6 text-[#093624]">
          <div className="max-w-md w-full bg-white p-6 rounded-xl border border-[#093624]/20 shadow-lg text-center">
            <h2 className="font-display font-bold text-2xl mb-2">Something went wrong</h2>
            <p className="text-sm text-[#6F7A6E] mb-4 font-sans">
              {this.state.error?.message || 'An unexpected error occurred. Please refresh to continue.'}
            </p>
            {this.state.error?.stack && (
              <pre className="text-left text-xs bg-[#F7F4E9] p-3 rounded overflow-x-auto text-red-600 mb-4 max-h-40">
                {this.state.error.stack}
              </pre>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-[#093624] text-[#F7F4E9] rounded-lg text-sm font-semibold cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
