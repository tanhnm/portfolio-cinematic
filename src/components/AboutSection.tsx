import { EXPERIENCE, CAPSTONE_MODULES, SKILLS } from "../data/experience";
import { renderBold } from "./ui/renderBold";
import { useState } from "react";
import { SectionHeading, Tag } from "./ui/SectionPrimitives";
import { CopyEmail, EMAIL } from "./ui/CopyEmail";
import { Tabs } from "./ui/Tabs";
function CapstoneBreakdown() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-5 border-t border-dashed border-neutral-300 pt-4 font-mono">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls="capstone-details"
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
        <div
          id="capstone-details"
          className="mt-3 border-2 border-black bg-[#faf9f5] p-3.5 sm:p-5"
        >
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
          <Tabs
            label="Capstone domains"
            items={CAPSTONE_MODULES.map((mod, idx) => ({
              value: idx,
              label: mod.tabTitle,
            }))}
            value={activeTab}
            onChange={setActiveTab}
          >
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
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about-detail"
      tabIndex={-1}
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

                    {job.flagshipProject && (
                      <div className="mt-4 border-2 border-black bg-white p-3.5 font-mono shadow-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="border border-black bg-sky-200 px-2 py-0.5 text-[10px] font-black uppercase text-black">
                            {job.flagshipProject.badge}
                          </span>
                          <a
                            href={job.flagshipProject.href}
                            className="inline-flex items-center gap-1.5 border border-black bg-black px-2.5 py-1 text-[11px] font-black uppercase text-white hover:bg-neutral-800 transition-colors"
                          >
                            Explore Architecture <span>↗</span>
                          </a>
                        </div>
                        <h5 className="mt-2 text-sm font-black uppercase text-black">
                          {job.flagshipProject.title}
                        </h5>
                        <p className="mt-1 text-xs leading-relaxed text-neutral-600">
                          {job.flagshipProject.summary}
                        </p>
                      </div>
                    )}

                    {job.techTags && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {job.techTags.map((tech) => (
                          <span
                            key={tech}
                            className="border border-neutral-300 bg-white px-2 py-0.5 text-[10px] font-bold text-neutral-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

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
          <div className="education-section">
            <div className="education-section__header">
              <p className="experience-panel__eyebrow">Academic Background</p>
              <h4 className="education-section__title">Education</h4>
            </div>

            <div className="education-card">
              <div className="education-card__rail" aria-hidden="true">
                <span className="education-card__badge">EDU</span>
                <i className="education-card__dot" />
              </div>
              <div className="education-card__body">
                <header className="education-card__header">
                  <div>
                    <p className="education-card__school">FPT University</p>
                    <h5 className="education-card__degree">
                      Bachelor of Software Engineering
                    </h5>
                  </div>
                  <p className="education-card__period">May 2022 — May 2025</p>
                </header>
                <div className="education-card__meta">
                  <span>Major: Software Engineering</span>
                  <span>Ho Chi Minh, Viet Nam</span>
                </div>
              </div>
            </div>
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
              <a className="utility-button" href={`mailto:${EMAIL}`}>
                {EMAIL} ↗
              </a>
              <CopyEmail />
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
