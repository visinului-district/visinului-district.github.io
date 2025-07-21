// File: src/components/PlaygroundRulesView.tsx

import { Link } from "react-router-dom";

const rules = [
  {
    icon: "🚫",
    title: "Fără încălțăminte în trambulină",
    desc: "urcă doar desculț sau cu șosete curate",
  },
  {
    icon: "🗑️",
    title: "Păstrează curățenia",
    desc: "aruncă gunoiul doar la tomberon",
  },
  {
    icon: "🧸",
    title: "După joacă, strânge jucăriile",
    desc: "păstrează locul frumos și pentru ceilalți",
  },
  {
    icon: "🌼",
    title: "Ai grijă de plante",
    desc: "nu rupe florile, frunzele sau crengile pomilor",
  },
  {
    icon: "🤝",
    title: "Joacă-te frumos",
    desc: "fără împins, fără ceartă, toți copiii sunt bineveniți",
  },
  {
    icon: "👨‍👧",
    title: "Supravegherea e importantă",
    desc: "copiii mici trebuie însoțiți de un adult",
  },
];

export default function PlaygroundRulesView() {
  return (
    <div className="min-h-screen px-4 bg-gradient-to-b from-slate-50 to-slate-200 font-sans text-gray-800">
      <header className="relative w-full h-40 bg-white shadow-2xl flex flex-col justify-center items-center rounded-b-3xl overflow-hidden">
        <img
          src="/header.png"
          alt="Street"
          className="absolute w-full h-full object-cover opacity-60"
        />
        <h1 className="relative z-10 text-4xl font-extrabold tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          Vișinului District
        </h1>
        <Link
          to="/"
          className="absolute left-4 top-4 text-sm font-semibold text-white bg-black/30 backdrop-blur px-3 py-1 rounded-full hover:bg-black/50 transition"
        >
          ← Înapoi
        </Link>
      </header>

      <section className="bg-white rounded-3xl shadow-xl p-6 max-w-xl mx-auto my-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-rose-700 mb-1">
            <span className="text-green-600">PLAYGROUND</span>
          </h2>
          <p className="text-xl font-semibold text-red-500">
            REGULI PENTRU JOACĂ ÎN SIGURANȚĂ
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200"
            >
              <div className="text-3xl">{rule.icon}</div>
              <div>
                <h3 className="font-semibold text-slate-800 text-md leading-snug">
                  {rule.title}
                </h3>
                <p className="text-sm text-slate-600 leading-tight">
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
