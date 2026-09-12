import { lazy, Suspense, useState } from "react";
import { ErrorBoundary } from "./ui/ErrorBoundary";
import { Tabs } from "./ui/Tabs";

const loadAutomation = () => import("./PcToolAgentSection");
const loadDelivery = () => import("./VeoGiaoSection");
const Automation = lazy(() =>
  loadAutomation().then((module) => ({ default: module.PcToolAgentSection })),
);
const Delivery = lazy(loadDelivery);

const SYSTEMS = [
  {
    value: "request",
    label: "01 / Request",
    title: "One request. A repeatable workflow.",
    code: "request → validate → authorize",
    text: "MCP clients, scheduled jobs and Telegram feed a single tool runtime. Structured inputs keep everyday operations predictable.",
  },
  {
    value: "protect",
    label: "02 / Protect",
    title: "Make the safe path the default.",
    code: "allowlist → contain → confirm",
    text: "Validate the caller and keep file operations inside approved paths. Sensitive actions require an explicit confirmation before execution.",
  },
  {
    value: "recover",
    label: "03 / Recover",
    title: "A timeout is a state to handle.",
    code: "export → verify → retry",
    text: "Station-level recovery checks downloaded files before consolidation. A partial export stays visible instead of masquerading as a complete report.",
  },
  {
    value: "deliver",
    label: "04 / Deliver",
    title: "The output includes its context.",
    code: "combine → audit → deliver",
    text: "Consolidated workbooks travel with source context and audit records, so the next person can understand what happened.",
  },
] as const;

