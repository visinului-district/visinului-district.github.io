import { useTranslation } from 'react-i18next';
import { getWeatherEmoji, formatTemperature, formatWind, formatHumidity } from '../../utils/weather';
import { useWeatherDescription } from '../../hooks/useWeatherDescription';
import type { WeatherData } from '../../types';

export function WeatherCard({ temperature, wind, humidity, weatherCode, loading, error }: WeatherData) {
  const { t } = useTranslation();
  const weatherDescription = useWeatherDescription(weatherCode ?? 0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-white to-sky-50 rounded-3xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
      <div className="absolute right-4 top-4 text-5xl text-blue-400/20">
        {getWeatherEmoji(weatherCode ?? 0)}
      </div>
      <h2 className="text-2xl font-semibold mb-1 text-slate-700">
        🌤️ {t("current_weather")}
      </h2>
      <div className="text-sm text-slate-600 mb-4">
        {t("location_name")}
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">{t("loading")}</div>
      ) : error ? (
        <div className="text-sm text-red-500">{t("weather_error", "Unable to load weather data")}</div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="text-4xl font-bold text-blue-500">
              {formatTemperature(temperature)}
            </div>
            <div className="text-md text-slate-600">
              {weatherDescription}
            </div>
          </div>
          <div className="text-right text-sm text-slate-500">
            <div>
              {t("wind_label")}: {formatWind(wind)}
            </div>
            <div>
              {t("humidity_label")}: {formatHumidity(humidity)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
