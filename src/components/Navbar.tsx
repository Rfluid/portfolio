import { Fragment } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

interface Props {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const LINKS = ["home", "about", "projects", "contact"] as const;

/** Endless ticker — content is doubled so the -50% loop is seamless. */
function Marquee({ text }: { text: string }) {
  return (
    <div className="group overflow-hidden border-b border-ink py-1 font-mono text-xs">
      <div className="animate-marquee flex w-max whitespace-nowrap group-hover:[animation-play-state:paused]">
        <span className="pr-8">{text}</span>
        <span className="pr-8" aria-hidden>
          {text}
        </span>
      </div>
    </div>
  );
}

export default function Navbar({ theme, onToggleTheme }: Props) {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <>
      {/* Title strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between gap-3 bg-ink px-3 py-1.5 text-paper"
      >
        <a
          href="#home"
          className="truncate font-mono text-xs font-bold tracking-wide"
        >
          ~rfluid/index.html
        </a>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </motion.div>

      <Marquee text={t("retro.marquee")} />

      {/* Sticky link bar */}
      <nav className="sticky top-0 z-50 border-b border-ink bg-paper transition-colors duration-400">
        <ul className="flex flex-wrap items-center justify-center gap-x-1 px-2 py-2 text-[13px]">
          <li aria-hidden className="text-muted">
            [
          </li>
          {LINKS.map((link, i) => (
            <Fragment key={link}>
              {i > 0 && (
                <li aria-hidden className="text-muted">
                  |
                </li>
              )}
              <li>
                <a href={`#${link}`} className="link px-1">
                  {t(`nav.${link}`)}
                </a>
              </li>
            </Fragment>
          ))}
          <li aria-hidden className="text-muted">
            ]
          </li>
        </ul>
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 -bottom-px h-[3px] origin-left bg-ink"
        />
      </nav>
    </>
  );
}
