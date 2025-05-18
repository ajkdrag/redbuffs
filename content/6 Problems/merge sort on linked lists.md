---
{"publish":true,"created":"2025-04-10T12:24:44.834+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[sorting algorithms\|sorting algorithms]]
> - [[2 Zettels/linked lists\|linked lists]]
> - [[recursion\|recursion]]

Sort a singly linked list in $O(N \log N)$ using [[merge sort\|merge sort]]. Here, $N$ is the length of the linked list.

## Idea

The approach follows the standard [[merge sort\|merge sort]] paradigm adapted for linked lists. First, we find [[6 Problems/middle of the linked list\|middle of the linked list]] using [[2 Zettels/slow and fast pointers\|slow and fast pointers]] technique (where slow moves 1 step and fast moves 2 steps at a time), ensuring for even-length lists, slow points to the first middle element. This splitting is crucial for maintaining the $O(N \log N)$ time complexity.

After splitting the list into two halves by disconnecting at the middle node, we recursively sort each half. The merge step then combines the two sorted halves by comparing nodes and building the result list incrementally, similar to the array-based [[2 Zettels/merge sort implementation with auxiliary arrays\|merge sort implementation with auxiliary arrays]]. The space complexity is $O(\log N)$ due to recursion stack, while the time complexity remains $O(N \log N)$ from the [[divide and conquer\|divide and conquer]] steps and linear-time merges.

## Code

```cpp
ListNode *mergesort(ListNode *head) {
  // solution approach:
  // 1. find middle using slow and fast pointers
  //    (for even-sized list, slow should point to first middle)
  // 2. split the list into two halves (slow->next = nullptr)
  // 3. recursively sort both halves
  // 4. merge the sorted halves (using 2 pointers)

  // base case
  if (!head || !head->next) {
    return head;
  }

  // 1. find middle (even-sized list, slow should point to first middle)
  ListNode *slow = head;
  ListNode *fast = head;
  while (fast->next && fast->next->next) {
    slow = slow->next;
    fast = fast->next->next;
  }

  // 2. split the list into two halves (slow->next = nullptr)
  ListNode *mid = slow->next;
  slow->next = nullptr;

  // 3. recursively sort both halves
  ListNode *left = mergesort(head);
  ListNode *right = mergesort(mid);

  // 4. merge the sorted halves (using 2 pointers)
  ListNode *dummy = new ListNode(-1);
  ListNode *curr = dummy;
  while (left && right) {
    if (left->val < right->val) {
      curr->next = left;
      left = left->next;
    } else {
      curr->next = right;
      right = right->next;
    }
    curr = curr->next;
  }

  if (left) {
    curr->next = left;
  }
  if (right) {
    curr->next = right;
  }

  // return the head of the sorted list
  return dummy->next;
}
```

## Related

- [[2 Zettels/merge sort implementation with auxiliary arrays\|merge sort implementation with auxiliary arrays]]
