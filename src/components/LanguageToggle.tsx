import { Fragment } from "react";
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
      className="flex items-center font-mono text-xs"
      role="group"
      aria-label={t("language.toggle")}
    >
      {LANGS.map((l, i) => {
        const active = current === l.code;
        return (
          <Fragment key={l.code}>
            {i > 0 && <span className="opacity-50">/</span>}
            <button
              onClick={() => i18n.changeLanguage(l.code)}
              aria-pressed={active}
              className={`px-1 transition-colors duration-200 ${
                active
                  ? "bg-paper text-ink"
                  : "underline underline-offset-2 hover:bg-paper hover:text-ink"
              }`}
            >
              {l.label}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
