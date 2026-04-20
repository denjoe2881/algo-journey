import { defineTests } from '../../_test-utils';

export default defineTests('sum-subarray-minimums', (t, rng) => {
  // ── Visible tests ──
  t.visible('example-1', { args: [[3, 1, 2, 4]], expected: 17 });
  t.visible('example-2', { args: [[11, 81, 94, 43, 3]], expected: 444 });
  t.visible('single', { args: [[5]], expected: 5 });
  t.visible('two-elements', { args: [[2, 3]], expected: 7 }); // [2]=2, [3]=3, [2,3]=2 → 7

  // ── Hidden tests ──
  t.hidden('all-same', { args: [[4, 4, 4]], expected: 24 }); 
  t.hidden('ascending', { args: [[1, 2, 3, 4]], expected: 20 }); 
  t.hidden('descending', { args: [[5, 4, 3, 2, 1]], expected: 35 }); 
  t.hidden('v-shape', { args: [[3, 1, 3]], expected: 10 });
  t.hidden('large-values', { args: [[30000, 30000]], expected: 90000 });

  // ── Generated Tests ──
  for (let i = 0; i < 15; i++) {
    const len = rng.int(10, 300);
    const arr = rng.intArray(len, 1, 100);
    // Explicitly add wide valleys
    arr[rng.int(0, len-1)] = 1;

    let ans = 0;
    const MOD = 1e9 + 7;
    for (let j = 0; j < len; j++) {
        let min = arr[j]!;
        for (let k = j; k < len; k++) {
            if (arr[k]! < min) min = arr[k]!;
            ans = (ans + min) % MOD;
        }
    }
    t.hidden(`gen-${i}`, { args: [arr], expected: ans });
  }
});
