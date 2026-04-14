import { defineTests } from '../../_test-utils';
function fib(n: number): number { let a = 0, b = 1; for (let i = 0; i < n; i++) { [a, b] = [b, a + b]; } return a; }
export default defineTests('fibonacci', (t) => {
  t.visible('n6', { args: [6], expected: 8 }); t.visible('n0', { args: [0], expected: 0 });
  t.hidden('n1', { args: [1], expected: 1 }); t.hidden('n2', { args: [2], expected: 1 }); t.hidden('n10', { args: [10], expected: fib(10) }); t.hidden('n20', { args: [20], expected: fib(20) }); t.hidden('n30', { args: [30], expected: fib(30) });
});
