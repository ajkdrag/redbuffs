---
{"publish":true,"created":"2025-04-09T20:17:55.814+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/linked lists\|linked lists]]
> - [[2 Zettels/two pointers technique\|two pointers technique]]

## Idea

The problem can be efficiently solved using the [[2 Zettels/slow and fast pointers\|slow and fast pointers]] technique. We initialize two pointers, both starting at the head of the list. The _slow_ pointer moves one node at a time while the _fast_ pointer moves two nodes at a time. When the fast pointer reaches the end of the list (either becomes `null` or its next becomes `null`), the slow pointer will be at the middle node.

**Time Complexity:** $O(n)$
**Space Complexity:** $O(1)$

## Code

```cpp
ListNode *middleNode(ListNode *head) {
  ListNode *slow = head;
  ListNode *fast = head;

  while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
  }

  return slow;
}
```

For even-length lists, above implementation returns the second middle node. In order to return the _first middle node_, use:

```cpp
ListNode *middleNode(ListNode *head) {
  if (!head) return nullptr;  // Handle empty list

  ListNode *slow = head;
  ListNode *fast = head;

  while (fast->next && fast->next->next) {
    slow = slow->next;
    fast = fast->next->next;
  }

  return slow;
}
```

## Related
