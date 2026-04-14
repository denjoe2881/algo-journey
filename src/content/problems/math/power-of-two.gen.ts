import { defineTests } from '../../_test-utils';
export default defineTests('power-of-two', (t) => {
  t.visible('16', { args: [16], expected: true }); t.visible('6', { args: [6], expected: false });
  t.hidden('1', { args: [1], expected: true }); t.hidden('0', { args: [0], expected: false }); t.hidden('neg', { args: [-2], expected: false }); t.hidden('2', { args: [2], expected: true }); t.hidden('1024', { args: [1024], expected: true }); t.hidden('1023', { args: [1023], expected: false }); t.hidden('large', { args: [1073741824], expected: true });
});
