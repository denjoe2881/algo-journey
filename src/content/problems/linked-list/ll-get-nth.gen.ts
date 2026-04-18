import { defineTests } from '../../_test-utils';

export default defineTests('ll-get-nth', (t, rng) => {
  // ── Visible Tests ──
  t.visible('middle-index', { args: [[10, 20, 30, 40], 2], expected: 30 });
  t.visible('head-index', { args: [[10, 20, 30, 40], 0], expected: 10 });
  t.visible('tail-index', { args: [[10, 20, 30, 40], 3], expected: 40 });
  t.visible('out-of-bounds', { args: [[10, 20, 30], 5], expected: -1 });

  // ── Hidden Tests — edge cases ──
  t.hidden('empty-list', { args: [[], 0], expected: -1 });
  t.hidden('single-element-valid', { args: [[42], 0], expected: 42 });
  t.hidden('single-oob', { args: [[42], 1], expected: -1 });
  t.hidden('negative-index', { args: [[1, 2, 3], -1], expected: -1 });

  // IMPORTANT: lists containing -1 as a value — catches hardcoded "return -1" tricks
  t.hidden('val-minus1-at-0', { args: [[-1, 5, 10], 0], expected: -1 });
  t.hidden('val-minus1-at-1', { args: [[7, -1, 3], 1], expected: -1 });
  t.hidden('val-minus1-at-tail', { args: [[100, 200, -1], 2], expected: -1 });
  t.hidden('negative-values', { args: [[-5, -10, -15], 1], expected: -10 });
  t.hidden('large-index-oob', { args: [[1, 2], 99999], expected: -1 });
  t.hidden('exact-boundary', { args: [[3, 6, 9], 2], expected: 9 });

  // ── Generated hidden tests — mix valid and OOB ──
  for (let i = 0; i < 10; i++) {
    const len = rng.int(10, 500);
    const arr = rng.intArray(len, -1000, 1000);

    if (i % 4 === 0) {
      // OOB: index exactly at len
      t.hidden(`gen-oob-${i}`, { args: [arr, len], expected: -1 });
    } else if (i % 4 === 1) {
      // OOB: large index
      t.hidden(`gen-oob-${i}`, { args: [arr, len + rng.int(1, 1000)], expected: -1 });
    } else {
      // Valid index — ensure values include -1 to avoid weak detection
      if (i % 4 === 2) arr[rng.int(0, len - 1)] = -1;
      const n = rng.int(0, len - 1);
      t.hidden(`gen-valid-${i}`, { args: [arr, n], expected: arr[n]! });
    }
  }
});
