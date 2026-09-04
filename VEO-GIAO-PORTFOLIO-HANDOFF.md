# VÈO GIAO — PROJECT PORTFOLIO HANDOFF
## Dossier dành cho một AI/agent khác để xây portfolio dự án

> Ngày tổng hợp: 04/09/2026
> Nguồn chính: Trello board “Vèo Giao App”, cùng các tài liệu dự án VEO-GIAO-CONCEPT.md, PROJECT_SUMMARY.md, PROJECT_CONTEXT.md, driver-app-spec.md, BACKLOG_AND_FLOW.md.
>
> **Lưu ý về độ bao phủ Trello:** connector hiện trả kết quả theo từng trang và trong lượt đọc này các truy vấn card bị giới hạn theo page. Vì vậy dossier này tổng hợp toàn bộ **bức tranh dự án và các nhóm công việc/decision đã quan sát được**, nhưng không nên coi danh sách card bên dưới là một export database 100% từng card. Nếu cần portfolio ở mức audit từng card, agent tiếp theo nên tiếp tục paginate/search Trello.

---

# 1. Executive Summary

**Vèo Giao** là một nền tảng giao đồ ăn và logistics **hyper-local**, được thiết kế cho cộng đồng làng/xã, đặc biệt hướng tới Long An và Đồng bằng Sông Cửu Long.

Khác với mô hình “thu nhỏ Grab/ShopeeFood”, Vèo Giao được xây quanh một giả định rất khác:

- cộng đồng nhỏ và có tính địa phương cao;
- người dùng quen biết nhau;
- hạ tầng mạng có thể yếu;
- người dân vẫn dùng tiền mặt;
- tài xế là người địa phương;
- vận hành phải đơn giản và tiết kiệm;
- founding team nhỏ;
- công nghệ chỉ số hóa vừa đủ thay vì tự động hóa mọi thứ.

Điểm nổi bật của dự án không chỉ là “một app giao đồ ăn”, mà là việc thiết kế **một operating model hoàn chỉnh cho logistics cấp làng/xã**, bao gồm:

1. Customer ordering
2. Merchant/store operation
3. Driver dispatch & delivery
4. Regional franchise operation
5. System-level franchise management
6. Closed-loop financial controls
7. Promotions / missions / referral
8. Realtime notification
9. Multi-region scaling
10. QA/regression discipline trên mobile + web + backend

---

# 2. Product Vision

## Core Product Thesis

Vèo Giao là “lớp số hóa mỏng” nằm trên cách vận hành địa phương.

Nguyên tắc:

- Manual before unnecessary automation.
- Phone before unnecessary in-app chat.
- Fixed/simple economics.
- Drivers never personally finance COD.
- Money movement must be understandable.
- Cost-generating features require hard limits.
- Reuse existing product mechanisms instead of creating duplicate systems.

Đây là một product thesis có tính khác biệt cao và rất phù hợp để kể trong portfolio.

## Business Model / Operating Model

Vèo Giao sử dụng mô hình **regional franchise**:

**Parent Company / SYSTEM**
→ tạo và kiểm soát vùng
→ định khung kinh tế
→ cấp vốn vận hành
→ giám sát hệ thống

**Regional Admin / Franchisee**
→ vận hành từng vùng
→ duyệt quán
→ quản lý tài xế
→ xử lý khiếu nại
→ điều chỉnh giá trong khung
→ quản lý ngân sách vùng

**Merchant**
→ vận hành quán
→ menu
→ nhân viên
→ đơn hàng

**Driver**
→ online/offline
→ nhận đơn
→ giao hàng
→ quản lý ký quỹ

**Customer**
→ tìm quán
→ chọn món
→ voucher
→ đặt hàng
→ tracking
→ review

Điểm đáng kể trong portfolio: Vèo Giao không scale bằng cách tập trung toàn bộ vận hành vào HQ; nó scale bằng **nhân bản operator địa phương trong một khung an toàn chung**.

---

# 3. Product Architecture At A Glance

## Five Actors

