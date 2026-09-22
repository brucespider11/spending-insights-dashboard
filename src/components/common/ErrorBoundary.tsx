import { Component, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

// Class component required — React error boundaries cannot be written as function components
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    return (
      <div className="min-h-screen bg-slate-100 dark:bg-[#0F0E1A] flex items-center justify-center p-6">
        <div className="card max-w-md w-full p-8 flex flex-col items-center gap-5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-500/15 flex items-center justify-center">
            <AlertTriangle size={22} className="text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Something went wrong
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              An unexpected error occurred. You can try recovering below.
            </p>
          </div>
          <details className="w-full text-left">
            <summary className="text-xs text-gray-400 dark:text-gray-600 cursor-pointer hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
              Error details
            </summary>
            <pre className="mt-2 text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 rounded-xl p-3 overflow-auto whitespace-pre-wrap break-words">
              {error.message}
            </pre>
          </details>
          <button
            onClick={this.reset}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors">
            Try again
          </button>
        </div>
      </div>
    )
  }
}
