import { useTranslation } from 'react-i18next';
import contacts from '../../data/contacts.json';

export function ContactsCard() {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-3xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-slate-700">
        📞 {t("contacts_title")}
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
  );
}
