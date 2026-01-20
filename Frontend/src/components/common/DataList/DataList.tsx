import { List, Card, Empty } from 'antd'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface DataListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  loading?: boolean
  emptyText?: string
  grid?: {
    gutter?: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    xxl?: number
  }
  bordered?: boolean
}

export function DataList<T>({
  items,
  renderItem,
  loading = false,
  emptyText,
  grid = { gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 },
  bordered = false,
}: DataListProps<T>) {
  const { t } = useTranslation()

  if (!loading && items.length === 0) {
    return (
      <Card bordered={bordered}>
        <Empty description={emptyText || t('common.noData')} />
      </Card>
    )
  }

  return (
    <List
      grid={grid}
      dataSource={items}
      loading={loading}
      renderItem={(item, index) => <List.Item>{renderItem(item, index)}</List.Item>}
    />
  )
}
