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
      index={3}
      title={t("contact.title")}
      subtitle={t("contact.subtitle")}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-lg"
      >
        <table className="w-full border-collapse border border-ink text-[13px]">
          <caption className="mb-2 font-serif text-lg italic">
            {t("contact.cta")}
          </caption>
          <tbody>
            {links.map((s) => (
              <tr key={s.label} className="border-t border-ink">
                <th className="w-1/3 bg-face px-3 py-2 text-left font-bold">
                  <span className="inline-flex items-center gap-2">
                    <s.icon size={14} aria-hidden />
                    {s.label}
                  </span>
                </th>
                <td className="px-3 py-2 font-mono break-all">
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="link"
                  >
                    {s.handle}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {EMAIL_SOCIAL && (
          <p className="mt-6 text-center">
            <a href={EMAIL_SOCIAL.href} className="btn">
              ✉ {t("contact.emailMe")}
            </a>
          </p>
        )}
      </motion.div>
    </Section>
  );
}
