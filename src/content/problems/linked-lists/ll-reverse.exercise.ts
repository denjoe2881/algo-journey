import { defineExercise } from '../../_loader';
import { LIST_NODE_HELPER, LIST_NODE_COMMENT } from './_helpers';

export default defineExercise({
  id: 'll-reverse',
  version: 1,
  title: 'Reverse Linked List',
  summary: 'Reverse a singly linked list and return the new head.',
  topic: 'linked-lists',
  difficulty: 'easy',
  tags: ['linked-list', 'pointer-manipulation', 'cse201'],
  estimatedMinutes: 15,
  order: 462,
  mode: 'function_implementation',

  learningGoals: ['Three-pointer reversal technique', 'In-place linked list modification'],
  prerequisites: ['Linked list traversal'],
  statement: `Given the head of a singly linked list, reverse the list, and return the reversed list's head.

The \`ListNode\` class is provided by the platform — do **not** re-declare it.`,

  constraints: [
    'The list may be empty (head is null).',
    '0 ≤ list length ≤ 5000',
    '-5000 ≤ Node.val ≤ 5000',
  ],
  examples: [
    { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
    { input: 'head = [1, 2]', output: '[2, 1]' },
    { input: 'head = []', output: '[]' },
  ],

  starter: {
    file: 'Solution.java',
    code: `${LIST_NODE_COMMENT}
class Solution {
    ListNode reverseList(ListNode head) {
        // Write your code here
        return null;
    }
}`,
  },

  helperClasses: [LIST_NODE_HELPER],

  requiredStructure: {
    className: 'Solution',
    methodName: 'reverseList',
    signature: 'ListNode reverseList(ListNode head)',
  },

  evaluation: {
    comparator: 'exact_json',
    javaGenerator: {
      count: 5,
      seed: 20260420,
      namePrefix: 'stress-',
      visibility: 'hidden',
      genMethodBody: `
        for (int i = 0; i < 5; i++) {
            int len = 500 + rng.nextInt(4501);
            int[] arr = new int[len];
            for (int j = 0; j < len; j++) arr[j] = rng.nextInt(10001) - 5000;
            ListNode head = RunnerMain.buildList(arr);
            // Reverse the array for expected
            int[] rev = new int[len];
            for (int j = 0; j < len; j++) rev[j] = arr[len - 1 - j];
            ListNode expectedHead = RunnerMain.buildList(rev);
            try {
                ListNode actual = s.reverseList(head);
                String actualStr = RunnerMain.listToString(actual);
                String expectedStr = RunnerMain.listToString(expectedHead);
                boolean pass = actualStr.equals(expectedStr);
                System.out.println("AJ|stress-" + i + "|" + pass + "|" + actualStr + "|" + expectedStr);
            } catch (Exception e) { System.out.println("AJ_ERROR|stress-" + i + ": " + e); }
        }`,
    },
  },
});
