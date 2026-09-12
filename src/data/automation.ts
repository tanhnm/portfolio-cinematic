/* ---------------- Metric Data ---------------- */
interface MetricItem {
  value: string;
  label: string;
  detail: string;
  highlight?: boolean;
}

export const VERIFIED_METRICS: MetricItem[] = [
  {
    value: "47",
    label: "Automation Tools",
    detail: "Registered across 8 specialized functional suites",
    highlight: true,
  },
  {
    value: "8",
    label: "Tool Suites",
    detail: "QMS, Excel, Scheduler, Filesystem, Telegram, Outlook, Backup, OS",
  },
  {
    value: "144",
    label: "Automated Tests",
    detail: "100% passing pytest unit & integration test suite",
    highlight: true,
  },
  {
    value: "78%",
    label: "Code Coverage",
    detail: "Verified via pytest-cov across core logic",
  },
  {
    value: "32",
    label: "Strict-Typed Files",
    detail: "100% mypy pass with zero type errors",
  },
  {
    value: "4x",
    label: "QMS Retries / Station",
    detail: "Automatic recovery, backoff & orphan file cleanup",
  },
  {
    value: "2",
    label: "Supported Factories",
    detail: "VH & VH4 manufacturing facilities in Long An",
  },
  {
    value: "2",
    label: "Report Families",
    detail: "Bottom & FTT multi-station consolidation pipelines",
  },
  {
    value: "3",
    label: "Scheduling Modes",
    detail: "Weekly, daily, and interval background executions",
  },
  {
    value: "15s",
    label: "Scheduler Poll Rate",
    detail: "Lightweight persistent loop with restart recovery",
  },
  {
    value: "9",
    label: "Systems & Interfaces",
    detail:
      "QMS, CDP, Excel, Outlook, Windows, OneDrive, Telegram, Gemini, MCP",
  },
  {
    value: "23",
    label: "Repository Commits",
    detail: "Sole-author end-to-end automation ownership",
  },
] as const;

export const INTEGRATED_SYSTEMS = [
  {
    name: "Factory QMS",
    role: "Quality Management System intranet web platform",
  },
  {
    name: "Chrome CDP",
    role: "Direct DevTools Protocol attachment (port 9222)",
  },
  {
    name: "Microsoft Excel",
    role: "openpyxl consolidation & pivot generation",
  },
  { name: "Microsoft Outlook", role: "COM-automated distribution & alerts" },
  { name: "Windows OS", role: "PowerShell & Windows process supervision" },
  {
    name: "OneDrive / SharePoint",
    role: "Synchronized enterprise cloud report storage",
  },
  {
    name: "Telegram Bot API",
    role: "Remote bilingual command routing & alerts",
  },
  {
    name: "Google Gemini API",
    role: "Tier-2 natural-language intent fallback",
  },
  {
    name: "Model Context Protocol",
    role: "Standardized STDIO JSON-RPC tool runtime",
  },
] as const;

/* ---------------- 12 Automated Workflow Stages ---------------- */
export const WORKFLOW_STAGES = [
  {
    step: "01",
    name: "Session Attach",
    desc: "Attach to authenticated intranet QMS session via Chrome CDP without credential scraping",
  },
  {
    step: "02",
    name: "Factory Scope",
    desc: "Select and scope target manufacturing plant (VH or VH4) dynamically",
  },
  {
    step: "03",
    name: "Station Filter",
    desc: "Discover, filter, and validate active inspection stations against approved registry",
  },
  {
    step: "04",
    name: "Date Validation",
    desc: "Sanitize, validate, and format target reporting date windows",
  },
  {
    step: "05",
    name: "QMS Query",
    desc: "Trigger server-side QA analysis search queries across station datasets",
  },
  {
    step: "06",
    name: "Export Pipeline",
    desc: "Automate station Excel downloads with 4x retry budget and progress telemetry",
  },
  {
    step: "07",
    name: "Data Verification",
    desc: "Verify file integrity, headers, and row validity; purge partial downloads",
  },
  {
    step: "08",
    name: "Consolidation",
    desc: "Merge station sheets into unified Bottom or FTT master report workbooks",
  },
  {
    step: "09",
    name: "Pivots & Audit",
    desc: "Generate management summary pivots and append immutable audit log sheets",
  },
  {
    step: "10",
    name: "Source Archival",
    desc: "Archive raw station downloads into timestamped zip packages",
  },
  {
    step: "11",
    name: "OneDrive Sync",
    desc: "Synchronize finalized report workbooks to SharePoint / OneDrive cloud folders",
  },
  {
    step: "12",
    name: "Telegram Alerts",
    desc: "Dispatch bilingual execution summaries and delivery status to team channels",
  },
] as const;

