# Agent Prompt: Project Bootstrap — Browser-First Practice Platform

## Objective

Initialize a new project using this architectural blueprint. The project builds a **browser-first practice platform** where learners solve programming exercises, receive instant feedback, and track progress locally — all without a backend judge.

**Target Business Logic:** [INSERT BUSINESS LOGIC HERE]
**Target Language:** [INSERT TARGET LANGUAGE — e.g. Java, Python, JavaScript]

---

## 1. Technical Stack

| Layer | Tool | Purpose |
|---|---|---|
| **Build** | Vite | Fast dev server, multi-entry HTML, TypeScript-first |
| **Language** | TypeScript (strict mode) | Application source language |
| **UI** | Vanilla DOM + CSS | No framework — direct DOM manipulation |
| **Editor** | Monaco Editor | Code editing with syntax highlighting, markers, IntelliSense |
| **Parser** | Tree-sitter (WASM) + language grammar | Fast structural parsing and validation |
| **Compiler** | [INSERT — e.g. teavm-javac] | In-browser compilation of learner code |
| **Runtime** | [INSERT — e.g. TeaVM] + Web Workers | Sandboxed execution with timeout protection |
| **Storage** | IndexedDB + localStorage | Local progress, drafts, and preferences |
| **State** | Event-driven architecture | Actions → Events → State → UI updates |

### Stack non-negotiables
- **No React / Vue / Angular** — Vanilla DOM only
- **No Tailwind** — Vanilla CSS with custom properties
- **No backend** for V1 — Everything runs client-side
- **Web Workers** for all compile and run operations — Never block the UI thread

---

## 2. Core Design Principles

### 2.1 Learner-First Design
Every decision should improve the learning loop: easy to open, easy to understand, easy to run, easy to recover from mistakes.

### 2.2 Browser-First & Serverless
All compilation, execution, grading, and validation run purely in the client browser. Zero backend dependency. Easily hosted on static hosting (Netlify, GitHub Pages, Vercel).

### 2.3 Deterministic State
User actions produce explicit events (`RuntimeEvent`), which reduce to predictable UI states. Same inputs → same outputs, always.

### 2.4 Safe Execution
Untrusted learner code must be strictly sandboxed in Web Workers. Enforce timeouts, output size caps, and recursion guards.

### 2.5 Data-Driven Content
Adding exercises should require editing data files (JSON), not changing compiler/runner code. Use a registry/schema pattern.

### 2.6 Honest Compatibility
Clearly define what language features are supported. Never pretend to support more than what actually works.

### 2.7 Open-Source Friendliness
Small modules with explicit boundaries. Plain JSON content format. Stable interfaces between UI, engine, and content. Low coupling.

---

## 3. System Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                      App Shell                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Catalog Page  │  │ Problem Page │  │ Progress     │  │
│  │ • list/grid   │  │ • statement  │  │ Layer        │  │
│  │ • filters     │  │ • editor     │  │ • local DB   │  │
│  │ • search      │  │ • results    │  │ • drafts     │  │
│  └──────────────┘  └──────┬───────┘  └──────────────┘  │
└────────────────────────────┼────────────────────────────┘
                             │ User clicks "Run"
                             ▼
┌─────────────────────────────────────────────────────────┐
│                 Client Application Core                  │
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │ Exercise Loader│  │ Editor State │  │ Run          │  │
│  │ (JSON → Model) │  │ Manager      │  │ Orchestrator │  │
│  └────────────────┘  └──────────────┘  └──────┬──────┘  │
└───────────────────────────────────────────────┼─────────┘
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                  ▼
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │ Parser Worker│  │Compile Worker│  │Runtime Worker│
  │              │  │              │  │              │
  │ • tree-sitter│  │ • source     │  │ • load       │
  │ • syntax     │  │   assembly   │  │   compiled   │
  │   checks     │  │ • in-browser │  │   artifact   │
  │ • structural │  │   compiler   │  │ • execute    │
  │   validation │  │ • diagnostic │  │   harness    │
  │              │  │   mapping    │  │ • capture    │
  │              │  │              │  │   output     │
  │              │  │              │  │ • enforce    │
  │              │  │              │  │   timeout    │
  └──────────────┘  └──────────────┘  └──────────────┘