| Actor | Core responsibility |
|---|---|
| Customer | Discover, cart, voucher, ordering, tracking |
| Driver | Online status, dispatch, delivery, earnings |
| Merchant | Store, menu, staff, orders |
| Regional Admin | Regional operations, driver float, disputes, rates |
| System Operator | Regions, platform economics, franchise funding |

## Three Client Apps

### Customer App
- Store discovery
- Location/address
- Menu
- Product options/modifiers
- Cart
- Checkout
- Voucher wallet
- Orders
- Reorder / favorite stores
- Live delivery tracking
- Notifications
- Weather/ambience experience
- Referral / missions

### Driver App
- Authentication
- Online/offline
- GPS
- Order offers
- 7-second anti-sniping dispatch
- Active deliveries
- Delivery lifecycle
- Driver wallet / float
- Mission & KPI
- Notifications
- Delivery history
- Trust / operational feedback

### Merchant App
- Authentication
- Multi-store handling
- Store profile
- Menu
- Draft/publish workflow
- Stock
- Orders
- Team/ACL
- eKYC
- Notifications
- Store operations

## Web Consoles

### System Console
For parent company.

### Regional Admin Console
For franchise operators.

### Merchant CMS
Web-based store administration mirroring the merchant app flow.

---

# 4. Backend / Platform Capability

The backend documentation describes an enterprise-grade Go platform with:

- Go / Gin
- PostgreSQL
- PostGIS
- GORM
- Redis
- Kafka
- WebSocket
- Firebase Cloud Messaging
- Google Cloud Storage / object storage
- Multi-tenant region scoping
- Ledger-style financial accounting
- JWT authentication
- Capability-based merchant ACL
- Audit logging
- Rate limiting
- Dynamic configuration

The important portfolio story is not merely the technology list. The stronger story is:

> Technology choices were driven by the operating constraints of rural logistics: weak connectivity, realtime dispatch, geographic boundaries, financial safety, and low operating cost.

---

# 5. Signature Product Problems Solved

## 5.1 Fair Driver Dispatch

The project introduced a **7-second anti-sniping mechanism**.

New orders are offered to eligible drivers, but the “accept” action is locked for a short reading window.

Purpose:

- reduce instant order sniping;
- give drivers time to read address/COD/earnings;
- improve perceived fairness;
- prevent one driver from grabbing everything simply because they clicked fastest.

Later dispatch work also introduced **progressive broadcast rings** so orders can expand from nearby drivers toward farther drivers.

This is a strong portfolio feature because it shows product thinking around marketplace fairness rather than simply “send order to nearest driver”.

---

# 6. Closed-Loop Driver Financial Model

One of Vèo Giao’s strongest product concepts is the treatment of driver money.

The original model established:

> Driver never personally finances COD.

The system used driver collateral/float and held balances to ensure a driver had sufficient financial capacity before accepting COD orders.

Later Trello decisions evolved this further.

A major decision card changed the money flow to:

- driver pays the merchant cash at pickup;
- driver collects cash from customer;
- merchant does not need a platform wallet;
- driver wallet becomes primarily an operating/prepaid account for platform regional fees;
- driver wallet should not fall to zero/negative;
- drivers with exhausted balance cannot receive new orders;
- existing active deliveries can be completed before going offline.

This evolution is important for a portfolio because it demonstrates **product model iteration based on operational simplicity**, not blindly preserving the first architecture.

---

# 7. Financial Transparency

The project places unusual emphasis on traceable money movement.

Conceptually:

- Every balance change must have a reason.
- Financial rules are snapshotted at order creation.
- Merchant, driver, region and platform economics are explicitly separated.
- Voucher subsidies are tracked.
- Regional operating budgets are protected.
- Franchise prepaid wallets can lock a region when depleted.

The project also uses append-only ledger concepts and explicit financial entry types.

Portfolio framing:

> Vèo Giao treats financial UX and financial integrity as a product feature, not merely backend accounting.

---

# 8. Regional Franchise Safety

A central product mechanism is the **regional prepaid safety lock**.

Each franchise region has operational financial boundaries.

If the prepaid operating balance is exhausted:

- new customer ordering is blocked;
- merchant write operations are blocked;
- reads remain available;
- financial reconciliation remains available;
- the region can recover by being funded again.

