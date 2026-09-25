import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
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

/** Classic | / - \ text spinner. */
function Spinner() {
  const frames = "|/-\\";
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % frames.length), 120);
    return () => clearInterval(id);
  }, []);
  return <span className="inline-block w-3">{frames[i]}</span>;
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
        })),
    [repos],
  );

  return (
    <Section
      id="projects"
      index={2}
      title={t("projects.title")}
      subtitle={t("projects.subtitle")}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <ProjectCard key={p.name} data={p} index={i} />
        ))}
      </div>

      {loading && (
        <p className="mt-10 text-center font-mono text-sm">
          <Spinner /> {t("projects.loading")}
        </p>
      )}

      {error && (
        <p className="mt-10 border border-dashed border-ink p-3 text-center font-mono text-sm">
          [!] {t("projects.error")}
        </p>
      )}

      {grid.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <h3 className="mb-2 font-serif text-2xl font-bold">
            {t("retro.otherRepos")}{" "}
            <span className="font-mono text-sm font-normal text-muted">
              ({grid.length})
            </span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-ink text-left text-[12px]">
              <thead className="bg-ink text-paper">
                <tr>
                  <th className="px-2 py-1">{t("retro.colName")}</th>
                  <th className="hidden px-2 py-1 sm:table-cell">
                    {t("retro.colDesc")}
                  </th>
                  <th className="px-2 py-1">{t("retro.colLang")}</th>
                  <th className="px-2 py-1 text-right">★</th>
                </tr>
              </thead>
              <tbody>
                {grid.map((p) => (
                  <tr
                    key={p.name}
                    className="border-t border-ink align-top transition-colors duration-150 even:bg-[var(--tile)] hover:bg-ink hover:text-paper"
                  >
                    <td className="px-2 py-1.5 font-mono">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                      >
                        {p.title}
                      </a>
                      <span className="mt-0.5 block font-serif text-[13px] sm:hidden">
                        {p.description}
                      </span>
                    </td>
                    <td className="hidden px-2 py-1.5 font-serif text-[13px] sm:table-cell">
                      {p.description}
                    </td>
                    <td className="px-2 py-1.5 font-mono whitespace-nowrap">
                      {p.language ?? "—"}
                    </td>
                    <td className="px-2 py-1.5 text-right font-mono">
                      {p.stars}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      <p className="mt-8 text-center text-[13px]">
        <a
          href="https://github.com/Rfluid?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          {t("projects.viewAll")} &raquo;
        </a>
      </p>
    </Section>
  );
}
