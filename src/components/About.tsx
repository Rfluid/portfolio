import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import Section from "./Section";

const STACK = [
  "Rust",
  "Go",
  "TypeScript",
  "Python",
  "gpui",
  "React",
  "Angular",
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
    <Section
      id="about"
      index={1}
      title={t("about.title")}
      subtitle={t("about.subtitle")}
    >
      <div className="grid gap-8 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="md:col-span-3"
        >
          <p className="font-serif text-lg leading-relaxed">{t("about.p1")}</p>
          <p className="mt-4 font-serif text-lg leading-relaxed">
            {t("about.p2")}
          </p>

          <h3 className="mt-8 mb-2 text-[13px] font-bold tracking-wider uppercase">
            {t("about.focusTitle")}
          </h3>
          <ul className="space-y-1 text-[13px]">
            {focus.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden>■</span>
                {f}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2"
        >
          <table className="w-full border-collapse border border-ink text-[12px]">
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="bg-ink px-2 py-1 text-left font-bold tracking-wider text-paper uppercase"
                >
                  {t("about.stackTitle")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: STACK.length / 2 }, (_, row) => (
                <tr key={row}>
                  {STACK.slice(row * 2, row * 2 + 2).map((tech, col) => (
                    <motion.td
                      key={tech}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.25,
                        delay: (row * 2 + col) * 0.03,
                      }}
                      className="border border-ink px-2 py-1 font-mono transition-colors duration-200 hover:bg-ink hover:text-paper"
                    >
                      {tech}
                    </motion.td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </Section>
  );
}
