# Project Summary for CV & Portfolio — PC Tool Agent (QMS Quality Automation Platform)

> Written from the repo docs (`README.md`, `HANDOFF.md`, `ARCHITECTURE.md`, `SECURITY.md`,
> `TOOLS.md`, `docs/*`) and git history.
> **Before you share this publicly:** internal URLs, credentials, customer/brand names and
> production numbers are left out on purpose. Keep them out of your CV and portfolio too.
> Fill in the `[ ]` placeholders with your own real numbers.

---

## 1. One-line pitch

Designed and built a **local, security-first AI automation platform** for a footwear manufacturer's
quality-engineering team. It downloads, consolidates, analyzes and delivers QMS quality reports
across multiple factories. Users drive it through **natural language** in Vietnamese, English and
Chinese, using an **MCP server for AI IDEs**, a **Telegram bot** and a **React web portal**.

---

## 2. Context & problem

- **Company domain:** Footwear manufacturing (Ching Luh Vietnam), Quality Engineering, multiple
  factory sites (VH, VH2, VH3, VH4, JV, JV2, JVB).
- **Pain points before the project:**
  - Engineers exported reports by hand from an authenticated web QMS (Quality Management System),
    one factory, station and period at a time.
  - They also merged multi-station Excel files (Bottom, FTT, HFPA, COPQ, Re-inspection) by hand,
    built pivots and charts, and updated PowerPoint decks.
  - Weekly and monthly reporting was repetitive, error-prone, and depended on one person sitting
    at a PC.
- **Goal:** Make the whole flow from **acquisition → validation → processing → delivery**
  one command or one sentence, run it on a schedule, and keep data local and auditable.

---

## 3. My role

**Solo developer / automation engineer (end-to-end owner)**: requirements gathering with quality
engineers, architecture, backend, browser automation, data pipelines, frontend, security, testing,
deployment on Windows, and documentation. I also used AI coding agents (Codex, Claude,
Antigravity) as pair programmers and wrote the agent-routing rules (`AGENTS.md`) and handoff
docs for them.

- Period: **Sep 2026 – present** (first commit 2026-09-08)
- Scale: **~28,000 lines of Python** in `src/`, **144+ commits**, **58 test modules**,
  **62 registered tools**

---

## 4. What the system does (features)

### A. Three user interfaces on one shared core
| Interface | What it is |
| :--- | :--- |
| **MCP STDIO Server** | Model Context Protocol server that exposes 60+ safety-gated tools to AI clients (Codex, Claude Desktop, Cursor, Antigravity). |
| **Telegram Bot Agent** | Mobile remote control running 24/7: export, combine, sync, schedule, status, user admin, `/restart` with auto-revival. |
| **Web Automation Portal** | Starlette ASGI backend (REST + WebSocket) and a React 18 + TypeScript + Ant Design frontend. Has real-time chat, command palette, job queue, RBAC and report downloads. |

### B. Automated report pipelines
| Pipeline | Summary |
| :--- | :--- |
| **QMS Quality Chart (Bottom) export** | Playwright attaches over Chrome DevTools Protocol (CDP) to an already signed-in session. It selects factory and stations, sets ISO-week dates, triggers the DevExpress Excel export, retries up to 4 times, and supports cancellation. |
| **FTT (First Time Through) export & combine** | Exports HFPA mes410 and quality tracking, combines them across stations, generates pivot "audit evidence" sheets, and syncs to OneDrive/SharePoint. |
| **HFPA pipeline** | Reconciles QAStation (FTT) with HFPA audit data, finds the Top 5 models and Top 3 defect categories, updates the Excel database, and generates PowerPoint slides and executive briefs. |
| **COPQ (Cost of Poor Quality) pipeline** | Monthly download of 7 factory ERP exports plus 4 FTT reports. It cleans and merges them, classifies defects with SOP rules (touch-up, B/C grade, rework, re-inspection), writes SUMIFS formulas and openpyxl stacked charts, and updates the PPTX deck. |
| **Re-inspection pipeline** | 3 sources × 4 factories (12 files). Builds a master database (7 sheets), a recycle report (4 sheets), and an executive PowerPoint with DrawingML charts, then packages everything into one ZIP. |
| **Report Combiner Suite** | Inbox scan → multi-station consolidation → pivot/executive summary → archive → OneDrive sync. |
| **Scheduler** | Persistent daemon thread for weekly, daily and interval jobs, stored in JSON so jobs survive reboots. |
| **Local PPT translator** | Offline PowerPoint translation (CTranslate2 + SentencePiece + Transformers) backed by a translation-memory database. |

