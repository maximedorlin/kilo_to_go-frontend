import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/locale/en.json';
import fr from '@/locale/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: 'fr', // ✅ langue de secours si détection échoue
    lng: 'fr', // ✅ langue par défaut à l'initialisation
    detection: {
      order: ['localStorage', 'navigator'], // tu peux aussi mettre juste ['localStorage']
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

  export { i18n };
