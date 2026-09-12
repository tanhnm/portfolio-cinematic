import {
  VERIFIED_METRICS,
  INTEGRATED_SYSTEMS,
  WORKFLOW_STAGES,
  ENGINEERING_DECISIONS,
  TOOL_SUITES,
} from "../data/automation";
import { Tabs } from "./ui/Tabs";
import { useState } from "react";
import {
  ShieldCheck,
  Terminal,
  Workflow,
  Clock,
  Lock,
  Database,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

export function PcToolAgentSection() {
  const [activeTab, setActiveTab] = useState<
    "suites" | "decisions" | "safety" | "testing"
  >("decisions");

  return (
    <section
      id="pc-tool-agent-detail"
      className="border-t-2 border-black bg-[#faf9f5]"
    >
      {/* ---------------- Section Header ---------------- */}
      <div
        className="border-b-2 border-black bg-white p-6 text-center sm:p-[6vw]"
        data-reveal
      >
        <div className="mx-auto mb-3 flex flex-wrap items-center justify-center gap-2">
          <span className="border-2 border-black bg-black px-2.5 py-0.5 font-mono text-[10px] font-black uppercase text-white">
            Flagship Project · 01
          </span>
          <span className="border border-black bg-sky-200 px-2.5 py-0.5 font-mono text-[10px] font-black uppercase text-black">
            RPA · Workflow Automation · Manufacturing Quality Systems
          </span>
          <span className="border border-neutral-300 bg-neutral-100 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-neutral-700">
            23 Commits · End-to-End Ownership
          </span>
        </div>
        <h2 className="mb-4 font-mono text-3xl font-black uppercase tracking-tight sm:text-5xl">
          PC Tool Agent &amp; Automation Suite
        </h2>
        <p className="mx-auto max-w-[820px] font-mono text-base text-neutral-700 sm:text-lg">
          A safety-gated Windows automation platform that orchestrates factory
          QMS exports, Excel report consolidation, audit summaries, recurring
          schedules, and report delivery through MCP and Telegram.
        </p>
      </div>

      <div className="space-y-8 p-4 sm:p-8 lg:px-[7vw]">
        {/* ---------------- Honest Evidence & Status Banner ---------------- */}
        <div
          className="border-2 border-black bg-white p-5 font-mono sm:p-7"
          data-reveal
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-block h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-black">
                Platform Status: Production Operational · Quality Core Verified
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold">
              <span className="border border-black bg-neutral-100 px-2 py-0.5">
                Bottom Pipeline: Production Validated
              </span>
              <span className="border border-amber-600 bg-amber-50 px-2 py-0.5 text-amber-900">
                FTT Pipeline: Implemented &amp; Mock-Tested (Data Validation
                Pending)
              </span>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-xs font-black uppercase text-neutral-500">
                Business Problem Context
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-800">
                Weekly quality reporting across footwear manufacturing lines
                required repetitive, manual coordination across an authenticated
                QMS intranet application, station-level Excel downloads, local
                folder juggling, multi-file combination scripts, and SharePoint
                synchronization. The manual procedure was vulnerable to missed
                stations, browser timeout stalls, and unrecorded parameters.
              </p>
            </div>
            <div className="border-2 border-dashed border-neutral-300 bg-[#fdfdfb] p-3.5 text-xs text-neutral-700">
              <p className="flex items-center gap-1.5 font-black uppercase text-neutral-900">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Honest Engineering Evidence Boundary
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
                Statements are strictly grounded in verifiable technical
                artifacts: <strong>144 passing tests</strong>,{" "}
                <strong>78% test coverage</strong>, and{" "}
                <strong>32 strict type-checked source files</strong>. No
                speculative ROI, hours-saved figures, or hypothetical
                transaction counts are claimed because the manual pre-automation
                baseline was not formally logged.
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- 12 Verified Metrics Strip ---------------- */}
        <div data-reveal>
          <div className="mb-3 flex items-center justify-between font-mono">
            <p className="text-xs font-black uppercase tracking-widest text-neutral-500">
              [ Verified Technical Metrics ]
            </p>
            <span className="text-[11px] font-bold text-neutral-600">
              12 Defensible System Benchmarks
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {VERIFIED_METRICS.map((metric) => (
              <div
                key={metric.label}
                className={`border-2 border-black p-3.5 font-mono transition-transform hover:-translate-y-0.5 ${
                  metric.highlight ? "bg-sky-50 shadow-xs" : "bg-white"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-black sm:text-3xl">
                    {metric.value}
                  </span>
                  {metric.highlight && (
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  )}
                </div>
                <h4 className="mt-1 text-xs font-black uppercase tracking-tight text-neutral-900">
                  {metric.label}
                </h4>
                <p className="mt-1.5 text-[10px] leading-snug text-neutral-600">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Visual Workflows & Architecture ---------------- */}
        <div
          className="border-2 border-black bg-white p-5 font-mono sm:p-8"
          data-reveal
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                End-to-End Orchestration Architecture
              </p>
              <h3 className="text-xl font-black uppercase text-black sm:text-2xl">
                Dual Control Flow &amp; Safety Pipeline
              </h3>
            </div>
            <span className="border border-black bg-neutral-100 px-2.5 py-1 text-[11px] font-black uppercase">
              STDIO JSON-RPC · Port 9222 CDP · openpyxl
            </span>
          </div>

          {/* Architecture Visual Flow */}
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs font-black uppercase text-neutral-600">
                1. System Narrative Flow:
              </p>
              <div className="grid gap-2 text-xs sm:grid-cols-4">
                <div className="border-2 border-black bg-[#f2f9fa] p-3">
                  <div className="flex items-center gap-1.5 font-black uppercase text-neutral-900">
                    <Terminal className="h-3.5 w-3.5" /> Client Triggers
                  </div>
                  <p className="mt-1.5 text-[11px] text-neutral-600">
                    Telegram Bot API, Codex, CLI commands, or scheduled timers
                  </p>
                </div>
                <div className="border-2 border-black bg-[#fdfdfb] p-3">
                  <div className="flex items-center gap-1.5 font-black uppercase text-neutral-900">
                    <Workflow className="h-3.5 w-3.5" /> Tool Runtime
                  </div>
                  <p className="mt-1.5 text-[11px] text-neutral-600">
                    MCP STDIO JSON-RPC dispatcher, worker threads, local routing
                  </p>
                </div>
                <div className="border-2 border-black bg-amber-50 p-3">
                  <div className="flex items-center gap-1.5 font-black uppercase text-amber-950">
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />{" "}
                    5-Stage Safety Gate
                  </div>
                  <p className="mt-1.5 text-[11px] text-neutral-700">
                    Schema validation, allowlist authorization, path containment
                  </p>
                </div>
                <div className="border-2 border-black bg-[#f4faf4] p-3">
                  <div className="flex items-center gap-1.5 font-black uppercase text-emerald-950">
                    <Database className="h-3.5 w-3.5 text-emerald-700" /> Target
                    Adapters
                  </div>
                  <p className="mt-1.5 text-[11px] text-neutral-600">
                    QMS (Chrome CDP), Excel (openpyxl), Outlook COM, OneDrive
                  </p>
                </div>
              </div>
            </div>

            {/* 5-Stage Safety Pipeline */}
            <div className="border-2 border-black bg-[#faf9f5] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/15 pb-2">
                <span className="text-xs font-black uppercase text-black">
                  2. Defense-in-Depth: 5 Safety Stages
                </span>
                <span className="text-[10px] font-bold text-neutral-500">
                  Zero Trust · Path Canonicalization · HMAC Tokens
                </span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-5 text-xs">
                <div className="border border-black bg-white p-2.5">
                  <span className="block font-black text-neutral-400">
                    01. VALIDATE
                  </span>
                  <strong className="block mt-1 text-black font-black">
                    Pydantic Schemas
                  </strong>
                  <p className="mt-1 text-[10px] text-neutral-600">
                    Strict parameter typing &amp; boundary checks
                  </p>
                </div>
                <div className="border border-black bg-white p-2.5">
                  <span className="block font-black text-neutral-400">
                    02. AUTHORIZE
                  </span>
                  <strong className="block mt-1 text-black font-black">
                    Deny-by-Default
                  </strong>
                  <p className="mt-1 text-[10px] text-neutral-600">
                    Context &amp; caller capability checks
                  </p>
                </div>
                <div className="border border-black bg-white p-2.5">
                  <span className="block font-black text-neutral-400">
                    03. CONTAIN PATH
                  </span>
                  <strong className="block mt-1 text-black font-black">
                    Canonical Isolation
                  </strong>
                  <p className="mt-1 text-[10px] text-neutral-600">
                    Path.resolve() strictly inside allowed root
                  </p>
                </div>
                <div className="border border-black bg-white p-2.5">
                  <span className="block font-black text-neutral-400">
                    04. CONFIRM
                  </span>
                  <strong className="block mt-1 text-black font-black">
                    HMAC Challenge
                  </strong>
                  <p className="mt-1 text-[10px] text-neutral-600">
                    2-step confirmation for destructive edits
                  </p>
                </div>
                <div className="border border-black bg-white p-2.5">
                  <span className="block font-black text-neutral-400">
                    05. AUDIT
                  </span>
                  <strong className="block mt-1 text-black font-black">
                    Redacted Logs
                  </strong>
                  <p className="mt-1 text-[10px] text-neutral-600">
                    Rotating JSONL logs &amp; pre-edit backups
                  </p>
                </div>
              </div>
            </div>

            {/* 8-Stage QMS Pipeline */}
            <div className="border-2 border-black bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/15 pb-2">
                <span className="text-xs font-black uppercase text-black">
                  3. QMS Factory Reporting Pipeline
                </span>
                <span className="text-[10px] font-bold text-neutral-500">
                  VH &amp; VH4 Plants · Station-Level Recovery
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8 text-[11px]">
                {[
                  { n: "01", t: "Session", d: "CDP 9222 attach" },
                  { n: "02", t: "Factory", d: "VH / VH4 pick" },
                  { n: "03", t: "Station", d: "Registry filter" },
                  { n: "04", t: "Date", d: "Window validation" },
                  { n: "05", t: "Search", d: "Query execution" },
                  { n: "06", t: "Export", d: "4x retry loop" },
                  { n: "07", t: "Verify", d: "Row & size check" },
                  { n: "08", t: "Consolidate", d: "openpyxl master" },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="border border-neutral-300 bg-[#fbfbf8] p-2"
                  >
                    <span className="text-[9px] font-black text-neutral-400">
                      {s.n}
                    </span>
                    <p className="font-black text-black">{s.t}</p>
                    <span className="text-[9px] text-neutral-600">{s.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- 12-Stage Transformation Details ---------------- */}
        <div
          className="border-2 border-black bg-white p-5 font-mono sm:p-8"
          data-reveal
        >
          <div className="mb-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
              Operational Impact
            </p>
            <h3 className="text-xl font-black uppercase text-black sm:text-2xl">
              Manual Reporting Challenge → Automated Operating System
            </h3>
            <p className="mt-1 max-w-[760px] text-xs text-neutral-600">
              The automated system replaced an error-prone sequence of
              disconnected manual tasks with a repeatable, self-healing 12-stage
              execution flow.
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {WORKFLOW_STAGES.map((ws) => (
              <div
                key={ws.step}
                className="border border-neutral-300 bg-[#fdfdfb] p-3 hover:border-black transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="border border-black bg-black px-1.5 py-0.2 text-[9px] font-black text-white">
                    STAGE {ws.step}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-400">
                    Automated
                  </span>
                </div>
                <h4 className="mt-2 text-xs font-black uppercase text-black">
                  {ws.name}
                </h4>
                <p className="mt-1 text-[11px] leading-relaxed text-neutral-600">
                  {ws.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Key Engineering Decisions (Challenge / Decision / Outcome) ---------------- */}
        <div
          className="border-2 border-black bg-white p-5 font-mono sm:p-8"
          data-reveal
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b-2 border-black pb-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                Architectural Trade-offs
              </p>
              <h3 className="text-xl font-black uppercase text-black sm:text-2xl">
                Key Engineering Decisions
              </h3>
            </div>
            <span className="text-xs font-bold text-neutral-600">
              5 Defensible Technical Decisions
            </span>
          </div>

          <div className="space-y-4">
            {ENGINEERING_DECISIONS.map((d, idx) => (
              <div
                key={d.title}
                className="border-2 border-black bg-[#faf9f5] p-4 sm:p-5"
              >
                <div className="flex items-center justify-between border-b border-black/15 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="border border-black bg-black px-2 py-0.5 text-[10px] font-black text-white">
                      0{idx + 1}
                    </span>
                    <h4 className="text-sm font-black uppercase text-black sm:text-base">
                      {d.title}
                    </h4>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 text-xs sm:grid-cols-3">
                  <div className="border border-neutral-300 bg-white p-3">
                    <p className="font-black uppercase text-rose-800">
                      Challenge
                    </p>
                    <p className="mt-1 leading-relaxed text-neutral-700">
                      {d.challenge}
                    </p>
                  </div>
                  <div className="border border-neutral-300 bg-white p-3">
                    <p className="font-black uppercase text-sky-800">
                      Engineering Decision
                    </p>
                    <p className="mt-1 leading-relaxed text-neutral-700">
                      {d.decision}
                    </p>
                  </div>
                  <div className="border border-neutral-300 bg-white p-3">
                    <p className="font-black uppercase text-emerald-800">
                      Technical Outcome
                    </p>
                    <p className="mt-1 leading-relaxed text-neutral-700">
                      {d.outcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- 4 Reliability & Safety Pillars ---------------- */}
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono"
          data-reveal
        >
          <div className="border-2 border-black bg-white p-4">
            <div className="flex items-center gap-2 font-black uppercase text-black">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Strict Schemas</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-700">
              All 47 tools validate inputs through Pydantic v2 schemas; 32 core
              Python files pass strict mypy type-checking with zero warnings.
            </p>
          </div>
          <div className="border-2 border-black bg-white p-4">
            <div className="flex items-center gap-2 font-black uppercase text-black">
              <Lock className="h-4 w-4 text-sky-600" />
              <span>Sandbox &amp; Backups</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-700">
              Canonical path containment blocks filesystem breakout; timestamped
              copies are automatically created before modifying target files.
            </p>
          </div>
          <div className="border-2 border-black bg-white p-4">
            <div className="flex items-center gap-2 font-black uppercase text-black">
              <Clock className="h-4 w-4 text-amber-600" />
              <span>Persistent Engine</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-700">
              15-second tick loop with SQLite/JSON state persistence recovers
              pending jobs automatically after machine or process restarts.
            </p>
          </div>
          <div className="border-2 border-black bg-white p-4">
            <div className="flex items-center gap-2 font-black uppercase text-black">
              <AlertTriangle className="h-4 w-4 text-purple-600" />
              <span>Redacted Audit</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-700">
              Rotating JSONL audit logs record caller ID, execution parameters,
              and timestamps, scrubbing passwords, tokens, and sensitive
              headers.
            </p>
          </div>
        </div>

        {/* ---------------- Grouped Technology Stack ---------------- */}
        <div
          className="border-2 border-black bg-white p-5 font-mono sm:p-8"
          data-reveal
        >
          <div className="mb-4 border-b-2 border-black pb-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
              Implementation Ecosystem
            </p>
            <h3 className="text-xl font-black uppercase text-black sm:text-2xl">
              Technology Stack
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-neutral-300 bg-[#fbfbf8] p-3.5">
              <h4 className="mb-2 text-xs font-black uppercase text-black">
                Automation
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Python 3.12",
                  "Playwright",
                  "MCP",
                  "Telegram Bot API",
                  "Worker Threads",
                  "Persistent Scheduler",
                ].map((t) => (
                  <span
                    key={t}
                    className="border border-black bg-white px-2 py-0.5 text-[10px] font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-neutral-300 bg-[#fbfbf8] p-3.5">
              <h4 className="mb-2 text-xs font-black uppercase text-black">
                Data &amp; Reporting
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Excel",
                  "openpyxl",
                  "CSV",
                  "JSON",
                  "YAML",
                  "Pivot & Audit Worksheets",
                ].map((t) => (
                  <span
                    key={t}
                    className="border border-black bg-white px-2 py-0.5 text-[10px] font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-neutral-300 bg-[#fbfbf8] p-3.5">
              <h4 className="mb-2 text-xs font-black uppercase text-black">
                Integration
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Chrome CDP",
                  "Outlook COM",
                  "OneDrive / SharePoint",
                  "Windows APIs",
                  "REST APIs",
                  "STDIO JSON-RPC",
                  "Gemini API",
                ].map((t) => (
                  <span
                    key={t}
                    className="border border-black bg-white px-2 py-0.5 text-[10px] font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-neutral-300 bg-[#fbfbf8] p-3.5">
              <h4 className="mb-2 text-xs font-black uppercase text-black">
                Quality &amp; Security
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Pydantic",
                  "pytest (144)",
                  "pytest-cov (78%)",
                  "mypy (32 files)",
                  "HMAC Tokens",
                  "Canonical Containment",
                  "Redacted Logs",
                  "Backups",
                ].map((t) => (
                  <span
                    key={t}
                    className="border border-black bg-white px-2 py-0.5 text-[10px] font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- 9 Systems & Interfaces ---------------- */}
        <div
          className="border-2 border-black bg-white p-5 font-mono sm:p-8"
          data-reveal
        >
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                Architectural Surface
              </p>
              <span className="border border-black bg-black px-2 py-0.5 text-[10px] font-black uppercase text-white">
                9 Systems &amp; Interfaces
              </span>
            </div>
            <h3 className="mt-1 text-xl font-black uppercase text-black">
              Integrated Platforms &amp; Protocols
            </h3>
            <p className="text-xs text-neutral-600">
              Derived from the concrete Python implementation across browser,
              desktop, cloud, and messaging environments:
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3">
            {INTEGRATED_SYSTEMS.map((sys, idx) => (
              <div
                key={sys.name}
                className="border border-neutral-300 bg-[#fdfdfb] p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-neutral-400">
                    0{idx + 1}
                  </span>
                  <strong className="text-xs font-black uppercase text-black">
                    {sys.name}
                  </strong>
                </div>
                <p className="mt-1 text-[11px] text-neutral-600">{sys.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Interactive Deep-Dive Drawer ---------------- */}
        <div
          className="border-2 border-black bg-[#faf9f5] p-4 font-mono sm:p-6"
          data-reveal
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                Interactive Inspection
              </p>
              <h4 className="text-sm font-black uppercase text-black sm:text-base">
                Tool Suites &amp; Verification Evidence
              </h4>
            </div>
          </div>
          <Tabs
            label="Automation evidence"
            items={[
              { value: "suites", label: "Tool suites (47)" },
              { value: "decisions", label: "Architecture flow" },
              { value: "safety", label: "Security matrix" },
              { value: "testing", label: "Test rigor (144)" },
            ]}
            value={activeTab}
            onChange={setActiveTab}
          >
            {activeTab === "suites" && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {TOOL_SUITES.map((ts) => (
                  <div
                    key={ts.name}
                    className="border border-neutral-300 bg-white p-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-black uppercase text-black">
                        {ts.name}
                      </h5>
                      <span className="border border-black bg-neutral-100 px-1.5 py-0.2 text-[9px] font-bold">
                        {ts.count}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-neutral-600">
                      {ts.desc}
                    </p>
                    <div className="mt-2 space-y-0.5 border-t border-dashed border-neutral-200 pt-2">
                      {ts.tools.map((tool) => (
                        <code
                          key={tool}
                          className="block text-[9px] font-mono text-neutral-700 truncate"
                        >
                          › {tool}
                        </code>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "decisions" && (
              <div className="border border-neutral-300 bg-white p-4">
                <h5 className="text-xs font-black uppercase text-black">
                  QMS Failure Recovery Lifecycle
                </h5>
                <p className="mt-1 text-xs text-neutral-600">
                  Detailed error handling and download reconciliation loop:
                </p>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-start gap-2 border-l-2 border-black pl-3">
                    <span className="font-bold text-black">
                      1. Session Health Check:
                    </span>
                    <span className="text-neutral-700">
                      Verifies CDP connection to port 9222. If disconnected,
                      triggers fallback diagnostic and alerts operator.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 border-l-2 border-black pl-3">
                    <span className="font-bold text-black">
                      2. Station Query Retry:
                    </span>
                    <span className="text-neutral-700">
                      If station export response times out, backoff wait
                      increments (2s, 4s, 8s, 16s) up to 4 attempts.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 border-l-2 border-black pl-3">
                    <span className="font-bold text-black">
                      3. File Completeness Audit:
                    </span>
                    <span className="text-neutral-700">
                      Ensures download header matches expected signature;
                      verifies non-zero byte size before releasing lock.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 border-l-2 border-black pl-3">
                    <span className="font-bold text-black">
                      4. Atomic Rollback:
                    </span>
                    <span className="text-neutral-700">
                      If a station permanently fails, existing station data is
                      preserved and a partial-state warning is dispatched to
                      Telegram.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "safety" && (
              <div className="border border-neutral-300 bg-white p-4">
                <h5 className="text-xs font-black uppercase text-black">
                  Filesystem Containment &amp; HMAC Confirmation Specifications
                </h5>
                <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs">
                  <div className="border border-neutral-200 p-2.5">
                    <strong className="block font-black text-black">
                      Path Allowlisting
                    </strong>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      Resolves real paths using <code>os.path.realpath()</code>.
                      Traversal outside designated workspace directories raises
                      an immediate <code>PermissionDeniedError</code>.
                    </p>
                  </div>
                  <div className="border border-neutral-200 p-2.5">
                    <strong className="block font-black text-black">
                      HMAC-SHA256 Tokens
                    </strong>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      Destructive actions (overwrite, delete, process kill)
                      generate a time-limited token requiring deliberate
                      secondary confirmation.
                    </p>
                  </div>
                  <div className="border border-neutral-200 p-2.5">
                    <strong className="block font-black text-black">
                      Secret Scrubbing
                    </strong>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      Regex scrubbing filters Bearer tokens, Telegram bot keys,
                      and corporate cookies from rotating operational logs
                      before disk writes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "testing" && (
              <div className="border border-neutral-300 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h5 className="text-xs font-black uppercase text-black">
                    Test Rigor: 144 Passing Tests &amp; Coverage Metrics
                  </h5>
                  <span className="border border-emerald-700 bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-800">
                    pytest: 144 PASSED · 0 FAILED
                  </span>
                </div>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-3 text-xs">
                  <div className="border border-neutral-200 p-2.5">
                    <span className="font-black text-black">
                      Unit Tests (86 tests)
                    </span>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      Pydantic schema constraints, path validation logic, HMAC
                      generation, date normalization, regex parsing.
                    </p>
                  </div>
                  <div className="border border-neutral-200 p-2.5">
                    <span className="font-black text-black">
                      Integration &amp; Mock (42 tests)
                    </span>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      Mocked CDP browser sessions, openpyxl workbook assembly,
                      scheduler tick loops, mock Telegram message routing.
                    </p>
                  </div>
                  <div className="border border-neutral-200 p-2.5">
                    <span className="font-black text-black">
                      Static Typing &amp; Lint (16 checks)
                    </span>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      mypy strict configuration across 32 source files with zero
                      type suppresses; full schema documentation.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Tabs>
        </div>

        {/* ---------------- Navigation Bridge ---------------- */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-2 border-black bg-white p-4 font-mono"
          data-reveal
        >
          <div>
            <span className="text-[10px] font-black uppercase text-neutral-400">
              Next in Portfolio
            </span>
            <p className="text-xs font-black uppercase text-black">
              Case Study 02: Vèo Giao (Rural Logistics)
            </p>
          </div>
          <a
            href="#veogiao"
            className="inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 text-xs font-black text-white uppercase hover:bg-sky-200 hover:text-black transition-colors"
          >
            Explore Vèo Giao <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
