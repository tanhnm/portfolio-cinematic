import { useState } from "react";

/* ---------------- Shared bits ---------------- */

const SectionHeading = ({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) => (
  <div className="border-b-2 border-black bg-white p-8 text-center sm:p-[7vw]">
    <p className="mb-4 font-mono text-xs font-black uppercase tracking-[0.28em] text-neutral-500">
      {kicker}
    </p>
    <h2 className="mb-6 font-mono text-4xl font-black leading-none sm:text-5xl">
      {title}
    </h2>
    {sub && (
      <p className="mx-auto mb-0 max-w-[680px] font-mono text-lg text-neutral-600">
        {sub}
      </p>
    )}
  </div>
);

/* Renders **bold** highlights inside a plain string */
const renderBold = (text: string): React.ReactNode =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={part + i} className="font-black text-black">
        {part}
      </strong>
    ) : (
      part
    ),
  );

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="border-2 border-black bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wide">
    {children}
  </span>
);

/* ---------------- ABOUT / CV ---------------- */

const EXPERIENCE = [
  {
    company: "Vèo Giao — Founder & Software Engineer",
    role: "Startup · Hyper-local delivery ecosystem (launching in ~2 months)",
    period: "Founder — current",
    location: "Ho Chi Minh / Long An, Viet Nam",
    highlight: true,
    points: [
      "**Solves:** rural communities in Vietnam have no delivery platform designed for them — urban apps assume cashless users, strong networks and dense cities. Vèo Giao connects **5 actors** (customers, merchants, drivers, regional franchise operators, parent company) across **3 mobile apps + operational web consoles**.",
      "**Reduces:** uncontrolled cost exposure through a **regional prepaid safety lock**, driver cash risk via a **closed-loop financial model** (drivers never personally finance COD), and **unnecessary API traffic** via server-side pagination + caching for weak rural networks.",
      "Designed **fair 7-second driver dispatch** (anti-sniping), **capability-based merchant access control** with masked sensitive data and audit trails, and realtime tracking/geolocation adapted to real delivery workflows.",
      "Built growth mechanics with **hard budget limits**: missions, KPI separated from trust score, and read-aloud referral codes with duplicate protection.",
    ],
  },
  {
    company: "DR Digital",
    role: "Frontend Developer",
    period: "Jun 2025 — Feb 2026",
    location: "Ho Chi Minh, Viet Nam",
    points: [
      "Developed and maintained **5 enterprise products** using React.js — CMS and **AI automation** solutions for international clients.",
      "Implemented **20+ frontend features** across pricing management, content workflows, and business operations.",
      "Integrated **REST APIs, WebSocket, and WebRTC** for real-time communication and business workflows.",
      "Collaborated in cross-functional **Agile** teams with a focus on stable releases and product quality.",
    ],
  },
  {
    company: "NeighborHub — Ride Sharing",
    role: "Frontend Developer (Award-winning project)",
    period: "Oct 2024 — Dec 2024",
    location: "Ho Chi Minh, Viet Nam",
    points: [
      "Co-developed an **award-winning** community ride-sharing platform that secured a **$2,000 startup grant**.",
      "**Solves:** community transportation gaps with a cross-platform ecosystem — **Flutter** mobile app, **React.js** admin portal, **Spring Boot** backend.",
      "**Reduces:** coordination overhead with **real-time ride matching**, **GPS routing** via Maps API, and automated **CI/CD** through GitHub Actions deployed to **Google Cloud Run**.",
    ],
  },
  {
    company: "FPT University — Capstone",
    role: "Frontend Developer",
    period: "Dec 2024 — May 2025",
    location: "Ho Chi Minh, Viet Nam",
    points: [
      "Developed a full-stack **Dairy Farm Management System** with React Native, React.js and Spring Boot.",
      "**Solves:** manual farm record-keeping with **QR scanning**, REST APIs and operational tracking.",
      "**Reduces:** data errors and manual workload through digital workflows, cloud deployment and system testing — delivered a **production-ready** solution.",
    ],
  },
  {
    company: "FPT Software Academy",
    role: "Frontend Developer Intern",
    period: "Jan 2024 — Apr 2024",
    location: "Ho Chi Minh, Viet Nam",
    points: [
      "Built **React.js** features and **responsive** interfaces; supported Java Spring Boot backend development.",
      "Integrated REST APIs and database-driven functionality.",
    ],
  },
];

