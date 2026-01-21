import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, Button, theme } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, DashboardOutlined, PlusOutlined, BookOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@components/common/LanguageSwitcher'
import { ErrorBoundary } from '@components/common/ErrorBoundary'
import { ROUTES } from '@config/routes'
import { env } from '@config/env'

const { Header, Sider, Content } = Layout

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const menuItems: MenuProps['items'] = [
    {
      key: ROUTES.COURSES,
      icon: <BookOutlined />,
      label: t('navigation.courses'),
    },
    {
      key: ROUTES.COURSE,
      icon: <PlusOutlined />,
      label: t('navigation.createCourse'),
    },
    {
      key: ROUTES.DASHBOARD,
      icon: <DashboardOutlined />,
      label: t('navigation.dashboard'),
    },
  ]

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  const selectedKeys = [location.pathname]

  return (
    <Layout className="min-h-screen flex flex-col">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        className="border-r border-neutral-200"
      >
        <div className="flex h-16 items-center justify-center border-b border-neutral-200">
          <span className="text-lg font-semibold text-primary-600">
            {collapsed ? 'VP' : env.APP_NAME}
          </span>
        </div>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none"
        />
      </Sider>
      <Layout className="flex-1 flex flex-col">
        <Header
          className="flex items-center justify-between border-b border-neutral-200 px-4 flex-shrink-0"
          style={{ background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </Header>
        <Content
          className="flex-1 flex flex-col m-4 p-6 overflow-y-auto"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  )
}