/* ---------------- 5 Key Engineering Decisions ---------------- */
export const ENGINEERING_DECISIONS = [
  {
    title: "Chrome CDP Direct Attachment vs. Headless Browser",
    challenge:
      "Factory QMS runs on an internal corporate intranet protected by enterprise SSO, network-level firewalls, and complex session cookies that block typical headless Puppeteer/Playwright logins.",
    decision:
      "Architected the browser engine to attach directly to an already-authenticated, running Chrome session via Chrome DevTools Protocol (CDP) on localhost:9222 with fallback lifecycle handling.",
    outcome:
      "Zero credential scraping or plaintext password storage. Operates seamlessly within authorized corporate sessions while maintaining full DOM and download control.",
  },
  {
    title: "4-Tier Station Export Recovery & Orphan Cleanup",
    challenge:
      "Factory stations frequently experience high query latency or intermittent network drops, causing timeouts, frozen exports, or corrupt '.crdownload' artifacts.",
    decision:
      "Engineered station-level export recovery with a 4-attempt retry budget, exponential backoff, file-size threshold verification, and automatic cleanup of partial downloads upon cancellation or failure.",
    outcome:
      "Batch multi-station exports achieve reliable unattended completion without leaving corrupted temporary files on the host filesystem.",
  },
  {
    title: "Canonical Path Containment & HMAC Action Confirmation",
    challenge:
      "Exposing filesystem manipulation and file-movement tools to LLMs or remote Telegram commands poses severe directory traversal and accidental file corruption risks.",
    decision:
      "Enforced strict canonical path resolution ('pathlib.Path.resolve()') ensuring all I/O is bounded within allowlisted directories; mandated two-step cryptographic HMAC tokens for destructive operations.",
    outcome:
      "Canonical containment rejects traversal attempts; action confirmation and backups reduce the risk of unintended file changes.",
  },
  {
    title: "Deterministic Local Intent Routing with Gemini Fallback",
    challenge:
      "Telegram command interactions need sub-second response times and deterministic behavior even when internet access to cloud LLM APIs is degraded or rate-limited.",
    decision:
      "Implemented a two-tier command parser: Tier 1 uses deterministic regex and structured schema parsing for standard workflows; Tier 2 delegates ambiguous natural-language instructions to the Gemini API with retry handling.",
    outcome:
      "Instant, reliable command routing for daily operational routines with intelligent natural-language flexibility when needed.",
  },
  {
    title: "Atomic Excel Consolidation with Dynamic Pivots & Audit Logs",
    challenge:
      "Combining raw station exports manually was error-prone, destroyed formula linkages, and lacked verifiable provenance for internal quality audits.",
    decision:
      "Built custom openpyxl processing pipelines that atomically assemble raw data tabs, programmatically inject summary formulas and dynamic pivot views, and append a read-only audit log worksheet recording timestamps, source hashes, and operator parameters.",
    outcome:
      "Generated production workbooks are self-contained, mathematically consistent, and instantly auditable by factory management.",
  },
] as const;

/* ---------------- 8 Functional Tool Suites ---------------- */
export const TOOL_SUITES = [
  {
    name: "QMS Automation",
    count: "4 tools",
    tools: [
      "qms_download_quality_chart_report",
      "qms_batch_export_quality_chart_reports",
      "browser_extract_links",
      "browser_screenshot_page",
    ],
    desc: "CDP browser control, station discovery, date filtering, batch downloading with retries",
  },
  {
    name: "Excel Operations",
    count: "9 tools",
    tools: [
      "read_excel",
      "write_excel",
      "create_excel",
      "inspect_excel",
      "append_excel_rows",
      "excel_sheet_operations",
      "combine_bottom_report",
      "combine_ftt_report",
      "combine_generate_pivot",
    ],
    desc: "openpyxl manipulation, schema validation, multi-station merging, pivot generation",
  },
  {
    name: "Report Workflows",
    count: "5 tools",
    tools: [
      "workflow_process_report",
      "workflow_backup_and_update",
      "workflow_prepare_email",
      "workflow_send_prepared_email",
      "combine_sync_report",
    ],
    desc: "End-to-end orchestration, automated archiving, OneDrive sync, and email dispatch",
  },
  {
    name: "Persistent Scheduler",
    count: "3 tools",
    tools: ["schedule_job", "list_scheduled_jobs", "cancel_scheduled_job"],
    desc: "15s evaluation loop, weekly/daily/interval triggers, SQLite/JSON state recovery",
  },
  {
    name: "Filesystem & Storage",
    count: "8 tools",
    tools: [
      "list_files",
      "find_file",
      "get_file_info",
      "copy_file",
      "move_file",
      "delete_file",
      "create_folder",
      "write_text_file",
    ],
    desc: "Strictly canonicalized directory operations bounded inside workspace limits",
  },
  {
    name: "Outlook Integration",
    count: "6 tools",
    tools: [
      "outlook_list_messages",
      "outlook_get_message",
      "outlook_create_draft",
      "outlook_update_draft",
      "outlook_send_email",
      "outlook_get_accounts",
    ],
    desc: "Windows COM automated email generation, recipient validation, attachment linking",
  },
  {
    name: "Windows & System",
    count: "5 tools",
    tools: [
      "windows_system_info",
      "windows_list_processes",
      "windows_get_process_info",
      "windows_launch_app",
      "windows_screenshot",
    ],
    desc: "Host health monitoring, memory supervision, process lifecycle management",
  },
  {
    name: "Security & Diagnostics",
    count: "7 tools",
    tools: [
      "agent_status",
      "get_health_report",
      "validate_path_containment",
      "verify_hmac_token",
      "inspect_audit_log",
      "read_text_file",
      "combine_scan_inbox",
    ],
    desc: "Health probes, HMAC validation, audit log verification, memory & thread diagnostics",
  },
] as const;
