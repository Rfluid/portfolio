import { motion } from "motion/react";
import { ExternalLink, Github, GitFork, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { langColor } from "../lib/langColors";

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
      className={`group glass relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-2/10 ${
        data.highlight ? "ring-1 ring-brand-2/30" : ""
      }`}
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-2/0 blur-3xl transition-all duration-500 group-hover:bg-brand-2/20" />

      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white">
          {data.title}
        </h3>
        {data.featured && (
          <span className="shrink-0 rounded-full bg-gradient-to-r from-brand-1 to-brand-2 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {t("projects.featured")}
          </span>
        )}
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {data.description}
      </p>

      {data.tags && data.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {data.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-brand-2/10 px-2 py-0.5 text-[11px] font-medium text-brand-2"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-slate-200/60 pt-4 dark:border-white/10">
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          {data.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: langColor(data.language) }}
              />
              {data.language}
            </span>
          )}
          {data.stars > 0 && (
            <span className="flex items-center gap-1">
              <Star size={13} /> {data.stars}
            </span>
          )}
          {data.forks > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={13} /> {data.forks}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {data.homepage && (
            <a
              href={data.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("projects.demo")}
              title={t("projects.demo")}
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-brand-2/10 hover:text-brand-2 dark:text-slate-400"
            >
              <ExternalLink size={16} />
            </a>
          )}
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("projects.code")}
            title={t("projects.code")}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-brand-2/10 hover:text-brand-2 dark:text-slate-400"
          >
            <Github size={16} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
