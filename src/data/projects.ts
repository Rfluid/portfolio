/**
 * Hand-curated featured projects shown at the top of the Projects section.
 * The rest of the grid is pulled live from the GitHub API (Rfluid + Astervia).
 *
 * `owner`/`repo` match the GitHub repo so live stars/language can be merged in.
 * Featured repos are also hidden from the live grid via `EXCLUDE_FROM_GRID`.
 */

export type Lang = "en" | "pt" | "es";

export interface FeaturedProject {
  owner: string;
  repo: string;
  title: string;
  blurb: Record<Lang, string>;
  tags: string[];
  highlight?: boolean;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    owner: "Astervia",
    repo: "wacraft",
    title: "wacraft",
    blurb: {
      en: "An open-source WhatsApp messaging platform — server, web client and tooling to build, automate and scale conversational flows on the WhatsApp Cloud API.",
      pt: "Plataforma open-source de mensageria WhatsApp — servidor, cliente web e ferramentas para construir, automatizar e escalar fluxos conversacionais na WhatsApp Cloud API.",
      es: "Plataforma open-source de mensajería de WhatsApp — servidor, cliente web y herramientas para crear, automatizar y escalar flujos conversacionales sobre la WhatsApp Cloud API.",
    },
    tags: ["WhatsApp", "Go", "TypeScript", "Platform"],
    highlight: true,
  },
  {
    owner: "Rfluid",
    repo: "aura",
    title: "aura",
    blurb: {
      en: "Agent Usage Reporter & Analyzer — a Rust CLI and tray app (GPUI) that tracks and visualizes AI agent usage and analytics.",
      pt: "Agent Usage Reporter & Analyzer — uma CLI em Rust e app de bandeja (GPUI) que monitora e visualiza o uso e as métricas de agentes de IA.",
      es: "Agent Usage Reporter & Analyzer — una CLI en Rust y app de bandeja (GPUI) que rastrea y visualiza el uso y las métricas de agentes de IA.",
    },
    tags: ["Rust", "AI", "CLI", "Analytics"],
    highlight: true,
  },
  {
    owner: "Astervia",
    repo: "proximity-internet-mesh",
    title: "Proximity Internet Mesh",
    blurb: {
      en: "Decentralized networking system that lets devices reach the internet indirectly through nearby peers, using a multi-hop, peer-to-peer architecture.",
      pt: "Sistema de rede descentralizado que permite a dispositivos acessar a internet indiretamente por meio de pares próximos, usando uma arquitetura peer-to-peer multi-salto.",
      es: "Sistema de red descentralizado que permite a los dispositivos acceder a internet indirectamente a través de pares cercanos, con una arquitectura peer-to-peer multi-salto.",
    },
    tags: ["Rust", "P2P", "Networking", "Mesh"],
    highlight: true,
  },
  {
    owner: "Astervia",
    repo: "wacraft-server",
    title: "wacraft Server",
    blurb: {
      en: "The Go backend powering wacraft — a robust API and webhook engine for the WhatsApp Cloud API.",
      pt: "O backend em Go que sustenta o wacraft — uma API robusta e motor de webhooks para a WhatsApp Cloud API.",
      es: "El backend en Go que impulsa wacraft — una API robusta y motor de webhooks para la WhatsApp Cloud API.",
    },
    tags: ["Go", "API", "Webhooks", "Backend"],
  },
  {
    owner: "Astervia",
    repo: "wacraft-client",
    title: "wacraft Client",
    blurb: {
      en: "The TypeScript web client for wacraft — a modern UI to manage WhatsApp conversations and automations.",
      pt: "O cliente web em TypeScript do wacraft — uma interface moderna para gerenciar conversas e automações no WhatsApp.",
      es: "El cliente web en TypeScript de wacraft — una interfaz moderna para gestionar conversaciones y automatizaciones de WhatsApp.",
    },
    tags: ["TypeScript", "React", "Frontend"],
  },
  {
    owner: "Astervia",
    repo: "pim-ui",
    title: "PIM UI",
    blurb: {
      en: "The TypeScript interface for the Proximity Internet Mesh — visualizing and controlling the peer-to-peer network.",
      pt: "A interface em TypeScript para o Proximity Internet Mesh — visualizando e controlando a rede peer-to-peer.",
      es: "La interfaz en TypeScript para el Proximity Internet Mesh — visualizando y controlando la red peer-to-peer.",
    },
    tags: ["TypeScript", "UI", "P2P"],
  },
  {
    owner: "Rfluid",
    repo: "whatsapp-cloud-api",
    title: "WhatsApp Cloud API",
    blurb: {
      en: "A Go client library for the WhatsApp Cloud API — send messages and handle webhooks with a clean, typed interface.",
      pt: "Uma biblioteca cliente em Go para a WhatsApp Cloud API — envie mensagens e trate webhooks com uma interface limpa e tipada.",
      es: "Una biblioteca cliente en Go para la WhatsApp Cloud API — envía mensajes y maneja webhooks con una interfaz limpia y tipada.",
    },
    tags: ["Go", "WhatsApp", "API"],
  },
  {
    owner: "Astervia",
    repo: "zaphenath",
    title: "Zaphenath",
    blurb: {
      en: "A Solidity smart-contract system for secure key-value storage with inactivity-based conditional access — role-based control and multi-user custodianship for sensitive data like wills or company secrets.",
      pt: "Um sistema de contrato inteligente em Solidity para armazenamento chave-valor seguro com acesso condicional baseado em inatividade — controle por papéis e custódia multiusuário para dados sensíveis, como testamentos ou segredos corporativos.",
      es: "Un sistema de contrato inteligente en Solidity para almacenamiento clave-valor seguro con acceso condicional basado en inactividad — control por roles y custodia multiusuario para datos sensibles, como testamentos o secretos corporativos.",
    },
    tags: ["Solidity", "Foundry", "Smart Contracts", "Web3"],
  },
  {
    owner: "Astervia",
    repo: "zaphenath-cli-client",
    title: "Zaph CLI",
    blurb: {
      en: "A Rust command-line client for the Zaphenath protocol — manage time-locked, inactivity-based data access against any Ethereum-compatible RPC.",
      pt: "Um cliente de linha de comando em Rust para o protocolo Zaphenath — gerencie acesso a dados time-locked, baseado em inatividade, contra qualquer RPC compatível com Ethereum.",
      es: "Un cliente de línea de comandos en Rust para el protocolo Zaphenath — gestiona acceso a datos time-locked, basado en inactividad, contra cualquier RPC compatible con Ethereum.",
    },
    tags: ["Rust", "CLI", "Web3", "Ethereum"],
  },
];

/** Repos hidden from the live grid (featured above, or not portfolio-worthy). */
export const EXCLUDE_FROM_GRID = new Set<string>([
  "Rfluid/Rfluid", // profile readme
  ...FEATURED_PROJECTS.map((p) => `${p.owner}/${p.repo}`),
]);
