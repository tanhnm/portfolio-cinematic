# Agent Coding Handoff & Project Context

> **Welcome, AI Coding Assistant!**  
> This document is designed to give you **instant, complete, and authoritative context** on this repository so you can hit the ground running without guessing or breaking existing functionality.

---

## 1. Executive Summary & Mission

This repository (**`automation-tools` / `pc_tool_agent`**) is a production-grade, local Windows automation system designed for quality engineering workflows at **Ching Luh (VH / VH4 factories)**.

It provides three primary interfaces:
1. **Model Context Protocol (MCP) STDIO Server (`pc-tool-agent`)**: Connects to AI IDEs/clients (Codex, Claude Desktop, Cursor, Antigravity) providing **47 modular, safety-gated automation tools**.
2. **Autonomous Telegram Bot Agent (`scripts/telegram_bot.py`)**: Remote control bot allowing factory engineers to trigger QMS exports, report combinations, OneDrive sync, and view scheduled tasks from mobile devices (iOS/Android) 24/7.
3. **Quality Report Combiner & Pivot Suite**: High-throughput consolidation of multi-station Excel quality reports (**Bottom Tooling** and **FTT - First Time Through**) with automated pivot tables and OneDrive/SharePoint sync.

---

## 2. Domain & Business Context (Crucial Knowledge)

### A. Factory & QMS Infrastructure
- **Factories**: `VH` (Factory 1) and `VH4` (Factory 4). Default is usually **`VH4`**.
- **QMS Quality Chart**: Web application running at `https://sfc.chingluh.com/vhmes/QA/QAAnalysis.aspx?tree_id=Q503`.
- **Authentication Model**: The QMS uses Windows domain / corporate session cookies. Rather than storing credentials, automation attaches to an **already signed-in Google Chrome session** via the **Chrome DevTools Protocol (CDP) on port `9222`** (`--remote-debugging-port=9222`).
- **ISO Reporting Week**:
  - QMS reporting follows standard ISO weeks (Saturday to Friday cycle in production context).
  - Current/incomplete weeks are detected via `is_qms_week_incomplete(year, week)` and require confirmation before exporting to prevent reporting partial data prematurely.

### B. Report Types
1. **Bottom Report (Production Complete - DO NOT BREAK)**:
   - Stations: `20 OS` (Outsole) and `31 PU` (Polyurethane).
   - "Bottom", "Đế", "All" refers to the entire Bottom suite (both OS and PU).
   - Source inbox: `C:\Users\CHINGLUH\Desktop\Combine File Report\inbox\bottom`
   - Output directory: `C:\Users\CHINGLUH\Desktop\Combine File Report\outputs\bottom`
   - OneDrive target: `C:\Users\CHINGLUH\Ching Luh\QMS - Report Bottom`
   - Combine handler: `CombineReportGateway.combine_bottom()`
2. **FTT Report (First Time Through - Production Complete)**:
   - Covers assembly, stitching, cutting, and QA stages (`Assembly`, `QA`, `HFPA`).
   - Source inbox: `C:\Users\CHINGLUH\Desktop\Combine File Report\inbox\ftt` (or `COMBINE_BASE_DIR/inbox/ftt` in `.env`)
   - Output directory: `C:\Users\CHINGLUH\Desktop\Combine File Report\outputs\ftt` (or `COMBINE_BASE_DIR/outputs/ftt` in `.env`)
   - OneDrive target: `C:\Users\CHINGLUH\Ching Luh\QMS - Report Assembly` (configured in `.env` via `ONEDRIVE_FTT_DIR`)
   - Combine handler: `CombineReportGateway.combine_ftt()` (already registered in `REPORT_REGISTRY`).

---

## 3. Architecture Overview

```mermaid
graph TD
    UserTelegram[Telegram User (iOS / Android)] -->|Commands / NLP| TelegramBot[Telegram Bot Agent (scripts/telegram_bot.py)]
    CodexAI[Codex / Claude / Cursor / Antigravity] -->|MCP STDIO Protocol| MCPServer[MCP Server (transports/mcp.py)]
    
    TelegramBot --> Scheduler[ReportScheduler (Daemon Thread)]
    Scheduler -->|Cron / Cadence| ReportPipeline[Unified Report Pipeline]
    TelegramBot -->|Export / Combine| ReportPipeline
    
    MCPServer --> ToolEngine[ToolEngine (Security & Safety Pipeline)]
    ToolEngine --> Registry[ToolRegistry (47 Registered Tools)]
    
    ReportPipeline --> QMSEngine[QMS Playwright CDP Exporter (qms.py)]
    ReportPipeline --> CombineGateway[CombineReportGateway (combine_report.py)]
    
    Registry --> QMSEngine
    Registry --> CombineGateway
    Registry --> ExcelGateway[Excel openpyxl Gateway]
    Registry --> OutlookGateway[Outlook pywin32 Gateway]
    Registry --> WindowsGateway[Windows Subprocess Gateway]
    
    QMSEngine -->|CDP Port 9222| ChromeSession[Signed-in Chrome QMS Session]
    CombineGateway --> OutputDirs[Local Output & Archive Folders]
    CombineGateway --> OneDrive[OneDrive / SharePoint Sync Folders]
```

### Key Modules & File Map

