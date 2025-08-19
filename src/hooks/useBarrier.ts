import { useEffect, useRef, useState } from 'react';
import { API_ENDPOINTS } from '../constants';
import type { StatusType, BarrierStatusCode } from '../types';

export function useBarrier() {
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [deviceOnline, setDeviceOnline] = useState<boolean>(false);
  const [status, setStatus] = useState<BarrierStatusCode | null>(null);
  const [statusType, setStatusType] = useState<StatusType | null>(null);
  const [justOpened, setJustOpened] = useState<boolean>(false);

  const pinRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    fetch(`${API_ENDPOINTS.BARRIER}/device-status`)
      .then(res => res.json())
      .then(data => setDeviceOnline(data.online))
      .catch(() => setDeviceOnline(false));
  }, []);

  const updatePin = (index: number, value: string) => {
    if (value.length > 1) return;

    const updated = [...pin];
    updated[index] = value;
    setPin(updated);

    if (value && index < 3) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const triggerBarrier = async () => {
    const entered = pin.join('');
    if (entered.length !== 4) return;

    setStatus('VERIFYING_PIN');
    setStatusType('info');

    try {
      const response = await fetch(`${API_ENDPOINTS.BARRIER}/open-barrier`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: entered }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('OPENED_SUCCESSFULLY');
        setStatusType('success');
        setJustOpened(true);
        setTimeout(() => {
          setJustOpened(false);
          setStatus(null);
        }, 3000);
        setPin(['', '', '', '']);
        pinRefs.current[0]?.focus();
      } else {
        setStatus('INVALID_OR_EXPIRED_PIN');
        setStatusType('error');
        setPin(['', '', '', '']);
        pinRefs.current[0]?.focus();
      }
    } catch {
      setStatus('NETWORK_ERROR');
      setStatusType('error');
    }
  };

  return {
    pin,
    updatePin,
    handleKeyDown,
    deviceOnline,
    status,
    statusType,
    triggerBarrier,
    isReady: !pin.includes('') && deviceOnline,
    pinRefs,
    justOpened
  };
}