This is a strong example of translating a business risk into a product-level safety mechanism.

---

# 9. Merchant Capability-Based ACL

Merchant staff are not treated as generic “employees”.

The product evolved a capability-based model with presets such as:

- Cashier
- Kitchen
- Manager
- Accountant
- Custom capabilities

Important behaviors observed in Trello:

- staff can be limited to a specific store;
- OWNER can operate across multiple stores;
- sensitive customer information is masked;
- revealing customer contact information is an intentional action;
- sensitive actions can be audited;
- UI permissions should reflect actual capabilities rather than inferred role logic.

This is portfolio-worthy as an example of **fine-grained operational product design**.

---

# 10. Customer Experience Work

A large part of the project is dedicated to making the customer app feel polished and trustworthy.

Observed feature/bug themes include:

### Discovery
- Search
- Nearby stores
- Categories
- Store map
- Voucher strip
- Store favorites
- Reorder

### Cart / Checkout
- Product modifiers
- Discounted product prices
- Correct delivery address coordinates
- Voucher calculation
- Cart persistence safety
- Checkout consistency

### Orders
- Order history
- Realtime tracking
- Driver location
- Store location
- Delivery location
- Cancellation reasons
- Human-readable order codes

### Personalization
- Favorite stores
- Reorder from favorite stores
- Referral
- Missions
- Voucher rewards

### Visual experience
- Seasonal/weather-based ambience
- Day / Rain / Night skins
- Animated backgrounds
- Brand refresh
- Responsive layout fixes
- Safe-area fixes
- Typography and contrast fixes

---

# 11. Weather / Ambience Design

A distinctive visual concept called **Autumn Acorn / Hearth Live** was developed for the customer app.

The idea:

- visual ambience changes between Day / Rain / Night;
- full-screen animated background;
- environmental elements such as wind, leaves, rain, sun/moon/stars;
- optional user switch to disable weather-based visual effects;
- accessibility considerations for reduced motion;
- performance constraints due to low-resource devices.

This is an especially useful portfolio section because it demonstrates that the project was not only operational/product heavy, but also had a deliberate **brand + interaction design direction**.

---

# 12. Brand Evolution

The project received a dedicated Vèo Giao brand refresh.

Observed scope:

- launcher icons for 3 apps;
- login logo;
- Android splash;
- color system;
- shared visual identity;
- green as primary identity direction for driver and merchant apps;
- separate visual identity behavior for customer ambience.

The brand concept connects “Vèo” with the feeling of a fast passing autumn wind.

This can be presented as:

> A rural-first logistics brand was designed to feel local, warm, lightweight and culturally grounded rather than looking like a generic urban delivery clone.

---

# 13. Missions, KPI & Growth Mechanics

The project developed a mission ecosystem.

## Customer Missions
Purpose:
- increase ordering frequency;
- reward repeat behavior with vouchers.

## Driver Missions
Purpose:
- improve driver engagement;
- reward productive behavior;
- support difficult delivery areas.

## Driver KPI
A separate KPI score was explicitly distinguished from trust score.

Important product decision:

- KPI = performance/productivity
- Trust = compliance/safety/reliability

This separation is a strong example of product reasoning: one number should not try to represent two fundamentally different concepts.

## Budget Safety

Mission rewards use explicit budget caps and budget consumption.

This aligns with the project principle:

> Incentives must have hard financial limits.

---

# 14. Referral / Growth

A customer referral flow was implemented around:

- referral code;
- invite tracking;
- qualification on first completed order;
- reward for both parties;
- duplicate protection;
- graceful handling of invalid codes;
- retry behavior for rewards;
- code generation designed to be read aloud.

The referral code intentionally avoids confusing characters because it is designed for people to communicate verbally.

That is a small but excellent portfolio detail: **product decisions are adapted to real-world communication behavior**, not only screen interaction.

---

# 15. Geolocation / Rural Context

Location is central to Vèo Giao.

The project includes:

- nearby store discovery;
- service radius;
- regional boundaries;
- store coordinates;
- driver GPS;
- live tracking;
- map interactions;
- administrative area selection;
- province/ward coverage.

An important evolution occurred around delivery proximity:

