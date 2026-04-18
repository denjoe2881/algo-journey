import { defineTests } from '../../_test-utils';

export default defineTests('ll-has-cycle', (t, rng) => {
  // ── Visible Tests (non-cycle) ──
  t.visible('no-cycle-single', { args: [[1]], expected: false });
  t.visible('no-cycle-multi', { args: [[1, 2, 3, 4]], expected: false });
  t.visible('empty-list', { args: [[]], expected: false });
  t.visible('no-cycle-two', { args: [[10, 20]], expected: false });

  // ── Hidden Tests (non-cycle — various sizes) ──
  t.hidden('no-cycle-five', { args: [[5, 4, 3, 2, 1]], expected: false });
  t.hidden('no-cycle-negatives', { args: [[-1, -2, -3]], expected: false });
  t.hidden('no-cycle-same-vals', { args: [[7, 7, 7, 7]], expected: false });

  // Generated non-cycle tests
  for (let i = 0; i < 7; i++) {
    const len = rng.int(5, 200);
    const arr = rng.intArray(len, -100, 100);
    t.hidden(`gen-no-cycle-${i}`, { args: [arr], expected: false });
  }

  // Note: Cycle tests (expected: true) cannot be represented as JSON arrays.
  // They are handled by the javaGenerator in the exercise definition,
  // which creates actual cycle structures in Java memory.
});