### C. Generic local Windows tools
File ops (atomic writes, backups, recoverable delete), Excel (dry-run, rollback), Outlook via COM
(drafts, gated sending), Windows diagnostics, and browser fetch, download and screenshot.

---

## 5. Architecture highlights

- **Transport-independent core:** `ToolEngine` and `ToolRegistry` don't depend on MCP, Telegram,
  HTTP or CLI. Each transport wraps calls in a `ToolRequest` and gets back a `ToolResponse`.
- **One-way layered dependencies:** Transports → Application root → Core engine & gateways →
  External drivers (Playwright, openpyxl, pywin32).
- **Five-stage safety pipeline on every call:**
  1. Pydantic validation (`extra="forbid"`)
  2. Deny-by-default permissions (`READ`, `WRITE`, `EXECUTE`, `NETWORK`, `EMAIL_SEND`)
  3. Canonical path containment (blocks traversal and sibling-prefix escapes)
  4. **HMAC-signed, single-use, argument-bound confirmation tokens** for risky actions
  5. Size-rotated JSONL audit log with recursive secret redaction
- **Two-tier trilingual NLP:**
  - Tier 1: offline regex intent parser that understands Vietnamese, English and Traditional or
    Simplified Chinese, including Taiwanese footwear terms (大底, 直通率, 成型, 針車…). Runs in
    under 1 ms.
  - Tier 2: Google Gemini Flash fallback with tool-first rules, no invented parameters, and
    replies in the user's language.
- **Fail-closed data acquisition:**
  - Downloads go to staging first. Each batch gets an immutable manifest that checks period,
    factory and schema, plus file hashing.
  - Files are published to the input folder only when the batch is complete.
  - Retries are idempotent (no duplicate files). The system never reports success on partial or
    stale data.
- **Enterprise data protection:**
  - A DLP module masks internal IPs, Windows paths, portal URLs, tokens and PII before any
    prompt goes to the cloud.
  - All report data is processed locally, and the AI only sees execution summaries.
  - Email is limited to an allowlist of internal domains.

---

## 6. Tech stack (keywords for your CV)

- **Languages:** Python 3.12, TypeScript, JavaScript, PowerShell/Batch
- **Backend:** Starlette (ASGI), WebSocket, REST APIs, Pydantic v2, Typer CLI, asyncio/anyio,
  threading
- **AI / LLM:** Model Context Protocol (MCP), Google Gemini API, LLM tool-calling and intent
  routing, prompt engineering, AI-agent orchestration (Codex / Claude / Antigravity), local NMT
  (CTranslate2, Transformers)
- **Automation:** Playwright, Chrome DevTools Protocol (CDP), DOM-based selector engineering,
  Outlook COM (pywin32)
- **Data:** pandas, openpyxl (formulas, pivots, charts), python-pptx (DrawingML charts), Excel
  ETL, SQLite translation memory
- **Frontend:** React 18, Vite, Ant Design, TanStack Query, i18next (vi / en / zh-TW), DOMPurify
- **Integrations:** Telegram Bot API, OneDrive/SharePoint sync, Outlook
- **Quality:** pytest (unit and integration), mypy strict, Ruff, Node test runner
- **Security:** RBAC, HMAC tokens, path policy, DLP/PII redaction, audit logging, least privilege
- **Ops:** Windows services/runners, auto-restart supervision, process locks, health checks, SSH
  reverse tunnel

---

## 7. Measurable results

| Metric | Value |
| :--- | :--- |
| Registered automation tools | **62** (MCP live runtime) |
| Automated regression checks | **322 passed, 0 failures** (Oct 2026 flow audit), plus 12 frontend tests |
| Factories covered | **7** (COPQ), **4** (HFPA / Re-inspection), **2** (weekly Bottom/FTT) |
| Languages supported in NLP | **3** (Vietnamese, English, Chinese) |
| Codebase | ~28k LOC Python, 144+ commits |
| Time saved per report cycle | `[ e.g. from X hours manual → Y minutes ]` ← **fill in your real number** |
| Reports delivered automatically per week/month | `[ fill in ]` |
| Users / engineers using the bot or portal | `[ fill in ]` |

> Tip: recruiters care most about the **time saved** and **error reduction** rows. Ask your manager
> or measure one manual cycle against one automated run.

---

## 8. Ready-to-paste CV bullets

### Short version (3 bullets)
- Built a **local AI-driven automation platform** (Python, MCP, Playwright, React) that downloads,
  consolidates and reports QMS quality data across **7 factories**, cutting report preparation
  from `[X h]` to `[Y min]`.
