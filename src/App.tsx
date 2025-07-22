// File: src/App.tsx

import "./index.css";
import {
  useWeather,
  getWeatherDescriptionRo,
  getWeatherEmoji,
} from "./hooks/useWeather";
import { useBarrier } from "./hooks/useBarrier";
import contacts from "./data/contacts.json";
import { Link } from "react-router-dom";

function App() {
  const { temperature, wind, humidity, loading, weatherCode } = useWeather();
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
          alt="Street"
          className="absolute w-full h-full object-cover opacity-60"
        />
        <h1 className="relative z-10 text-4xl font-extrabold tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          Vișinului District
        </h1>
      </header>

      {/* Main content area */}
      <main className="py-8 max-w-xl mx-auto space-y-8 pl-2 pr-2">
        {/* Barrier Card */}
        <section className="bg-white rounded-3xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-2 text-slate-700">
            🔓 Acces barierǎ
          </h2>

          <div className="mb-4 text-sm font-semibold text-center">
            <span className={deviceOnline ? "text-green-600" : "text-red-500"}>
              {deviceOnline ? "Dispozitiv online" : "Dispozitiv offline"}
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
            Deschide
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

          {/* Link to PIN Generator */}
          <div className="mt-6 text-center">
            <Link
              to="/pin-generator"
              className="inline-block text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              🔧 Generează PIN pentru oaspeți →
            </Link>
          </div>
        </section>

        {/* Weather Card */}
        <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-white to-sky-50 rounded-3xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          <div className="absolute right-4 top-4 text-5xl text-blue-400/20">
            {getWeatherEmoji(weatherCode ?? 0)}
          </div>
          <h2 className="text-2xl font-semibold mb-1 text-slate-700">
            🌤️ Vremea curentǎ
          </h2>
          <div className="text-sm text-slate-600 mb-4">Tamași, Corbeanca</div>

          {loading ? (
            <div className="text-sm text-slate-500">Se incarca...</div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="text-4xl font-bold text-blue-500">
                  {temperature}°C
                </div>
                <div className="text-md text-slate-600">
                  {getWeatherDescriptionRo(weatherCode ?? 0)}
                </div>
              </div>
              <div className="text-right text-sm text-slate-500">
                <div>Vant: {wind} km/h</div>
                <div>Umiditate: {humidity}%</div>
              </div>
            </div>
          )}
        </section>

        {/* Contacts Card */}
        <section className="bg-white rounded-3xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-slate-700">
            📞 Contacte & Servicii
          </h2>

          <ul className="space-y-4 text-slate-600">
            {contacts.map((group, i) => (
              <li key={i}>
                <div className="font-medium text-slate-700 mb-1">
                  {group.category}
                </div>
                <ul className="ml-3 space-y-1 text-sm">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex justify-between">
                      <span>{item.label}:</span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white rounded-3xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300">
          <Link
            to="/playground"
            className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            🛝 <span className="underline">Vezi regulile locului de joacă</span>
          </Link>

          <div className="mt-4">
            <img
              src="/qrcode.png"
              alt="QR cod regulile locului de joacă"
              className="mx-auto w-40 h-40"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
