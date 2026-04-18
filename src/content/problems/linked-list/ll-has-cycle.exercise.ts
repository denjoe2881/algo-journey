import { defineExercise } from '../../_loader';
import { LIST_NODE_HELPER, LIST_NODE_COMMENT } from './_helpers';

export default defineExercise({
  id: 'll-has-cycle',
  version: 1,
  title: 'Linked List Cycle',
  summary: 'Detect if a linked list has a cycle using Floyd\'s algorithm.',
  topic: 'linked-list',
  difficulty: 'medium',
  tags: ['linked-list', 'floyd-cycle', 'slow-fast-pointer', 'cse201'],
  estimatedMinutes: 20,
  order: 465,
  mode: 'function_implementation',
  hints: [
    "Use Floyd's Cycle-Finding Algorithm (Tortoise and Hare).",
    'Initialize two pointers, `slow` and `fast`, both starting at the `head`.',
    'Move `slow` one step at a time (`slow = slow.next`) and `fast` two steps at a time (`fast = fast.next.next`).',
    'If there is a cycle, `fast` will eventually catch up to `slow`. If `fast` or `fast.next` becomes `null`, there is no cycle.'
  ],

  learningGoals: ['Floyd\'s Cycle Detection (tortoise and hare)', 'Slow & fast pointer technique'],
  prerequisites: ['Linked list traversal'],
  statement: `Given the head of a linked list, determine if the linked list has a cycle in it.

A cycle exists if some node's \`next\` pointer points back to a previously visited node.

Return \`true\` if there is a cycle, \`false\` otherwise.

**Hint:** Use Floyd's Cycle Detection Algorithm (slow/fast pointers).

The \`ListNode\` class is provided by the platform — do **not** re-declare it.`,

  constraints: [
    '0 ≤ list length ≤ 10⁴',
    '-10⁵ ≤ Node.val ≤ 10⁵',
  ],
  examples: [
    { input: 'head = [3, 2, 0, -4], cycle at pos 1', output: 'true', explanation: 'Tail connects to node at index 1.' },
    { input: 'head = [1, 2], cycle at pos 0', output: 'true', explanation: 'Tail connects to node at index 0.' },
    { input: 'head = [1], no cycle', output: 'false' },
  ],

  starter: {
    file: 'Solution.java',
    code: `${LIST_NODE_COMMENT}
class Solution {
    boolean hasCycle(ListNode head) {
        // Write your code here
        return false;
    }
}`,
  },

  helperClasses: [LIST_NODE_HELPER],

  requiredStructure: {
    className: 'Solution',
    methodName: 'hasCycle',
    signature: 'boolean hasCycle(ListNode head)',
  },

  evaluation: {
    comparator: 'exact_json',
    javaGenerator: {
      count: 14,
      seed: 20260423,
      namePrefix: 'cycle-',
      visibility: 'visible',
      genMethodBody: `
        for (int i = 0; i < 14; i++) {
            int len = 5 + rng.nextInt(996);
            ListNode[] nodes = new ListNode[len];
            for (int j = 0; j < len; j++) nodes[j] = new ListNode(rng.nextInt(200001) - 100000);
            for (int j = 0; j < len - 1; j++) nodes[j].next = nodes[j + 1];
            boolean expectCycle = (i % 2 == 0);
            if (expectCycle) {
                int cyclePos = rng.nextInt(len);
                nodes[len - 1].next = nodes[cyclePos];
            }
            try {
                boolean actual = s.hasCycle(nodes[0]);
                System.out.println("AJ|cycle-" + i + "|" + (actual == expectCycle) + "|" + actual + "|" + expectCycle);
            } catch (Exception e) { System.out.println("AJ_ERROR|cycle-" + i + ": " + e); }
        }`,
    },
  },
});