export function SelectedWork() {
  const [step, setStep] = useState<string>("protect");
  const selected = SYSTEMS.find((item) => item.value === step) ?? SYSTEMS[1];
  const [automationOpen, setAutomationOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [actor, setActor] = useState<"driver" | "merchant" | "operator">(
    "driver",
  );
  const actors = {
    driver: {
      heading: "Time to read. Room to decide.",
      detail:
        "A 7-second reading window lets a driver review the address, cash on delivery and earnings before accepting.",
      signal: "07",
      unit: "seconds to understand the order",
      tags: ["Fair dispatch", "Cash exposure controls"],
    },
    merchant: {
      heading: "The right access, at each store.",
      detail:
        "Cashiers, kitchens and accountants have different responsibilities. Capabilities and store scope define what each person can see and do.",
      signal: "ACL",
      unit: "capabilities over broad role labels",
      tags: ["Store scope", "Sensitive data masking"],
    },
    operator: {
      heading: "Stop new spend. Keep the picture.",
      detail:
        "When a regional fund is exhausted, new cost-generating work stops. Reading, reconciliation and active deliveries remain available.",
      signal: "↳",
      unit: "a recoverable operating state",
      tags: ["Regional budgets", "Traceable money movement"],
    },
  };
  const insight = actors[actor];

  return (
    <section
      id="work"
      className="selected-work"
      tabIndex={-1}
      aria-labelledby="work-title"
    >
      <div className="section-intro">
        <div>
          <p className="eyebrow">Selected work / 01—02</p>
          <h2 id="work-title">
            Real constraints.
            <br />
            <i>Considered systems.</i>
          </h2>
        </div>
        <p>
          A closer look at how I turn operational complexity into software
          people can trust. Explore the decisions, then open the full case
          study.
        </p>
      </div>

      <article id="pc-tool-agent" className="project-story" tabIndex={-1}>
        <div className="project-story__brief">
          <div className="project-story__meta">
            <span>01 / Automation</span>
            <span>Manufacturing operations</span>
          </div>
          <h3>
            Less repetition.
            <br />
            <i>More reliability.</i>
          </h3>
          <p>
            PC Tool Agent turns fragmented factory reporting into a controlled
            pipeline: from a QMS request to an auditable Excel workbook.
          </p>
          <dl className="project-facts">
            <div>
              <dt>My role</dt>
              <dd>Automation developer</dd>
            </div>
            <div>
              <dt>Core challenge</dt>
              <dd>Recover safely from partial failure</dd>
            </div>
          </dl>
          <div className="project-tags">
            <span>Python</span>
            <span>MCP</span>
            <span>Chrome CDP</span>
            <span>openpyxl</span>
          </div>
        </div>
        <div className="system-explorer">
          <div className="explorer-heading">
            <span className="status-dot" /> Architecture explorer{" "}
            <span>Interactive</span>
          </div>
          <Tabs
            label="Reporting pipeline"
            items={SYSTEMS}
            value={step}
            onChange={setStep}
          >
            <div className="pipeline-path" aria-hidden="true">
              <span>Request</span>
              <i>→</i>
              <span className="pipeline-path__gate">Safety gate</span>
              <i>→</i>
              <span>Workbook</span>
            </div>
            <code className="system-explorer__code">{selected.code}</code>
            <h4>{selected.title}</h4>
            <p>{selected.text}</p>
          </Tabs>
          <p className="explorer-note">
            Architecture walkthrough · no live system connected
          </p>
        </div>
        <details
          className="case-disclosure"
          onToggle={(event) => setAutomationOpen(event.currentTarget.open)}
        >
          <summary
            onPointerEnter={() => {
              void loadAutomation().catch(() => undefined);
            }}
            onFocus={() => {
              void loadAutomation().catch(() => undefined);
            }}
          >
            <span>
              Inside PC Tool Agent{" "}
              <small>Architecture, recovery, safety & testing</small>
            </span>
            <span className="disclosure-action">
              {automationOpen ? "Close case study" : "Read case study"}{" "}
              <b aria-hidden="true">+</b>
            </span>
          </summary>
          {automationOpen && (
            <ErrorBoundary>
              <Suspense fallback={<CaseSkeleton />}>
                <Automation />
              </Suspense>
            </ErrorBoundary>
          )}
        </details>
      </article>

      <article
        id="veogiao"
        className="project-story project-story--delivery"
        tabIndex={-1}
      >
        <div className="project-story__brief">
          <div className="project-story__meta">
            <span>02 / Vèo Giao</span>
            <span>Pre-launch product</span>
          </div>
          <h3>
            Built for the way
            <br />
            <i>a village moves.</i>
          </h3>
          <p>
            A rural delivery ecosystem shaped by local trust, cash payments and
            imperfect connectivity. Product decisions start with the people
            doing the work.
          </p>
          <dl className="project-facts">
            <div>
              <dt>My role</dt>
              <dd>Founder & software engineer</dd>
            </div>
            <div>
              <dt>Product scope</dt>
              <dd>3 mobile apps · 5 actors</dd>
            </div>
          </dl>
          <div className="project-tags">
            <span>Flutter</span>
            <span>React</span>
            <span>Go</span>
            <span>PostGIS</span>
          </div>
        </div>
        <div className="delivery-explorer">
          <div className="explorer-heading">
            A decision, through their eyes <span>Explore a role</span>
          </div>
          <Tabs
            label="Delivery perspective"
            items={[
              { value: "driver", label: "Driver" },
              { value: "merchant", label: "Merchant" },
              { value: "operator", label: "Operator" },
            ]}
            value={actor}
            onChange={setActor}
          >
            <div className="delivery-signal">
              <strong>{insight.signal}</strong>
              <span>{insight.unit}</span>
            </div>
            <h4>{insight.heading}</h4>
            <p>{insight.detail}</p>
            <div className="project-tags">
              {insight.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </Tabs>
          <p className="explorer-note">
            Product decision study · illustrative interface
          </p>
        </div>
        <details
          className="case-disclosure"
          onToggle={(event) => setDeliveryOpen(event.currentTarget.open)}
        >
          <summary
            onPointerEnter={() => {
              void loadDelivery().catch(() => undefined);
            }}
            onFocus={() => {
              void loadDelivery().catch(() => undefined);
            }}
          >
            <span>
              Inside Vèo Giao{" "}
              <small>Dispatch, money movement & product trade-offs</small>
            </span>
            <span className="disclosure-action">
              {deliveryOpen ? "Close case study" : "Read case study"}{" "}
              <b aria-hidden="true">+</b>
            </span>
          </summary>
          {deliveryOpen && (
            <ErrorBoundary>
              <Suspense fallback={<CaseSkeleton />}>
                <Delivery />
              </Suspense>
            </ErrorBoundary>
          )}
        </details>
      </article>
    </section>
  );
}

export function CaseSkeleton() {
  return (
    <div className="case-skeleton" role="status">
      <span className="sr-only">Loading case study…</span>
      <i />
      <i />
      <i />
    </div>
  );
}
