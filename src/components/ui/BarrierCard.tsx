import { useTranslation } from 'react-i18next';
import { PinInput } from './PinInput';
import { DeviceStatus } from './DeviceStatus';
import { getBarrierStatusMessage } from '../../utils';
import type { BarrierState } from '../../types';
import type { RefObject } from 'react';

interface BarrierCardProps extends BarrierState {
  updatePin: (index: number, value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  triggerBarrier: () => void;
  pinRefs: RefObject<Array<HTMLInputElement | null>>;
}

export function BarrierCard({
  pin,
  deviceOnline,
  status,
  statusType,
  isReady,
  justOpened,
  updatePin,
  handleKeyDown,
  triggerBarrier,
  pinRefs,
}: BarrierCardProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-3xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold mb-2 text-slate-700">
        🔓 {t("barrier_access")}
      </h2>

      <DeviceStatus isOnline={deviceOnline} />

      <PinInput
        pin={pin}
        updatePin={updatePin}
        handleKeyDown={handleKeyDown}
        pinRefs={pinRefs}
      />

      <button
        onClick={triggerBarrier}
        disabled={!isReady}
        className={`w-full py-3 rounded-full font-bold text-lg shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-40 ${
          justOpened
            ? "bg-green-500 text-white"
            : "bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500"
        }`}
      >
        {t("open_button")}
      </button>

      {status && (
        <p
          className={`mt-3 text-sm text-center ${
            statusType === "error"
              ? "text-red-500"
              : statusType === "success"
              ? "text-green-600"
              : "text-slate-500"
          }`}
        >
          {t(getBarrierStatusMessage(status))}
        </p>
      )}
    </section>
  );
}
