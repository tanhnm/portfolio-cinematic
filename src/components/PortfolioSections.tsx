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
    period: "Aug 2026 — current",
    location: "Ben Luc / Long An, Viet Nam",
    highlight: true,
    points: [
      "**Solves:** rural communities in Vietnam have no delivery platform designed for them — urban apps assume cashless users, strong networks and dense cities. Vèo Giao connects **5 actors** (customers, merchants, drivers, regional franchise operators, parent company) across **3 mobile apps + operational web consoles**.",
      "**Reduces:** uncontrolled cost exposure through a **regional prepaid safety lock**, driver cash risk via a **closed-loop financial model** (drivers never personally finance COD), and **unnecessary API traffic** via server-side pagination + caching for weak rural networks.",
      "Designed **fair 7-second driver dispatch** (anti-sniping), **capability-based merchant access control** with masked sensitive data and audit trails, and realtime tracking/geolocation adapted to real delivery workflows.",
      "Built growth mechanics with **hard budget limits**: missions, KPI separated from trust score, and read-aloud referral codes with duplicate protection.",
    ],
  },
  {
    company: "Chingluh Group — RPA / Automation Developer",
    role: "Footwear Manufacturing · Quality & Production Automation",
    period: "May 2026 — Current",
    location: "Ben Luc / Long An, Viet Nam",
    highlight: true,
    points: [
      "Designed and deployed **4 production-grade automation workflows** for **Nike footwear manufacturing**, transforming fragmented weekly quality and production data into standardized, decision-ready reports.",
      "Reduced a **3-day manual reporting process to ~7 minutes** per execution — achieving a **~99.7% reduction in reporting time** while eliminating repetitive data collection, manual consolidation, and human data-entry errors.",
      "Built an end-to-end automation ecosystem using **Power Automate, Python, and Excel Office Scripts (TypeScript)** to extract, validate, clean, transform, and process **large-scale weekly manufacturing datasets** into actionable quality KPIs.",
      "Automated **cross-department data validation, report generation, Outlook distribution, and anomaly alerts**, enabling factory supervisors to receive reliable quality insights faster and make more informed production decisions.",
    ],
  },
  {
    company: "DR Digital — AI Automation & CMS",
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
    role: "Frontend Developer · Dairy Farm Management System",
    period: "Dec 2024 — May 2025",
    location: "Ho Chi Minh, Viet Nam",
    isCapstone: true,
    points: [
      "Developed a full-stack **Dairy Farm Management System** with React Native, React.js and Spring Boot — digitizing end-to-end cattle operations across **5 core modules** and **100+ functions**.",
      "**Feed Management (30 functions):** Built features for ration nutrition adjustments, supplier procurement, feed stock forecasting, and automated nutrient-balance formulations.",
      "**Farm Operations Management (40 functions):** Implemented daily/weekly staff shift scheduling, productivity KPI evaluation, and routine task tracking (milking, cleaning, equipment maintenance).",
      "**Comprehensive 5-Domain Architecture:** Supported integration with **Herd Management** (QR/RFID profiles, veterinary illness logs, insemination cycles), **Milk Production** (harvest & batch dispatch), and real-time anomaly alerts.",
      "**Solves & Reduces:** Replaced manual farm record-keeping with **QR scanning** and operational tracking; reduced data recording errors, manual workload, and feed waste through digital cloud workflows.",
    ],
  },
  {
    company: "FPT Software Academy — Internship",
    role: "Frontend Developer Intern",
    period: "Jan 2024 — Apr 2024",
    location: "Ho Chi Minh, Viet Nam",
    points: [
      "Built **React.js** features and **responsive** interfaces; supported Java Spring Boot backend development.",
      "Integrated REST APIs and database-driven functionality.",
    ],
  },
];

interface CapstoneSubSection {
  title: string;
  items: string[];
}

interface CapstoneModule {
  id: string;
  tabTitle: string;
  title: string;
  subtitle: string;
  functionsCount: string;
  subSections: CapstoneSubSection[];
  priorityMatrix?: Array<{
    rank: number;
    name: string;
    note?: string;
  }>;
}

