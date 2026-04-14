import { defineExercise } from '../../_loader';
export default defineExercise({
  id: 'contains-duplicate', version: 1, title: 'Contains Duplicate',
  summary: 'Check if any value appears at least twice in the array.', topic: 'arrays', difficulty: 'easy',
  tags: ['hash-set'], estimatedMinutes: 10, order: 6, mode: 'function_implementation',
  learningGoals: ['Use a HashSet for O(n) lookup', 'Detect duplicates'],
  statement: 'Given an integer array `arr`, return `true` if any value appears at least twice, and `false` if every element is distinct.',
  constraints: ['1 ≤ arr.length ≤ 10000'],
  examples: [{ input: 'arr = [1, 2, 3, 1]', output: 'true' }, { input: 'arr = [1, 2, 3, 4]', output: 'false' }],
  starter: { file: 'Solution.java', code: `class Solution {\n    boolean containsDuplicate(int[] arr) {\n        // Write your code here\n        return false;\n    }\n}` },
  requiredStructure: { className: 'Solution', methodName: 'containsDuplicate', signature: 'boolean containsDuplicate(int[] arr)' },
  evaluation: { comparator: 'exact_json' },
});
