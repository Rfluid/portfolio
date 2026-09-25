import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export interface CardData {
  name: string;
  title: string;
  description: string;
  url: string;
  homepage?: string | null;
  language: string | null;
  stars: number;
  forks: number;
  tags?: string[];
  featured?: boolean;
  highlight?: boolean;
}

/** Featured project box: inverted header row, like a <th>-topped table. */
export default function ProjectCard({
  data,
  index,
}: {
  data: CardData;
  index: number;
}) {
  const { t } = useTranslation();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
      className="group flex flex-col border border-ink bg-paper transition-[transform,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--ink)]"
    >
      <header className="flex items-center justify-between gap-2 bg-ink px-2.5 py-1 text-paper">
        <h3 className="truncate font-mono text-sm font-bold">{data.title}</h3>
      </header>

      <p className="flex-1 px-2.5 py-3 font-serif text-[15px] leading-snug">
        {data.description}
      </p>

      {data.tags && data.tags.length > 0 && (
        <p className="px-2.5 pb-3 font-mono text-[11px] text-muted">
          {data.tags
            .slice(0, 5)
            .map((tag) => `[${tag}]`)
            .join(" ")}
        </p>
      )}

      <footer className="flex items-center justify-between border-t border-dotted border-ink px-2.5 py-1.5 font-mono text-[11px]">
        <span className="text-muted">
          {data.language ?? "—"}
          {data.stars > 0 && ` · ★${data.stars}`}
          {data.forks > 0 && ` · ⑂${data.forks}`}
        </span>
        <span className="flex gap-2">
          {data.homepage && (
            <a
              href={data.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {t("projects.demo")}
            </a>
          )}
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {t("projects.code")}
          </a>
        </span>
      </footer>
    </motion.article>
  );
}
