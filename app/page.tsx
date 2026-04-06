"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Gallery from "./components/Gallery";

interface Experience {
  company: string;
  period: string;
  roles: string[];
  summary: string;
  bullets?: string[];
}

const experience: Experience[] = [
  {
    company: "Token Terminal",
    period: "2021 -Present",
    roles: [
      "Chief Technology Officer, 2024 -",
      "VP of Engineering, 2021 -2024",
    ],
    summary:
      "Token Terminal extracts, standardizes, and delivers financial and alternative data on blockchains, decentralized applications, and tokenized assets. I built the company's technical foundation from inception and lead overall technology strategy and engineering.",
    bullets: [
      "Scaled blockchain coverage from 30 to 120+ full integrations by co-authoring and driving the implementation of a distributed, scalable proprietary indexing infrastructure (TypeScript, Kubernetes), including full entity-level data across each chain",
      "Co-authored the architecture of a near real-time indexing system (Go), achieving ~1.5s latency from block finalization to BigQuery across Solana and major EVM chains",
      "Architected and implemented a multi-chain decoding framework, later scaled by the team across EVM, Solana, Cosmos, Move, Polkadot, and Stacks ecosystems, enabling full historical contract decoding (EVM <1 min)",
      "Co-designed an ELT-first data platform spanning multiple dbt projects, managing 4PB+ in BigQuery; SQL-based transformations power the public API and enterprise data products",
      "Reduced infrastructure costs by up to 60% through granular GCP cost attribution, query optimization, and system design improvements",
      "Established institutional-grade data quality standards, enabling partnerships with Bloomberg, Google, Binance, CoinGecko, CF Benchmarks, and Nansen, reaching tens of millions of users globally",
      "Built and scaled the engineering organization into specialized Data and Platform teams: Data handles ingestion, processing, and metric computation; Platform owns the public API, web, and integrations (Google Sheets, Excel, Bloomberg)",
      "Cultivated a high-performance remote engineering culture grounded in Nordic principles: ownership, flat hierarchy, sustainability, and execution bias",
    ],
  },
  {
    company: "ZEIT (now Vercel)",
    period: "2016 - 2019",
    roles: [
      "Chief Operating Officer, 2018 - 2019",
      "Interim CTO, 2017 - 2018",
      "Founding Engineer / SRE, 2016 - 2017",
    ],
    summary:
      "One of three founding engineers building and scaling the Now.sh hosting platform, which evolved into Vercel.",
    bullets: [
      "Co-designed the transition from container-based hosting to fully serverless infrastructure, forming the foundation of the Vercel platform",
      "Owned the design and implementation of multi-region infrastructure and global request routing, scaling from a single datacenter to globally distributed deployments across AWS and GCP",
      "Contributed to the implementation of a global anycast DNS network routing traffic to the nearest region, and led the integration of Cloudflare CDN across all customers",
      "Led multiple zero-downtime database migrations across PostgreSQL, Redis, and distributed systems (e.g. Cosmos DB), enabling global scalability and reliability",
      "Owned the ZEIT Gateway, the core edge layer handling SSL termination, routing, autoscaling, and high-volume traffic management",
      "Managed and scaled large Kubernetes clusters supporting production workloads",
      "Expanded role into COO, partnering with the CEO on sales strategy, managing enterprise customer relationships, and building internal analytics to track platform growth",
      "Organized ZEIT Day conferences in Berlin and San Francisco",
    ],
  },
  {
    company: "Gatsby",
    period: "2019 -2021",
    roles: ["Data Scientist / Data Engineer"],
    summary:
      "Built the data infrastructure and analytics capabilities for Gatsby's open-source framework and Netlify's cloud platform.",
    bullets: [
      "Designed and implemented a privacy-compliant telemetry system capturing error rates, performance timings, and usage patterns to inform product roadmap decisions",
      "Built end-to-end data ingestion pipelines with dbt workflows for metrics tracking and reporting",
      "Established company-wide analytics by integrating BigQuery with Looker, enabling north-star dashboards and team-level metrics",
    ],
  },
  {
    company: "Google",
    period: "2014 -2015",
    roles: ["Software Engineer, Zurich"],
    summary:
      "Worked on the internal Telephony Team. Built telephony systems in Java using Google's internal stack; configured monitoring and alerting; conducted training for support and on-call engineers.",
  },
  {
    company: "University of Helsinki",
    period: "2013 -2016",
    roles: ["Research Assistant / Software Engineer"],
    summary:
      "Tech lead for TestMyCode at RAGE Research Group. Led two scrum teams (7 developers) building educational tooling.",
    bullets: [
      "Co-authored a custom testing framework for Java, Python, and C using reflection APIs and annotation-based grading",
      "Architected secure code execution using sandboxing to isolate student code",
      "Launched mooc.fi, University of Helsinki's free online learning platform, now used as a university entrance exam serving tens of thousands of participants globally",
    ],
  },
];