| Path | Purpose & Responsibility |
| :--- | :--- |
| [`src/pc_tool_agent/qms.py`](file:///c:/Users/CHINGLUH/Desktop/code/automation-tools/src/pc_tool_agent/qms.py) | Playwright CDP exporter. Connects to port 9222, selects factory & stations, sets date bounds, extracts Excel reports with 4x retries and cancel callbacks. |
| [`src/pc_tool_agent/combine_report.py`](file:///c:/Users/CHINGLUH/Desktop/code/automation-tools/src/pc_tool_agent/combine_report.py) | Gateway for scanning inboxes, combining Bottom & FTT workbooks, generating pivot tables, and syncing to OneDrive. |
| [`src/pc_tool_agent/transports/mcp.py`](file:///c:/Users/CHINGLUH/Desktop/code/automation-tools/src/pc_tool_agent/transports/mcp.py) | Model Context Protocol STDIO server. Exposes tools to external AI clients with strict tool-first instructions. |
| [`scripts/telegram_bot.py`](file:///c:/Users/CHINGLUH/Desktop/code/automation-tools/scripts/telegram_bot.py) | Autonomous Telegram agent. Features `ReportDefinition` registry, `ReportScheduler` with JSON persistence, local fast NLP parser + Gemini fallback, and `/restart` capability. |
| [`logs/scheduled_tasks.json`](file:///c:/Users/CHINGLUH/Desktop/code/automation-tools/logs/scheduled_tasks.json) | Persistent storage for scheduled tasks. Automatically loaded on boot. |
| [`run_telegram_bot.bat`](file:///c:/Users/CHINGLUH/Desktop/code/automation-tools/run_telegram_bot.bat) | Windows batch loop runner. Keeps the bot daemon alive and auto-revives it upon restart or crash. |
| [`restart_services.bat`](file:///c:/Users/CHINGLUH/Desktop/code/automation-tools/restart_services.bat) | Safe process management script to kill old bot instances and restart clean. |
| [`tests/`](file:///c:/Users/CHINGLUH/Desktop/code/automation-tools/tests/) | Comprehensive automated test suite (**134 tests**, 100% pass rate). |

---

## 4. Current Implementation Status

### What is Completed & Fully Operational:
1. **Core Runtime & Safety Pipeline**: Pydantic input models, canonical `PathPolicy` directory validation, HMAC confirmation tokens, size-rotating audit logging.
2. **QMS Batch Export**: Full automation for factory `VH` and `VH4`, automatic 4x retries per station on timeout, live Telegram progress notifications, partial file cleanup on abort.
3. **Reusable Multi-Report Architecture**: `ReportDefinition` registry supporting `"bottom"` and `"ftt"`. Functions `handle_combine()` and `handle_sync()` accept `report_type` dynamically.
4. **Schedule Task Engine**: `ReportScheduler` executes weekly/daily/interval tasks in background worker threads, persists tasks to `logs/scheduled_tasks.json`, and supports Telegram commands (`/schedule list`, `add`, `run`, `toggle`, `delete`).
5. **Fast Local NLP & Gemini Fallback**: Trilingual intent parser resolving Vietnamese, English, and Traditional Chinese / Taiwanese queries for export, combine, schedule, sync, status, user administration, and ephemeral prompt management. Includes `/lang` (`/language`) command for instant language preference toggling (`vi`, `zh-TW`, `en`).
6. **Remote Bot Restart**: `/restart` saves state to `restart_state.json`, acknowledges Telegram offset, exits cleanly, and runner brings it back within ~5-8s with completion notification.
7. **MCP Tools Integration**: Universal `MCP_INSTRUCTIONS` enforcing mandatory tool priority and prohibiting hallucinated data across all three supported languages.

### Next Priority (Roadmap for Next Agent):
- **FTT Report Full End-to-End Testing & Refinement**:
  - The `combine_ftt` tool and registry definition are implemented and verified with mock tests.
  - Next step: verify actual multi-station FTT input files (`Assembly`, `QA`, `HFPA`), validate sheet consolidation formats, verify pivot output structures, and configure production schedule cadences for FTT.

---

## 5. Environment & Setup Cheat-Sheet

### Python Environment
- Python version: 3.12+
- Virtual environment: `.venv\` (Windows: `.venv\Scripts\python.exe`)

### Configuration Files
- `.env`: Contains `TELEGRAM_BOT_TOKEN`, `ALLOWED_CHAT_IDS`, and optional `GEMINI_API_KEY`.
- `config.yaml`: Core agent policy, allowed directories, and audit logging configuration.

### Essential Commands

```powershell
# 1. Run full test suite (134 tests)
.venv\Scripts\pytest.exe tests/

# 2. Run telegram bot tests only
.venv\Scripts\pytest.exe tests/test_telegram_bot.py -v

# 3. Check code formatting and types
.venv\Scripts\ruff.exe check .
.venv\Scripts\mypy.exe src

# 4. Check MCP runtime status
.venv\Scripts\python.exe -m pc_tool_agent.cli status

# 5. Start / Restart Telegram Bot
run_telegram_bot.bat
# or silently in background:
wscript.exe start_bot_silent.vbs
```

---

## 6. Golden Rules for Incoming AI Agents

1. **Tool-First Mandate**:
   - **NEVER** fabricate report numbers, create theoretical tables, or simulate file execution.
   - Always call the corresponding tool (`qms_batch_export_quality_chart_reports`, `combine_bottom_report`, `combine_ftt_report`, `combine_scan_inbox`, `combine_sync_report`).
2. **Preserve Bottom Report Stability**:
   - The user has explicitly stated: *"The logic for reporting bottom is fine, don't change any logic about report bottom"*.
   - Keep default `report_type="bottom"` on all shared functions.
3. **Windows & UTF-8 Compatibility**:
   - The user runs on Windows 11. Always ensure UTF-8 encoding (`encoding="utf-8"`, `sys.stdout.reconfigure(encoding="utf-8")`) when dealing with console outputs or batch files.
4. **Non-Blocking Execution**:
   - QMS Playwright exports run synchronously inside threads or via `anyio.to_thread.run_sync`. Never block the main asyncio event loop or the Telegram polling loop.
