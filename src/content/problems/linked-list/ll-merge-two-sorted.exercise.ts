import { defineExercise } from '../../_loader';
import { LIST_NODE_HELPER, LIST_NODE_COMMENT } from './_helpers';

export default defineExercise({
  id: 'll-merge-two-sorted',
  version: 1,
  title: 'Merge Two Sorted Lists',
  summary: 'Merge two sorted linked lists into one sorted linked list.',
  topic: 'linked-list',
  difficulty: 'medium',
  tags: ['linked-list', 'merge', 'sorting', 'cse201'],
  estimatedMinutes: 20,
  order: 464,
  mode: 'function_implementation',
  hints: [
    'Create a dummy node to act as the start of your merged list. A `current` pointer should track the end of this new list.',
    "While both `l1` and `l2` are not null, compare their values. Append the smaller node to `current.next` and advance that list's pointer.",
    'Always move the `current` pointer forward after appending.',
    'If one list runs out, append the remainder of the other list directly to `current.next`.'
  ],

  learningGoals: ['Merge technique for linked lists', 'Dummy head pattern'],
  prerequisites: ['Linked list traversal', 'Merge sorted arrays'],
  statement: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

The \`ListNode\` class is provided by the platform — do **not** re-declare it.`,

  constraints: [
    'Both lists are sorted in non-decreasing order.',
    '0 ≤ list1.length, list2.length ≤ 50',
    '-100 ≤ Node.val ≤ 100',
  ],
  examples: [
    { input: 'list1 = [1, 2, 4], list2 = [1, 3, 4]', output: '[1, 1, 2, 3, 4, 4]' },
    { input: 'list1 = [], list2 = []', output: '[]' },
    { input: 'list1 = [], list2 = [0]', output: '[0]' },
  ],

  starter: {
    file: 'Solution.java',
    code: `${LIST_NODE_COMMENT}
class Solution {
    ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your code here
        return null;
    }
}`,
  },

  helperClasses: [LIST_NODE_HELPER],

  requiredStructure: {
    className: 'Solution',
    methodName: 'mergeTwoLists',
    signature: 'ListNode mergeTwoLists(ListNode list1, ListNode list2)',
  },

  evaluation: {
    comparator: 'exact_json',
    javaGenerator: {
      count: 5,
      seed: 20260422,
      namePrefix: 'stress-',
      visibility: 'hidden',
      genMethodBody: `
        for (int i = 0; i < 5; i++) {
            int len1 = 100 + rng.nextInt(401);
            int len2 = 100 + rng.nextInt(401);
            int[] arr1 = new int[len1];
            int[] arr2 = new int[len2];
            for (int j = 0; j < len1; j++) arr1[j] = rng.nextInt(201) - 100;
            for (int j = 0; j < len2; j++) arr2[j] = rng.nextInt(201) - 100;
            java.util.Arrays.sort(arr1);
            java.util.Arrays.sort(arr2);
            ListNode h1 = RunnerMain.buildList(arr1);
            ListNode h2 = RunnerMain.buildList(arr2);
            // Merge arrays for expected
            int[] merged = new int[len1 + len2];
            int a = 0, b = 0, k = 0;
            while (a < len1 && b < len2) {
                if (arr1[a] <= arr2[b]) merged[k++] = arr1[a++];
                else merged[k++] = arr2[b++];
            }
            while (a < len1) merged[k++] = arr1[a++];
            while (b < len2) merged[k++] = arr2[b++];
            ListNode expectedHead = RunnerMain.buildList(merged);
            try {
                ListNode actual = s.mergeTwoLists(h1, h2);
                String actualStr = RunnerMain.listToString(actual);
                String expectedStr = RunnerMain.listToString(expectedHead);
                boolean pass = actualStr.equals(expectedStr);
                System.out.println("AJ|stress-" + i + "|" + pass + "|" + actualStr + "|" + expectedStr);
            } catch (Exception e) { System.out.println("AJ_ERROR|stress-" + i + ": " + e); }
        }`,
    },
  },
});
