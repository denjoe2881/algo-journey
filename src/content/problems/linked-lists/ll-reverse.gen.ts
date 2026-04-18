import { defineTests } from '../../_test-utils';
import { reverseArray } from './_helpers';

export default defineTests('ll-reverse', (t, rng) => {
  // ── Visible Tests ──
  t.visible('five-elements', { args: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] });
  t.visible('two-elements', { args: [[1, 2]], expected: [2, 1] });
  t.visible('empty-list', { args: [[]], expected: [] });
  t.visible('single-element', { args: [[7]], expected: [7] });

  // ── Hidden Tests ──
  t.hidden('negative-values', { args: [[-1, -2, -3]], expected: [-3, -2, -1] });
  t.hidden('same-values', { args: [[5, 5, 5]], expected: [5, 5, 5] });

  // ── Generated hidden tests ──
  for (let i = 0; i < 12; i++) {
    const len = rng.int(5, 300);
    const arr = rng.intArray(len, -5000, 5000);
    t.hidden(`gen-${i}`, { args: [arr], expected: reverseArray(arr) });
  }
});
