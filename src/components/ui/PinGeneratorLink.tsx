import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../constants";

export function PinGeneratorLink() {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Link
        to={ROUTES.PIN_GENERATOR}
        className="inline-block text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors"
      >
        🔧 {t("generate_pin_link")} →
      </Link>
    </div>
  );
}
