export const API_ENDPOINTS = {
  WEATHER: 'https://api.open-meteo.com/v1/forecast',
  BARRIER: 'https://pin-api.visinului.workers.dev',
  PIN_GENERATOR: 'https://pin-api.visinului.workers.dev',
} as const;

export const ROUTES = {
  HOME: '/',
  PLAYGROUND: '/playground',
  GUESTS: '/guests',
  PIN_GENERATOR: '/pin-generator',
} as const;

export const WEATHER_CODES = {
  0: 'clear_sky',
  1: 'mainly_clear',
  2: 'partly_cloudy',
  3: 'overcast',
  45: 'fog',
  48: 'depositing_rime_fog',
  51: 'light_drizzle',
  53: 'moderate_drizzle',
  55: 'dense_drizzle',
  61: 'slight_rain',
  63: 'moderate_rain',
  65: 'heavy_rain',
  71: 'slight_snow',
  73: 'moderate_snow',
  75: 'heavy_snow',
  80: 'slight_rain_showers',
  81: 'moderate_rain_showers',
  82: 'violent_rain_showers',
  95: 'thunderstorm',
  96: 'thunderstorm_with_hail',
  99: 'heavy_thunderstorm_with_hail',
} as const;

export const DEFAULT_COORDINATES = {
  LATITUDE: 44.4267674,
  LONGITUDE: 26.1025384,
} as const;

export const APP_CONFIG = {
  GUEST_URL: 'https://visinului-district.github.io/guests',
} as const;
