import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type Language = 'es' | 'en'
type Theme = 'light' | 'dark'

interface AppState {
  language: Language
  theme: Theme
  sidebarCollapsed: boolean
}

interface AppContextValue extends AppState {
  setLanguage: (language: Language) => void
  setTheme: (theme: Theme) => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const STORAGE_KEYS = {
  LANGUAGE: 'app-language',
  THEME: 'app-theme',
  SIDEBAR_COLLAPSED: 'app-sidebar-collapsed',
} as const

function getInitialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGE)
  if (stored === 'es' || stored === 'en') {
    return stored
  }
  const browserLang = navigator.language.split('-')[0]
  return browserLang === 'es' ? 'es' : 'en'
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEYS.THEME)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return 'light'
}

function getInitialSidebarCollapsed(): boolean {
  const stored = localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED)
  return stored === 'true'
}

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const { i18n } = useTranslation()

  const [state, setState] = useState<AppState>({
    language: getInitialLanguage(),
    theme: getInitialTheme(),
    sidebarCollapsed: getInitialSidebarCollapsed(),
  })

  const setLanguage = useCallback(
    (language: Language) => {
      setState((prev) => ({ ...prev, language }))
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, language)
      i18n.changeLanguage(language)
    },
    [i18n]
  )

  const setTheme = useCallback((theme: Theme) => {
    setState((prev) => ({ ...prev, theme }))
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
  }, [])

  const toggleSidebar = useCallback(() => {
    setState((prev) => {
      const newCollapsed = !prev.sidebarCollapsed
      localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, String(newCollapsed))
      return { ...prev, sidebarCollapsed: newCollapsed }
    })
  }, [])

  const setSidebarCollapsed = useCallback((collapsed: boolean) => {
    setState((prev) => ({ ...prev, sidebarCollapsed: collapsed }))
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, String(collapsed))
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      setLanguage,
      setTheme,
      toggleSidebar,
      setSidebarCollapsed,
    }),
    [state, setLanguage, setTheme, toggleSidebar, setSidebarCollapsed]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
