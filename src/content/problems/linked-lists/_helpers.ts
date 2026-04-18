/* ═══════════════════════════════════════════════════════════
   Linked List Helpers — Platform-provided ListNode class
   and shared constants for linked-list exercises.
   ═══════════════════════════════════════════════════════════ */

import type { HelperClass } from '../../../shared/types';

// ── ListNode.java source code (injected at compile time) ──

export const LIST_NODE_JAVA = `public class ListNode {
    public int val;
    public ListNode next;
    public ListNode() {}
    public ListNode(int val) { this.val = val; }
    public ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}
`;

// ── Helper class definition for exercise configs ──

export const LIST_NODE_HELPER: HelperClass = {
  fileName: 'ListNode.java',
  code: LIST_NODE_JAVA,
};

// ── Starter code comment block (students see this) ──

export const LIST_NODE_COMMENT = `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */`;

// ── Utility: reference solution for converting list to sorted array (for test gen) ──

/**
 * JS-side helper: Convert an array representation of a linked list
 * to the expected output format. Used in test generators.
 */
export function listToArray(arr: number[]): number[] {
  return [...arr];
}

/**
 * JS-side helper: Merge two sorted arrays (reference for merge-two-sorted).
 */
export function mergeSortedArrays(a: number[], b: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i]! <= b[j]!) {
      result.push(a[i]!);
      i++;
    } else {
      result.push(b[j]!);
      j++;
    }
  }
  while (i < a.length) { result.push(a[i]!); i++; }
  while (j < b.length) { result.push(b[j]!); j++; }
  return result;
}

/**
 * JS-side helper: Reverse an array (reference for reverse linked list).
 */
export function reverseArray(arr: number[]): number[] {
  return [...arr].reverse();
}

/**
 * JS-side helper: Get middle element (for slow/fast pointer problems).
 * When two middles, return the second one (LeetCode convention).
 */
export function getMiddleValue(arr: number[]): number {
  if (arr.length === 0) return -1;
  const mid = Math.floor(arr.length / 2);
  return arr[mid]!;
}
