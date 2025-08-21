import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS, APP_CONFIG } from '../constants';

export function usePinGenerator() {
  const { t } = useTranslation();
  const [adminPin, setAdminPin] = useState(["", "", "", ""]);
  const [generatedPin, setGeneratedPin] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const pinRefs = useRef<Array<HTMLInputElement | null>>([]);

  const updatePin = (index: number, value: string) => {
    if (value.length > 1) return;
    const updated = [...adminPin];
    updated[index] = value;
    setAdminPin(updated);
    if (value && index < 3) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !adminPin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handleGenerate = async () => {
    setError(null);
    setGeneratedPin(null);
    const pin = adminPin.join("");
    if (pin.length !== 4) {
      setError(t("admin_pin_incomplete"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_ENDPOINTS.PIN_GENERATOR}/generate-pin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPin: pin }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.reason || t("error_unknown"));
        setAdminPin(["", "", "", ""]);
        pinRefs.current[0]?.focus();
        return;
      }

      setGeneratedPin(data.pin);
      setAdminPin(["", "", "", ""]);
      pinRefs.current[0]?.focus();
    } catch {
      setError(t("error_network"));
    } finally {
      setLoading(false);
    }
  };

  const copyPin = () => {
    if (generatedPin) {
      navigator.clipboard.writeText(generatedPin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyGuestLink = () => {
    navigator.clipboard.writeText(APP_CONFIG.GUEST_URL);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return {
    adminPin,
    generatedPin,
    error,
    copied,
    linkCopied,
    loading,
    pinRefs,
    updatePin,
    handleKeyDown,
    handleGenerate,
    copyPin,
    copyGuestLink,
    isReady: adminPin.every(digit => digit !== "")
  };
}
