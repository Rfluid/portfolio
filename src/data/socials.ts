import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  type LucideIcon,
} from "lucide-react";

export interface Social {
  label: string;
  href: string;
  icon: LucideIcon;
  handle: string;
}

export const SOCIALS: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/Rfluid",
    icon: Github,
    handle: "Rfluid",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ruyvieira",
    icon: Linkedin,
    handle: "ruyvieira",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ruy.vi",
    icon: Instagram,
    handle: "ruy.vi",
  },
];

/** Public contact email — enables the "Email me" CTA. */
export const EMAIL = "ruy.vieiraneto@gmail.com";

export const EMAIL_SOCIAL: Social | null = EMAIL
  ? { label: "Email", href: `mailto:${EMAIL}`, icon: Mail, handle: EMAIL }
  : null;
