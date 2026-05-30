import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "es", label: "ES" },
] as const;

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const resolved = i18n.resolvedLanguage ?? "en";
  const current = resolved.startsWith("pt")
    ? "pt"
    : resolved.startsWith("es")
      ? "es"
      : "en";

  return (
    <div
      className="glass flex items-center gap-0.5 rounded-full p-1"
      role="group"
      aria-label={t("language.toggle")}
    >
      <Languages
        size={15}
        className="mx-1 text-slate-500 dark:text-slate-400"
      />
      {LANGS.map((l) => {
        const active = current === l.code;
        return (
          <button
            key={l.code}
            onClick={() => i18n.changeLanguage(l.code)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
              active
                ? "bg-gradient-to-r from-brand-1 to-brand-2 text-white shadow"
                : "text-slate-500 hover:text-brand-2 dark:text-slate-400"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
