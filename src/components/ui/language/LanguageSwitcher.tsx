'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { i18n } from '@/lib/i18n'; // ✅ importer l'instance i18next

const LANGUAGES = [
  { code: 'fr', label: 'FR', flag: '/fr.svg' },
  { code: 'en', label: 'EN', flag: '/sh.svg' },
];

export default function LanguageSwitcher() {
  const { i18n: i18nextInstance } = useTranslation(); // ← reste pour setLanguage
  const [language, setLanguage] = useState(i18n.language); // ← depuis instance réelle

  useEffect(() => {
    const handleLanguageChange = (lng: string) => setLanguage(lng);
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 bg-white/20 px-2 py-1 rounded cursor-pointer">
      <Image
        src={language === 'fr' ? '/fr.svg' : '/sh.svg'}
        alt="Flag"
        width={20}
        height={14}
      />
      <select
        value={language}
        onChange={(e) => i18nextInstance.changeLanguage(e.target.value)}
        className="bg-transparent text-white text-sm focus:outline-none"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="text-black">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