```

### Data Flow: Run Lifecycle

1. Learner clicks **Run**
2. Current editor content saved to local draft
3. **Parser Worker** performs structural validation (required class/method checks)
4. **Compile Worker** receives exercise definition + learner source → compiles in-browser
5. If compile fails → diagnostics shown with file/line/column mapping
6. If compile succeeds → **Runtime Worker** loads compiled artifact
7. Runtime executes hidden test harness against learner code
8. Structured result returned (accepted / wrong_answer / runtime_error / etc.)
9. UI presents verdicts per test case
10. Local progress store updates problem state

---

## 4. Directory Structure

```text
project-root/
├── index.html                    # Main entry point
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript strict configuration
├── package.json
│
├── src/
│   ├── main.ts                   # Application entry — bootstrap
│   │
│   ├── app/                      # Application shell
│   │   ├── bootstrap.ts          # Init sequence, dependency wiring
│   │   ├── config.ts             # Environment & feature flags
│   │   ├── constants.ts          # App-wide constants
│   │   └── router.ts             # Simple hash-based routing
│   │
│   ├── editor/                   # Monaco Editor module
│   │   ├── editor-service.ts     # Create, configure, manage editor
│   │   └── editor-state.ts       # Draft sync, marker management
│   │
│   ├── parser/                   # Syntax parsing module
│   │   ├── parser-service.ts     # Tree-sitter integration
│   │   └── structural-validator.ts  # Required class/method checks
│   │
│   ├── compiler/                 # Compilation module
│   │   ├── compiler-worker.ts    # Web Worker: in-browser compile
│   │   └── diagnostic-mapper.ts  # Map errors to editor locations
│   │
│   ├── runner/                   # Execution module
│   │   ├── runtime-worker.ts     # Web Worker: execute + capture
│   │   └── timeout-guard.ts      # Enforce time/output limits
│   │
│   ├── exercise-engine/          # Exercise evaluation engine
│   │   ├── exercise-loader.ts    # Load & validate exercise JSON
│   │   ├── harness-generator.ts  # Generate test harness code
│   │   ├── comparators.ts        # Result comparison strategies
│   │   └── result-mapper.ts      # Build structured RunResult
│   │
│   ├── content/                  # Exercise content (data-driven)
│   │   ├── catalog.json          # Master exercise index
│   │   └── exercises/            # Exercise JSON files by topic
│   │       ├── arrays/
│   │       ├── strings/
│   │       ├── loops/
│   │       ├── conditionals/
│   │       ├── recursion/
│   │       ├── searching/
│   │       ├── sorting/
│   │       ├── classes/
│   │       └── collections/
│   │
│   ├── progress/                 # Local persistence module
│   │   ├── progress-store.ts     # IndexedDB: solved/attempted state
│   │   └── draft-store.ts        # IndexedDB: code drafts per problem
│   │
│   ├── ui/                       # UI components (Vanilla DOM)
│   │   ├── app-shell.ts          # Top-level layout + theme
│   │   ├── pages/
│   │   │   ├── catalog-page.ts   # Problem list with filters
│   │   │   └── problem-page.ts   # Problem detail + editor + output
│   │   └── components/
│   │       ├── problem-card.ts   # Summary card for catalog
│   │       ├── filter-bar.ts     # Topic + difficulty filters
│   │       ├── result-panel.ts   # Test result display
│   │       └── run-controls.ts   # Run/Reset buttons + loading state
│   │
│   ├── shared/                   # Cross-module shared code
│   │   ├── types.ts              # Core types (Exercise, RunResult, etc.)
│   │   ├── events.ts             # RuntimeEvent type definitions
│   │   └── dom-utils.ts          # DOM helper functions
│   │
│   └── styles/                   # Vanilla CSS
│       ├── reset.css             # CSS reset / normalize
│       ├── variables.css         # CSS custom properties (design tokens)
│       ├── app.css               # Global app styles
│       ├── layout.css            # Layout grid/flex utilities
│       ├── editor.css            # Editor panel styles
│       ├── catalog.css           # Catalog page styles
│       └── problem.css           # Problem page styles
│
├── public/                       # Static assets
│   └── wasm/                     # WASM binaries (tree-sitter, compiler)
│
└── docs/                         # Project documentation
    ├── architecture.md
    ├── exercise-schema.md
    ├── tasks.md
    └── bootstrap-prompt.md
