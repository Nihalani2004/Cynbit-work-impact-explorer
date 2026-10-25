import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('Explorer rendering failed', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main id="main-content" className="not-found page-width" tabIndex={-1}>
          <h1>We could not display this view.</h1>
          <p>Please reload the page. If the problem continues, use the main explorer link.</p>
          <a className="button button--primary" href="/case-studies">Open the explorer</a>
        </main>
      )
    }
    return this.props.children
  }
}
