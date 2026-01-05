import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props { children?: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("BubblePop Crash:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ background: '#1a1a1b', color: '#ff9a9e' }}>
          <div className="container_inner">
            <h1>POP!</h1>
            <h2>The system took a hit. Refresh to re-deploy.</h2>
            <button onClick={() => window.location.reload()} style={{color: 'white', border: '1px solid white', padding: '10px 20px', borderRadius: '20px', marginTop: '20px', cursor: 'pointer', background: 'transparent'}}>
               REBOOT SYSTEM
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;