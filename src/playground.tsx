import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./language-switch";

export default function PlaygroundRulesView() {
  const { t } = useTranslation();
  const rules = t("playground_rules", { returnObjects: true }) as {
    icon: string;
    title: string;
    desc: string;
  }[];

  return (
    <div className="min-h-screen px-4 bg-gradient-to-b from-slate-50 to-slate-200 font-sans text-gray-800">
      <header className="relative w-full h-40 bg-white shadow-2xl flex flex-col justify-center items-center rounded-b-3xl overflow-hidden">
        <img
          src="/header.png"
          alt={t("header_image_alt")}
          className="absolute w-full h-full object-cover opacity-60"
        />
        <div className="absolute top-3 right-4 z-20">
          <LanguageSwitcher />
        </div>
        <h1 className="relative z-10 text-4xl font-extrabold tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          {t("title")}
        </h1>
        <Link
          to="/"
          className="absolute left-4 top-4 text-sm font-semibold text-white bg-black/30 backdrop-blur px-3 py-1 rounded-full hover:bg-black/50 transition"
        >
          ← {t("back")}
        </Link>
      </header>

      <section className="bg-white rounded-3xl shadow-xl p-6 max-w-xl mx-auto my-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-rose-700 mb-1">
            <span className="text-green-600">{t("playground_heading")}</span>
          </h2>
          <p className="text-xl font-semibold text-red-500">
            {t("playground_subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200"
            >
              <div className="text-3xl">{rule.icon}</div>
              <div>
                <h3 className="font-semibold text-slate-800 text-md leading-snug">
                  {rule.title}
                </h3>
                <p className="text-sm text-slate-600 leading-tight">
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