function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = el.querySelectorAll(".fade-in, .timeline-entry");
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Page() {
  const scrollRef = useScrollReveal();

  return (
    <div ref={scrollRef}>
      {/* Hero */}
      <section className="hero">
        <div className="hero-image">
          <img src="/jamoboat.jpg" alt="" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <img src="/jarmo.jpg" alt="Jarmo Isotalo" className="hero-avatar" />
          <h1 className="hero-name">Jarmo Isotalo</h1>
          <p className="hero-tagline">Technology & Photography</p>
          <p className="hero-location">Helsinki, Finland</p>
          <nav className="hero-nav">
            <Link href="/photography">Photography</Link>
          </nav>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="fade-in">
          <p className="section-label">About</p>
          <p className="about-text">
            Technology executive and photographer based in Helsinki. Over a
            decade of experience scaling platforms, leading distributed teams,
            and driving technical strategy at high-growth startups. Outside of
            engineering, I shoot editorial, content, and advertising photography
            and do video production.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="section">
        <div className="fade-in">
          <p className="section-label">Experience</p>
        </div>
        <div className="timeline">
          {experience.map((entry) => (
            <article key={entry.company} className="timeline-entry">
              <div className="timeline-header">
                <span className="timeline-company">{entry.company}</span>
              </div>
              <span className="timeline-period">{entry.period}</span>
              <div className="timeline-roles">
                {entry.roles.map((role) => (
                  <span key={role} className="timeline-role">
                    {role}
                  </span>
                ))}
              </div>
              <p className="timeline-description">{entry.summary}</p>
              {entry.bullets && (
                <ul className="timeline-bullets">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Photography */}
      <Gallery />

      {/* Advisory */}
      <section className="section">
        <div className="fade-in">
          <p className="section-label">Advisory</p>
          <article className="timeline-entry" style={{ borderBottom: "none", paddingTop: 0 }}>
            <div className="timeline-header">
              <span className="timeline-company">Listeds</span>
            </div>
            <span className="timeline-period">2022 -Present</span>
            <div className="timeline-roles">
              <span className="timeline-role">Advisory Board Member</span>
            </div>
            <p className="timeline-description">
              Strategic technical and business guidance for a Nordic media and
              leadership intelligence platform serving business executives.
            </p>
          </article>
        </div>
      </section>

      {/* Contact */}
      <section className="section">
        <div className="fade-in">
          <p className="section-label">Contact</p>
          <div className="contact-grid">
            <a href="mailto:jarmo@isotalo.fi" className="contact-link">
              <span className="contact-link-label">Email</span>
              jarmo@isotalo.fi
            </a>
            <a
              href="https://github.com/jamo"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-label">GitHub</span>
              github.com/jamo
            </a>
            <a
              href="https://linkedin.com/in/jarmoisotalo"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-label">LinkedIn</span>
              linkedin.com/in/jarmoisotalo
            </a>
            <a
              href="https://instagram.com/jarmoisotalo"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-label">Instagram</span>
              @jarmoisotalo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Jarmo Isotalo</p>
      </footer>
    </div>
  );
}
