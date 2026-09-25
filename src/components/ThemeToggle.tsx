import type { MouseEvent } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";

interface Props {
  theme: "light" | "dark";
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  const { t } = useTranslation();
  const isDark = theme === "dark";

  // Circular wipe from the button when the View Transitions API exists.
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!document.startViewTransition || reduced) return onToggle();
    root.style.setProperty("--vt-x", `${e.clientX}px`);
    root.style.setProperty("--vt-y", `${e.clientY}px`);
    document.startViewTransition(() => flushSync(onToggle));
  };

  return (
    <button
      onClick={handleClick}
      aria-label={t("theme.toggle")}
      title={t("theme.toggle")}
      className="relative h-5 w-14 overflow-hidden border border-paper font-mono text-[10px] font-bold uppercase transition-colors duration-200 hover:bg-paper hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 14, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 grid place-items-center"
        >
          {isDark ? t("theme.dark") : t("theme.light")}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
