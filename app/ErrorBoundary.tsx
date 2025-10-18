'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: (error: Error) => ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErroBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError && this.state.error) {
            if (this.props.fallback) {
                return this.props.fallback(this.state.error);
            }
            return (
                <h2 className="text-[var(--error-text) text-2xl]">
                    ⚠️ Something went wrong.
                </h2>
            );
        }

        return this.props.children;
    }
}

export default ErroBoundary;