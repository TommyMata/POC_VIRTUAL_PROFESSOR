import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { ConfigProvider, App as AntApp } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import esES from 'antd/locale/es_ES'
import enUS from 'antd/locale/en_US'
import i18n from '@lib/i18n'
import { useApp, AppProvider } from '@contexts/AppContext'
import { themeConfig } from '@config/theme'

interface AppProvidersProps {
  children: ReactNode
}

function AntDesignProvider({ children }: { children: ReactNode }) {
  const { language } = useApp()

  const locale = language === 'es' ? esES : enUS

  return (
    <ConfigProvider theme={themeConfig} locale={locale}>
      <StyleProvider hashPriority="high">
        <AntApp>{children}</AntApp>
      </StyleProvider>
    </ConfigProvider>
  )
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <AppProvider>
          <AntDesignProvider>{children}</AntDesignProvider>
        </AppProvider>
      </I18nextProvider>
    </BrowserRouter>
  )
}
