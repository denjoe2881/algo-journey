# algo-journey

A browser-based coding playground for learning algorithms and core object-oriented programming with **Java-like syntax**.

`algo-journey` is designed as a lightweight teaching platform where learners can write code that feels close to real Java, click **Run**, and immediately see output or test results directly in the browser.

The first version focuses on a practical subset of Java for introductory programming, DSA, and basic OOP:

- classes and methods
- arrays and strings
- loops and recursion
- `List`, `ArrayList`
- `Map`, `HashMap`, `Hashtable`
- common utility classes
- function-style and class-based exercises

The project is intentionally built on top of existing open-source tools instead of reinventing a Java parser or browser runtime from scratch.

---

## Why this project exists

Most browser-based coding playgrounds either:

- target JavaScript first,
- require a backend runner,
- or do not fit well for teaching Java fundamentals step by step.

`algo-journey` aims to provide a better learning path:

- code that looks like normal Java,
- execution directly in the browser,
- fast feedback for students,
- low infrastructure cost for early versions,
- an architecture that can grow into a more advanced judge later.

---

## Project goals

### Primary goals

- Let learners write Java-like code in the browser.
- Let them run code instantly without depending on a full backend judge.
- Support the core Java concepts needed for introductory algorithms and OOP.
- Keep the system modular so future versions can add hidden tests, persistence, analytics, submissions, and server-side execution.

### Non-goals for V1

Version 1 is **not** trying to be a full Java SE implementation.

Out of scope for V1:

- full Java compatibility
- arbitrary third-party JAR support
- reflection-heavy features
- dynamic class loading
- file system access
- real networking from user code
- multithreading exercises
- Maven/Gradle-style package management
- full IDE/LSP-grade Java intelligence

---

## Technical direction

The selected V1 stack is:

- **Monaco Editor** for code editing
- **Tree-sitter + tree-sitter-java** for fast syntax parsing and structural analysis
- **teavm-javac** to compile Java source directly in the browser
- **TeaVM** to generate runnable browser output
- **Web Workers** for compile and runtime isolation

This direction gives the best balance for V1:

- close to real Java syntax
- open-source friendly
- browser-first execution
- strong enough support for common collections and class-based exercises
- much faster to implement than building a custom Java interpreter

---

## Supported Java subset for V1

The platform is designed around a **supported Java subset**, not “all Java”.

### Language features

V1 is expected to support:

- one or more classes per exercise
- fields
- constructors
- instance methods
- static methods
- primitive types: `int`, `long`, `double`, `boolean`, `char`
- `String`
- one-dimensional and two-dimensional arrays
- `if`, `else`, `switch` where practical
- `for`, enhanced `for`, `while`, `do while`
- recursion
- simple method overloading if stable
- simple generics usage such as `List<Integer>` and `Map<String, Integer>`

### Core library targets

Collections and common utilities planned for V1 include:

- `List`
- `ArrayList`
- `LinkedList`
- `Map`
- `HashMap`
- `Hashtable`
- `Set`
- `HashSet`
- `Queue`
- `Deque`
- `Stack`
- `Arrays`
- `Collections` (selected methods)
- `Objects`
- `StringBuilder`
- `Math`

### Restricted or unsupported in V1

- `java.lang.reflect.*`
- class loaders
- arbitrary DOM access from user code
- arbitrary network access
- custom module/classpath behavior
- threads and executors

---

## Exercise modes

The platform is planned to support three exercise styles:

### 1. Main program mode
The learner writes a full Java program with `main` and runs it to see standard output.

### 2. Function implementation mode
The learner implements a method or solution body, and the platform injects a harness to generate tests and evaluate results.

### 3. Class design mode
The learner implements a class, then the platform creates objects and invokes methods through a harness.

For V1, **function implementation mode** is the main target because it fits algorithm practice best.

---

## High-level architecture

```text
Browser UI
 ├─ Monaco Editor
 ├─ Problem Panel
 ├─ Console / Test Result Panel
 └─ Run Coordinator
        │
        ▼
Analysis Layer
 ├─ Tree-sitter parser
 ├─ syntax tree services
 └─ early structural validation
        │
        ▼
Compile Worker
 ├─ teavm-javac
 ├─ source assembly
 ├─ diagnostics
 └─ TeaVM compilation
        │
        ▼
Run Worker / Sandbox
 ├─ compiled artifact loading
 ├─ harness execution
 ├─ stdout/stderr capture
 ├─ timeout enforcement
 └─ structured result generation
        │
        ▼
Result Processor
 ├─ expected vs actual comparison
 ├─ per-test reporting
 └─ compile/runtime error presentation
