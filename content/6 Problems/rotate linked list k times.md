---
{"publish":true,"created":"2025-04-09T09:14:30.219+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/linked lists\|linked lists]]

## Idea

The key observation is that rotating a list of length L by k places is equivalent to moving the last k nodes to the front. We find the rotation point by locating the node at position L-k-1, where we'll break the list. The node after this becomes our _new head_, and the tail is connected to the original head, to bring the last k nodes to the front.

**TIme Complexity:** $O(n)$
**Space Complexity:** $O(1)$

```
Original List:  1 -> 2 -> 3 -> 4 -> 5 -> NULL
Rotate by k=2

Step 1: Find length (length = 5) and calculate k %= length (k = 2)

Step 2: Find new tail (at position length-k-1 = 2)
        1 -> 2 -> 3 -> 4 -> 5 -> NULL
                  ^
               newTail

Step 3: Set new head and break the list
        1 -> 2 -> 3    4 -> 5 -> NULL
                  ^    ^
               newTail newHead

Step 4: Find old tail (end of new head portion)
        1 -> 2 -> 3    4 -> 5 -> NULL
                            ^
                          oldTail

Step 5: Connect old tail to original head
        1 -> 2 -> 3    4 -> 5 -> 1 -> 2 -> 3 -> NULL
                            ^
                          oldTail

Step 6: Return new head
Result:  4 -> 5 -> 1 -> 2 -> 3 -> NULL
```

## Code

```cpp
int getListLength(ListNode *head) {
    int length = 0;
    while (head) {
        length++;
        head = head->next;
    }
    return length;
}

ListNode *getTail(ListNode *head) {
    if (!head) return nullptr;
    while (head->next) {
        head = head->next;
    }
    return head;
}

ListNode *rotateList(ListNode *head, int k) {
    if (!head || !head->next) return head; // Handle empty/single-node list

    int length = getListLength(head);
    k %= length;
    if (k == 0) return head;

    ListNode *newTail = head;
    for (int i = 0; i < length - k - 1; i++) {
        newTail = newTail->next;
    }

    ListNode *newHead = newTail->next;
    newTail->next = nullptr;
    ListNode *oldTail = getTail(newHead);
    oldTail->next = head;

    return newHead;
}
```

## Related

- [[6 Problems/rotate array k times\|rotate array k times]]
