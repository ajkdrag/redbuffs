---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-04-09T22:52:31.964+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/linked lists\|linked lists]]
> - [[2 Zettels/two pointers technique\|two pointers technique]]

Reorder the list by alternately picking nodes from the start and end.

```
input:  L1 -> L2 -> L3 -> ...... -> Ln-2 -> Ln-1 -> Ln
output: L1 -> Ln -> L2 -> Ln-1 -> L3 -> Ln-2 -> .....
```

## Idea

The approach involves three main steps:

1. **Find the Middle:** Use the [[2 Zettels/slow and fast pointers\|slow and fast pointers]] technique to find the [[6 Problems/middle of the linked list\|middle of the linked list]]. The slow pointer will point to the middle node when the fast pointer reaches the end.

Visualization:

```
Initial List: L1 → L2 → L3 → L4 → L5 → L6 → NULL
               ↑    ↑
             slow fast

After 1st iteration: L1 → L2 → L3 → L4 → L5 → L6 → NULL
                           ↑        ↑
                         slow     fast

After 2nd iteration: L1 → L2 → L3 → L4 → L5 → L6 → NULL
                                 ↑            ↑
                               slow         fast
```

2. **Reverse the Second Half:** [[2 Zettels/reversing a linked list\|Reverse]] the second half of the linked list starting from the middle node.

Visualization:

```
Before reverse: L1 → L2 → L3 → L4 → L5 → L6 → NULL
After reverse:  L1 → L2 → L3 → L6 → L5 → L4 → NULL
```

3. **Merge the Two Halves:** Merge the first half and the reversed second half by alternately picking nodes from each half ([[2 Zettels/two pointers technique\|two pointers technique]]).

Visualization:

```
Step 1: L1 → L6 → L2 → L3 → L5 → L4 → NULL
Step 2: L1 → L6 → L2 → L5 → L3 → L4 → NULL
```

**Time Complexity:** $O(n)$  
**Space Complexity:** $O(1)$

## Code

```cpp
void reorderList(ListNode *head) {
  // input: L1 -> L2 -> L3 -> ...... -> Ln-2 -> Ln-1 -> Ln
  // output: L1 -> Ln -> L2 -> Ln-1 -> L3 -> Ln-2 -> .....
  if (!head || !head->next) {
    return;
  }

  // apply two pointer technique to find the middle of the list
  ListNode *slow = head;
  ListNode *fast = head;
  while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
  }

  // reverse the second half of the list
  ListNode *prev = nullptr;
  ListNode *curr = slow;
  ListNode *next = nullptr;
  while (curr) {
    next = curr->next;
    curr->next = prev;
    prev = curr;
    curr = next;
  }

  // merge the two lists
  ListNode *first = head;
  ListNode *second = prev;
  while (second->next) {
    ListNode *temp = first->next;
    first->next = second;
    first = temp;

    temp = second->next;
    second->next = first;
    second = temp;
  }
}
```

## Related