The original 300m gate at pickup/completion was later removed because it caused problems when drivers were batching deliveries or forgot to update a state at exactly the expected place.

The preferred product direction became:

> measure and record proximity when useful, but do not unnecessarily block the real-world workflow.

This is another strong portfolio example of choosing **operational resilience over theoretically perfect automation**.

---

# 16. QA Culture

One of the most distinctive aspects of the Trello history is the amount of QA-driven product refinement.

The board contains many cards that are not generic “fix UI” tickets, but very specific observations from real-device testing.

Examples:

- customer address from previous account surviving logout;
- previous customer cart surviving logout;
- notification titles becoming unreadable due to contrast;
- driver marker indistinguishable from store marker;
- map markers being clipped;
- search results hidden below large promotional UI;
- status labels clipped at 360dp;
- merchant settings text clipped at 360dp;
- incorrect order UUID displayed to customers;
- financial values displayed inconsistently;
- outdated merchant accountant description;
- owner incorrectly seeing “Leave Store” action;
- notification badge overload;
- driver order notifications missing;
- new orders occasionally not appearing for drivers.

The project repeatedly uses:

- real Android emulators;
- device-specific dimensions;
- screenshot evidence;
- regression testing;
- widget/unit tests;
- backend integration tests;
- full-flow tests;
- mutation-style testing for weak tests;
- explicit “Done When” criteria.

Portfolio positioning:

> QA was treated as part of product development, not a final-stage checkbox.

---

# 17. Important Engineering/Product Quality Lessons

The Trello history reveals several recurring engineering/product lessons.

## 17.1 Do not trust UI as a security boundary

A card explicitly identified a mismatch where UI masking could not replace backend enforcement.

Lesson:

> Security-sensitive product rules must be enforced at the authoritative layer.

## 17.2 Network failure ≠ empty data

Multiple cards call out cases where network errors were interpreted as “no data”.

This can create dangerous UX such as:

- telling an existing user their phone is unregistered;
- showing an empty ward list;
- making users think a feature has no data.

This became a recurring product rule.

## 17.3 Build should not equal Done

The project explicitly established that:

- tsc/lint/build passing is insufficient;
- real browser/device inspection is required;
- screenshots matter;
- behavior must be verified in realistic conditions.

## 17.4 Test the actual dependency

A notable test-quality issue was discovered where a test copied the implementation logic instead of invoking the actual session-clearing path.

This is a strong engineering lesson:

> A test that reproduces implementation logic can pass while the real integration path is broken.

---

# 18. Notable Trello Feature Groups Observed

The following are representative groups from the board history.

## Platform / Franchise
- System & Admin web portal
- Regional franchise management
- Region assignment
- Regional configuration
- Prepaid safety lock
- Admin region switcher
- Admin store approval
- Menu approval
- Driver financial operations
- Regional dispute handling
- Regional campaign/promotion
- Notification templates

## Merchant
- Merchant app
- Merchant CMS
- Store switcher
- Store-level financial view (later affected by financial model change)
- Menu drafts
- Menu submission
- Stock management
- Store profile
- eKYC
- Team management
- Capability ACL
- Activity logs
- Multi-store ownership

## Driver
- Driver app
- Order dispatch
- 7s anti-sniping
- Progressive broadcast
- Driver wallet/float
- Delivery workflow
- Location tracking
- Driver KPI
- Missions
- Delivery history
- Push notifications
- Driver online safety

## Customer
- Customer app
- Store discovery
- Search
- Cart
- Checkout
- Voucher wallet
- Missions
- Referral
- Favorite stores
- Reorder
- Order history
- Live tracking
- Map
- Notifications
- Ambience
- Brand
- Localization

## Cross-platform
- Pagination
- Cache
- Performance
- Safe areas
- Notifications
- Localization
- Responsive layout
- Accessibility/contrast
- Session isolation
- Real-time updates
- Regression QA

---

# 19. Recent Performance Direction

A major recent initiative is moving historical order lists toward:

**server-side filtering + pagination + client-side/in-memory caching**

Observed work includes:

