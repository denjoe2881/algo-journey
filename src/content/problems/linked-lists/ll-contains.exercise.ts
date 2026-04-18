import { defineExercise } from '../../_loader';
import { LIST_NODE_HELPER, LIST_NODE_COMMENT } from './_helpers';

export default defineExercise({
  id: 'll-contains',
  version: 1,
  title: 'Linked List Contains',
  summary: 'Check if a linked list contains a given target value.',
  topic: 'linked-lists',
  difficulty: 'easy',
  tags: ['linked-list', 'traversal', 'cse201'],
  estimatedMinutes: 10,
  order: 460,
  mode: 'function_implementation',

  learningGoals: ['Linked list traversal', 'Node pointer navigation'],
  prerequisites: ['Linear search'],
  statement: `Given the head of a singly linked list and an integer \`target\`, return \`true\` if \`target\` exists in the list, \`false\` otherwise.

The \`ListNode\` class is provided by the platform — do **not** re-declare it.`,

  constraints: [
    'The list may be empty (head is null).',
    '1 ≤ list length ≤ 10⁴ (when non-empty)',
    '-10⁵ ≤ Node.val, target ≤ 10⁵',
  ],
  examples: [
    { input: 'head = [4, 7, 1, 6], target = 1', output: 'true', explanation: '1 is the third node.' },
    { input: 'head = [4, 7, 1, 6], target = 9', output: 'false' },
    { input: 'head = [], target = 5', output: 'false', explanation: 'Empty list.' },
  ],

  starter: {
    file: 'Solution.java',
    code: `${LIST_NODE_COMMENT}
class Solution {
    boolean contains(ListNode head, int target) {
        // Write your code here
        return false;
    }
}`,
  },

  helperClasses: [LIST_NODE_HELPER],

  requiredStructure: {
    className: 'Solution',
    methodName: 'contains',
    signature: 'boolean contains(ListNode head, int target)',
  },

  evaluation: {
    comparator: 'exact_json',
    javaGenerator: {
      count: 5,
      seed: 20260418,
      namePrefix: 'stress-',
      visibility: 'hidden',
      genMethodBody: `
        for (int i = 0; i < 5; i++) {
            int len = (i >= 3) ? 8000 + rng.nextInt(2001) : 500 + rng.nextInt(501);
            int[] arr = new int[len];
            for (int j = 0; j < len; j++) arr[j] = rng.nextInt(200001) - 100000;
            ListNode head = RunnerMain.buildList(arr);
            int target = (i % 2 == 0) ? arr[rng.nextInt(len)] : 100001 + rng.nextInt(1000);
            boolean expected = false;
            for (int x : arr) if (x == target) { expected = true; break; }
            try {
                boolean actual = s.contains(head, target);
                System.out.println("AJ|stress-" + i + "|" + (actual == expected) + "|" + actual + "|" + expected);
            } catch (Exception e) { System.out.println("AJ_ERROR|stress-" + i + ": " + e); }
        }`,
    },
  },
});
