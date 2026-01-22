import { Typography } from 'antd'
import type { ReactNode } from 'react'

const { Title, Text } = Typography

interface PageHeaderProps {
  title: string
  description?: string
  extra?: ReactNode
}

export function PageHeader({ title, description, extra }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <Title level={2} className="!mb-1">
          {title}
        </Title>
        {description && <Text type="secondary">{description}</Text>}
      </div>
      {extra && <div className="flex items-center gap-2">{extra}</div>}
    </div>
  )
}