const CAPSTONE_MODULES: CapstoneModule[] = [
  {
    id: "feed",
    tabTitle: "3. Feed Management",
    title: "3. Feed Management",
    subtitle: "Feed Ration Formulation & Nutritional Analysis",
    functionsCount: "30 Functions",
    subSections: [
      {
        title: "3.1. Feed Ration Management",
        items: [
          "3.1.1. Define and dynamically calibrate feed rations per individual cattle based on nutritional needs.",
          "3.1.2. Record and log actual daily feed consumption per barn group.",
        ],
      },
      {
        title: "3.2. Supplier & Procurement Management",
        items: [
          "3.2.1. Maintain supplier directories (contacts, addresses, quality audit scores).",
          "3.2.2. Order tracking: Real-time monitoring of purchase orders and supplier delivery statuses.",
        ],
      },
      {
        title: "3.3. Inventory Control & Demand Forecasting",
        items: [
          "3.3.1. Real-time tracking of available feed inventory across farm warehouses.",
          "3.3.2. Analyze historical consumption patterns to forecast upcoming feed replenishment demands.",
        ],
      },
      {
        title: "3.4. Order Placement & Dispatch Verification",
        items: [
          "3.4.1. Automated calculation of reorder triggers and replenishment volume thresholds.",
          "3.4.2. Log delivery receipt transactions and analyze supplier fulfillment SLA and lead times.",
        ],
      },
      {
        title: "3.5. Nutritional Profiling & Formula Optimization",
        items: [
          "3.5.1. Inspect and verify nutrient compositions across feed varieties to align with growth phases.",
          "3.5.2. Fine-tune feed formulation recipes based on herd manager feedback and health metrics.",
        ],
      },
    ],
  },
  {
    id: "herd",
    tabTitle: "1. Herd Management",
    title: "1. Herd Management",
    subtitle: "Individual Cattle Profiling & Health Records",
    functionsCount: "30 Functions",
    subSections: [
      {
        title: "1.1. Cattle Profile Management",
        items: [
          "1.1.1. Digital cattle identification and individual record management via QR and RFID tags.",
          "1.1.2. Comprehensive profile retrieval: Integrated health history, lineage, reproductive status, and yield.",
          "1.1.3. Multi-criteria search and filtering (breed, age, physiological status, housing group).",
        ],
      },
      {
        title: "1.2. Health & Veterinary Care Management",
        items: [
          "1.2.1. Herd-wide health monitoring and individual condition scoring.",
          "1.2.2. Full medical record retrieval, clinical diagnostic history, and treatment prescriptions.",
          "1.2.3. Automated scheduling of veterinary clinical examinations and consultations.",
          "1.2.4. Scheduled immunization tracking and routine vaccination records.",
          "1.2.5. Upcoming health calendar: Proactive alerts for vaccinations and routine herd screenings.",
        ],
      },
      {
        title: "1.3. Reproductive Cycle Management",
        items: [
          "1.3.1. End-to-end monitoring of estrus cycles and breeding timelines.",
          "1.3.2. Reproductive cycle tracking (start date, duration, estrus onset, milestone dates).",
          "1.3.3. Mating and artificial insemination logging (procedure date, method, semen lineage origin).",
          "1.3.4. Historical breeding activity, gestation monitoring, and calving records.",
        ],
      },
    ],
  },
  {
    id: "milk",
    tabTitle: "2. Milk Production",
    title: "2. Milk Production Management",
    subtitle: "Yield Tracking & Cold-Chain Logistics",
    functionsCount: "Closed-Loop Process",
    subSections: [
      {
        title: "Milk Harvesting & Yield Analytics",
        items: [
          "Record milk yield harvested per individual cow across daily milking shifts.",
          "Track, reconcile, and audit total daily farm milk production volumes.",
          "Generate comparative milk production reports by cattle profile, herd cohort, and seasonal cycles.",
        ],
      },
      {
        title: "Cold Storage & Batch Logistics",
        items: [
          "Manage outbound milk dispatch from temperature-controlled cold storage facilities.",
          "Track detailed shipment logs dispatched to dairy processing plants (temperatures, timestamps, carrier audits).",
        ],
      },
    ],
  },
  {
    id: "operations",
    tabTitle: "4. Farm Operations",
    title: "4. Farm Operations Management",
    subtitle: "Facility Operations, Staff Shifts & Machinery",
    functionsCount: "40 Functions",
    subSections: [
      {
        title: "4.1. Shift Scheduling & Worker Performance",
        items: [
          "4.1.1. Monitor daily task completion and operational performance for on-site farm operators.",
          "4.1.2. Conduct periodic labor productivity evaluations on weekly or monthly cycles.",
          "4.1.3. Manage flexible shift scheduling, rotation rosters, and worker station assignments.",
          "4.1.4. Generate progress reports and labor productivity KPIs across farm divisions.",
        ],
      },
      {
        title: "4.2. Routine Operations & Sanitation Workflows",
        items: [
          "4.2.1. Track execution of routine operations: milking rotations, barn sanitation, disinfection, and preventative checks.",
          "4.2.2. Task assignment, on-site supervision, and sign-off verification for daily checklists.",
        ],
      },
      {
        title: "4.3. Equipment & Machinery Maintenance",
        items: [
          "4.3.1. Maintain asset registries for milking machines, cooling tanks, and processing hardware.",
          "4.3.2. Real-time status monitoring, operational runtime logging, and inspection compliance.",
          "4.3.3. Incident logging for mechanical failures, wear-and-tear, and malfunction reports.",
          "4.3.4. Automated preventative maintenance scheduling to avoid operational disruption.",
        ],
      },
      {
        title: "4.4. Infrastructure & Facility Management",
        items: [
          "4.4.1. Monitor structural integrity: barn facilities, ventilation shafts, evaporative cooling, and waste management systems.",
          "4.4.2. Facility zoning, spatial planning, and farm infrastructure expansion management.",
          "4.4.3. Incident reporting for facility degradation, leaks, or environmental control faults.",
          "4.4.4. Submit, prioritize, and track maintenance work orders through approval workflows.",
        ],
      },
      {
        title: "4.5. Real-Time Alert Dispatch & Incident Management",
        items: [
          "4.5.1. Instant automated alert broadcasting upon anomaly detection (cattle distress, low feed reserves, equipment faults).",
          "4.5.2. Intelligent incident routing to responsible duty personnel with resolution guidelines.",
          "4.5.3. Real-time incident status tracking (Pending, In-Progress, Resolved).",
          "4.5.4. Centralized incident archive with root-cause analysis and operational audit logs.",
        ],
      },
    ],
  },
  {
    id: "security",
    tabTitle: "5. Security & Priority",
    title: "5. User Security & Implementation Priority Matrix",
    subtitle: "Access Control & Deployment Roadmap",
    functionsCount: "Security & Coordination",
    subSections: [
      {
        title: "5.1. User Management & Access Control",
        items: [
          "Role-based access control (RBAC): Farm Owner, Herd Veterinarian, Warehouse Manager, Operations Worker.",
          "Enterprise data encryption, granular permission scoping, and audit logs for sensitive transactions.",
        ],
      },
    ],
    priorityMatrix: [
      {
        rank: 1,
        name: "Herd Management",
        note: "30 functions (Individual profiling, veterinary health, estrus cycles)",
      },
      {
        rank: 2,
        name: "Farm Operations Management",
        note: "40 functions (Shift scheduling, worker performance & routine tasks)",
      },
      {
        rank: 3,
        name: "Feed Management",
        note: "30 functions (Ration nutrition, warehouse inventory, demand forecasting)",
      },
      {
        rank: 4,
        name: "Milk Production Management",
        note: "Harvest reconciliation, cold-chain storage & batch logistics",
      },
      {
        rank: 5,
        name: "Farm Operations Management",
        note: "Machinery, facility infrastructure, real-time alerts & incident resolution",
      },
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

function CapstoneBreakdown() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-5 border-t border-dashed border-neutral-300 pt-4 font-mono">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex w-full items-center justify-between border-2 border-black bg-white px-3.5 py-2.5 text-left text-xs font-black uppercase transition-all hover:bg-neutral-50 active:translate-y-0.5"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {isExpanded
              ? "Collapse Capstone Architecture Details"
              : "Full 5-Domain Architecture & 100+ Functions (Dairy Farm Management)"}
          </span>
        </span>
        <span className="border border-black bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-800 transition-colors group-hover:bg-black group-hover:text-white">
          {isExpanded ? "▲ Close" : "▼ View Architecture"}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-3 border-2 border-black bg-[#faf9f5] p-3.5 sm:p-5">
          {/* Header summary */}
          <div className="mb-4 border-b border-black/15 pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-block border border-black bg-black px-2 py-0.5 text-[10px] font-black uppercase text-white">
                5 Core Modules · 100+ Functions
              </span>
              <span className="text-[11px] font-bold text-neutral-600">
                End-to-End Dairy Agricultural Architecture
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-700">
              Comprehensive digital platform for commercial dairy operations —
              unifying individual cattle biology, predictive nutrition,
              cold-chain milk yield, field worker shifts, and automated
              real-time operational alerts.
            </p>
          </div>

          {/* Module Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-black/15 pb-3">
            {CAPSTONE_MODULES.map((mod, idx) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`border px-2.5 py-1.5 text-[11px] font-bold transition-all ${
                  activeTab === idx
                    ? "border-black bg-black text-white shadow-sm"
                    : "border-neutral-300 bg-white text-neutral-700 hover:border-black"
                }`}
              >
                {mod.tabTitle}
              </button>
            ))}
          </div>

          {/* Active Module Details */}
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-neutral-300 pb-2">
              <div>
                <h5 className="text-sm font-black text-black">
                  {CAPSTONE_MODULES[activeTab].title}
                </h5>
                <p className="text-xs text-neutral-600">
                  {CAPSTONE_MODULES[activeTab].subtitle}
                </p>
              </div>
              <span className="border border-neutral-400 bg-white px-2 py-0.5 text-[10px] font-bold text-neutral-700">
                {CAPSTONE_MODULES[activeTab].functionsCount}
              </span>
            </div>

            {/* Sub-sections */}
            <div className="grid gap-3">
              {CAPSTONE_MODULES[activeTab].subSections.map((sub, sIdx) => (
                <div
                  key={sub.title + sIdx}
                  className="border border-neutral-300 bg-white p-3 shadow-xs"
                >
                  <h6 className="mb-2 text-xs font-black uppercase text-neutral-800">
                    {sub.title}
                  </h6>
                  <ul className="space-y-1.5 pl-1 text-[11px] leading-relaxed text-neutral-700">
                    {sub.items.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="text-neutral-400">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Priority matrix block if present */}
            {CAPSTONE_MODULES[activeTab].priorityMatrix && (
              <div className="mt-3 border-2 border-black bg-amber-50 p-3">
                <p className="mb-2 text-xs font-black uppercase text-amber-900">
                  Project Implementation Priority Matrix:
                </p>
                <div className="space-y-1.5 text-xs text-amber-950">
                  {CAPSTONE_MODULES[activeTab].priorityMatrix.map((p) => (
                    <div key={p.rank} className="flex items-start gap-2">
                      <span className="font-black text-black">{p.rank}.</span>
                      <div>
                        <strong>{p.name}</strong>
                        {p.note && (
                          <span className="ml-1 text-neutral-700">
                            ({p.note})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

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
    <section
      id="about"
      className="border-t-2 border-black bg-[#f7f7f2]"
      data-reveal
    >
      <SectionHeading
        kicker="About me"
        title="Huynh Nguyen Minh Tan"
        sub="Frontend-focused Software Engineer with production experience across enterprise applications, cross-platform mobile products, realtime systems, and product-driven marketplace workflows."
      />

      <div className="about-layout mx-auto grid max-w-[1500px] gap-6 p-4 sm:p-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-[7vw]">
        <section
          className="experience-panel"
          aria-labelledby="experience-title"
        >
          <div className="experience-panel__intro">
            <div>
              <p className="experience-panel__eyebrow">Selected trajectory</p>
              <h3 id="experience-title">Experience</h3>
            </div>
            <p>
              Product thinking, frontend craft, and practical systems built for
              the people using them.
            </p>
          </div>

          <div className="experience-timeline">
            {EXPERIENCE.map((job, index) => {
              const [company, title] = job.company.split(" — ");
              return (
                <article
                  key={job.company}
                  className={`experience-card ${job.highlight ? "experience-card--featured" : ""}`}
                >
                  <div className="experience-card__rail" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <i />
                  </div>
                  <div className="experience-card__body">
                    <header className="experience-card__header">
                      <div>
                        <p className="experience-card__company">{company}</p>
                        <h4>{title}</h4>
                      </div>
                      <p className="experience-card__period">{job.period}</p>
                    </header>
                    <div className="experience-card__meta">
                      <span>{job.role}</span>
                      <span>{job.location}</span>
                    </div>
                    <ul className="experience-card__points">
                      {job.points.map((point) => (
                        <li key={point}>
                          <span>{renderBold(point)}</span>
                        </li>
                      ))}
                    </ul>
                    {job.isCapstone && <CapstoneBreakdown />}
                  </div>
                </article>
              );
            })}
          </div>
          <div>
            <p className="experience-panel__eyebrow">Education</p>
          </div>
          <div className="education-card">
            <div>
              <strong>FPT University</strong>
              <span>May 2022 — May 2025</span>
            </div>
            <p>Bachelor of Software Engineering</p>
          </div>
        </section>

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
    <section
      id="veogiao"
      className="border-t-2 border-black bg-[#b9efff]"
      data-reveal
    >
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
