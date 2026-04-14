import { defineTests } from '../../_test-utils';
export default defineTests('hello-world', (t) => {
  t.visible('output', { expected: 'Hello, World!' });
});
