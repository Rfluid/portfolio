import { useMemo } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Loader2, TriangleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import Section from "./Section";
import ProjectCard, { type CardData } from "./ProjectCard";
import { useGitHubRepos } from "../hooks/useGitHubRepos";
import {
  FEATURED_PROJECTS,
  EXCLUDE_FROM_GRID,
  type Lang,
} from "../data/projects";

function resolveLang(lng: string | undefined): Lang {
  if (lng?.startsWith("pt")) return "pt";
  if (lng?.startsWith("es")) return "es";
  return "en";
}

export default function Projects() {
  const { t, i18n } = useTranslation();
  const { repos, loading, error } = useGitHubRepos();
  const lang = resolveLang(i18n.resolvedLanguage);

  // Merge curated featured projects with live GitHub data when available.
  const featured: CardData[] = useMemo(
    () =>
      FEATURED_PROJECTS.map((f) => {
        const full = `${f.owner}/${f.repo}`;
        const live = repos.find((r) => r.full_name === full);
        return {
          name: full,
          title: f.title,
          description: f.blurb[lang],
          url: live?.html_url ?? `https://github.com/${full}`,
          homepage: live?.homepage || null,
          language: live?.language ?? f.tags[0] ?? null,
          stars: live?.stargazers_count ?? 0,
          forks: live?.forks_count ?? 0,
          tags: f.tags,
          featured: true,
          highlight: f.highlight,
        };
      }),
    [repos, lang],
  );

  // The remaining repos, live from GitHub, minus the curated/excluded ones.
  const grid: CardData[] = useMemo(
    () =>
      repos
        .filter((r) => !EXCLUDE_FROM_GRID.has(r.full_name))
        .filter((r) => r.description) // only show repos that describe themselves
        .map((r) => ({
          name: r.full_name,
          title: r.name,
          description: r.description ?? "",
          url: r.html_url,
          homepage: r.homepage,
          language: r.language,
          stars: r.stargazers_count,
          forks: r.forks_count,
          tags: r.topics?.slice(0, 4),
        })),
    [repos],
  );

  return (
    <Section
      id="projects"
      title={t("projects.title")}
      subtitle={t("projects.subtitle")}
    >
      {/* Featured */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <ProjectCard key={p.name} data={p} index={i} />
        ))}
      </div>

      {/* Loading / error states for the live grid */}
      {loading && (
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Loader2 size={16} className="animate-spin" />
          {t("projects.loading")}
        </div>
      )}

      {error && (
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-amber-600 dark:text-amber-400">
          <TriangleAlert size={16} />
          {t("projects.error")}
        </div>
      )}

      {/* Live grid */}
      {grid.length > 0 && (
        <>
          <h3 className="mb-6 mt-16 text-center font-mono text-sm font-semibold uppercase tracking-wider text-slate-400">
            {t("projects.more")}
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((p, i) => (
              <ProjectCard key={p.name} data={p} index={i} />
            ))}
          </div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <a
          href="https://github.com/Rfluid?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-brand-2 transition-colors hover:text-brand-1"
        >
          {t("projects.viewAll")}
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </motion.div>
    </Section>
  );
}
