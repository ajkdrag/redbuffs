---
{"publish":true,"tags":["type/problem"],"platform":"DesignGurus","link":null,"PassFrontmatter":true,"created":"2025-01-29T19:58:18.128+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/linked lists\|linked lists]]
> - [[2 Zettels/two pointers technique\|two pointers technique]]

## Idea

Same idea as merging two sorted arrays. Maintain two pointers for the lists and compare the `ListA[i]` against `ListB[j]`. Whichever is smaller, take that in the final list and increment `i` or `j` accordingly (for linked lists, do `i = i->next` or `j = j->next`). Finally, if any of the `ListA` or `ListB` isn't exhausted, copy over it's elements to the final list (for linked lists, we can just update pointers as such: `curr->next = i` or `curr->next = j`)

## Code

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

## Related

- [[2 Zettels/merge sort implementation with auxiliary arrays\|merge sort implementation with auxiliary arrays]]
