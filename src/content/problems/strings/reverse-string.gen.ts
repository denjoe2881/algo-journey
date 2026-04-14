import { defineTests } from '../../_test-utils';
export default defineTests('reverse-string', (t, rng) => {
  t.visible('hello', { args: ['hello'], expected: 'olleh' });
  t.visible('ab', { args: ['ab'], expected: 'ba' });
  t.hidden('single', { args: ['a'], expected: 'a' });
  t.hidden('empty', { args: [''], expected: '' });
  t.hidden('palindrome', { args: ['abba'], expected: 'abba' });
  const long = rng.string(5000);
  t.hidden('stress-5k', { args: [long], expected: [...long].reverse().join('') });
});
