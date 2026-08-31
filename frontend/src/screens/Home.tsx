import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";

const { X } = Icons;

const PAGE_META = {
  as_of_date: "14 August 2026",
  snapshot_notice:
    "A hand-authored point-in-time snapshot of the AI landscape. It is not continuously updated and does not read from any live data feed."
};

const COMPANIES = [
  {
    id: "openai",
    name: "OpenAI",
    description: "The San Francisco lab that put generative AI in front of everyone with ChatGPT.",
    logo_src: "OA",
    logo_alt: "OpenAI logo",
    prominence_order: 1,
    models: [
      {
        id: "gpt-5",
        company_id: "openai",
        name: "GPT-5",
        description: "The current flagship general-purpose model behind ChatGPT.",
        release_year: 2025,
        official_url: "https://openai.com/index/introducing-gpt-5/"
      },
      {
        id: "o3",
        company_id: "openai",
        name: "o3",
        description: "A reasoning model that works through problems step by step before answering.",
        release_year: 2025,
        official_url: "https://openai.com/index/introducing-o3-and-o4-mini/"
      },
      {
        id: "gpt-4o",
        company_id: "openai",
        name: "GPT-4o",
        description: "The multimodal workhorse that handles text, images and voice in one model.",
        release_year: 2024,
        official_url: "https://openai.com/index/hello-gpt-4o/"
      },
      {
        id: "sora",
        company_id: "openai",
        name: "Sora",
        description: "Turns a written prompt into a short piece of video.",
        release_year: 2024,
        official_url: "https://openai.com/sora/"
      },
      {
        id: "dalle-3",
        company_id: "openai",
        name: "DALL·E 3",
        description: "Image generation built into ChatGPT.",
        release_year: 2023,
        official_url: "https://openai.com/index/dall-e-3/"
      }
    ]
  },
  {
    id: "google-deepmind",
    name: "Google DeepMind",
    description: "Google's combined research arm, shipping the Gemini family across search, Android and Workspace.",
    logo_src: "GD",
    logo_alt: "Google DeepMind logo",
    prominence_order: 2,
    models: [
      {
        id: "gemini-25-pro",
        company_id: "google-deepmind",
        name: "Gemini 2.5 Pro",
        description: "The top-end Gemini model, built for long documents and hard reasoning.",
        release_year: 2025,
        official_url: "https://deepmind.google/technologies/gemini/pro/"
      },
      {
        id: "gemini-25-flash",
        company_id: "google-deepmind",
        name: "Gemini 2.5 Flash",
        description: "The fast, cheap sibling used for high-volume everyday tasks.",
        release_year: 2025,
        official_url: "https://deepmind.google/technologies/gemini/flash/"
      },
      {
        id: "veo-3",
        company_id: "google-deepmind",
        name: "Veo 3",
        description: "Generates video clips with matching sound from a prompt.",
        release_year: 2025,
        official_url: "https://deepmind.google/technologies/veo/"
      },
      {
        id: "imagen-4",
        company_id: "google-deepmind",
        name: "Imagen 4",
        description: "Google's image generator, strong on typography and fine detail.",
        release_year: 2025,
        official_url: "https://deepmind.google/technologies/imagen/"
      },
      {
        id: "gemma-3",
        company_id: "google-deepmind",
        name: "Gemma 3",
        description: "Small open-weight models anyone can download and run themselves.",
        release_year: 2025,
        official_url: "https://ai.google.dev/gemma"
      },
      {
        id: "alphafold",
        company_id: "google-deepmind",
        name: "AlphaFold",
        description: "Predicts the shape of proteins and reshaped biology research.",
        release_year: 2021,
        official_url: "https://deepmind.google/science/alphafold/"
      }
    ]
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description: "A safety-focused lab founded by former OpenAI researchers, maker of Claude.",
    logo_src: "AN",
    logo_alt: "Anthropic logo",
    prominence_order: 3,
    models: [
      {
        id: "claude-opus-41",
        company_id: "anthropic",
        name: "Claude Opus 4.1",
        description: "The most capable Claude, aimed at long agentic and coding work.",
        release_year: 2025,
        official_url: "https://www.anthropic.com/news/claude-opus-4-1"
      },
      {
        id: "claude-sonnet-4",
        company_id: "anthropic",
        name: "Claude Sonnet 4",
        description: "The balanced everyday model most Claude users actually talk to.",
        release_year: 2025,
        official_url: "https://www.anthropic.com/news/claude-4"
      },
      {
        id: "claude-haiku-35",
        company_id: "anthropic",
        name: "Claude Haiku 3.5",
        description: "The lightweight model tuned for speed and volume.",
        release_year: 2024,
        official_url: "https://www.anthropic.com/claude/haiku"
      },
      {
        id: "claude-code",
        company_id: "anthropic",
        name: "Claude Code",
        description: "Claude working directly in a developer's terminal and codebase.",
        release_year: null,
        official_url: "https://www.anthropic.com/claude-code"
      }
    ]
  },
  {
    id: "meta-ai",
    name: "Meta AI",
    description: "Facebook's parent company, which gives its Llama models away as open weights.",
    logo_src: "MA",
    logo_alt: "Meta AI logo",
    prominence_order: 4,
    models: [
      {
        id: "llama-4",
        company_id: "meta-ai",
        name: "Llama 4",
        description: "The current open-weight flagship, multimodal from the ground up.",
        release_year: 2025,
        official_url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/"
      },
      {
        id: "llama-33",
        company_id: "meta-ai",
        name: "Llama 3.3",
        description: "The widely deployed previous generation, still a default for self-hosting.",
        release_year: 2024,
        official_url: "https://www.llama.com/"
      },
      {
        id: "sam-2",
        company_id: "meta-ai",
        name: "Segment Anything 2",
        description: "Cuts out any object in an image or video with a single click.",
        release_year: 2024,
        official_url: "https://ai.meta.com/sam2/"
      }
    ]
  },
  {
    id: "xai",
    name: "xAI",
    description: "Elon Musk's lab, whose Grok models sit inside X.",
    logo_src: null,
    logo_alt: null,
    prominence_order: 5,
    models: [
      {
        id: "grok-4",
        company_id: "xai",
        name: "Grok 4",
        description: "The current flagship, pitched at reasoning and live search on X.",
        release_year: 2025,
        official_url: "https://x.ai/news/grok-4"
      },
      {
        id: "grok-3",
        company_id: "xai",
        name: "Grok 3",
        description: "The previous generation still serving most free users.",
        release_year: 2025,
        official_url: "https://x.ai/news/grok-3"
      },
      {
        id: "aurora",
        company_id: "xai",
        name: "Aurora",
        description: "xAI's own image generator inside Grok.",
        release_year: 2024,
        official_url: "https://x.ai/news/grok-image-generation-release"
      }
    ]
  },
  {
    id: "mistral",
    name: "Mistral AI",
    description: "The Paris lab that became Europe's answer to the American frontier labs.",
    logo_src: null,
    logo_alt: null,
    prominence_order: 6,
    models: [
      {
        id: "mistral-medium-3",
        company_id: "mistral",
        name: "Mistral Medium 3",
        description: "The main general-purpose model behind Le Chat.",
        release_year: 2025,
        official_url: "https://mistral.ai/news/mistral-medium-3"
      },
      {
        id: "mistral-large-2",
        company_id: "mistral",
        name: "Mistral Large 2",
        description: "The high-end model for multilingual and enterprise work.",
        release_year: 2024,
        official_url: "https://mistral.ai/news/mistral-large-2407"
      },
      {
        id: "codestral",
        company_id: "mistral",
        name: "Codestral",
        description: "A model trained specifically to write and complete code.",
        release_year: null,
        official_url: "https://mistral.ai/news/codestral"
      }
    ]
  },
  {
    id: "microsoft-ai",
    name: "Microsoft AI",
    description: "Ships AI to a billion desktops through Copilot, and trains small models of its own.",
    logo_src: "MS",
    logo_alt: "Microsoft AI logo",
    prominence_order: 7,
    models: [
      {
        id: "phi-4",
        company_id: "microsoft-ai",
        name: "Phi-4",
        description: "A small model that punches above its size on reasoning tasks.",
        release_year: 2024,
        official_url: "https://azure.microsoft.com/en-us/products/phi"
      },
      {
        id: "mai-voice-1",
        company_id: "microsoft-ai",
        name: "MAI-Voice-1",
        description: "Microsoft's in-house speech model used for Copilot's voice.",
        release_year: 2025,
        official_url: "https://microsoft.ai/news/two-new-in-house-models/"
      },
      {
        id: "copilot",
        company_id: "microsoft-ai",
        name: "Copilot",
        description: "The assistant layer built across Windows, Office and GitHub.",
        release_year: 2023,
        official_url: "https://copilot.microsoft.com/"
      }
    ]
  }
];

