import { defineTests } from '../../_test-utils';
export default defineTests('min-stack', (t) => {
  t.visible('basic-ops', { operations: [['new'], ['push', -2], ['push', 0], ['push', -3], ['getMin']], expected: -3 });
  t.hidden('pop-and-min', { operations: [['new'], ['push', -2], ['push', 0], ['push', -3], ['getMin'], ['pop'], ['top'], ['getMin']], expected: [-3, 0, -2] });
  t.hidden('single', { operations: [['new'], ['push', 42], ['top'], ['getMin']], expected: [42, 42] });
  t.hidden('ascending', { operations: [['new'], ['push', 1], ['push', 2], ['push', 3], ['getMin']], expected: 1 });
  t.hidden('descending', { operations: [['new'], ['push', 3], ['push', 2], ['push', 1], ['getMin']], expected: 1 });
});
