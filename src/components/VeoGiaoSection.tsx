import { SectionHeading, Tag } from "./ui/SectionPrimitives";
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

export default function VeoGiaoSection() {
  return (
    <section
      id="veogiao-detail"
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
            <p className="text-lg font-black">Pre-launch · In development</p>
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
