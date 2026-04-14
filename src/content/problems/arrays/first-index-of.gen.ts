import { defineTests } from '../../_test-utils';

export default defineTests('first-index-of', (t, rng) => {
  // ── Visible ──
  t.visible('example-1', { args: [[4, 2, 9, 2], 2], expected: 1 });
  t.visible('example-2', { args: [[1, 3, 5], 4], expected: -1 });

  // ── Hidden (edge cases) ──
  t.hidden('empty-array', { args: [[], 5], expected: -1 });
  t.hidden('single-match', { args: [[7], 7], expected: 0 });
  t.hidden('single-no-match', { args: [[3], 5], expected: -1 });
  t.hidden('last-position', { args: [[1, 2, 3, 4, 5], 5], expected: 4 });
  t.hidden('first-of-duplicates', { args: [[3, 3, 3], 3], expected: 0 });
  t.hidden('negative-values', { args: [[-1, -2, -3], -2], expected: 1 });

  // ── Hidden (stress) ──
  const largeArr = rng.intArray(10000, -1000, 1000);
  const target = largeArr[4999]!;
  t.hidden('stress-10k', { args: [largeArr, target], expected: largeArr.indexOf(target) });
});
