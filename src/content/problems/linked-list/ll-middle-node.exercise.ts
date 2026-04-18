import { defineExercise } from '../../_loader';
import { LIST_NODE_HELPER, LIST_NODE_COMMENT } from './_helpers';

export default defineExercise({
  id: 'll-middle-node',
  version: 1,
  title: 'Middle of Linked List',
  summary: 'Find the middle node of a linked list using the slow/fast pointer technique.',
  topic: 'linked-list',
  difficulty: 'easy',
  tags: ['linked-list', 'slow-fast-pointer', 'two-pointers', 'cse201'],
  estimatedMinutes: 15,
  order: 463,
  mode: 'function_implementation',
  hints: [
    'Use the two-pointer technique (Tortoise and Hare).',
    'Initialize `slow` and `fast` pointers at the `head`.',
    'Move `slow` one step at a time, and move `fast` two steps at a time.',
    'When `fast` reaches the end of the list (`fast == null` or `fast.next == null`), `slow` will be precisely at the middle node!'
  ],

  learningGoals: ['Slow & fast pointer technique', 'Finding middle without knowing length'],
  prerequisites: ['Linked list traversal'],
  statement: `Given the head of a singly linked list, return the middle node of the linked list.

If there are two middle nodes, return the **second** middle node.

Return the entire sublist starting from the middle node.

The \`ListNode\` class is provided by the platform — do **not** re-declare it.`,

  constraints: [
    'The list is non-empty.',
    '1 ≤ list length ≤ 10⁴',
    '1 ≤ Node.val ≤ 100',
  ],
  examples: [
    { input: 'head = [1, 2, 3, 4, 5]', output: '[3, 4, 5]', explanation: 'Middle is node 3.' },
    { input: 'head = [1, 2, 3, 4, 5, 6]', output: '[4, 5, 6]', explanation: 'Two middles (3 and 4), return the second one → node 4.' },
  ],

  starter: {
    file: 'Solution.java',
    code: `${LIST_NODE_COMMENT}
class Solution {
    ListNode middleNode(ListNode head) {
        // Write your code here
        return null;
    }
}`,
  },

  helperClasses: [LIST_NODE_HELPER],

  requiredStructure: {
    className: 'Solution',
    methodName: 'middleNode',
    signature: 'ListNode middleNode(ListNode head)',
  },

  evaluation: {
    comparator: 'exact_json',
    javaGenerator: {
      count: 5,
      seed: 20260421,
      namePrefix: 'stress-',
      visibility: 'hidden',
      genMethodBody: `
        for (int i = 0; i < 5; i++) {
            int len = 1000 + rng.nextInt(9001);
            int[] arr = new int[len];
            for (int j = 0; j < len; j++) arr[j] = 1 + rng.nextInt(100);
            ListNode head = RunnerMain.buildList(arr);
            // Expected: sublist from mid index
            int mid = len / 2;
            int[] sub = new int[len - mid];
            for (int j = mid; j < len; j++) sub[j - mid] = arr[j];
            ListNode expectedHead = RunnerMain.buildList(sub);
            try {
                ListNode actual = s.middleNode(head);
                String actualStr = RunnerMain.listToString(actual);
                String expectedStr = RunnerMain.listToString(expectedHead);
                boolean pass = actualStr.equals(expectedStr);
                System.out.println("AJ|stress-" + i + "|" + pass + "|" + actualStr + "|" + expectedStr);
            } catch (Exception e) { System.out.println("AJ_ERROR|stress-" + i + ": " + e); }
        }`,
    },
  },
});
