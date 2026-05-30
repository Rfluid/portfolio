import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import { SOCIALS, EMAIL_SOCIAL } from "../data/socials";

export default function Contact() {
  const { t } = useTranslation();
  const links = EMAIL_SOCIAL ? [...SOCIALS, EMAIL_SOCIAL] : SOCIALS;

  return (
    <Section
      id="contact"
      title={t("contact.title")}
      subtitle={t("contact.subtitle")}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="glass relative mx-auto max-w-3xl overflow-hidden rounded-3xl p-8 text-center sm:p-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-1/10 via-transparent to-brand-3/10" />
        <div className="relative">
          <p className="mb-8 text-lg font-medium text-slate-600 dark:text-slate-300">
            {t("contact.cta")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {links.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/50 px-5 py-3 text-left transition-all hover:-translate-y-1 hover:border-brand-2/50 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-1 to-brand-2 text-white">
                  <s.icon size={19} />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-slate-400">{s.label}</span>
                  <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-brand-2 dark:text-slate-200">
                    {s.handle}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
