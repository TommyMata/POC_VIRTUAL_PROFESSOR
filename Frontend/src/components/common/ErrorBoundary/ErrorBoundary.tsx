import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Button, Result } from 'antd'
import { withTranslation, type WithTranslation } from 'react-i18next'

interface ErrorBoundaryProps extends WithTranslation {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): ReactNode {
    const { t } = this.props

    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-screen items-center justify-center">
          <Result
            status="error"
            title={t('errors.somethingWrong')}
            subTitle={this.state.error?.message || t('errors.generic')}
            extra={[
              <Button type="primary" key="retry" onClick={this.handleReset}>
                {t('common.tryAgain')}
              </Button>,
              <Button key="home" onClick={() => (window.location.href = '/')}>
                {t('common.goHome')}
              </Button>,
            ]}
          />
        </div>
      )
    }

    return this.props.children
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryClass)
