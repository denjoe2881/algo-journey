/* ═══════════════════════════════════════════════════════════
   Exercise Registry — Full exercise definitions
   ═══════════════════════════════════════════════════════════ */

import type { Exercise } from '../shared/types';

export const exerciseRegistry: Record<string, Exercise> = {
  'first-index-of': {
    id: 'first-index-of',
    slug: 'first-index-of',
    version: 1,
    title: 'First Index Of',
    summary: 'Return the first index of target in the array.',
    topic: 'arrays',
    difficulty: 'easy',
    tags: ['linear-search'],
    estimatedMinutes: 10,
    order: 1,
    learningGoals: ['Iterate through an array', 'Use comparison to find a match'],
    mode: 'function_implementation',
    statement: 'Given an integer array `numbers` and a `target` value, return the first index where `target` appears. If it does not appear, return `-1`.',
    constraints: [
      'The array may be empty.',
      'If target appears multiple times, return the first index.',
    ],
    examples: [
      { input: 'numbers = [4, 2, 9, 2], target = 2', output: '1' },
      { input: 'numbers = [1, 3, 5], target = 4', output: '-1' },
    ],
    editableFiles: [
      {
        path: 'Solution.java',
        role: 'main',
        starter: `class Solution {
    int firstIndexOf(int[] numbers, int target) {
        // Write your code here
        return -1;
    }
}`,
      },
    ],
    requiredStructure: {
      className: 'Solution',
      methodName: 'firstIndexOf',
      signature: 'int firstIndexOf(int[] numbers, int target)',
    },
    limits: { timeLimitMs: 1000, outputLimitBytes: 32768, maxVisibleTests: 2, maxHiddenTests: 10 },
    evaluation: {
      comparator: 'exact_json',
      visibleTests: [
        { name: 'example-1', args: [[4, 2, 9, 2], 2], expected: 1 },
        { name: 'example-2', args: [[1, 3, 5], 4], expected: -1 },
      ],
    },
  },

  'two-sum-basic': {
    id: 'two-sum-basic',
    slug: 'two-sum-basic',
    version: 1,
    title: 'Two Sum Basic',
    summary: 'Find two indices whose values add up to a target.',
    topic: 'arrays',
    difficulty: 'easy',
    tags: ['array-traversal', 'hash-map'],
    estimatedMinutes: 15,
    order: 2,
    learningGoals: ['Use nested loops or HashMap for lookup', 'Return indices'],
    mode: 'function_implementation',
    statement: 'Given an integer array `numbers` and a `target`, return the indices of two numbers that add up to the target. You may assume exactly one valid answer exists.',
    constraints: [
      'Return indices in any order.',
      'You may not use the same element twice.',
    ],
    examples: [
      { input: 'numbers = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'numbers[0] + numbers[1] = 9' },
    ],
    editableFiles: [
      {
        path: 'Solution.java',
        role: 'main',
        starter: `class Solution {
    int[] twoSum(int[] numbers, int target) {
        // Write your code here
        return new int[]{-1, -1};
    }
}`,
      },
    ],
    requiredStructure: {
      className: 'Solution',
      methodName: 'twoSum',
      signature: 'int[] twoSum(int[] numbers, int target)',
    },
    limits: { timeLimitMs: 1000, outputLimitBytes: 32768, maxVisibleTests: 2, maxHiddenTests: 10 },
    evaluation: {
      comparator: 'unordered_json',
      visibleTests: [
        { name: 'example-1', args: [[2, 7, 11, 15], 9], expected: [0, 1] },
      ],
    },
  },

  'reverse-array': {
    id: 'reverse-array',
    slug: 'reverse-array',
    version: 1,
    title: 'Reverse Array',
    summary: 'Reverse an integer array in place.',
    topic: 'arrays',
    difficulty: 'easy',
    tags: ['two-pointers'],
    estimatedMinutes: 10,
    order: 3,
    learningGoals: ['Use two pointers to swap elements', 'Modify array in place'],
    mode: 'function_implementation',
    statement: 'Given an integer array `arr`, reverse it in place and return the array.',
    constraints: ['Modify the original array.'],
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
    ],
    editableFiles: [
      {
        path: 'Solution.java',
        role: 'main',
        starter: `class Solution {
    int[] reverseArray(int[] arr) {
        // Write your code here
        return arr;
    }
}`,
      },
    ],
    requiredStructure: {
      className: 'Solution',
      methodName: 'reverseArray',
      signature: 'int[] reverseArray(int[] arr)',
    },
    limits: { timeLimitMs: 1000, outputLimitBytes: 32768, maxVisibleTests: 2, maxHiddenTests: 10 },
    evaluation: {
      comparator: 'exact_json',
      visibleTests: [
        { name: 'example-1', args: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
        { name: 'example-2', args: [[10, 20]], expected: [20, 10] },
      ],
    },
  },

  'max-element': {
    id: 'max-element',
    slug: 'max-element',
    version: 1,
    title: 'Maximum Element',
    summary: 'Find the maximum element in an array.',
    topic: 'arrays',
    difficulty: 'easy',
    tags: ['array-traversal'],
    estimatedMinutes: 8,
    order: 4,
    learningGoals: ['Track running maximum while iterating'],
    mode: 'function_implementation',
    statement: 'Given an integer array `arr`, return the maximum element.',
    constraints: ['The array has at least one element.'],
    examples: [
      { input: 'arr = [3, 1, 4, 1, 5, 9]', output: '9' },
    ],
    editableFiles: [
      {
        path: 'Solution.java',
        role: 'main',
        starter: `class Solution {
    int maxElement(int[] arr) {
        // Write your code here
        return 0;
    }
}`,
      },
    ],
    requiredStructure: { className: 'Solution', methodName: 'maxElement', signature: 'int maxElement(int[] arr)' },
    limits: { timeLimitMs: 1000, outputLimitBytes: 32768, maxVisibleTests: 2, maxHiddenTests: 10 },
    evaluation: {
      comparator: 'exact_json',
      visibleTests: [
        { name: 'example-1', args: [[3, 1, 4, 1, 5, 9]], expected: 9 },
        { name: 'example-2', args: [[-5, -2, -8]], expected: -2 },
      ],
    },
  },

  'count-occurrences': {
    id: 'count-occurrences',
    slug: 'count-occurrences',
    version: 1,
    title: 'Count Occurrences',
    summary: 'Count how many times a target appears in an array.',
    topic: 'arrays',
    difficulty: 'easy',
    tags: ['linear-search', 'counting'],
    estimatedMinutes: 10,
    order: 5,
    learningGoals: ['Count matching elements during iteration'],
    mode: 'function_implementation',
    statement: 'Given an integer array `arr` and a `target`, return the number of times `target` appears in `arr`.',
    constraints: [],
    examples: [
      { input: 'arr = [1, 2, 3, 2, 1], target = 2', output: '2' },
    ],
    editableFiles: [
      {
        path: 'Solution.java',
        role: 'main',
        starter: `class Solution {
    int countOccurrences(int[] arr, int target) {
        // Write your code here
        return 0;
    }
}`,
      },
    ],
    requiredStructure: { className: 'Solution', methodName: 'countOccurrences', signature: 'int countOccurrences(int[] arr, int target)' },
    limits: { timeLimitMs: 1000, outputLimitBytes: 32768, maxVisibleTests: 2, maxHiddenTests: 10 },
    evaluation: {
      comparator: 'exact_json',
      visibleTests: [
        { name: 'example-1', args: [[1, 2, 3, 2, 1], 2], expected: 2 },
        { name: 'example-2', args: [[5, 5, 5], 5], expected: 3 },
      ],
    },
  },

  'is-palindrome': {
    id: 'is-palindrome',
    slug: 'is-palindrome',
    version: 1,
    title: 'Is Palindrome',
    summary: 'Check whether a given string is a palindrome.',
    topic: 'strings',
    difficulty: 'easy',
    tags: ['two-pointers', 'string-comparison'],
    estimatedMinutes: 12,
    order: 1,
    learningGoals: ['Compare characters from both ends'],
    mode: 'function_implementation',
    statement: 'Given a string `s`, return `true` if it reads the same forwards and backwards, `false` otherwise. Consider only lowercase letters.',
    constraints: ['The string contains only lowercase English letters.'],
    examples: [
      { input: 's = "racecar"', output: 'true' },
      { input: 's = "hello"', output: 'false' },
    ],
    editableFiles: [
      {
        path: 'Solution.java',
        role: 'main',
        starter: `class Solution {
    boolean isPalindrome(String s) {
        // Write your code here
        return false;
    }
}`,
      },
    ],
    requiredStructure: { className: 'Solution', methodName: 'isPalindrome', signature: 'boolean isPalindrome(String s)' },
    limits: { timeLimitMs: 1000, outputLimitBytes: 32768, maxVisibleTests: 2, maxHiddenTests: 10 },
    evaluation: {
      comparator: 'exact_json',
      visibleTests: [
        { name: 'example-1', args: ['racecar'], expected: true },
        { name: 'example-2', args: ['hello'], expected: false },
      ],
    },
  },

  'fizz-buzz': {
    id: 'fizz-buzz',
    slug: 'fizz-buzz',
    version: 1,
    title: 'FizzBuzz',
    summary: 'Print numbers from 1 to n with Fizz/Buzz replacements.',
    topic: 'loops',
    difficulty: 'easy',
    tags: ['conditionals', 'modulo'],
    estimatedMinutes: 10,
    order: 1,
    learningGoals: ['Use loops with conditional logic', 'Handle multiple cases'],
    mode: 'function_implementation',
    statement: 'Given an integer `n`, return an array of strings where for each number from 1 to n: if divisible by 3 print "Fizz", if divisible by 5 print "Buzz", if divisible by both print "FizzBuzz", otherwise print the number as a string.',
    constraints: ['1 ≤ n ≤ 100'],
    examples: [
      { input: 'n = 5', output: '["1", "2", "Fizz", "4", "Buzz"]' },
    ],
    editableFiles: [
      {
        path: 'Solution.java',
        role: 'main',
        starter: `class Solution {
    String[] fizzBuzz(int n) {
        // Write your code here
        return new String[0];
    }
}`,
      },
    ],
    requiredStructure: { className: 'Solution', methodName: 'fizzBuzz', signature: 'String[] fizzBuzz(int n)' },
    limits: { timeLimitMs: 1000, outputLimitBytes: 32768, maxVisibleTests: 2, maxHiddenTests: 10 },
    evaluation: {
      comparator: 'exact_json',
      visibleTests: [
        { name: 'example-1', args: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'] },
        { name: 'example-2', args: [15], expected: ['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz'] },
      ],
    },
  },

  'binary-search': {
    id: 'binary-search',
    slug: 'binary-search',
    version: 1,
    title: 'Binary Search',
    summary: 'Search for a target in a sorted array using binary search.',
    topic: 'searching',
    difficulty: 'medium',
    tags: ['divide-and-conquer'],
    estimatedMinutes: 20,
    order: 1,
    learningGoals: ['Implement binary search from scratch', 'Understand O(log n) time'],
    mode: 'function_implementation',
    statement: 'Given a sorted integer array `arr` and a `target`, return the index of `target` if found, otherwise return `-1`. Use binary search.',
    constraints: ['The array is sorted in ascending order.', 'All elements are distinct.'],
    examples: [
      { input: 'arr = [-1, 0, 3, 5, 9, 12], target = 9', output: '4' },
      { input: 'arr = [-1, 0, 3, 5, 9, 12], target = 2', output: '-1' },
    ],
    editableFiles: [
      {
        path: 'Solution.java',
        role: 'main',
        starter: `class Solution {
    int binarySearch(int[] arr, int target) {
        // Write your code here
        return -1;
    }
}`,
      },
    ],
    requiredStructure: { className: 'Solution', methodName: 'binarySearch', signature: 'int binarySearch(int[] arr, int target)' },
    limits: { timeLimitMs: 1000, outputLimitBytes: 32768, maxVisibleTests: 2, maxHiddenTests: 15 },
    evaluation: {
      comparator: 'exact_json',
      visibleTests: [
        { name: 'example-1', args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
        { name: 'example-2', args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      ],
    },
  },

  'factorial': {
    id: 'factorial',
    slug: 'factorial',
    version: 1,
    title: 'Factorial',
    summary: 'Compute the factorial of a non-negative integer.',
    topic: 'recursion',
    difficulty: 'easy',
    tags: ['math'],
    estimatedMinutes: 10,
    order: 1,
    learningGoals: ['Base case and recursive case', 'Understand recursion depth'],
    mode: 'function_implementation',
    statement: 'Given a non-negative integer `n`, return `n!` (n factorial). By definition, `0! = 1`.',
    constraints: ['0 ≤ n ≤ 12'],
    examples: [
      { input: 'n = 5', output: '120' },
      { input: 'n = 0', output: '1' },
    ],
    editableFiles: [
      {
        path: 'Solution.java',
        role: 'main',
        starter: `class Solution {
    int factorial(int n) {
        // Write your code here
        return 0;
    }
}`,
      },
    ],
    requiredStructure: { className: 'Solution', methodName: 'factorial', signature: 'int factorial(int n)' },
    limits: { timeLimitMs: 1000, outputLimitBytes: 32768, maxVisibleTests: 2, maxHiddenTests: 10 },
    evaluation: {
      comparator: 'exact_json',
      visibleTests: [
        { name: 'example-1', args: [5], expected: 120 },
        { name: 'example-2', args: [0], expected: 1 },
      ],
    },
  },

  'simple-counter': {
    id: 'simple-counter',
    slug: 'simple-counter',
    version: 1,
    title: 'Simple Counter',
    summary: 'Implement a counter class with increment and getValue.',
    topic: 'classes',
    difficulty: 'easy',
    tags: ['constructor', 'state'],
    estimatedMinutes: 15,
    order: 1,
    learningGoals: ['Use constructors', 'Manage object state'],
    mode: 'class_implementation',
    statement: 'Implement a class `Counter` with a constructor that takes a starting value, `increment()` that adds 1, and `getValue()` that returns the current value.',
    constraints: [],
    examples: [
      { input: 'Counter c = new Counter(5); c.increment(); c.getValue();', output: '6' },
    ],
    editableFiles: [
      {
        path: 'Counter.java',
        role: 'main',
        starter: `class Counter {
    Counter(int start) {
        // Write your code here
    }

    void increment() {
        // Write your code here
    }

    int getValue() {
        // Write your code here
        return -1;
    }
}`,
      },
    ],
    requiredStructure: {
      className: 'Counter',
      requiredMethods: ['Counter(int start)', 'void increment()', 'int getValue()'],
    },
    limits: { timeLimitMs: 1000, outputLimitBytes: 32768, maxVisibleTests: 2, maxHiddenTests: 10 },
    evaluation: {
      comparator: 'exact_json',
      visibleTests: [
        { name: 'basic-sequence', operations: [['new', 5], ['increment'], ['getValue']], expected: 6 },
      ],
    },
  },
};
