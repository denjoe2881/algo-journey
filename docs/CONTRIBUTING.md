# Contributing to algo-journey

Welcome! This guide helps you get started as a contributor to **algo-journey** — a browser-based programming practice platform.

## Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- A modern browser (Chrome, Firefox, Edge)
- Git

### Setup

```bash
git clone https://github.com/your-org/algo-journey.git
cd algo-journey
npm install
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Project Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run lint:exercises` | Lint all `.exercise.ts` and `.gen.ts` files |
| `npm run pc-judge <slug>` | Generate PC Judge package for specific exercise(s) |
| `npm run pc-judge:all` | Generate PC Judge packages for all 84 exercises |
| `npm run pc-judge:verify` | Verify reference solutions (run-starter, verify-refs, clean) |
| `npm run pc-judge:coverage` | Measure JaCoCo code coverage per exercise |
| `npx tsc --noEmit` | TypeScript type check (strict mode) |

---

## Project Architecture

```text
src/
├─ main.ts                    # Application entry point
├─ app/                       # Config, routing
├─ shared/                    # Types, events, DOM utilities
├─ content/                   # Exercise data (catalog + full definitions)
├─ exercise-engine/           # Loading, comparators, structural validation
├─ runner/                    # Execution pipeline (currently mock)
├─ progress/                  # IndexedDB persistence
├─ ui/                        # Vanilla DOM components
│  ├─ app-shell.ts
│  └─ pages/
│     ├─ catalog-page.ts
│     └─ problem-page.ts
└─ styles/                    # Vanilla CSS design system
```

### Key Principles

1. **Vanilla DOM** — No React/Vue/Angular. We use plain TypeScript + CSS.
2. **TypeScript strict mode** — All code must pass `tsc --noEmit` with zero errors.
3. **CSS design tokens** — All colors, spacing, and shadows use CSS custom properties from `variables.css`.
4. **Data-driven exercises** — Adding problems should not require changing engine code.

---

## Adding a New Exercise

This is the most common contribution. With our file-per-problem architecture, you need to create three files in the appropriate topic folder under `src/content/problems/`.

For example, to add a "Two Sum" problem to the `arrays` topic, you would create:

### Step 1: Add the Exercise Definition (`.exercise.ts`)

Create `src/content/problems/arrays/two-sum.exercise.ts`. This file defines the metadata, statement, and starter code.

```typescript
import { defineExercise } from '../../_loader';

export default defineExercise({
  id: 'two-sum',
  version: 1,
  title: 'Two Sum',
  summary: 'Find two numbers that add up to a target.',
  topic: 'arrays',              // Must match one of the defined Topic types
  difficulty: 'easy',           // 'easy' | 'medium' | 'hard'
  tags: ['hash-map'],
  estimatedMinutes: 15,
  order: 99,                    // Display order within the topic
  mode: 'function_implementation',
  
  learningGoals: ['Use HashMap for O(1) lookup'],
  statement: 'Given an array and a target, return indices of the two numbers such that they add up to target.',
  constraints: ['Exactly one valid answer exists.'],
  examples: [
    { input: 'arr = [2, 7, 11, 15], target = 9', output: '[0, 1]' },
  ],
  
  starter: {
    file: 'Solution.java',
    code: `class Solution {
    int[] twoSum(int[] arr, int target) {
        // Write your code here
        return new int[]{};
    }
}`
  },

  requiredStructure: {
    className: 'Solution',
    methodName: 'twoSum',
    signature: 'int[] twoSum(int[] arr, int target)',
  },

  evaluation: {
    comparator: 'unordered_json',
    timeLimitMs: 1000,
  },
});
```

### Step 2: Add the Test Generator (`.gen.ts`)

Create `src/content/problems/arrays/two-sum.gen.ts`. We use deterministic seeded RNG for generating hidden tests.

```typescript
import { defineTests } from '../../_test-utils';

export default defineTests('two-sum', (t, rng) => {
  // ── Visible Tests (shown to learner) ──
  t.visible('example-1', { args: [[2, 7, 11, 15], 9], expected: [0, 1] });

  // ── Hidden Tests (edge cases and stress tests) ──
  t.hidden('negative-values', { args: [[-1, -2, -3], -5], expected: [1, 2] });
  
  // Deterministic random generation using the provided seeded 'rng'
  const largeArr = rng.intArray(1000, 1, 5000);
  t.hidden('stress-1k', { args: [largeArr, largeArr[0]! + largeArr[999]!], expected: [0, 999] });
});
```

