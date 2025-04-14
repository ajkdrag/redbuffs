---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-04-09T09:50:10.378+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/two pointers technique\|two pointers technique]]
> - [[2 Zettels/linked lists\|linked lists]]

## Idea

The problem can be solved efficiently using the two-pointer technique: `ptr1` and `ptr2`. We advance `ptr2` by N nodes to create a gap of N nodes between the two pointers. Then, we move both pointers simultaneously until `ptr2` reaches the last node. At this point, `ptr1` will be pointing to the node just before the Nth node from the end, allowing us to remove it easily.

> [!Tip]
> We can [[2 Zettels/use dummy node for linked list problems\|use dummy node for linked list problems]] to simplify the implementation

**Time Complexity:** $O(L)$ where $L$ is the list length
**Space Complexity:** $O(1)$

```
linked list: 1 -> 2 -> 3 -> 4 -> 5
N = 2

dummy -> 1 -> 2 -> 3 -> 4 -> 5
ptr1
ptr2


Advance `ptr2` by N (2) nodes:
dummy -> 1 -> 2 -> 3 -> 4 -> 5
ptr1         ptr2

Moving both pointers together:
dummy -> 1 -> 2 -> 3 -> 4 -> 5
         ptr1    ptr2

dummy -> 1 -> 2 -> 3 -> 4 -> 5
                  ptr1    ptr2

`ptr2` is at the end.
`ptr1` is at the node before the Nth node from the end (4).
We remove the Nth node (4) from the end.

Resulting list: 1 -> 2 -> 3 -> 5

```

## Code

```cpp
ListNode *removeNthFromEnd(ListNode *head, int N) {
  if (!head)
    return head;

  ListNode *dummy = new ListNode(0, head);
  dummy->next = head;

  ListNode *ptr1 = dummy;
  ListNode *ptr2 = dummy;

  for (int i = 0; i < N; i++) {
    ptr2 = ptr2->next;
  }

  while (ptr2->next) {
    ptr1 = ptr1->next;
    ptr2 = ptr2->next;
  }

  ListNode *temp = ptr1->next;
  ptr1->next = ptr1->next->next;
  delete temp;

  return dummy->next;
}
```

## Related
