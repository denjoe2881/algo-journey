# architecture.md
## algo-journey — Product and System Architecture

Version: 2.0  
Status: M0–M3 complete · M4 partial · M5 (PC Judge + QA) complete  
Repository: `algo-journey`

---

## 1. Product intent

`algo-journey` is an open-source browser-based practice platform for university Java courses. Students solve programming exercises — from classic algorithms and data structures to object-oriented design and Design Patterns — in a workflow similar to LeetCode.

The product promise is:

- learners open a problem
- read the statement and examples
- write Java code in the browser
- click **Run**
- get feedback immediately
- keep track of progress locally on the same device

This is not only a Java-in-the-browser experiment. It is a learning product centered on:

- **practice**
- **instant feedback**
- **clear problem organization**
- **lightweight deployment**
- **future open-source extension**

---

## 2. Core user experience

### 2.1 Primary learner flow

1. Learner opens the site.
2. Learner browses problems by topic and difficulty.
3. Learner selects a problem.
4. Learner reads the statement, examples, and constraints.
5. Learner writes Java code in the editor.
6. Learner clicks **Run**.
7. The browser compiles and executes the code locally.
8. The learner sees one of the following immediately:
   - compile errors
   - runtime errors
   - wrong answer / failed tests
   - accepted / passed tests
9. The learner’s local progress is updated in browser storage.

### 2.2 Teacher / content author flow

1. Author creates an exercise definition in data form.
2. Author assigns metadata such as topic, difficulty, and tags.
3. Author provides starter code and hidden harness rules.
4. The runtime uses the same generic exercise engine without requiring new runner code.

### 2.3 Contributor flow

1. Contributor clones the repository.
2. Contributor works on UI, runner, parser, content, or storage independently.
3. The system remains modular so contributors do not need to understand the entire stack to improve one part.

---

## 3. Product scope for V1

### 3.1 What V1 must do

V1 must allow a learner to:

- solve beginner and intermediate programming exercises in the browser
- use a Java subset that feels familiar and practical
- receive immediate results without a backend judge
- browse exercises by **topic** and **difficulty**
- keep **progress locally** in the browser

### 3.2 What V1 must not try to do

V1 must not try to become:

- a full Java IDE
- a full Java SE runtime
- a server-side competitive programming judge
- a multi-user account system
- a cloud-synced LMS

That work can come later. V1 should stay small, reliable, and educationally useful.

---

## 4. System principles

### 4.1 Learner-first design

Every major decision should improve the learning loop:

- easy to open
- easy to understand
- easy to run
- easy to recover from mistakes

### 4.2 Honest compatibility

The system must clearly define a supported Java subset instead of pretending to support all of Java.

### 4.3 Browser-first execution

Compilation, execution, and result reporting should happen locally in the browser for the supported Java subset.

### 4.4 Low infrastructure dependency

The system should not require a backend judge for basic Java practice.

### 4.5 Open-source friendliness

Project structure, contracts, and content formats should make it easy for others to contribute.

---

## 5. Supported product capabilities in V1

### 5.1 Problem browsing

Problems must support at least these metadata fields:

- `id`
- `slug`
- `title`
- `topic`
- `difficulty`
- `tags`
- `estimatedMinutes`
- `mode`

Topics are used for learning organization. Current topics (11):

- `arrays` (33 exercises)
- `design` (25 — OOP, Design Patterns)
- `linked-list` (6)
- `mono-stack` (6)
- `strings` (3)
- `math` (3)
- `loops` (2)
- `recursion` (2)
- `sorting` (2)
- `searching` (1)
- `conditionals` (1)

Difficulty should be simple and learner-friendly. Example values:

- easy
- medium
- hard

### 5.2 Problem solving

The learner must be able to:

- read a statement
- see examples
- edit starter code
- run code
- view result details

### 5.3 Result visibility

The learner should see clear result categories:

- compile error
- runtime error
- wrong answer
- accepted
- internal platform error

### 5.4 Local progress tracking

V1 must persist enough local data for the learner to continue practice later on the same browser/device.

Minimum local data:

- problem opened history
- code draft per problem
- last run result
- solved / attempted status
- local timestamps

Optional V1 local data if cheap to add:

- number of attempts
- total accepted count
- streak-like views
- filter preferences

---

## 6. Technical direction

V1 uses an open-source browser-first stack:

