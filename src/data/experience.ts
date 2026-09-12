interface FlagshipProjectMeta {
  title: string;
  badge: string;
  href: string;
  summary: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  highlight?: boolean;
  isCapstone?: boolean;
  techTags?: string[];
  flagshipProject?: FlagshipProjectMeta;
  points: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Vèo Giao — Founder & Software Engineer",
    role: "Startup · Hyper-local delivery ecosystem · Pre-launch",
    period: "Aug 2026 — current",
    location: "Ben Luc / Long An, Viet Nam",
    highlight: true,
    techTags: [
      "Flutter",
      "React.js",
      "Go / Gin",
      "PostgreSQL",
      "Kafka",
      "WebSocket",
      "Google Cloud Run",
    ],
    flagshipProject: {
      title: "Vèo Giao Startup Ecosystem",
      badge: "Flagship Startup Case Study",
      href: "#veogiao",
      summary:
        "Rural hyper-local delivery platform connecting 5 actors across 3 mobile apps + operational web consoles.",
    },
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
    techTags: [
      "Python 3.12",
      "Playwright / CDP",
      "MCP (Model Context Protocol)",
      "openpyxl",
      "Telegram Bot API",
      "Windows / COM",
      "Power Automate",
    ],
    flagshipProject: {
      title: "PC Tool Agent & Automation Suite",
      badge: "Flagship RPA / Automation Project",
      href: "#pc-tool-agent",
      summary:
        "Safety-gated Windows automation platform: 47 tools across 8 suites, 144 passing tests, 78% coverage, Chrome CDP direct attachment, 4x QMS retries, and atomic Excel consolidation.",
    },
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

export const CAPSTONE_MODULES: CapstoneModule[] = [
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

export const SKILLS: Record<string, string[]> = {
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
