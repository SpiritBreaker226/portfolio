import { Component, ErrorInfo, ReactNode } from 'react'

export type ErrorBoundaryProps = {
  children: ReactNode
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    return this.props.children
  }
}
