import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ro' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <div
      onClick={toggleLanguage}
      className="flex items-center gap-2 cursor-pointer px-3 py-1 bg-white/80 hover:bg-white rounded-full shadow text-sm font-semibold transition-all"
    >
      {i18n.language === 'en' ? (
        <>
          <span className="text-blue-700">EN</span>
          <span className="opacity-70">🇬🇧</span>
        </>
      ) : (
        <>
          <span className="text-blue-700">RO</span>
          <span className="opacity-70">🇷🇴</span>
        </>
      )}
    </div>
  );
}
