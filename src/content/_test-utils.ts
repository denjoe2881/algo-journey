/* ═══════════════════════════════════════════════════════════
   Test Utilities — Seeded RNG + test builder for exercises
   ═══════════════════════════════════════════════════════════ */

import type { TestCase } from '../shared/types';

// ── Seeded PRNG (mulberry32) ──────────────────────────────

/**
 * Deterministic pseudo-random number generator.
 * Same seed always produces the same sequence.
 */
export class SeededRng {
  private state: number;

  constructor(seed: number) {
    this.state = seed | 0;
  }

  /** Get next raw 32-bit value (internal) */
  private next(): number {
    this.state |= 0;
    this.state = (this.state + 0x6d2b79f5) | 0;
    let t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Random integer in [min, max] inclusive */
  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /** Random float in [min, max) */
  float(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /** Random boolean with configurable probability */
  bool(trueChance = 0.5): boolean {
    return this.next() < trueChance;
  }

  /** Array of random integers */
  intArray(length: number, min: number, max: number): number[] {
    return Array.from({ length }, () => this.int(min, max));
  }

  /** Random string from charset */
  string(length: number, charset = 'abcdefghijklmnopqrstuvwxyz'): string {
    return Array.from({ length }, () =>
      charset[this.int(0, charset.length - 1)]
    ).join('');
  }

  /** Pick random element from array */
  pick<T>(arr: readonly T[]): T {
    return arr[this.int(0, arr.length - 1)]!;
  }

  /** Shuffle array (Fisher-Yates, returns new array) */
  shuffle<T>(arr: readonly T[]): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [result[i], result[j]] = [result[j]!, result[i]!];
    }
    return result;
  }

  /** Generate a sorted array of unique random integers */
  sortedUniqueIntArray(length: number, min: number, max: number): number[] {
    const set = new Set<number>();
    while (set.size < length && set.size < max - min + 1) {
      set.add(this.int(min, max));
    }
    return [...set].sort((a, b) => a - b);
  }
}

// ── Seed derivation ──────────────────────────────────────

/** Derive a deterministic seed from exercise id string */
export function seedFromId(id: string): number {
  let hash = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193); // FNV prime
  }
  return hash >>> 0;
}

// ── Test builder ─────────────────────────────────────────

export interface TestSuite {
  visible: TestCase[];
  hidden: TestCase[];
}

interface TestBuilder {
  visible(name: string, tc: Omit<TestCase, 'name'>): void;
  hidden(name: string, tc: Omit<TestCase, 'name'>): void;
}

/**
 * Define test cases for an exercise.
 * The builder callback receives a test builder and a seeded RNG.
 *
 * @example
 * export default defineTests('first-index-of', (t, rng) => {
 *   t.visible('example-1', { args: [[1,2,3], 2], expected: 1 });
 *   t.hidden('edge-empty', { args: [[], 5], expected: -1 });
 * });
 */
export function defineTests(
  exerciseId: string,
  builder: (t: TestBuilder, rng: SeededRng) => void,
): TestSuite {
  const visible: TestCase[] = [];
  const hidden: TestCase[] = [];

  const t: TestBuilder = {
    visible(name, tc) {
      visible.push({ name, ...tc });
    },
    hidden(name, tc) {
      hidden.push({ name, ...tc });
    },
  };

  const rng = new SeededRng(seedFromId(exerciseId));
  builder(t, rng);

  return { visible, hidden };
}
