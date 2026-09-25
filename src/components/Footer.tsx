import { useTranslation } from "react-i18next";
import { SOCIALS } from "../data/socials";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t-4 border-double border-ink px-4 py-8 text-center text-[12px] sm:px-8">
      <p>
        {SOCIALS.map((s, i) => (
          <span key={s.label}>
            {i > 0 && " | "}
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {s.label}
            </a>
          </span>
        ))}
      </p>

      <p className="mt-3 text-muted">© Ruy Vieira · {t("footer.rights")}</p>
      <p className="mt-1 font-mono text-[11px] text-muted">
        {t("retro.updated")}: {__BUILD_DATE__} · {t("retro.bestViewed")}
      </p>
    </footer>
  );
}
