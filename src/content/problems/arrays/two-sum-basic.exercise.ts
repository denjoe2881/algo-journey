import { defineExercise } from '../../_loader';

export default defineExercise({
  id: 'two-sum-basic',
  version: 1,
  title: 'Two Sum Basic',
  summary: 'Find two indices whose values add up to a target.',
  topic: 'arrays',
  difficulty: 'easy',
  tags: ['array-traversal', 'hash-map'],
  estimatedMinutes: 15,
  order: 2,
  mode: 'function_implementation',

  learningGoals: ['Use nested loops or HashMap for lookup', 'Return indices'],
  statement: 'Given an integer array `numbers` and a `target`, return the indices of two numbers that add up to the target. You may assume exactly one valid answer exists.',
  constraints: ['Return indices in any order.', 'You may not use the same element twice.'],
  examples: [
    { input: 'numbers = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'numbers[0] + numbers[1] = 9' },
  ],

  starter: {
    file: 'Solution.java',
    code: `class Solution {
    int[] twoSum(int[] numbers, int target) {
        // Write your code here
        return new int[]{-1, -1};
    }
}`,
  },

  requiredStructure: {
    className: 'Solution',
    methodName: 'twoSum',
    signature: 'int[] twoSum(int[] numbers, int target)',
  },

  evaluation: { comparator: 'unordered_json' },
});