- driver history pagination + cache;
- customer order history pagination + cache;
- broader request to avoid unnecessary API calls across apps;
- preserve realtime active orders without caching them;
- invalidate only affected historical cache instead of refetching everything.

This direction is particularly relevant for Vèo Giao because the target environment includes:

- rural mobile networks;
- long-lived accounts;
- growing order history;
- limited bandwidth;
- need for low-cost infrastructure.

Portfolio framing:

> Performance work is driven by the economics and connectivity of the target market, not only benchmark numbers.

---

# 20. Product Development Philosophy

The project repeatedly demonstrates these principles:

### Simplicity
Avoid unnecessary automation and unnecessary interaction.

### Local-first
Design around village/commune communities.

### Financial safety
Prevent drivers and franchisees from silently absorbing uncontrolled costs.

### Operational realism
A workflow that works “perfectly” in theory but fails when drivers batch deliveries is not a good workflow.

### Reuse
Reuse voucher systems, notification infrastructure, existing UI mechanisms and established product patterns.

### Explicit boundaries
Every feature has scope, exceptions and failure states.

### Human-readable operations
Money, order codes, statuses, reasons and notifications should be understandable by real operators.

---

# 21. Product Evolution Story

A good portfolio should NOT present Vèo Giao as if every original decision was final.

Instead, present it as an iterative product development journey:

### Phase 1 — Prototype / Local Delivery
- Basic customer ordering
- Merchant operations
- Driver delivery

### Phase 2 — Core Marketplace Mechanics
- Fair dispatch
- Driver float
- Service radius
- COD financial safety
- Realtime tracking

### Phase 3 — Franchise Platform
- System role
- Regional Admin
- Region scoping
- Regional wallets
- Economic bounds
- Franchise safety lock

### Phase 4 — Operational Portals
- Admin CMS
- Merchant CMS
- Team ACL
- eKYC
- Financial operations
- Regional workflows

### Phase 5 — Growth
- Missions
- KPI
- Referral
- Voucher rewards
- Campaigns

### Phase 6 — Product Quality / Scale
- Pagination
- Cache
- Notifications
- Accessibility
- Localization
- Responsive behavior
- Session isolation
- Realtime reliability
- Regression QA

### Phase 7 — Product Model Refinement
- Simplification of merchant financial model
- Re-evaluation of proximity gating
- Better driver wallet semantics
- Stronger performance controls
- Safer cross-account state handling

---

# 22. What Makes This Project Portfolio-Worthy

A generic portfolio could describe this as:

> “Built a food delivery app.”

That would undersell the project.

A stronger positioning is:

> **Designed and built a rural-first hyper-local delivery platform that combines customer ordering, merchant operations, driver dispatch, realtime tracking, regional franchise management and closed-loop financial controls into one operating system for village-scale logistics.**

The strongest portfolio themes are:

1. **Product strategy**
2. **Marketplace design**
3. **Financial systems thinking**
4. **Multi-tenant franchise operations**
5. **Mobile-first rural UX**
6. **Realtime logistics**
7. **Growth mechanics**
8. **Design systems / brand**
9. **Quality engineering**
10. **Iterative product decisions**

---

# 23. Suggested Portfolio Case Study Structure

The next agent should consider this structure:

## Hero
**Vèo Giao**
Hyper-local delivery infrastructure for village communities in Vietnam.

## Problem
Urban delivery platforms assume dense cities, strong connectivity and centralized operations. Rural communities require a different model.

## Product Insight
The winning product is not “Grab for villages”. It is a lightweight digital operating layer around existing local relationships and cash-based behavior.

## Solution
Show:

Customer App
→ Merchant App
→ Driver App
→ Regional Admin
→ System Operator

## Signature Systems
- 7s fair dispatch
- Closed-loop driver money
- Regional safety lock
- Multi-store merchant ACL
- Progressive delivery coverage
- Realtime tracking
- Missions/KPI
- Referral
- Regional franchise model

## Design
Show brand, mobile screens, ambience, maps and operational dashboards.

## Challenges
Highlight:
- weak network;
- cash;
- rural geography;
- driver fairness;
- franchise economics;
- multi-tenant isolation;
- realtime notifications;
- device-size fragmentation.

