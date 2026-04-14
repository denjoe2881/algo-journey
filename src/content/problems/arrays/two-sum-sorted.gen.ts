import { defineTests } from '../../_test-utils';

export default defineTests('two-sum-sorted', (t) => {
  // ── Visible Tests ──
  t.visible('simple-pair', { args: [[-3, 1, 4, 7, 11], 8], expected: [0, 4] });
  t.visible('no-pair', { args: [[1, 2, 3, 4, 5], 20], expected: [-1, -1] });
  t.visible('zeros', { args: [[0, 0, 3, 5], 0], expected: [0, 1] });
  t.visible('mixed-signs', { args: [[-4, -2, 0, 3, 7], 3], expected: [0, 4] });
  t.visible('extremes', { args: [[1, 3, 5, 7, 9], 10], expected: [0, 4] });

  // ── Hidden Tests ──
  t.hidden('all-same', { args: [Array(100).fill(5), 10], expected: [0, 99] });
  t.hidden('not-found-large', { args: [[10, 11, 12, 13, 14, 15, 16], 30], expected: [4, 6] });
  t.hidden('large-values', { args: [[100000000, 100000001, 100000002], 200000001], expected: [0, 1] });
});
