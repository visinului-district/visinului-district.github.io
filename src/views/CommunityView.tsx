import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MainLayout } from "../layouts/MainLayout";
import { BarrierCard, WeatherCard, ContactsCard } from "../components";
import { useWeather, useBarrier } from "../hooks";
import { ROUTES } from "../constants";

export function CommunityView() {
  const { t } = useTranslation();
  const weatherData = useWeather();
  const barrierData = useBarrier();

  return (
    <MainLayout>
      <BarrierCard {...barrierData} />

      <div className="text-center">
        <Link
          to={ROUTES.PIN_GENERATOR}
          className="inline-block text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          🔧 {t("generate_pin_link")} →
        </Link>
      </div>

      <WeatherCard {...weatherData} />

      <ContactsCard />

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
    </MainLayout>
  );
}
