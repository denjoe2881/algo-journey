import { defineTests } from '../../_test-utils';
export default defineTests('selection-sort', (t, rng) => {
  t.visible('basic', { args: [[64, 25, 12, 22, 11]], expected: [11, 12, 22, 25, 64] }); t.visible('sorted', { args: [[1, 2, 3]], expected: [1, 2, 3] });
  t.hidden('reverse', { args: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5] }); t.hidden('single', { args: [[1]], expected: [1] }); t.hidden('empty', { args: [[]], expected: [] }); t.hidden('dups', { args: [[3, 1, 2, 3, 1]], expected: [1, 1, 2, 3, 3] });
  const arr = rng.intArray(500, -1000, 1000);
  t.hidden('stress-500', { args: [arr], expected: [...arr].sort((a, b) => a - b) });
});
