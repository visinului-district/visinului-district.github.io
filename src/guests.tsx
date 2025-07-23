import "./index.css";
import { useBarrier } from "./hooks/useBarrier";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./language-switch";

function GuestsView() {
  const { t } = useTranslation();
  const {
    pin,
    updatePin,
    deviceOnline,
    status,
    statusType,
    triggerBarrier,
    isReady,
    pinRefs,
    handleKeyDown,
    justOpened,
  } = useBarrier();

  return (
    <div className="min-h-screen px-4 bg-gradient-to-b from-slate-50 to-slate-200 font-sans text-gray-800">
      {/* Header */}
      <header className="relative w-full h-40 bg-white shadow-2xl flex flex-col justify-center items-center rounded-b-3xl overflow-hidden">
        <img
          src="header.png"
          alt={t("header_image_alt")}
          className="absolute w-full h-full object-cover opacity-60"
        />
        <div className="absolute top-3 right-4 z-20">
          <LanguageSwitcher />
        </div>
        <h1 className="relative z-10 text-4xl font-extrabold tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          {t("title")}
        </h1>
      </header>

      {/* Main content area */}
      <main className="py-8 max-w-xl mx-auto space-y-8 pl-2 pr-2">
        {/* Barrier Card */}
        <section className="bg-white rounded-3xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-2 text-slate-700">
            🔓 {t("barrier_access")}
          </h2>

          <div className="mb-4 text-sm font-semibold text-center">
            <span className={deviceOnline ? "text-green-600" : "text-red-500"}>
              {deviceOnline ? t("device_online") : t("device_offline")}
            </span>
          </div>

          <div className="flex justify-center gap-3 mb-5">
            {pin.map((val, i) => (
              <input
                key={i}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={val}
                onChange={(e) => updatePin(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => {
                  pinRefs.current[i] = el;
                }}
                className="w-12 h-12 text-center border-2 border-slate-300 rounded-xl text-xl bg-slate-50"
              />
            ))}
          </div>

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

          {status && statusType !== "info" && (
            <p
              className={`mt-3 text-sm text-center ${
                statusType === "error"
                  ? "text-red-500"
                  : statusType === "success"
                  ? "text-green-600"
                  : "text-slate-500"
              }`}
            >
              {status}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default GuestsView;
