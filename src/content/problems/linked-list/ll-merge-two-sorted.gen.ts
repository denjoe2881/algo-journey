import { defineTests } from '../../_test-utils';
import { mergeSortedArrays } from './_helpers';

export default defineTests('ll-merge-two-sorted', (t, rng) => {
  // ── Visible Tests ──
  t.visible('basic-merge', { args: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] });
  t.visible('both-empty', { args: [[], []], expected: [] });
  t.visible('one-empty', { args: [[], [0]], expected: [0] });
  t.visible('no-overlap', { args: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6] });

  // ── Hidden Tests ──
  t.hidden('single-each', { args: [[1], [2]], expected: [1, 2] });
  t.hidden('all-same', { args: [[2, 2, 2], [2, 2]], expected: [2, 2, 2, 2, 2] });
  t.hidden('negatives', { args: [[-5, -3, -1], [-4, -2, 0]], expected: [-5, -4, -3, -2, -1, 0] });

  // ── Generated hidden tests ──
  for (let i = 0; i < 11; i++) {
    const len1 = rng.int(5, 50);
    const len2 = rng.int(5, 50);
    const arr1 = rng.intArray(len1, -100, 100).sort((a, b) => a - b);
    const arr2 = rng.intArray(len2, -100, 100).sort((a, b) => a - b);
    t.hidden(`gen-${i}`, { args: [arr1, arr2], expected: mergeSortedArrays(arr1, arr2) });
  }
});
