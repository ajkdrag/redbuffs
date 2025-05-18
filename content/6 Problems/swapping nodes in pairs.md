---
{"publish":true,"created":"2025-01-29T20:04:20.717+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/linked lists\|linked lists]]

Given a singly linked list, swap every two adjacent nodes and return the head of the modified list.

If the total number of nodes in the list is odd, the last node remains in place. Every node in the linked list contains a single integer value.

**Input**: `[7, 8, 9, 10, 11]`  
**Output**: `[8, 7, 10, 9, 11]`  
**Justification**: Pairs (7,8) and (9,10) are swapped. 11 remains in its place as it has no adjacent node to swap with.

## Idea

Straightforward implementation: to swap nodes in pairs in a linked list, start with a [[2 Zettels/use dummy node for linked list problems\|dummy node]] before the list's first node. This helps to easily handle swaps at the beginning. Then, go through the list, looking at two nodes at a time. To switch the position of two nodes, change the links between these nodes. After swapping a pair, move on to the next two nodes

## Code

```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if (!head || !head->next) return head;

        ListNode dummy(-1); // makes code simpler
        ListNode *prev = &dummy;
        ListNode *curr = head;

        while(curr and curr->next){
            prev->next = curr->next;
            curr->next = curr->next->next;
            prev->next->next = curr;
            prev = curr;
            curr = curr->next;
        }

        return dummy.next;
    }
};
```

## Related
