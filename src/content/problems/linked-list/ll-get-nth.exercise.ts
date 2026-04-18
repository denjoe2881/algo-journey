import { defineExercise } from '../../_loader';
import { LIST_NODE_HELPER, LIST_NODE_COMMENT } from './_helpers';

export default defineExercise({
  id: 'll-get-nth',
  version: 1,
  title: 'Get Nth Node',
  summary: 'Return the value of the node at index n (0-indexed) in a linked list.',
  topic: 'linked-list',
  difficulty: 'easy',
  tags: ['linked-list', 'traversal', 'index', 'cse201'],
  estimatedMinutes: 10,
  order: 461,
  mode: 'function_implementation',
  hints: [
    'Initialize a pointer `current` at the `head` and a `count` variable at 0.',
    'Use a `while` loop to traverse the list.',
    'When `count == n`, you have found the node! Return its `val`.',
    'If `current` becomes `null` before `count` reaches `n`, the index is out of bounds.'
  ],

  learningGoals: ['Indexed access in linked list', 'Counter-based traversal'],
  prerequisites: ['Linked list traversal'],
  statement: `Given the head of a singly linked list and an integer \`n\` (0-indexed), return the value of the node at position \`n\`.

If \`n\` is out of bounds (negative or ≥ list length), return \`-1\`.

The \`ListNode\` class is provided by the platform — do **not** re-declare it.`,

  constraints: [
    'The list may be empty (head is null).',
    '0 ≤ list length ≤ 10⁴',
    '-10⁵ ≤ Node.val ≤ 10⁵',
    '-1 ≤ n ≤ 10⁵',
  ],
  examples: [
    { input: 'head = [10, 20, 30, 40], n = 2', output: '30', explanation: 'Index 2 → third node → value 30.' },
    { input: 'head = [10, 20, 30, 40], n = 0', output: '10', explanation: 'Index 0 → head → value 10.' },
    { input: 'head = [10, 20, 30], n = 5', output: '-1', explanation: 'Index out of bounds.' },
  ],

  starter: {
    file: 'Solution.java',
    code: `${LIST_NODE_COMMENT}
class Solution {
    int getNth(ListNode head, int n) {
        // Write your code here
        return -1;
    }
}`,
  },

  helperClasses: [LIST_NODE_HELPER],

  requiredStructure: {
    className: 'Solution',
    methodName: 'getNth',
    signature: 'int getNth(ListNode head, int n)',
  },

  evaluation: {
    comparator: 'exact_json',
    javaGenerator: {
      count: 5,
      seed: 20260419,
      namePrefix: 'stress-',
      visibility: 'hidden',
      genMethodBody: `
        for (int i = 0; i < 5; i++) {
            int len = 500 + rng.nextInt(501);
            int[] arr = new int[len];
            for (int j = 0; j < len; j++) arr[j] = rng.nextInt(200001) - 100000;
            ListNode head = RunnerMain.buildList(arr);
            int n = (i % 2 == 0) ? rng.nextInt(len) : len + rng.nextInt(100);
            int expected = (n >= 0 && n < len) ? arr[n] : -1;
            try {
                int actual = s.getNth(head, n);
                System.out.println("AJ|stress-" + i + "|" + (actual == expected) + "|" + actual + "|" + expected);
            } catch (Exception e) { System.out.println("AJ_ERROR|stress-" + i + ": " + e); }
        }`,
    },
  },
});
