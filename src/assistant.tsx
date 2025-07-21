// File: src/components/Assistant.tsx

import { useEffect, useState } from 'react';
import { BLYNK_TOKEN } from './hooks/useBarrier';

const COOLDOWN_MS = 60000; // 1 minute cooldown

export default function Assistant() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'cooldown'>('idle');

  useEffect(() => {
    const lastOpened = Number(localStorage.getItem('barrierLastOpened') || '0');
    const now = Date.now();

    if (now - lastOpened < COOLDOWN_MS) {
      setStatus('cooldown');
      return;
    }

    localStorage.setItem('barrierLastOpened', now.toString());
    setStatus('idle');

    fetch(`https://blynk.cloud/external/api/update?token=${BLYNK_TOKEN}&pin=V0&value=1`)
      .then((res) => {
        if (res.ok) {
          setStatus('success');
          setTimeout(() => {
            window.close();
          }, 3000);
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100 text-xl text-center px-4">
      {status === 'idle' && <p>Se trimite comanda către barieră...</p>}
      {status === 'success' && <p>✅ Bariera a fost deschisă</p>}
      {status === 'error' && <p>❌ Eroare la deschidere. Încearcă din nou.</p>}
      {status === 'cooldown' && <p>⏱️ Așteaptă un minut înainte de a trimite din nou.</p>}
    </div>
  );
}