- Designed a **security-first tool engine**: 62 tools behind Pydantic validation, deny-by-default
  permissions, path containment, HMAC confirmation tokens, DLP redaction and audited execution.
- Shipped **three interfaces on one core**: an MCP server for AI IDEs, a 24/7 Telegram bot with
  trilingual (VI / EN / ZH) natural-language commands, and a real-time React/WebSocket portal with
  RBAC.

### Long version (pick 5–7)
- Architected a transport-independent `ToolEngine` serving MCP (STDIO JSON-RPC), CLI, Telegram
  and a Starlette REST/WebSocket portal through one validated request/response contract.
- Automated authenticated web-QMS exports with **Playwright over Chrome DevTools Protocol**,
  reusing signed-in sessions with no stored credentials. Includes factory switching, date
  injection, retries, cancellation and download settlement.
- Built **fail-closed monthly data acquisition**: staging plus an immutable manifest checks
  period, factory, schema and hash, then files are published atomically. Pipelines run only on
  complete, verified batches.
- Developed Excel/PowerPoint ETL pipelines (pandas, openpyxl, python-pptx) for **COPQ, HFPA, FTT
  and Re-inspection**. They classify defects by SOP rules, rank the Top-N models and defects,
  write SUMIFS formulas and stacked charts, and generate executive decks and ZIP deliverables.
- Implemented a **two-tier trilingual intent parser**: an offline regex parser (<1 ms) with
  footwear domain vocabulary, and a Gemini fallback with tool-first, no-hallucination guardrails
  and language-mirrored replies.
- Added **enterprise data protection**: a DLP layer masks IPs, paths, URLs, tokens and PII before
  cloud calls. Data processing stays local, email is limited to an internal-domain allowlist, and
  RBAC covers both the web and Telegram users.
- Built a persistent job **scheduler** (weekly, daily, interval) and auto-restarting service
  runners, keeping reporting unattended and available 24/7.
- Kept quality high with **pytest (322 regression checks), strict mypy and Ruff**, plus written
  architecture, security and AI-agent handoff documentation.

---

## 9. Portfolio case-study outline

1. **Title:** "From manual Excel to one-sentence reporting: an AI automation platform for
   factory quality data"
2. **Problem:** Manual multi-factory exports and merges, repeated every week and month.
3. **Constraints:**
   - Authenticated corporate QMS, so no stored credentials.
   - Confidential production data, so processing stays local.
   - Windows-only environment.
   - Users speak 3 languages.
4. **Solution:** Show the architecture diagram (copy the mermaid graph from `ARCHITECTURE.md`) and
   the 5-stage safety pipeline sequence diagram.
5. **Key engineering decisions:**
   - Use CDP attach instead of credential storage.
   - Fail closed instead of best effort.
   - Run the regex tier before the LLM tier.
   - Keep one core for all transports.
6. **Demo:**
   - Screenshots of the Telegram chat ("Tải báo cáo tuần 36 VH4 bottom và combine").
   - Web portal chat and command palette.
   - Generated Excel pivot and PowerPoint (blur or replace all real numbers and model names).
7. **Results:** The metrics table from section 7.
8. **Lessons learned:**
   - Idempotent retries.
   - Verifying DOM selectors live instead of guessing them.
   - Isolating subprocess stdin from the MCP pipe.
   - Not claiming success on partial data.

---

## 10. Interview talking points

- **"Hardest bug?"** An HFPA worker subprocess stalled because it inherited the MCP JSON-RPC stdin
  pipe. I fixed it with `stdin=DEVNULL` isolation and cancellation by exact owned PID.
- **"How do you keep AI from making things up?"**
  - Tool-first rules: the LLM only extracts intent and parameters, and real tools produce the data.
  - Missing parameters lead to a clarification question, not a guess.
- **"Security?"**
  - Deny-by-default permissions and HMAC single-use tokens bound to the exact arguments.
  - Canonical path checks and redacted audit logs.
  - DLP before any cloud call.
- **"Reliability?"**
  - Staging plus a manifest, atomic publish, and idempotent retries.
  - Structured terminal status so the UI never shows "success" for partial runs.

---

## 11. Do NOT put in public CV / portfolio

- Internal hostnames/URLs (`sfc.chingluh.com/...`), IPs, Windows user paths
- Passcodes, tokens, chat IDs, `.env` contents
- Customer/brand names, order codes, production volumes, real defect numbers, model names
- Screenshots with real data. Use blurred or synthetic data instead.
