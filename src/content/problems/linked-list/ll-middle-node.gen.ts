import { defineTests } from '../../_test-utils';

export default defineTests('ll-middle-node', (t, rng) => {
  // ── Visible Tests ──
  t.visible('odd-length', { args: [[1, 2, 3, 4, 5]], expected: [3, 4, 5] });
  t.visible('even-length', { args: [[1, 2, 3, 4, 5, 6]], expected: [4, 5, 6] });
  t.visible('single-element', { args: [[1]], expected: [1] });
  t.visible('two-elements', { args: [[1, 2]], expected: [2] });

  // ── Hidden Tests ──
  t.hidden('three-elements', { args: [[1, 2, 3]], expected: [2, 3] });
  t.hidden('four-elements', { args: [[10, 20, 30, 40]], expected: [30, 40] });

  // ── Generated hidden tests ──
  for (let i = 0; i < 12; i++) {
    const len = rng.int(3, 500);
    const arr = rng.intArray(len, 1, 100);
    const mid = Math.floor(len / 2);
    const expected = arr.slice(mid);
    t.hidden(`gen-${i}`, { args: [arr], expected });
  }
});
