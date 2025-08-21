import { WEATHER_CODES } from '../constants';

export function getWeatherEmoji(code: number): string {
  const emojiMap: Record<number, string> = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌧️',
    61: '🌧️',
    63: '🌧️',
    65: '⛈️',
    71: '🌨️',
    73: '❄️',
    75: '☃️',
    80: '🌦️',
    81: '🌧️',
    82: '⛈️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️',
  };
  
  return emojiMap[code] || '❓';
}

export function getWeatherDescription(code: number): string {
  return WEATHER_CODES[code as keyof typeof WEATHER_CODES] || 'unknown';
}

export function formatTemperature(temp: number | null): string {
  if (temp === null) return '--';
  return `${Math.round(temp)}°C`;
}

export function formatWind(wind: number | null): string {
  if (wind === null) return '--';
  return `${Math.round(wind)} km/h`;
}

export function formatHumidity(humidity: number | null): string {
  if (humidity === null) return '--';
  return `${Math.round(humidity)}%`;
}