### Step 3: Add the Reference Solution (`.solution.java`)

Create `src/content/problems/arrays/two-sum.solution.java`. This acts as the correct implementation for testing.

```java
import java.util.HashMap;

class Solution {
    int[] twoSum(int[] arr, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < arr.length; i++) {
            if (map.containsKey(target - arr[i])) {
                return new int[]{map.get(target - arr[i]), i};
            }
            map.put(arr[i], i);
        }
        return new int[]{};
    }
}
```

That's it! Because we use Vite's `import.meta.glob` via `src/content/_loader.ts`, the new exercise will automatically appear in the catalog without needing to update any index files.

### Exercise Modes

| Mode | Use When | Key Fields |
|---|---|---|
| `function_implementation` | Learner writes a single method | `requiredStructure.methodName` |
| `class_implementation` | Learner writes a full class with multiple methods | `requiredStructure.requiredMethods` |
| `main_program` | Learner writes a `main` method with stdout output | `comparator: 'trimmed_text'` |

### Comparators

| Comparator | Description |
|---|---|
| `exact_json` | Deep equality on JSON values (default) |
| `unordered_json` | Array order doesn't matter |
| `trimmed_text` | String comparison ignoring leading/trailing whitespace |
| `exact_text` | Exact string match |
| `numeric_tolerance` | Floating-point comparison with epsilon |

### Available Topics

`arrays`, `strings`, `loops`, `conditionals`, `recursion`, `searching`, `sorting`, `math`, `design`, `linked-list`, `mono-stack`

### Difficulty Levels

- **easy** — Introductory. One concept, straightforward solution.
- **medium** — Combines 2+ concepts or requires a specific algorithm.
- **hard** — Optimization, edge cases, or advanced data structures.

---

## Modifying the UI

### CSS Design System

All styles use CSS custom properties defined in `src/styles/variables.css`:

```css
/* Colors use the `--color-` prefix */
background: var(--color-surface-1);
color: var(--color-text-primary);

/* Spacing uses the `--space-` prefix */
padding: var(--space-4);
gap: var(--space-3);

/* Font sizes use `--text-` prefix */
font-size: var(--text-sm);
```

Both dark and light themes are supported via `[data-theme="dark"]` / `[data-theme="light"]` attribute selectors.

### DOM Utilities

Use the `el()` helper from `shared/dom-utils.ts` instead of raw `document.createElement`:

```typescript
import { el, svgIcon, icons } from '../shared/dom-utils';

const card = el('div', {
  className: 'problem-card',
  children: [
    el('span', { text: 'Hello' }),
    svgIcon(icons.play, 16),
  ],
  on: { click: () => console.log('clicked') },
});
```

---

## Code Quality Checklist

Before submitting a PR:

- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] `npm run dev` starts without console errors
- [ ] New exercises have at least 2 visible test cases
- [ ] CSS uses design tokens, not hardcoded colors/sizes
- [ ] No `any` type usage
- [ ] All functions have clear names and JSDoc where non-obvious

---

## Architecture Docs

For deeper context, see:

- [architecture.md](./architecture.md) — System design and module overview
- [tasks.md](./tasks.md) — Product roadmap and task breakdown
- [exercise-schema.md](./exercise-schema.md) — Exercise format specification
- [oop-design-patterns.md](./oop-design-patterns.md) — Design doc for OOP exercises

---

## PC Judge & Quality Assurance

For instructors who need offline grading or want to verify exercise quality:

### Generate grading packages
```bash
npm run pc-judge lru-cache          # Single exercise
npm run pc-judge:all                 # All 84 exercises
```

Each package in `out/pc-judge/<slug>/` is a self-contained folder that grades student submissions with just JDK:
```bash
javac Runner.java StudentFile.java
java Runner
```

### Verify reference solutions
```bash
npm run pc-judge:verify verify-refs  # All exercises
npm run pc-judge:verify verify-refs coffee-decorator;lru-cache  # Specific
```

### Measure test coverage
```bash
npm run pc-judge:coverage            # All exercises
npm run pc-judge:coverage coffee-decorator  # Specific
```

See [scripts/pc-judge-guide.md](../scripts/pc-judge-guide.md) for detailed usage.
