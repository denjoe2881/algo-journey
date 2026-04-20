import { defineTests } from '../../_test-utils';

export default defineTests('two-sum-basic', (t, rng) => {
  // ── Visible Tests (4) ──
  t.visible('example-1', { args: [[2, 7, 11, 15], 9], expected: [0, 1] });
  t.visible('example-2', { args: [[3, 2, 4], 6], expected: [1, 2] });
  t.visible('same-elements', { args: [[3, 3], 6], expected: [0, 1] });
  t.visible('negative-sum', { args: [[-1, -2, -3, -4], -6], expected: [1, 3] });
  t.visible('no-solution', { args: [[1, 2, 3, 4], 100], expected: [-1, -1] });

  // ── Hidden Tests — edge cases (8) ──
  t.hidden('first-last', { args: [[1, 5, 4, 7], 8], expected: [0, 3] });
  t.hidden('negatives', { args: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] });
  t.hidden('zeros', { args: [[0, 4, 3, 0], 0], expected: [0, 3] });
  t.hidden('large-values', { args: [[1000000, 500000, 500000], 1000000], expected: [1, 2] });
  t.hidden('two-elements', { args: [[5, 10], 15], expected: [0, 1] });
  t.hidden('mixed-signs', { args: [[-3, 4, 1, 2, -1], 1], expected: [0, 1] });
  t.hidden('target-zero', { args: [[5, -5, 3, 7], 0], expected: [0, 1] });
  t.hidden('adjacent-pair', { args: [[10, 20, 30, 40, 50], 50], expected: [1, 2] });

  // ── Generated hidden tests (10) ──
  for (let i = 0; i < 15; i++) {
    const len = rng.int(10, 500);
    const arr: number[] = [];
    const usedValues = new Set<number>();
    // Inject target value distance based on i
    for (let j = 0; j < len; j++) {
      let v: number;
      do { v = rng.int(-50000, 50000); } while (usedValues.has(v));
      usedValues.add(v);
      arr.push(v);
    }
    
    let idxA = i; // push them specifically based on test index
    let idxB = len - 1 - i;
    if (idxA >= idxB) idxA = 0;

    const target = arr[idxA]! + arr[idxB]!;

    const map = new Map<number, number>();
    let expA = -1, expB = -1;
    for (let j = 0; j < len; j++) {
      const comp = target - arr[j]!;
      if (map.has(comp)) {
        expA = map.get(comp)!;
        expB = j;
        break;
      }
      map.set(arr[j]!, j);
    }

    t.hidden(`gen-${i}`, {
      args: [arr, target],
      expected: [Math.min(expA, expB), Math.max(expA, expB)],
    });
  }

  // ── Stress test (1) ──
  const stressArr = rng.intArray(498, 1, 50000);
  const a = 60001, b = 60002;
  stressArr.push(a, b);
  const shuffled = rng.shuffle(stressArr);
  const sidxA = shuffled.indexOf(a);
  const sidxB = shuffled.indexOf(b);
  t.hidden('stress-500', { args: [shuffled, a + b], expected: [Math.min(sidxA, sidxB), Math.max(sidxA, sidxB)] });
});
