import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowDown, FolderGit2, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SOCIALS } from "../data/socials";

/** Typewriter that cycles through the translated role list. */
function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setText("");
    setIndex(0);
    setDeleting(false);
  }, [words.join("|")]); // reset when language changes

  useEffect(() => {
    if (!words.length) return;
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";

    const delay = done ? 1600 : deleting ? 45 : 90;
    const timer = setTimeout(() => {
      if (done) {
        setDeleting(true);
      } else if (cleared) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText((cur) =>
          deleting
            ? word.slice(0, cur.length - 1)
            : word.slice(0, cur.length + 1),
        );
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return text;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const { t } = useTranslation();
  const roles = t("hero.roles", { returnObjects: true }) as unknown as string[];
  const typed = useTypewriter(roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-5 pt-24"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl text-center"
      >
        <motion.div variants={item} className="mb-6 flex justify-center">
          <div className="rounded-full bg-gradient-to-br from-brand-1 to-brand-2 p-1 shadow-lg shadow-brand-2/30">
            <img
              src="/ruy-vieira.jpg"
              alt={t("hero.name")}
              width={128}
              height={128}
              className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
            />
          </div>
        </motion.div>

        <motion.p
          variants={item}
          className="mb-4 font-mono text-sm text-brand-2"
        >
          {t("hero.greeting")}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl font-extrabold tracking-tight sm:text-7xl"
        >
          <span className="gradient-text">{t("hero.name")}</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-5 flex h-9 items-center justify-center text-xl font-semibold text-slate-600 sm:text-2xl dark:text-slate-300"
        >
          <span className="font-mono">{typed}</span>
          <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-brand-2 sm:h-7" />
        </motion.div>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-balance text-base text-slate-500 sm:text-lg dark:text-slate-400"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-1 to-brand-2 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-2/30 transition-transform hover:scale-105"
          >
            <FolderGit2 size={17} />
            {t("hero.ctaProjects")}
          </a>
          <a
            href="#contact"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-700 transition-transform hover:scale-105 dark:text-slate-200"
          >
            <Send size={16} />
            {t("hero.ctaContact")}
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-8 flex items-center justify-center gap-3"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="glass grid h-11 w-11 place-items-center rounded-full text-slate-600 transition-all hover:-translate-y-1 hover:text-brand-2 dark:text-slate-300"
            >
              <s.icon size={19} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label={t("hero.scroll")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="block"
        >
          <ArrowDown size={22} />
        </motion.span>
      </motion.a>
    </section>
  );
}
