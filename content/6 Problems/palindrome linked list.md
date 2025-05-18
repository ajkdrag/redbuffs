---
{"publish":true,"created":"2025-04-14T11:53:31.390+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/linked lists\|linked lists]]
> - [[2 Zettels/two pointers technique\|two pointers technique]]

Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

## Idea

We do [[2 Zettels/palindrome validation\|palindrome validation]] as follows:

1. Find the [[6 Problems/middle of the linked list\|middle of the linked list]] using [[2 Zettels/slow and fast pointers\|slow and fast pointers]] (slow moves 1 step, fast moves 2 steps)
2. Next, we [[2 Zettels/reversing a linked list\|reverse]] the second half of the list starting from the middle node
3. Finally, compare the first half with the reversed second half using [[two pointers on different sequences\|two pointers on different sequences]]

**Time Complexity**: $O(n)$  
**Space Complexity**: $O(1)$

The key insight is that reversing the second half allows us to compare nodes symmetrically from both ends without needing extra space for storage.

## Code

```cpp
bool is_palindrome(ListNode *head) {
  // find middle (second middle for even length)
  // reverse second half
  // compare using 2 pointers

  if (!head || !head->next) {
    return true;
  }

  // find middle
  ListNode *slow = head;
  ListNode *fast = head;

  while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
  }

  // reverse second half
  ListNode *prev = nullptr;
  ListNode *curr = slow;
  ListNode *next = nullptr;

  while (curr) {
    next = curr->next;
    curr->next = prev;
    prev = curr;
    curr = next;
  }

  // compare using 2 pointers
  ListNode *first = head;
  ListNode *second = prev;

  while (second) {
    if (first->val != second->val) {
      return false;
    }
    first = first->next;
    second = second->next;
  }

  return true;
}
```

## Related
