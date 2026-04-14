import { defineTests } from '../../_test-utils';
export default defineTests('count-vowels', (t, rng) => {
  t.visible('hello', { args: ['Hello World'], expected: 3 });
  t.visible('all-vowels', { args: ['aeiou'], expected: 5 });
  t.hidden('empty', { args: [''], expected: 0 });
  t.hidden('no-vowels', { args: ['bcdfg'], expected: 0 });
  t.hidden('uppercase', { args: ['AEIOU'], expected: 5 });
  t.hidden('mixed-case', { args: ['AeIoU'], expected: 5 });
  const long = rng.string(5000, 'abcdefghijklmnopqrstuvwxyz');
  const vowelSet = new Set('aeiouAEIOU');
  t.hidden('stress-5k', { args: [long], expected: [...long].filter(c => vowelSet.has(c)).length });
});