- **Vite** — build tool with HMR and TypeScript-first configuration
- **TypeScript (strict mode)** — application source language
- **Monaco Editor** — code editor ✅ *implemented*
- **Tree-sitter + tree-sitter-java** — fast syntax parsing and structural checks *(planned — currently using regex-based validation)*
- **teavm-javac** — compile Java source in the browser ✅ *proven (demo page works)*
- **TeaVM** — generate browser-runnable output ✅ *proven*
- **Web Workers** — isolate compile and run stages from the UI thread *(planned — architecture ready)*
- **IndexedDB + localStorage** — local progress and draft persistence ✅ *implemented*

### 6.1 Current implementation status

| Component | Status | Notes |
|---|---|---|
| Vite + TypeScript | ✅ Built | Strict mode, zero errors |
| Monaco Editor | ✅ Built | Java syntax, theme sync, auto-layout |
| Exercise Loader | ✅ Built | File-per-problem (.exercise.ts), filter by topic/difficulty/search |
| Progress Store | ✅ Built | IndexedDB for progress + drafts, localStorage for recent/theme |
| Run Orchestrator | ✅ Built | Mock compiler with structural checks |
| Catalog UI | ✅ Built | Problem cards, filters, stats bar, animations |
| Problem Detail UI | ✅ Built | Split layout, examples, constraints, hints |
| Result Panel | ✅ Built | Test cases, compile errors, status summary |
| Dark/Light Theme | ✅ Built | Persisted toggle with full token system |
| Content Library | ✅ Built | 84 exercises across 11 topics |
| PC Judge Generator | ✅ Built | Converts exercises to standalone JDK grading packages |
| PC Judge Verification | ✅ Built | Automated reference solution testing + suspicious test detection |
| JaCoCo Coverage | ✅ Built | Line/branch/method coverage measurement per exercise |
| Tree-sitter Parser | 🔲 Planned | Currently regex-based class/method validation |
| Web Worker Pipeline | 🔲 Planned | Architecture designed, not yet implemented |

This direction was chosen because it supports the product goals well:

- real Java-like syntax
- no backend judge for the supported subset
- good enough standard collections for teaching
- modular and extensible architecture

---

## 7. Java support model

### 7.1 Supported language shape for V1

The supported subset should include:

- one or more classes per exercise where practical
- fields
- constructors
- instance methods
- static methods
- primitives
- `String`
- arrays
- loops
- conditionals
- recursion
- basic generics usage in standard collections

### 7.2 Standard library targets for V1

The runner should aim to support common teaching-friendly types such as:

- `List`
- `ArrayList`
- `Map`
- `HashMap`
- `Hashtable`
- `Set`
- `HashSet`
- `Arrays`
- `Collections` for selected methods
- `Math`
- `StringBuilder`

### 7.3 Explicitly unsupported or restricted in V1

- reflection-heavy APIs
- custom class loaders
- threads and executors
- arbitrary filesystem access
- arbitrary networking
- arbitrary third-party dependencies from users

---

## 8. High-level system architecture

```text
App Shell
 ├─ Problem Catalog UI
 ├─ Problem Detail UI
 ├─ Monaco Editor
 ├─ Result / Console Panel
 └─ Progress Layer
        │
        ▼
Client Application Core
 ├─ Exercise Loader
 ├─ Editor State Manager
 ├─ Local Progress Store
 ├─ Run Orchestrator
 └─ Result Mapper
        │
        ├──────────────────────────┐
        ▼                          ▼
Parser Worker                 Compile Worker
 ├─ Tree-sitter               ├─ Source assembly
 ├─ fast syntax checks        ├─ teavm-javac
 └─ structural validation     ├─ diagnostics mapping
                              └─ TeaVM output build
                                     │
                                     ▼
                               Runtime Worker
                               ├─ load compiled artifact
                               ├─ execute hidden harness
                               ├─ capture stdout/stderr
                               ├─ enforce timeout
                               └─ emit structured result
```

---

## 9. Main system modules

### 9.1 App shell

Responsible for:

- routing
- layout
- top-level page composition
- theme and accessibility baseline

### 9.2 Problem catalog module

Responsible for:

- list of problems
- filter by topic
- filter by difficulty
- search by title/tags
- progress indicators in list view

### 9.3 Problem detail module

Responsible for:

- statement
- examples
- constraints
- starter code
- run controls
- result panel

### 9.4 Editor module

Responsible for:

- Monaco integration
- draft synchronization
- markers from parser/compiler
- starter reset

### 9.5 Parser module

Responsible for:

- fast syntax tree build
- structural checks
- optional early validations before compile

Examples:

- required class missing
- required method signature missing
- too many editable classes for a given mode

### 9.6 Compiler module

Responsible for:

- turning learner source into browser-runnable output
- mapping diagnostics back to editor files and lines
- reporting build failures clearly

