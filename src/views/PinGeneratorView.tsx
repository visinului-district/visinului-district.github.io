import { useTranslation } from "react-i18next";
import { MainLayout } from "../layouts/MainLayout";
import { PinInput } from "../components";
import { usePinGenerator } from "../hooks";
import { ROUTES } from "../constants";

export function PinGeneratorView() {
  const { t } = useTranslation();
  const {
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
    isReady
  } = usePinGenerator();

  return (
    <MainLayout showBackButton backTo={ROUTES.HOME}>
      <section className="bg-white rounded-3xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold mb-2 text-slate-700">
          🔑 {t("generate_guest_pin_title")}
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          {t("generate_guest_pin_description")}
        </p>

        <PinInput
          pin={adminPin}
          updatePin={updatePin}
          handleKeyDown={handleKeyDown}
          pinRefs={pinRefs}
        />

        <button
          onClick={handleGenerate}
          disabled={!isReady || loading}
          className="w-full py-3 rounded-full font-bold text-lg shadow-md bg-gradient-to-r from-emerald-500 to-lime-400 text-white hover:from-emerald-600 hover:to-lime-500 transition-all disabled:opacity-40"
        >
          {loading ? t("generating") : t("generate_button")}
        </button>

        {generatedPin && (
          <div className="mt-4 text-center">
            <p className="text-green-600 text-lg font-semibold">
              {t("pin_generated")}:{" "}
              <span className="font-mono text-xl">{generatedPin}</span>
            </p>

            <div className="mt-2 flex justify-center gap-3 items-center">
              <button
                onClick={copyPin}
                className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-colors"
              >
                📋 {t("copy_pin")}
              </button>
              {copied && (
                <span className="text-green-600 text-sm font-medium">
                  ✅ {t("copied")}
                </span>
              )}
            </div>

            <p className="text-sm mt-2 text-slate-600">
              {t("pin_expiration_note")}
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-center gap-3 items-center">
          <button
            onClick={copyGuestLink}
            className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-colors"
          >
            🔗 {t("copy_guest_link")}
          </button>
          {linkCopied && (
            <span className="text-green-600 text-sm font-medium">
              ✅ {t("copied")}
            </span>
          )}
        </div>

        {error && (
          <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
        )}
      </section>
    </MainLayout>
  );
}