const SKILLS: Record<string, string[]> = {
  Frontend: [
    "React.js",
    "React Native / Expo",
    "Flutter",
    "TypeScript",
    "JavaScript",
    "HTML5",
    "CSS3",
  ],
  "Backend / Integration": [
    "Java",
    "Spring Boot",
    "REST APIs",
    "WebSocket",
    "WebRTC",
    "SQL",
  ],
  Data: ["MySQL", "PostgreSQL", "PostGIS", "Redis", "Kafka"],
  "Cloud / DevOps": [
    "Google Cloud Run",
    "Docker",
    "Kubernetes",
    "GitHub Actions",
    "Jenkins",
    "CI/CD",
  ],
  "Product domains": [
    "Marketplace / logistics",
    "Realtime systems",
    "CMS & AI automation",
    "Financial workflows",
    "Geolocation",
    "Access control",
  ],
};

export function AboutSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hnmtan03@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <section id="about" className="border-t-2 border-black bg-[#f7f7f2]" data-reveal>
      <SectionHeading
        kicker="About me"
        title="Huynh Nguyen Minh Tan"
        sub="Frontend-focused Software Engineer with production experience across enterprise applications, cross-platform mobile products, realtime systems, and product-driven marketplace workflows."
      />

      <div className="mx-auto grid max-w-[1500px] gap-6 p-4 sm:p-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-[7vw]">
        {/* Experience timeline */}
        <div className="border-2 border-black bg-white p-5 font-mono sm:p-8">
          <h3 className="mb-6 text-2xl font-black uppercase">Experience</h3>
          <div className="space-y-6">
            {EXPERIENCE.map((job) => (
              <div
                key={job.company}
                className={`border-l-4 pl-5 ${job.highlight ? "border-black bg-[#b9efff] p-5 -ml-5" : "border-black"}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <strong className="text-lg font-black">{job.company}</strong>
                  <span className="text-xs font-black uppercase text-neutral-500">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold">
                  {job.role} ·{" "}
                  <span className="font-normal text-neutral-500">
                    {job.location}
                  </span>
                </p>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-neutral-700">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span aria-hidden className="mt-[2px]">
                        ▸
                      </span>
                      <span>{renderBold(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="mb-4 mt-10 text-2xl font-black uppercase">
            Education
          </h3>
          <div className="border-l-4 border-black pl-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <strong className="text-lg font-black">FPT University</strong>
              <span className="text-xs font-black uppercase text-neutral-500">
                May 2022 — May 2025
              </span>
            </div>
            <p className="mt-1 text-sm font-bold">
              Bachelor of Software Engineering
            </p>
          </div>
        </div>

        {/* Contact + skills sidebar */}
        <div className="space-y-6">
          <div className="border-2 border-black bg-white p-5 font-mono">
            <h3 className="mb-4 text-xl font-black uppercase">Contact</h3>
            <p className="text-sm">
              <strong>Location:</strong> Ho Chi Minh, Viet Nam
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={copyEmail}
                className="rounded bg-black px-5 py-3 text-sm font-black text-white transition-transform active:scale-95"
              >
                {copied ? "Email copied ✓" : "hnmtan03@gmail.com"}
              </button>
              <a
                href="https://www.linkedin.com/in/tanhnm03"
                target="_blank"
                rel="noreferrer"
                className="rounded border-2 border-black bg-white px-5 py-3 text-sm font-black transition-transform active:scale-95"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="border-2 border-black bg-white p-5 font-mono">
            <h3 className="mb-4 text-xl font-black uppercase">Skills</h3>
            <div className="space-y-4">
              {Object.entries(SKILLS).map(([group, items]) => (
                <div key={group}>
                  <p className="mb-2 text-[11px] font-black uppercase text-neutral-500">
                    {group}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- VÈO GIAO CASE STUDY ---------------- */

const DECISIONS = [
  {
    title: "7 seconds before acceptance",
    problem: "Instant order sniping creates unfair driver competition.",
    decision:
      "Give drivers a short reading window to review address, COD and earnings before accepting.",
    why: "Fairness + better informed acceptance.",
  },
  {
    title: "Protect driver liquidity",
    problem: "Drivers should never personally finance cash-on-delivery.",
    decision:
      "Separate delivery cash movement from the driver\u2019s operating balance; an exhausted balance blocks new orders but active deliveries can finish.",
    why: "Protects drivers from uncontrolled cash exposure.",
  },
  {
    title: "Block new work, preserve visibility",
    problem: "A regional operating fund can be exhausted.",
    decision:
      "Stop new cost-generating work while keeping read/reconciliation access; recover by re-funding.",
    why: "Safety without destroying operational visibility.",
  },
  {
    title: "Capability-based merchant access",
    problem: "Store teams have very different responsibilities.",
    decision:
      "Use business capabilities (cashier, kitchen, manager, accountant) and store scope rather than broad role labels; mask sensitive data and audit reveals.",
    why: "Better security and clearer operations.",
  },
  {
    title: "Remove the 300m hard gate",
    problem:
      "Strict proximity enforcement broke batched deliveries and exact position updates.",
    decision:
      "Measure proximity when useful, but don\u2019t block real-world delivery flow on a rigid gate.",
    why: "Operational reality beats theoretical perfection.",
  },
  {
    title: "Cache historical data",
    problem:
      "Repeated history requests create unnecessary API traffic on weak rural networks.",
    decision:
      "Server-side filtering + pagination + caching for history, while keeping realtime behavior for active orders.",
    why: "Lower cost and better performance under constrained connectivity.",
  },
];

const ACTORS = [
  {
    name: "Customer",
    desc: "Discover stores, cart, vouchers, ordering, live tracking, missions & referral.",
  },
  {
    name: "Driver",
    desc: "Online status, fair dispatch, delivery workflow, operating balance, KPI.",
  },
  {
    name: "Merchant",
    desc: "Multi-store management, menu drafts, stock, team ACL, eKYC.",
  },
  {
    name: "Regional Admin",
    desc: "Franchise operations: approvals, driver finance, disputes, regional budgets.",
  },
  {
    name: "System Operator",
    desc: "Regions, platform economics, franchise funding, platform-wide oversight.",
  },
];

const STACK = [
  "Flutter",
  "React.js",
  "Go / Gin",
  "PostgreSQL",
  "PostGIS",
  "Redis",
  "Kafka",
  "WebSocket",
  "Firebase Cloud Messaging",
];

export function VeoGiaoSection() {
  return (
    <section id="veogiao" className="border-t-2 border-black bg-[#b9efff]" data-reveal>
      <SectionHeading
        kicker="Flagship case study"
        title="Vèo Giao"
        sub="A rural-first hyper-local delivery ecosystem designed around the realities of village and commune commerce in Vietnam."
      />

      <div className="space-y-6 bg-[#f7f7f2] p-4 sm:p-8 lg:px-[7vw]">
        {/* Status banner */}
        <div className="border-2 border-black bg-white p-5 font-mono sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="border-2 border-black bg-black px-3 py-1 text-[11px] font-black uppercase text-white">
              Status
            </span>
            <p className="text-lg font-black">Launching in ~2 months</p>
          </div>
          <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-neutral-600">
            Vèo Giao is my startup — a digitalization layer over local delivery
            operations in rural Vietnam. Instead of copying urban marketplace
            patterns, the product is built around local merchant relationships,
            local drivers, cash-based commerce, weak connectivity, and
            decentralized regional franchise operations.
          </p>
        </div>

        {/* Problem + insight */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-white p-5 font-mono sm:p-8">
            <h3 className="mb-4 text-2xl font-black uppercase">The problem</h3>
            <p className="text-sm leading-relaxed text-neutral-700">
              Rural delivery is not urban delivery scaled down. Cash payments,
              weak and inconsistent connectivity, local trust, motorbike
              logistics, geographic service boundaries, and small regional
              operating teams all change the product requirements. Assumptions
              from large urban platforms fail here.
            </p>
          </div>
          <div className="border-2 border-black bg-white p-5 font-mono sm:p-8">
            <h3 className="mb-4 text-2xl font-black uppercase">
              Product insight
            </h3>
            <p className="text-sm leading-relaxed text-neutral-700">
              The winning product is not &ldquo;Grab for villages&rdquo;. It is
              a lightweight digital operating layer around existing local
              relationships and cash-based behavior — manual before unnecessary
              automation, phone before unnecessary in-app chat, and money
              movement that every actor can understand.
            </p>
          </div>
        </div>

        {/* Impact */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-white p-5 font-mono sm:p-8">
            <h3 className="mb-4 text-2xl font-black uppercase">
              What it solves
            </h3>
            <ul className="space-y-1.5 text-sm leading-relaxed text-neutral-700">
              <li>
                ▸{" "}
                <strong>No delivery platform designed for rural Vietnam</strong>{" "}
                — connects customers, merchants, drivers and franchise operators
                in one ecosystem.
              </li>
              <li>
                ▸ <strong>Unfair driver competition</strong> — 7-second fair
                dispatch gives drivers time to read address, COD and earnings.
              </li>
              <li>
                ▸ <strong>Opaque money movement</strong> — every balance change
                has a traceable reason, snapshotted at order creation.
              </li>
              <li>
                ▸ <strong>Loose store permission models</strong> —
                capability-based ACL with masked sensitive data and audit
                trails.
              </li>
            </ul>
          </div>
          <div className="border-2 border-black bg-white p-5 font-mono sm:p-8">
            <h3 className="mb-4 text-2xl font-black uppercase">
              What it reduces
            </h3>
            <ul className="space-y-1.5 text-sm leading-relaxed text-neutral-700">
              <li>
                ▸ <strong>Driver cash risk</strong> — closed-loop financial
                model; drivers never personally finance COD.
              </li>
              <li>
                ▸ <strong>Uncontrolled cost exposure</strong> — regional prepaid
                safety lock stops new cost-generating work when funds are
                exhausted.
              </li>
              <li>
                ▸ <strong>API traffic on weak networks</strong> — server-side
                filtering + pagination + caching for historical data.
              </li>
              <li>
                ▸ <strong>Manual coordination</strong> — realtime dispatch,
                tracking and notifications replace phone-based operations.
              </li>
            </ul>
          </div>
        </div>

        {/* Ecosystem */}
        <div className="border-2 border-black bg-white p-5 font-mono sm:p-8">
          <h3 className="mb-2 text-2xl font-black uppercase">The ecosystem</h3>
          <p className="mb-6 text-sm text-neutral-600">
            Three mobile apps plus operational consoles, spanning five actors —
            connected by realtime dispatch, tracking and financial controls.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {ACTORS.map((actor) => (
              <div key={actor.name} className="border-2 border-black p-4">
                <strong className="block text-sm font-black uppercase">
                  {actor.name}
                </strong>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  {actor.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Signature decisions */}
        <div className="border-2 border-black bg-white p-5 font-mono sm:p-8">
          <h3 className="mb-2 text-2xl font-black uppercase">
            Signature product decisions
          </h3>
          <p className="mb-6 text-sm text-neutral-600">
            Selected trade-offs that shaped the platform.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {DECISIONS.map((d) => (
              <div key={d.title} className="border-2 border-black p-4">
                <strong className="block text-sm font-black uppercase">
                  {d.title}
                </strong>
                <p className="mt-3 text-xs leading-relaxed text-neutral-600">
                  <span className="font-black text-black">Problem: </span>
                  {d.problem}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  <span className="font-black text-black">Decision: </span>
                  {d.decision}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  <span className="font-black text-black">Why: </span>
                  {d.why}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack + growth */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-white p-5 font-mono sm:p-8">
            <h3 className="mb-4 text-2xl font-black uppercase">Technology</h3>
            <div className="flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-neutral-600">
              Technology choices were driven by operating constraints — realtime
              dispatch, geolocation, financial safety, multi-tenant region
              scoping, and low operating cost on rural networks.
            </p>
          </div>
          <div className="border-2 border-black bg-white p-5 font-mono sm:p-8">
            <h3 className="mb-4 text-2xl font-black uppercase">
              Quality &amp; growth
            </h3>
            <ul className="space-y-1.5 text-sm leading-relaxed text-neutral-700">
              <li>
                ▸ Real-device QA, regression testing and screenshot evidence as
                part of &ldquo;Done&rdquo;.
              </li>
              <li>
                ▸ Missions &amp; KPI separated from trust; incentive budgets
                capped for financial safety.
              </li>
              <li>
                ▸ Referral codes designed to be read aloud — product adapted to
                real communication behavior.
              </li>
              <li>
                ▸ Weather/ambience brand system with reduced-motion and
                accessibility support.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
