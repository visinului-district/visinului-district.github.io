import { useEffect, useRef, useState } from 'react';

const BLYNK_TOKEN = 'YP2ihYjktFqA70ocVXo2XVyqpCJUoJK4';

export function useBarrier() {
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [deviceOnline, setDeviceOnline] = useState<boolean>(false);
  const [validHash, setValidHash] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [statusType, setStatusType] = useState<'info' | 'success' | 'error'>('info');
  const [justOpened, setJustOpened] = useState<boolean>(false);

  const pinRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    fetch(`https://blynk.cloud/external/api/isHardwareConnected?token=${BLYNK_TOKEN}`)
      .then(res => res.text())
      .then(status => setDeviceOnline(status === 'true'));

    fetch(`https://blynk.cloud/external/api/get?token=${BLYNK_TOKEN}&pin=V10`)
      .then(res => res.text())
      .then(hash => setValidHash(hash.trim()));
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

  const hashPIN = async (pin: string) => {
    const data = new TextEncoder().encode(pin);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const triggerBarrier = async () => {
    const entered = pin.join('');
    if (!validHash) return;

    const hashed = await hashPIN(entered);
    if (hashed === validHash) {
      setStatus('Deschidere barieră...');
      setStatusType('info');

      fetch(`https://blynk.cloud/external/api/update?token=${BLYNK_TOKEN}&pin=V0&value=1`)
        .then(() => {
          setStatus('✅ Barieră deschisă');
          setStatusType('success');
          setJustOpened(true);
          setTimeout(() => { setJustOpened(false); setStatus(''); }, 3000);
          setPin(['', '', '', '']);
          pinRefs.current[0]?.focus();
        })
        .catch(() => {
          setStatus('Eroare la trimiterea cererii');
          setStatusType('error');
        });
    } else {
      setStatus('PIN greșit');
      setStatusType('error');
      setPin(['', '', '', '']);
      pinRefs.current[0]?.focus();
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
    isReady: !pin.includes('') && validHash !== null && deviceOnline,
    pinRefs,
    justOpened
  };
}