## Product Decisions
Tell stories about decisions that changed:
- proximity gate removal;
- merchant wallet simplification;
- KPI vs trust separation;
- caching/pagination;
- security boundary improvements.

## Quality
Show real QA evidence:
- emulator testing;
- regression;
- edge cases;
- screenshot verification;
- cross-app consistency.

## Impact / Outcome
Where exact business metrics are unavailable, DO NOT invent them.
Use measurable engineering/product outcomes instead:
- number of client surfaces;
- number of roles;
- major workflows;
- feature coverage;
- QA scope;
- test coverage if verified;
- number of operational modules;
- architectural capabilities.

---

# 24. Facts That Should NOT Be Invented

The next portfolio agent must avoid inventing:

- number of real customers;
- GMV;
- revenue;
- active drivers;
- number of live merchants;
- delivery volume;
- retention;
- production uptime;
- market share;
- geographic rollout beyond documented scope;
- business success metrics not present in the project data.

If metrics are needed, explicitly label them as:
- design target;
- prototype/test data;
- internal QA fixture;
- planned KPI;
- estimated scenario.

Do not present estimates as production outcomes.

---

# 25. Strong Portfolio Narrative

Recommended central narrative:

> **Vèo Giao explores how to redesign food delivery for places that mainstream delivery platforms were not built for.**
>
> Instead of copying urban marketplace patterns, the product starts with the realities of rural Vietnam: local trust, cash, weak networks, small operating teams, motorbike delivery, geographic boundaries and decentralized local operators.
>
> The result is a hyper-local logistics platform where product decisions span the entire system — from the customer’s address and cart, to driver dispatch fairness, merchant operations, franchise economics and financial safety.

---

# 26. Evidence / Source Notes

Key source documents:

- `VEO-GIAO-CONCEPT.md` — product concept and principles.
- `PROJECT_SUMMARY.md` — broad backend/domain/system specification.
- `PROJECT_CONTEXT.md` — system context and business/technical rules.
- `driver-app-spec.md` — detailed driver/platform specification.
- `BACKLOG_AND_FLOW.md` — backlog, epic structure, DoD and development philosophy.
- Trello board `Vèo Giao App` — actual evolution, bugs, decisions, QA findings and delivered work.

The concept document explicitly distinguishes product truth from technical implementation and should be treated as the primary source for product intent.

---

# 27. One-Paragraph Portfolio Version

**Vèo Giao is a hyper-local food delivery and logistics platform designed for village and commune communities in rural Vietnam. Rather than replicating urban delivery marketplaces, the product was designed around local operators, cash-based commerce, weak connectivity and motorbike logistics. The platform spans customer, merchant, driver, regional franchise and parent-company operations, with signature mechanisms including fair 7-second dispatch, closed-loop driver financial controls, regional safety locks, realtime tracking, capability-based merchant access, voucher/missions/referral growth systems and multi-region franchise operations. The project also includes three mobile apps and multiple web consoles, with extensive real-device QA, accessibility, localization, performance and realtime reliability work.**

---

# 28. Short Resume-Style Version

**Vèo Giao — Hyper-local Delivery Platform**
Designed and developed a rural-first delivery ecosystem covering customer ordering, merchant operations, driver dispatch, realtime tracking, regional franchise management and financial controls. Built around rural constraints such as cash payments, weak connectivity, geographic service boundaries and decentralized local operations. Key product systems included fair dispatch, closed-loop driver finance, regional safety controls, merchant ACL, missions/KPI, referral, vouchers and multi-platform operational consoles.

---

# 29. Agent Instructions

When turning this dossier into a portfolio:

1. Tell the **product story**, not a list of tickets.
2. Group Trello work into meaningful product capabilities.
3. Use specific cards as evidence/examples rather than dumping every card.
4. Highlight decisions and trade-offs.
5. Distinguish shipped behavior, QA findings, planned work and rejected/changed ideas.
6. Do not claim business metrics that are not documented.
7. Do not describe every technical implementation detail unless relevant to the case study.
8. Emphasize the rural/local operating context.
9. Show the relationship between customer, merchant, driver and franchise operations.
10. Present the project as an evolving product, not a static specification.
