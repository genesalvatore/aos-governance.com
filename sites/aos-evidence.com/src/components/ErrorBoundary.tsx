import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('[AOS Evidence] Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback;
            return (
                <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
                    <div className="max-w-md text-center space-y-4">
                        <div className="text-4xl">⚠️</div>
                        <h1 className="font-serif text-2xl font-bold">Something Went Wrong</h1>
                        <p className="text-gray-600 text-sm">
                            An unexpected error occurred. Please try reloading the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="inline-block px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                        >
                            Reload Page
                        </button>
                        <p className="text-xs text-gray-400 mt-4">
                            <a href="/" className="underline hover:text-gray-600 transition-colors">← Back to Evidence Repository</a>
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
