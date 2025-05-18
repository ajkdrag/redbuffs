---
{"publish":true,"created":"2025-01-29T13:50:48.550+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/linked lists\|linked lists]]
> - [[recursion\|recursion]]

Reversing a singly linked list can be solved both **recursively** and **iteratively**.
### Approach 1 (recursive)
- **Base Case:** If we reach the last node, we return it as the new head
- **Recursive Call:** We recurse until we reach the last node
- **Reverse Links:** Once recursion starts unwinding, we adjust `head->next->next = head` to reverse the links
- **Break Old Connection:** `head->next = nullptr` disconnects the old forward link
- T.C: $O(n)$

![](https://res.cloudinary.com/dcameztw9/image/upload/v1738140196/reversing%20a%20linked%20list-wicntl.webp)

### Approach 2 (iterative)
- Instead of **recursively tracking the next node**, we do it explicitly using a loop
- `prev` stores the **new previous node** (like recursion does implicitly)
- The loop **moves forward**, reversing links step by step
- T.C: $O(n)$

![](https://res.cloudinary.com/dcameztw9/image/upload/v1738140329/reversing%20a%20linked%20list-176t03.webp)

## Implementation

```cpp
ListNode *reverseRecursive(ListNode *head) {
  if (!head || !head->next)
    return head; // Base case

  ListNode *newHead = reverseRecursive(head->next); // Recursive call
  head->next->next = head;                          // Reverse current link
  head->next = nullptr;                             // Break original link
  head = newHead;

  return newHead;
}

ListNode *reverseIterative(ListNode *head) {
  ListNode *prev = nullptr;
  ListNode *curr = head;

  while (curr) {
    ListNode *nextNode = curr->next; // Save next node
    curr->next = prev;               // Reverse link
    prev = curr;                     // Move prev forward
    curr = nextNode;                 // Move curr forward
  }

  return prev; // New head of reversed list
}
```

## Related
