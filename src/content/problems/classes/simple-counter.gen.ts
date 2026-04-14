import { defineTests } from '../../_test-utils';
export default defineTests('simple-counter', (t) => {
  t.visible('basic', { operations: [['new'], ['increment'], ['increment'], ['getValue']], expected: 2 });
  t.hidden('initial', { operations: [['new'], ['getValue']], expected: 0 });
  t.hidden('many', { operations: [['new'], ['increment'], ['increment'], ['increment'], ['increment'], ['increment'], ['getValue']], expected: 5 });
});
