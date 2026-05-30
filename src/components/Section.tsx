import { motion } from "motion/react";
import type { ReactNode } from "react";

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

/** Section shell with an animated header that reveals on scroll. */
export default function Section({ id, title, subtitle, children }: Props) {
  return (
    <section
      id={id}
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="gradient-text">{title}</span>
        </h2>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl text-balance text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-brand-1 via-brand-2 to-brand-3" />
      </motion.div>
      {children}
    </section>
  );
}