### 9.7 Runtime module

Responsible for:

- loading compiled output
- executing visible/hidden harness
- enforcing timeout and output size rules
- collecting structured test results

### 9.8 Exercise engine

Responsible for:

- applying the exercise schema
- injecting hidden test harness code
- normalizing input/output comparison
- supporting multiple exercise modes

### 9.9 Local progress module

Responsible for:

- storing progress in local browser storage
- storing drafts safely
- indexing progress by problem id and exercise version

---

## 10. Exercise modes

V1 should support three modes at the schema level, even if rollout is staged.

### 10.1 `main_program`

Learner writes a complete Java program and output is checked.

Best for:

- beginner lessons
- input/output practice
- early control flow tasks

### 10.2 `function_implementation`

Learner fills in one method or class method and hidden tests call it directly. Stress tests can be generated via `javaGenerator`.

Best for:

- algorithm exercises
- LeetCode-style practice
- deterministic evaluation

This is the most important mode for V1.

### 10.3 `class_implementation`

Learner implements a class and hidden tests instantiate objects and call methods. ✅ Fully supported with 25+ exercises.

Best for:

- basic OOP practice
- collections wrappers
- stateful behavior exercises

---

## 11. Run lifecycle

### 11.1 Overview

When the learner clicks **Run**:

1. Current editor content is saved to local draft state.
2. Structural validation runs.
3. Compile worker receives the exercise definition and learner files.
4. Java source is compiled in-browser.
5. If compile fails, diagnostics are shown.
6. If compile succeeds, the runtime worker loads the artifact.
7. Hidden harness executes the tests.
8. Structured result is returned.
9. UI presents verdicts.
10. Local progress store updates the problem state.

### 11.2 Result contract

A run should produce a structured result object with fields like:

- `status`
- `compileDiagnostics`
- `runtimeError`
- `tests[]`
- `stdout`
- `elapsedMs`
- `problemId`
- `exerciseVersion`

---

## 12. Local storage architecture

### 12.1 Why local storage matters

One of the main product ideas is that learners can practice without depending on login or backend persistence.

Therefore, local progress is not a side feature. It is part of the core V1 experience.

### 12.2 Suggested storage domains

The storage layer should separate these concerns:

- `problemProgress`
- `drafts`
- `recentProblems`
- `uiPreferences`

### 12.3 Suggested shapes

#### `problemProgress`

```json
{
  "problemId": "two-sum-basic",
  "exerciseVersion": 1,
  "status": "accepted",
  "attemptCount": 4,
  "lastRunAt": "2026-04-14T09:00:00.000Z",
  "bestResult": {
    "passed": 12,
    "total": 12
  }
}
```

#### `drafts`

```json
{
  "problemId": "two-sum-basic",
  "exerciseVersion": 1,
  "updatedAt": "2026-04-14T09:01:00.000Z",
  "files": {
    "Solution.java": "class Solution { ... }"
  }
}
```

### 12.4 Storage technology

For V1:

- `localStorage` is acceptable for preferences and small summaries
- `IndexedDB` is preferred for code drafts, problem catalogs, and larger structured state

---

## 13. Problem catalog architecture

### 13.1 Catalog requirements

The catalog layer must support:

- static JSON or generated content files in V1
- filtering by topic
- filtering by difficulty
- sorting by title or recommended sequence
- showing learner progress badges from local state

### 13.2 Content packaging

Recommended approach for V1:

- exercise metadata stored in versioned JSON files
- exercise details loaded on demand
- starter code and hidden harness stored separately in content packages

---

## 14. Error handling strategy

### 14.1 Compile errors

Must be mapped to:

- file
- line
- column
- message

### 14.2 Runtime errors

Must be shown in a learner-readable way, without exposing internal worker details unless needed for debugging.

### 14.3 Platform errors

Internal toolchain failures must be distinguishable from learner mistakes.

Examples:

- compiler bootstrap failed
- runtime worker crashed
- unsupported feature encountered

---

## 15. Safety and execution boundaries

Even though V1 is browser-based, the runtime still needs boundaries.

### 15.1 Required limits

- run timeout
- output size cap
- test count cap
- recursion / runaway execution protection where practical

### 15.2 Isolation goals

- compile happens outside the UI thread
- run happens outside the UI thread
- worker termination must be available on timeout or crash

---

## 16. Open-source architecture requirements

To support outside contributors, the architecture should favor:

- small packages with explicit boundaries
- plain JSON exercise definitions
- stable interfaces between UI, runner, and content
- low coupling between product UI and execution engine
- docs that explain intent, not just implementation

