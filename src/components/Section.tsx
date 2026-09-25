import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  id: string;
  index: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/** Section shell: numbered serif heading, double rule, [top] link. */
export default function Section({
  id,
  index,
  title,
  subtitle,
  children,
}: Props) {
  const { t } = useTranslation();

  return (
    <section
      id={id}
      className="border-t border-ink px-4 py-12 sm:px-8 sm:py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            <span className="mr-3 font-mono text-base font-normal text-muted">
              §{String(index).padStart(2, "0")}
            </span>
            {title}
          </h2>
          <a href="#home" className="link shrink-0 font-mono text-xs">
            [{t("retro.top")}]
          </a>
        </div>
        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
          className="rule-double mt-3 origin-left"
        />
        {subtitle && (
          <p className="mt-3 font-serif text-lg text-muted italic">
            {subtitle}
          </p>
        )}
      </motion.div>
      {children}
    </section>
  );
}
