---
{"publish":true,"created":"2025-04-09T12:53:11.770+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/linked lists\|linked lists]]
> - [[recursion\|recursion]]

## Idea

Similar idea as reversing a linked list recursively:

1. Reverse first K nodes iteratively
2. Recursively process remaining list
3. Connect reversed groups

The time complexity is $O(n)$. Space complexity is $O(n/K)$ for recursion stack in worst case (when $K=1$).

```
Original List (K=3): [1]->[2]->[3]->[4]->[5]->[6]->NULL

Step 1: Reversing first K=3 nodes
NULL <-[1]<- [2]<- [3]   [4]->[5]->[6]->NULL
        |           |     ^
       head       prev   curr

Step 2: Recursively process remaining list
[4]->[5]->[6]->NULL becomes [6]->[5]->[4]->NULL

Connect and get final result:
[3]->[2]->[1]->[6]->[5]->[4]->NULL
```

## Code

```cpp
ListNode *reverseListInGroups(ListNode *head, int K) {
  ListNode *prev = nullptr;
  ListNode *curr = head;
  ListNode *next = nullptr;
  int count = 0;

  while (curr != nullptr && count < K) {
    next = curr->next;
    curr->next = prev;
    prev = curr;
    curr = next;
    count++;
  }

  if (curr != nullptr) {
    head->next = reverseList(curr, K);
  }

  return prev;
}
```

## Related

- [[2 Zettels/reversing a linked list\|reversing a linked list]]