---

## 17. Current repository shape

```text
algo-journey/
├─ index.html                    # Entry point
├─ vite.config.ts                # Build configuration
├─ tsconfig.json                 # TypeScript strict config
├─ package.json                  # 8 npm scripts (dev, build, lint, pc-judge, ...)
│
├─ src/
│  ├─ main.ts                    # Bootstrap
│  ├─ app/                       # Config, routing
│  ├─ shared/                    # Cross-module types, events, DOM utils
│  ├─ content/                   # Exercise data
│  │  ├─ _loader.ts              # Vite import.meta.glob auto-discovery
│  │  ├─ _test-utils.ts          # defineTests() + seeded RNG
│  │  └─ problems/               # File-per-problem architecture
│  │     ├─ arrays/              # 33 exercises
│  │     ├─ design/              # 25 exercises (OOP + Design Patterns)
│  │     ├─ linked-list/         # 6 exercises
│  │     ├─ mono-stack/          # 6 exercises
│  │     ├─ strings/             # 3 exercises
│  │     ├─ math/                # 3 exercises
│  │     └─ ...                  # loops, recursion, sorting, etc.
│  ├─ exercise-engine/           # Exercise loading and filtering
│  ├─ runner/                    # Execution pipeline (currently mock)
│  ├─ progress/                  # IndexedDB persistence
│  ├─ ui/                        # Vanilla DOM components
│  └─ styles/                    # Vanilla CSS design system
│
├─ scripts/                      # Instructor CLI tools
│  ├─ generate-pc-judge.ts       # Convert exercises → PC Judge packages
│  ├─ verify-pc-judge.ts         # Verify ref solutions + detect weak tests
│  ├─ coverage-refs.ts           # JaCoCo code coverage per exercise
│  ├─ lint_exercises.ts          # Lint all .exercise.ts / .gen.ts files
│  ├─ export_catalog.ts          # Export catalog to CSV
│  ├─ import_catalog.ts          # Import catalog from CSV
│  ├─ update_order.ts            # Re-order exercises
│  ├─ pc-judge-guide.md          # PC Judge detailed guide
│  └─ README.md                  # Scripts overview
│
├─ docs/                          # Project documentation
│  ├─ architecture.md             # This file
│  ├─ exercise-schema.md          # Exercise schema specification
│  ├─ tasks.md                    # Roadmap and task tracking
│  ├─ CONTRIBUTING.md             # Contributor setup guide
│  ├─ oop-design-patterns.md      # Design doc for OOP exercises
│  ├─ teavm-javac-guide.md        # TeaVM integration guide
│  ├─ bootstrap-prompt.md         # Reusable project template
│  ├─ teavm-javac-demo.html       # Standalone TeaVM demo page
│  └─ problems_catalog.csv        # Exported exercise catalog
│
├─ out/                           # Generated artifacts (gitignored)
│  ├─ pc-judge/                   # PC Judge packages (84 folders)
│  │  ├─ 1_report_starter.json    # Starter code verification report
│  │  ├─ 3_report_ref.json        # Reference solution verification report
│  │  ├─ 4_report_coverage.json   # JaCoCo coverage report
│  │  └─ <slug>/                  # One folder per exercise
│  └─ lib/jacoco/                 # JaCoCo JARs (auto-downloaded)
```



---

## 18. Definition of success for V1

V1 is successful when a learner can:

- browse a list of exercises by topic and difficulty
- open one exercise
- write Java code in the browser
- click **Run**
- receive immediate results without a backend judge
- return later on the same device and still see progress and drafts

---

## 19. Instructor-side quality assurance

The platform includes a full CLI-based pipeline for instructors to create, verify, and quality-control exercises:

| Tool | Command | Purpose |
|------|---------|--------|
| Generator | `npm run pc-judge <slug>` | Convert exercises to standalone JDK packages |
| Batch generator | `npm run pc-judge:all` | Generate all 84 packages |
| Verification | `npm run pc-judge:verify verify-refs` | Verify all reference solutions pass 100% |
| Coverage | `npm run pc-judge:coverage` | Measure JaCoCo line/branch/method coverage |
| Lint | `npm run lint:exercises` | Catch common authoring errors |

See [scripts/pc-judge-guide.md](../scripts/pc-judge-guide.md) for detailed usage.

---

## 20. Future extensions

Future versions may add:

- user accounts and cloud sync
- teacher dashboards
- analytics and submission history
- more languages beyond Java
- hybrid browser + backend judge modes
- classroom assignment workflows

These are future layers. They must not complicate the V1 core.
