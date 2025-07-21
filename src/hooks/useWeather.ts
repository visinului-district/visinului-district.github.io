import { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number | null;
  wind: number | null;
  humidity: number | null;
  loading: boolean;
  error: boolean;
  weatherCode: number | null;
}

export function useWeather(latitude = 44.615, longitude = 25.980): WeatherData {
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [wind, setWind] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m&timezone=auto`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const currentHour = new Date(data.current_weather.time).getHours();
        const humidityIndex = data.hourly.time.findIndex((t: string) =>
          new Date(t).getHours() === currentHour
        );

        setTemperature(data.current_weather.temperature);
        setWind(data.current_weather.windspeed);
        setHumidity(data.hourly.relative_humidity_2m[humidityIndex]);
        setWeatherCode(data.current_weather.weathercode);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [latitude, longitude]);

  return { temperature, wind, humidity, loading, error, weatherCode };
}

export function getWeatherDescriptionRo(code: number): string {
  const descriptions: Record<number, string> = {
    0: 'Cer senin',
    1: 'Mai mult senin',
    2: 'Parțial noros',
    3: 'Înnorat',
    45: 'Ceață',
    48: 'Ceață cu depunere',
    51: 'Burniță ușoară',
    53: 'Burniță moderată',
    55: 'Burniță densă',
    61: 'Ploaie slabă',
    63: 'Ploaie moderată',
    65: 'Ploaie abundentă',
    80: 'Averse ușoare',
    81: 'Averse moderate',
    82: 'Averse abundente',
    // Extend with more if needed
  };

  return descriptions[code] ?? 'Condiții necunoscute';
}

export function getWeatherEmoji(code: number): string {
  if ([0, 1].includes(code)) return '☀️'; // clear
  if ([2, 3].includes(code)) return '⛅'; // partly cloudy
  if ([45, 48].includes(code)) return '🌫️'; // fog
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️'; // rain
  if ([71, 73, 75, 85, 86].includes(code)) return '❄️'; // snow
  if ([95, 96, 99].includes(code)) return '⛈️'; // thunder
  return '❓';
}