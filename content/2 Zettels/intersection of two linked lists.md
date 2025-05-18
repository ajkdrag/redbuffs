---
{"publish":true,"created":"2025-04-09T08:18:43.477+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/linked lists\|linked lists]]
> - [[2 Zettels/two pointers technique\|two pointers technique]]

Finding the intersection point of two linked lists is a common problem with several elegant solutions.

### Problem Definition
Given two singly linked lists that may intersect at some point, find the node where they first meet.

```
List 1: head1 -> ... -> A -> B -> C -> NULL
                         ^
                         |
List 2: head2 -> ... -> X -> NULL
```

### Approach 1: Hash Set Method
- Traverse the first list and store each node's address in a hash set
- Traverse the second list and check if each node exists in the set
- First match is the intersection point
- **Time Complexity**: $O(m+n)$
- **Space Complexity**: $O(m)$ or $O(n)$

### Approach 2: Length Difference Method
- Calculate lengths of both lists: `len1` and `len2`
- Find difference: `diff = abs(len1 - len2)`
- Advance pointer of longer list by `diff` steps
- Move both pointers in tandem until they meet
- **Time Complexity**: $O(m+n)$
- **Space Complexity**: $O(1)$

### Approach 3: Two Pointer Reset Method
This elegant solution avoids explicitly calculating lengths:

```cpp
ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
    ListNode *l1 = headA, *l2 = headB;
    
    while (l1 != l2) {
        l1 = (l1 == nullptr) ? headB : l1->next;
        l2 = (l2 == nullptr) ? headA : l2->next;
    }
    
    return l1; // Returns intersection node or nullptr
}
```

The key insight: when a pointer reaches the end of its list, redirect it to the head of the other list. Both pointers will travel the same total distance before meeting at the intersection point (or both becoming nullptr if no intersection exists).

**Proof:**
- m = length of List 1 before intersection
- n = length of List 2 before intersection
- k = length of common part after intersection

When both pointers traverse their own list and then switch to the other:

- Pointer 1 travels: m + k + n steps
- Pointer 2 travels: n + k + m steps

These are equal (m + n + k), so they must meet at the intersection point. If there's no intersection (k=0), they'll both reach nullptr after m+n steps.

## Related
- [[2 Zettels/floyd's cycle finding algorithm\|floyd's cycle finding algorithm]]