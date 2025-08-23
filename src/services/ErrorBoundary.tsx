import { Component, ReactNode, ErrorInfo } from 'react';
import '../styles/erreur.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Vous pouvez aussi envoyer l'erreur à un service de suivi comme Sentry
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-fallback">
          <h2>Quelque chose s'est mal passé</h2>
          <p>{this.state.error?.toString()}</p>
          <button 
            onClick={this.handleRetry}
            className="btn btn-primary mt-3"
          >
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;