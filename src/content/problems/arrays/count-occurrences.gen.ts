import { defineTests } from '../../_test-utils';
export default defineTests('count-occurrences', (t, rng) => {
  t.visible('example-1', { args: [[1, 2, 3, 2, 1], 2], expected: 2 });
  t.visible('example-2', { args: [[5, 5, 5], 5], expected: 3 });
  t.hidden('not-found', { args: [[1, 2, 3], 4], expected: 0 });
  t.hidden('empty', { args: [[], 1], expected: 0 });
  t.hidden('single-match', { args: [[7], 7], expected: 1 });
  t.hidden('all-same', { args: [[3, 3, 3, 3, 3], 3], expected: 5 });
  t.hidden('negatives', { args: [[-1, -1, 2, -1], -1], expected: 3 });
  const large = rng.intArray(10000, 1, 10);
  const tgt = 5;
  t.hidden('stress-10k', { args: [large, tgt], expected: large.filter(x => x === tgt).length });
});
