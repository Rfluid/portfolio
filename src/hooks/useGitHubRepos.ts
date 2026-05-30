import { useEffect, useState } from "react";

export interface Repo {
  id: number;
  name: string;
  full_name: string; // "owner/name"
  owner: string; // login
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
}

// Pull from the personal account and the Astervia org.
const SOURCES = [
  "https://api.github.com/users/Rfluid/repos?per_page=100&sort=pushed",
  "https://api.github.com/orgs/Astervia/repos?per_page=100&sort=pushed",
];

const CACHE_KEY = "gh-repos-cache-v2";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

interface Cache {
  ts: number;
  repos: Repo[];
}

interface RawRepo {
  id: number;
  name: string;
  full_name: string;
  owner: { login: string };
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
}

function normalize(raw: RawRepo): Repo {
  return {
    id: raw.id,
    name: raw.name,
    full_name: raw.full_name,
    owner: raw.owner.login,
    description: raw.description,
    html_url: raw.html_url,
    homepage: raw.homepage,
    language: raw.language,
    stargazers_count: raw.stargazers_count,
    forks_count: raw.forks_count,
    topics: raw.topics ?? [],
    fork: raw.fork,
    archived: raw.archived,
  };
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Try a short-lived cache first to avoid API rate limits.
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cache: Cache = JSON.parse(raw);
        if (Date.now() - cache.ts < CACHE_TTL && cache.repos?.length) {
          setRepos(cache.repos);
          setLoading(false);
          return;
        }
      }
    } catch {
      /* ignore malformed cache */
    }

    (async () => {
      try {
        const responses = await Promise.all(
          SOURCES.map((url) =>
            fetch(url, {
              headers: { Accept: "application/vnd.github+json" },
            }).then((r) => {
              if (!r.ok) throw new Error(`GitHub API ${r.status}`);
              return r.json() as Promise<RawRepo[]>;
            }),
          ),
        );

        const cleaned = responses
          .flat()
          .map(normalize)
          .filter((r) => !r.fork && !r.archived)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              a.name.localeCompare(b.name),
          );

        if (cancelled) return;
        setRepos(cleaned);
        setLoading(false);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ ts: Date.now(), repos: cleaned } satisfies Cache),
          );
        } catch {
          /* storage full / disabled — non-fatal */
        }
      } catch {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { repos, loading, error };
}
