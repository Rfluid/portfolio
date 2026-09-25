import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";
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
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  const { t } = useTranslation();
  const roles = t("hero.roles", { returnObjects: true }) as unknown as string[];
  const typed = useTypewriter(roles);

  return (
    <section id="home" className="px-4 py-10 sm:px-8 sm:py-14">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid items-start gap-8 sm:grid-cols-[auto_1fr]"
      >
        <motion.figure variants={item} className="mx-auto w-44 sm:w-48">
          <div className="border border-ink p-1.5">
            <img
              src="/ruy-vieira.jpg"
              alt={t("hero.name")}
              width={192}
              height={192}
              className="block aspect-square w-full object-cover"
            />
          </div>
          <figcaption className="mt-1.5 text-center font-serif text-xs text-muted italic">
            {t("retro.figure")}
          </figcaption>
        </motion.figure>

        <div className="text-center sm:text-left">
          <motion.p
            variants={item}
            className="font-mono text-xs tracking-widest text-muted uppercase"
          >
            {t("retro.welcome")}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-2 font-serif text-5xl leading-none font-bold sm:text-6xl"
          >
            <span className="block text-2xl font-normal italic sm:text-3xl">
              {t("hero.greeting")}
            </span>
            {t("hero.name")}
          </motion.h1>

          <motion.div
            variants={item}
            className="sunken mt-5 flex h-9 items-center px-3 font-mono text-base sm:text-lg"
          >
            <span className="mr-2 text-muted">ruy@rfluid:~$</span>
            <span className="truncate">{typed}</span>
            <span className="animate-blink ml-0.5 inline-block h-5 w-2.5 bg-ink" />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-5 font-serif text-lg leading-snug"
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start"
          >
            <a href="#projects" className="btn">
              » {t("hero.ctaProjects")}
            </a>
            <a href="#contact" className="btn">
              » {t("hero.ctaContact")}
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-5 text-[13px] text-muted">
            {SOCIALS.map((s, i) => (
              <span key={s.label}>
                {i > 0 && " · "}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {s.label}
                </a>
              </span>
            ))}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
