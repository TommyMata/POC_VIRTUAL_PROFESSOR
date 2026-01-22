import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translations
import esCommon from '@locales/es/common.json'
import enCommon from '@locales/en/common.json'

const resources = {
  es: {
    common: esCommon,
  },
  en: {
    common: enCommon,
  },
}

// Get initial language from localStorage or browser
function getInitialLanguage(): string {
  const stored = localStorage.getItem('app-language')
  if (stored === 'es' || stored === 'en') {
    return stored
  }
  const browserLang = navigator.language.split('-')[0]
  return browserLang === 'es' ? 'es' : 'en'
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common'],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
})

export default i18n

export const SUPPORTED_LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]['code']
