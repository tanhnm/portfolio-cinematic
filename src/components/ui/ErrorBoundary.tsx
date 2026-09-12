import { Component, type ReactNode, type ErrorInfo } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Portfolio view failed", error, info.componentStack);
  }
  render() {
    if (this.state.failed)
      return (
        <section className="error-state" role="alert">
          <p className="eyebrow">Something interrupted this view</p>
          <h2>Let’s get you back.</h2>
          <p>
            The content couldn’t load. Check your connection, then reload to try
            again.
          </p>
          <button
            className="primary-link"
            onClick={() => window.location.reload()}
          >
            Reload page ↻
          </button>
          <a href="mailto:hnmtan03@gmail.com">
            You can still reach me by email ↗
          </a>
        </section>
      );
    return this.props.children;
  }
}
