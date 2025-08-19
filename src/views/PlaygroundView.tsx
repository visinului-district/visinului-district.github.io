import { useTranslation } from "react-i18next";
import { MainLayout } from "../layouts/MainLayout";
import { ROUTES } from "../constants";
import type { PlaygroundRule } from "../types";

export function PlaygroundView() {
  const { t } = useTranslation();
  const rules = t("playground_rules", { returnObjects: true }) as PlaygroundRule[];

  return (
    <MainLayout showBackButton backTo={ROUTES.HOME}>
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
                <h3 className="font-semibold text-slate-800 mb-1">
                  {rule.title}
                </h3>
                <p className="text-sm text-slate-600">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
