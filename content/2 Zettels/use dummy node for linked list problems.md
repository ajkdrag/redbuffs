---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[2 Zettels/linked lists\|linked lists]]
> - [[clean code\|clean code]]
> - [[algorithmic paradigm\|algorithmic paradigm]]

Dummy nodes (also called sentinel or header nodes) are crucial for linked list problems because they eliminate several edge cases and simplify the code.
- Avoids Special Treatment of Head Node
- Simplifies Insert/Delete Operations
- Makes List Manipulation Safer

> [!Caution]
> The only real downside is that you need to remember to return `dummy.next` instead of `dummy` when returning the list

A good example would be [[6 Problems/merging two sorted linked lists\|merging two sorted linked lists]]: 

```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummy(-1), *curr = &dummy;
        
        while (l1 && l2){
            (l1->val < l2->val) ? (curr->next = l1, l1 = l1->next) 
                                : (curr->next = l2, l2 = l2->next);
            curr = curr->next;
        }
            
        curr->next = l1 ? l1 : l2;
        return dummy.next;
    }
};
```

Without using this dummy node, we would need to check if `curr` is null before doing `curr->next` which would make the code look less clean.

Another nice example will be [[6 Problems/swapping nodes in pairs\|swapping nodes in pairs]], i.e. for input `[7, 8, 9, 10, 11]`  
we want output `[8, 7, 10, 9, 11]`:

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
