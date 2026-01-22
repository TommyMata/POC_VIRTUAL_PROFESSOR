import { Dropdown, Button } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useApp } from '@contexts/AppContext'
import { SUPPORTED_LANGUAGES } from '@lib/i18n'

export function LanguageSwitcher() {
  const { language, setLanguage } = useApp()

  const currentLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.code === language)

  const items: MenuProps['items'] = SUPPORTED_LANGUAGES.map((lang) => ({
    key: lang.code,
    label: (
      <span className="flex items-center gap-2">
        <span>{lang.flag}</span>
        <span>{lang.name}</span>
      </span>
    ),
  }))

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    setLanguage(key as 'es' | 'en')
  }

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick, selectedKeys: [language] }}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button type="text" icon={<GlobalOutlined />}>
        <span className="ml-1">{currentLanguage?.flag}</span>
      </Button>
    </Dropdown>
  )
}
