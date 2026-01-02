import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import trTranslations from './locales/tr/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        translation: trTranslations,
      },
    },
    lng: 'tr', // Default language
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
