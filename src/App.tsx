// File: src/App.tsx

import "./index.css";
import { useWeather, getWeatherDescriptionRo } from "./hooks/useWeather";
import { useBarrier } from "./hooks/useBarrier";

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
    handleKeyDown
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
            🛑 Acces bariera
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
                type="text"
                maxLength={1}
                value={val}
                onChange={(e) => updatePin(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => { pinRefs.current[i] = el; }}
                className="w-12 h-12 text-center border-2 border-slate-300 rounded-xl text-xl bg-slate-50"
              />
            ))}
          </div>

          <button
            onClick={triggerBarrier}
            disabled={!isReady}
            className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold text-lg shadow-md transition-all duration-300 hover:from-green-500 hover:to-green-400 hover:shadow-lg disabled:opacity-40"
          >
            Deschide
          </button>

          {status && statusType !== "info" && (
            <p
              className={`mt-3 text-sm ${
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

        {/* Weather Card */}
        <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-white to-sky-50 rounded-3xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          <div className="absolute right-4 top-4 text-5xl text-blue-400/20">
            ☀️
          </div>
          <h2 className="text-2xl font-semibold mb-1 text-slate-700">
            🌤️ Vremea curenta
          </h2>
          <div className="text-sm text-slate-600 mb-4">Tamasi, Corbeanca</div>

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
            📞 Contacts & Services
          </h2>
          <ul className="space-y-3 text-slate-600">
            <li>
              <div className="font-medium">Electricity</div>
              <div className="text-sm">Emergency: 0800 123 456</div>
              <div className="text-sm">Maintenance: +40 722 000 000</div>
            </li>
            <li>
              <div className="font-medium">Water & Gas</div>
              <div className="text-sm">Gas Leak: 0800 456 789</div>
              <div className="text-sm">Water Office: +40 721 111 111</div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
