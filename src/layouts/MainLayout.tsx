import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';

interface MainLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  backTo?: string;
}

export function MainLayout({ children, showBackButton = false, backTo = '/' }: MainLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen px-4 bg-gradient-to-b from-slate-50 to-slate-200 font-sans text-gray-800">
      {/* Header */}
      <header className="relative w-full h-40 bg-white shadow-2xl flex flex-col justify-center items-center rounded-b-3xl overflow-hidden">
        <img
          src="/header.png"
          alt={t("header_image_alt")}
          className="absolute w-full h-full object-cover opacity-60"
        />

        <div className="absolute top-3 right-4 z-20">
          <LanguageSwitcher />
        </div>

        {showBackButton && (
          <Link
            to={backTo}
            className="absolute left-4 top-4 text-sm font-semibold text-white bg-black/30 backdrop-blur px-3 py-1 rounded-full hover:bg-black/50 transition"
          >
            ← {t("back")}
          </Link>
        )}

        <h1 className="relative z-10 text-4xl font-extrabold tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          {t("title")}
        </h1>
      </header>

      <main className="py-8 max-w-xl mx-auto space-y-8 pl-2 pr-2">
        {children}
      </main>
    </div>
  );
}
