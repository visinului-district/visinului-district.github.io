import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../constants";

export function PlaygroundCard() {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-3xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300">
      <Link
        to={ROUTES.PLAYGROUND}
        className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        🛝 <span className="underline">{t("view_playground_rules")}</span>
      </Link>

      <div className="mt-4">
        <img
          src="/qrcode.png"
          alt={t("qrcode_alt")}
          className="mx-auto w-40 h-40"
        />
      </div>
    </section>
  );
}
