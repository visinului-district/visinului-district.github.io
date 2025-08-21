import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS, DEFAULT_COORDINATES } from '../constants';
import type { WeatherData } from '../types';

export function useWeather(
  latitude = DEFAULT_COORDINATES.LATITUDE, 
  longitude = DEFAULT_COORDINATES.LONGITUDE
): WeatherData {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: null,
    wind: null,
    humidity: null,
    weatherCode: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const url = `${API_ENDPOINTS.WEATHER}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m&timezone=auto`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const currentHour = new Date(data.current_weather.time).getHours();
        const humidityIndex = data.hourly.time.findIndex((t: string) =>
          new Date(t).getHours() === currentHour
        );

        setWeatherData({
          temperature: data.current_weather.temperature,
          wind: data.current_weather.windspeed,
          humidity: data.hourly.relative_humidity_2m[humidityIndex],
          weatherCode: data.current_weather.weathercode,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        setWeatherData(prev => ({
          ...prev,
          loading: false,
          error: true,
        }));
      });
  }, [latitude, longitude]);

  return weatherData;
}

export function useWeatherDescription(code: number): string {
  const { t } = useTranslation();
  return t(`weather.${code}`, { defaultValue: t("weather.unknown") });
}