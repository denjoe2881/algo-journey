import { defineTests } from '../../_test-utils';

export default defineTests('ll-contains', (t, rng) => {
  // ── Visible Tests ──
  t.visible('found-middle', { args: [[4, 7, 1, 6], 1], expected: true });
  t.visible('not-found', { args: [[4, 7, 1, 6], 9], expected: false });
  t.visible('empty-list', { args: [[], 5], expected: false });
  t.visible('single-found', { args: [[42], 42], expected: true });

  // ── Hidden Tests ──
  t.hidden('single-not-found', { args: [[42], 7], expected: false });
  t.hidden('at-head', { args: [[10, 20, 30], 10], expected: true });
  t.hidden('at-tail', { args: [[10, 20, 30], 30], expected: true });
  t.hidden('duplicates', { args: [[5, 5, 5, 5], 5], expected: true });
  t.hidden('negative-values', { args: [[-3, -1, 0, 2], -1], expected: true });

  // ── Generated hidden tests ──
  for (let i = 0; i < 10; i++) {
    const len = rng.int(10, 500);
    const arr = rng.intArray(len, -1000, 1000);
    const target = i % 2 === 0 ? rng.pick(arr) : rng.int(1001, 2000);
    t.hidden(`gen-${i}`, { args: [arr, target], expected: arr.includes(target) });
  }
});
