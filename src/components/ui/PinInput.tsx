import type { RefObject } from 'react';

interface PinInputProps {
  pin: string[];
  updatePin: (index: number, value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  pinRefs: RefObject<Array<HTMLInputElement | null>>;
  disabled?: boolean;
}

export function PinInput({ pin, updatePin, handleKeyDown, pinRefs, disabled = false }: PinInputProps) {
  return (
    <div className="flex justify-center gap-3 mb-5">
      {pin.map((val, i) => (
        <input
          key={i}
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={val}
          disabled={disabled}
          onChange={(e) => updatePin(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          ref={(el) => {
            if (pinRefs.current) {
              pinRefs.current[i] = el;
            }
          }}
          className="w-12 h-12 text-center border-2 border-slate-300 rounded-xl text-xl bg-slate-50 disabled:opacity-50"
        />
      ))}
    </div>
  );
}
