import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import Section from "./Section";

const STACK = [
  "TypeScript",
  "Python",
  "Go",
  "Rust",
  "gpui",
  "React",
  "Node.js",
  "LangChain",
  "LangGraph",
  "FastAPI",
  "NestJS",
  "gRPC",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Terraform",
  "AWS",
  "GCP",
  "Solidity",
];

export default function About() {
  const { t } = useTranslation();
  const focus = t("about.focus", {
    returnObjects: true,
  }) as unknown as string[];

  return (
    <Section id="about" title={t("about.title")} subtitle={t("about.subtitle")}>
      <div className="grid gap-8 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-7 md:col-span-3"
        >
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {t("about.p1")}
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {t("about.p2")}
          </p>

          <h3 className="mt-8 mb-3 font-mono text-sm font-semibold uppercase tracking-wider text-brand-2">
            {t("about.focusTitle")}
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {focus.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-2/15 text-brand-2">
                  <Check size={13} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-3xl p-7 md:col-span-2"
        >
          <h3 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-brand-2">
            {t("about.stackTitle")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {STACK.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="rounded-full border border-slate-200/70 bg-white/50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-brand-2/50 hover:text-brand-2 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
