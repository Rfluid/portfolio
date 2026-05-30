/** GitHub-style language colors for the small language dots on project cards. */
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Solidity: "#AA6746",
  "C++": "#f34b7d",
  C: "#555555",
  Lua: "#000080",
  HCL: "#844FBA",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Ruby: "#701516",
  Dockerfile: "#384d54",
};

export function langColor(lang: string | null | undefined): string {
  if (!lang) return "#94a3b8";
  return LANG_COLORS[lang] ?? "#94a3b8";
}