```

---

## 5. Module Contracts

### 5.1 App Shell
- **Input:** URL hash
- **Output:** Rendered page (catalog or problem)
- **Owns:** Routing, layout, theme toggle

### 5.2 Editor Module
- **Input:** Starter code string, language ID
- **Output:** Current editor content, markers
- **Owns:** Monaco instance lifecycle, draft triggers

### 5.3 Parser Module
- **Input:** Source code string
- **Output:** Syntax tree, structural validation result
- **Owns:** Tree-sitter WASM lifecycle, grammar loading

### 5.4 Compiler Module
- **Input:** Exercise definition + learner source files
- **Output:** Compiled artifact OR compile diagnostics
- **Owns:** Web Worker lifecycle, diagnostic mapping

### 5.5 Runtime Module
- **Input:** Compiled artifact + test harness
- **Output:** Structured `RunResult`
- **Owns:** Web Worker lifecycle, timeout enforcement

### 5.6 Exercise Engine
- **Input:** Exercise JSON + learner code
- **Output:** Harness source, comparator result, final verdict
- **Owns:** Mode handling (function/class/main), comparator dispatch

### 5.7 Content Module
- **Input:** Topic/difficulty filters
- **Output:** Exercise metadata list, full exercise definitions
- **Owns:** Catalog index, exercise JSON loading

### 5.8 Progress Module
- **Input:** Problem ID, run result
- **Output:** Progress state (attempted/solved), draft code
- **Owns:** IndexedDB schema, storage versioning

---

## 6. Exercise Schema Summary

### 6.1 Exercise Modes

| Mode | Description | Use Case |
|---|---|---|
| `function_implementation` | Learner implements a method; hidden tests call it | Algorithm practice (default V1 mode) |
| `class_implementation` | Learner implements a class; hidden tests use objects | OOP practice |
| `main_program` | Learner writes complete program; output is compared | Beginner I/O tasks |

### 6.2 Required Metadata Fields
`id`, `slug`, `version`, `title`, `summary`, `topic`, `difficulty`, `tags`, `estimatedMinutes`, `mode`, `statement`, `constraints`, `examples`, `editableFiles`, `limits`, `evaluation`

### 6.3 Result Status Values
`accepted`, `wrong_answer`, `compile_error`, `runtime_error`, `time_limit_exceeded`, `platform_error`

### 6.4 Comparator Strategies
`exact_text`, `trimmed_text`, `exact_json`, `unordered_json`, `numeric_tolerance`, `custom_named_comparator`

### 6.5 Topic Taxonomy (V1)
`arrays`, `strings`, `loops`, `conditionals`, `recursion`, `searching`, `sorting`, `math`, `classes`, `collections`

### 6.6 Difficulty Levels
`easy`, `medium`, `hard`

---

## 7. Implementation Phases

### Phase M0 — Foundation & Spike
**Goal:** Prove that the core execution path works in-browser.

**Deliverables:**
1. Initialize Vite project with vanilla TypeScript
2. Create full directory structure skeleton
3. Integrate Monaco Editor with target language support
4. Set up Parser Worker with Tree-sitter WASM
5. Create Compile Worker skeleton (mock or real)
6. Create Runtime Worker skeleton (mock or real)
7. Prove one end-to-end example: edit → compile → run → result

**Exit Criteria:**
- A simple exercise can compile and run inside the browser
- Compile errors are shown in the UI
- Timeout / worker-failure path exists

---

### Phase M1 — Solvable Single-Problem Playground
**Goal:** Deliver the first meaningful learner experience.

**Deliverables:**
1. Problem detail page (statement, examples, constraints)
2. Editor with starter code and reset functionality
3. Run button → compile → execute → display results
4. Local draft persistence (survives browser refresh)
5. Result panel (compile errors, runtime errors, test verdicts)
6. First 5-10 sample exercises authored

**Exit Criteria:**
- A learner can solve one function-style exercise fully in-browser
- Code draft survives refresh
- Accepted / failed results are visible and understandable

---

### Phase M2 — Problem Catalog & Local Progress
**Goal:** Transform the playground into a real practice platform.

**Deliverables:**
1. Problem catalog page (grid/list with summary cards)
2. Topic and difficulty filters
3. Local progress tracking (attempted / solved badges)
4. Recent problems history
5. 15+ exercises across multiple topics

**Exit Criteria:**
- Learner can browse, filter, and solve multiple problems
- Progress badges update after solving

---

### Phase M3 — Stable Exercise Engine
**Goal:** Make the engine reliable for broader content authoring.

**Deliverables:**
1. All 3 exercise modes working
2. Hidden tests without exposing answers
3. Comparator library (exact, trimmed, unordered, numeric)
4. Structural validators (missing class/method/signature)
5. 30+ exercises across all V1 topics

**Exit Criteria:**
- All modes work under one schema
- Hidden tests produce correct verdicts
- New exercises can be added by editing JSON only

---

### Phase M4 — Contributor-Ready Open-Source Baseline
**Goal:** Make the project easy to understand, extend, and contribute to.

**Deliverables:**
1. Polished README with landing-page quality
2. Contributor setup guide
3. Content authoring guide
4. Documented module contracts and boundaries
5. Example exercise packs per topic

**Exit Criteria:**
- A new contributor can run locally and add one problem without editing engine code
- Known limitations are documented

---

## 8. Quality Checklist

### Build Quality
- [ ] `npm run build` passes with zero errors
- [ ] TypeScript strict mode compiles clean
- [ ] No runtime console errors on page load
- [ ] All CSS loads without broken references

### Functional Quality
- [ ] Run lifecycle works end-to-end
- [ ] Compile errors map to correct editor lines
- [ ] Runtime errors show learner-readable messages
- [ ] Draft persistence works across refresh
- [ ] Progress updates after accepted submission
- [ ] Filters produce correct results

### UX Quality
- [ ] Editor has syntax highlighting for target language
- [ ] Loading states shown during compile/run
- [ ] Error states are distinct from success states
- [ ] Mobile-responsive layout (catalog page minimum)
- [ ] Dark/light theme support

### Safety
- [ ] Worker timeout terminates runaway code
- [ ] Output size cap prevents memory exhaustion
- [ ] Compile/run never block the UI thread

---

## 9. User Instructions

> **Before giving this prompt to an agent:**
>
> 1. Replace `[INSERT BUSINESS LOGIC HERE]` with your specific domain description
> 2. Replace `[INSERT TARGET LANGUAGE]` with the learner-facing language (Java, Python, etc.)
> 3. Update the **Technical Stack** table with your specific compiler and runtime tools
> 4. Adjust topic taxonomy in §6.5 to match your domain
> 5. Customize exercise modes if your domain needs different evaluation styles
> 6. Review the directory structure and rename modules that don't apply
>
> **The agent should:**
> - Follow phases M0→M4 strictly in order
> - Complete exit criteria before moving to the next phase
> - Create exercises as data (JSON) not code
> - Never block the UI thread with compile/run operations
> - Use vanilla DOM — no frameworks
