import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

interface Props {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const LINKS = ["about", "projects", "contact"] as const;

export default function Navbar({ theme, onToggleTheme }: Props) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "glass shadow-lg"
            : "border border-transparent bg-transparent"
        } mx-3 sm:mx-auto`}
      >
        <a
          href="#home"
          className="font-mono text-lg font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="gradient-text">ruy</span>
          <span className="text-slate-400">.dev</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-brand-2 dark:text-slate-300"
              >
                {t(`nav.${link}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="glass grid h-10 w-10 place-items-center rounded-full text-slate-700 md:hidden dark:text-slate-200"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-3 mt-2 overflow-hidden md:hidden"
          >
            <ul className="glass flex flex-col gap-1 rounded-2xl p-3 shadow-lg">
              {LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-2/10 hover:text-brand-2 dark:text-slate-200"
                  >
                    {t(`nav.${link}`)}
                  </a>
                </li>
              ))}
              <li className="px-2 pt-2">
                <LanguageToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
