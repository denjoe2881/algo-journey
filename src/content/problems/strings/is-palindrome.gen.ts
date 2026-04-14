import { defineTests } from '../../_test-utils';
export default defineTests('is-palindrome', (t, rng) => {
  t.visible('racecar', { args: ['racecar'], expected: true });
  t.visible('hello', { args: ['hello'], expected: false });
  t.hidden('single-char', { args: ['a'], expected: true });
  t.hidden('empty', { args: [''], expected: true });
  t.hidden('two-same', { args: ['aa'], expected: true });
  t.hidden('two-diff', { args: ['ab'], expected: false });
  t.hidden('even-palindrome', { args: ['abba'], expected: true });
  t.hidden('almost', { args: ['abca'], expected: false });
  const half = rng.string(500);
  const palindrome = half + [...half].reverse().join('');
  t.hidden('stress-1k', { args: [palindrome], expected: true });
});
