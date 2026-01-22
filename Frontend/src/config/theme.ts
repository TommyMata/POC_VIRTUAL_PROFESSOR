import type { ThemeConfig } from 'antd'

export const themeConfig: ThemeConfig = {
  cssVar: { key: 'app' },
  token: {
    // Primary colors
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',

    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,

    // Font
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
    fontSize: 14,

    // Spacing
    marginXS: 8,
    marginSM: 12,
    margin: 16,
    marginMD: 20,
    marginLG: 24,
    marginXL: 32,

    // Layout
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
  },
  components: {
    Button: {
      borderRadius: 6,
    },
    Input: {
      borderRadius: 6,
    },
    Select: {
      borderRadius: 6,
    },
    Card: {
      borderRadiusLG: 8,
    },
    Table: {
      borderRadius: 8,
    },
    Modal: {
      borderRadiusLG: 12,
    },
    Menu: {
      itemBorderRadius: 6,
    },
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#ffffff',
      bodyBg: '#f5f5f5',
    },
  },
}