const pad = (n) => String(n).padStart(2, "0");

export default function Screen() {
  const [active, setActive] = React.useState(COMPANIES[0].id);
  const sectionRefs = React.useRef({});

  React.useEffect(() => {
    const els = Object.values(sectionRefs.current).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.dataset.cid) setActive(e.target.dataset.cid);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTo = (id) => {
    setActive(id);
    const el = sectionRefs.current[id];
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const totalModels = COMPANIES.reduce((n, c) => n + c.models.length, 0);
  const accent = brand.accentColor;

  return (
    <div
      className="bg-white text-black"
      style={{ fontFamily: brand.fontBody, backgroundColor: brand.backgroundColor }}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-10 md:py-16">
        {/* ── Masthead ─────────────────────────────── */}
        <header>
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: brand.neutralColor }}
          >
            A wall chart of the AI landscape
          </p>

          <h1
            className="mt-4 text-[3.25rem] font-black uppercase leading-[0.86] tracking-[-0.035em] md:text-[7rem]"
            style={{ fontFamily: brand.fontHeading, color: "#000000" }}
          >
            Who makes
            <br />
            the models
          </h1>

          <div className="mt-7 flex flex-col gap-3 border-y border-black/15 py-4 md:flex-row md:items-baseline md:justify-between">
            <p className="text-sm font-semibold tracking-tight md:text-base">
              As of <span style={{ color: accent }}>{PAGE_META.as_of_date}</span>
            </p>
            <p
              className="max-w-xl text-[13px] leading-relaxed md:text-right"
              style={{ color: brand.neutralColor }}
            >
              {PAGE_META.snapshot_notice}
            </p>
          </div>

          <p
            className="mt-4 text-[13px] leading-relaxed md:max-w-2xl"
            style={{ color: brand.primaryColor }}
          >
            {COMPANIES.length} household-name companies, {totalModels} flagship models, ordered by
            prominence rather than alphabet. Every model name links out to the vendor's own page.
          </p>
        </header>

        {/* ── Index ────────────────────────────────── */}
        <nav aria-label="Company index" className="mt-12 md:mt-16">
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: brand.neutralColor }}
          >
            The index
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-x-10 border-t border-black sm:grid-cols-2 lg:grid-cols-3">
            {COMPANIES.map((c) => {
              const isActive = active === c.id;
              return (
                <li key={c.id} className="border-b border-black/15">
                  <button
                    type="button"
                    onClick={() => goTo(c.id)}
                    className="group flex w-full items-baseline gap-3 py-3 text-left transition-colors"
                  >
                    <span
                      className="w-6 shrink-0 text-[11px] font-semibold tabular-nums"
                      style={{ color: isActive ? accent : brand.neutralColor }}
                    >
                      {pad(c.prominence_order)}
                    </span>
                    <span
                      className="text-2xl font-bold italic leading-tight tracking-[-0.02em] group-hover:underline md:text-3xl"
                      style={{
                        fontFamily: brand.fontHeading,
                        color: isActive ? accent : "#000000",
                        textUnderlineOffset: "4px"
                      }}
                    >
                      {c.name}
                    </span>
                    <span
                      className="ml-auto shrink-0 text-[11px] tabular-nums"
                      style={{ color: brand.neutralColor }}
                    >
                      {c.models.length}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Company sections ─────────────────────── */}
        <main className="mt-16 md:mt-24">
          {COMPANIES.map((c, i) => (
            <section
              key={c.id}
              data-cid={c.id}
              ref={(el) => {
                sectionRefs.current[c.id] = el;
              }}
              aria-labelledby={`${c.id}-heading`}
              className={"scroll-mt-8 border-t-2 border-black pt-6 " + (i === 0 ? "" : "mt-16 md:mt-24")}
            >
              <div className="flex items-start gap-4">
                {c.logo_src ? (
                  <span
                    role="img"
                    aria-label={c.logo_alt}
                    className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center text-[13px] font-black italic tracking-tight text-white md:h-14 md:w-14 md:text-base"
                    style={{ backgroundColor: "#000000", borderRadius: "0.35rem" }}
                  >
                    {c.logo_src}
                  </span>
                ) : null}

                <div className="min-w-0">
                  <p
                    className="text-[11px] font-semibold tabular-nums tracking-[0.28em]"
                    style={{ color: brand.neutralColor }}
                  >
                    {pad(c.prominence_order)}
                  </p>
                  <h2
                    id={`${c.id}-heading`}
                    className="mt-1 text-[2.5rem] font-black italic leading-[0.9] tracking-[-0.035em] md:text-[4.5rem]"
                    style={{ fontFamily: brand.fontHeading, color: "#000000" }}
                  >
                    {c.name}
                  </h2>
                  <p
                    className="mt-3 max-w-2xl text-[15px] leading-snug md:text-lg"
                    style={{ color: brand.primaryColor }}
                  >
                    {c.description}
                  </p>
                </div>
              </div>

              <ul className="mt-7 grid grid-cols-1 gap-x-12 border-t border-black/15 md:grid-cols-2">
                {c.models.map((m) => (
                  <li key={m.id} className="border-b border-black/10 py-3">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <a
                        href={m.official_url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-lg font-bold underline decoration-2 underline-offset-4 hover:no-underline md:text-xl"
                        style={{ color: accent }}
                      >
                        {m.name}
                      </a>
                      {m.release_year ? (
                        <span
                          className="text-[11px] font-semibold tabular-nums tracking-widest"
                          style={{ color: brand.neutralColor }}
                        >
                          {m.release_year}
                        </span>
                      ) : null}
                    </div>
                    <p
                      className="mt-1 max-w-md text-[13px] leading-snug md:text-sm"
                      style={{ color: brand.primaryColor }}
                    >
                      {m.description}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => goTo(COMPANIES[0].id)}
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] hover:underline"
                  style={{ color: brand.neutralColor, textUnderlineOffset: "4px" }}
                >
                  ↑ Back to the index
                </button>
              </div>
            </section>
          ))}
        </main>

        {/* ── Colophon ─────────────────────────────── */}
        <footer className="mt-20 border-t-2 border-black pt-6 md:mt-28">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: brand.neutralColor }}
              >
                Snapshot
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: brand.primaryColor }}>
                Content hand-authored on {PAGE_META.as_of_date}. Companies and models are a curated
                selection, not a ranking or a complete catalogue.
              </p>
            </div>
            <div>
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: brand.neutralColor }}
              >
                Deliberately absent
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: brand.primaryColor }}>
                No pricing, benchmarks, context windows or capability tables. No sign-in, no
                accounts, no third-party analytics.
              </p>
            </div>
            <div>
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: brand.neutralColor }}
              >
                Editing
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: brand.primaryColor }}>
                Each company is one block in the page source; add a model by copying a list item and
                changing the name, line and link. The "as of" date sits at the top of the file.
              </p>
            </div>
          </div>
          <p
            className="mt-8 text-[11px] uppercase tracking-[0.28em]"
            style={{ color: brand.neutralColor }}
          >
            English only · Single page · Static hosting
          </p>
        </footer>
      </div>
    </div>
  );
}
