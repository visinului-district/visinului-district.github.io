import { useTranslation } from 'react-i18next';

interface DeviceStatusProps {
  isOnline: boolean;
}

export function DeviceStatus({ isOnline }: DeviceStatusProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-4 text-sm font-semibold text-center">
      <span className={isOnline ? "text-green-600" : "text-red-500"}>
        {isOnline ? t("device_online") : t("device_offline")}
      </span>
    </div>
  );
}
