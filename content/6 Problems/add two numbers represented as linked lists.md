---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-04-09T11:23:28.942+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/linked lists\|linked lists]]
> - [[basic arithmetic\|basic arithmetic]]

A number is represented in the form of a linked list, by storing its digit in the reverse order. Each node of the linked list stores one digit. The head of the linked list is pointed towards the _least significant digit_ of the number.

Given two **non-empty** linked list representing two numbers, your task is to add them and return the sum as a linked list.

## Idea

The solution mimics manual digit-by-digit addition from least significant digit (rightmost) to most significant digit (leftmost). We process both lists simultaneously, adding corresponding digits along with any carry from the previous addition. The sum digit is stored in a new node, and the carry is propagated to the next digit addition.

> [!Tip]
> The algorithm handles cases where lists have different lengths by continuing until both lists and carry are exhausted.

**Time Complexity:** $O(\max(m, n))$
**Space Complexity:** $O(\max(m, n))$ extra space for result

```
  2 -> 4       (represents  42)
+ 5 -> 6 -> 4  (represents 465)
-----------------
  7 -> 0 -> 5  (represents 507)
```

## Code

```cpp
ListNode *addTwoNumbers(ListNode *n1, ListNode *n2) {
  ListNode *dummy = new ListNode(-1);
  ListNode *curr = dummy;
  int carry = 0;
  while (n1 || n2 || carry) {
    int sum = carry;
    if (n1) {
      sum += n1->val;
      n1 = n1->next;
    }
    if (n2) {
      sum += n2->val;
      n2 = n2->next;
    }
    carry = sum / 10;
    sum %= 10;
    curr->next = new ListNode(sum);
    curr = curr->next;
  }
  return dummy->next;
}
```

## Related
