import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SOCIALS } from "../data/socials";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-200/60 px-5 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © Ruy Vieira · {t("footer.rights")}
        </p>

        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-slate-400 transition-colors hover:text-brand-2"
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>

        <p className="flex items-center gap-1.5 text-xs text-slate-400">
          {t("footer.built")}
          <Heart size={12} className="fill-brand-3 text-brand-3" />
        </p>
      </div>
    </footer>
  );
}
