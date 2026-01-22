import { Spin } from 'antd'
import { useTranslation } from 'react-i18next'

interface LoadingProps {
  fullScreen?: boolean
  size?: 'small' | 'default' | 'large'
  tip?: string
}

export function Loading({ fullScreen = false, size = 'large', tip }: LoadingProps) {
  const { t } = useTranslation()

  const loadingTip = tip ?? t('app.loading')

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin size={size} tip={loadingTip}>
          <div className="p-12" />
        </Spin>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      <Spin size={size} tip={loadingTip}>
        <div className="p-12" />
      </Spin>
    </div>
  )
}
