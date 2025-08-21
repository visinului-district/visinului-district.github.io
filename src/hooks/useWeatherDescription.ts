import { useTranslation } from 'react-i18next';
import { getWeatherDescription } from '../utils/weather';

export function useWeatherDescription(code: number): string {
  const { t } = useTranslation();
  const weatherKey = getWeatherDescription(code);
  return t(`weather.${weatherKey}`, { defaultValue: t('weather.unknown') });
}
