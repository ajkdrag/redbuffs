---
{"publish":true,"tags":["type/problem"],"platform":"DesignGurus","link":null,"PassFrontmatter":true,"created":"2025-01-29T20:36:28.619+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/linked lists\|linked lists]]

## Idea

- Start at the head of the linked list
- For each node:
  - Compare the current node's value with its successor
  - If they are identical, remove the duplicate by updating the next pointer of the current node to its successor's successor
  - If they are distinct, move to the next node
- Continue until the end of the list is reached

**Time Complexity:** $O(n)$
**Space Complexity:** $O(1)$

```
Initial List: 1 -> 1 -> 2 -> 3 -> 3

Step 1: [1] (current) -> 1 -> 2 -> 3 -> 3
        Detects duplicate, skips next node
        List now: 1 -> 2 -> 3 -> 3

Step 2: 1 -> [2] (current) -> 3 -> 3
        No duplicate, move forward

Step 3: 1 -> 2 -> [3] (current) -> 3
        Detects duplicate, skips next node
        List now: 1 -> 2 -> 3

Final List: 1 -> 2 -> 3
```

## Code

```cpp
// implementation 1
class Solution {
public:
  ListNode *deleteDuplicates(ListNode *head) {
    ListNode *curr = head;
    ListNode *temp = nullptr;
    ListNode *prev = nullptr;

    while (curr) {
      temp = curr;
      if (prev and curr->val == prev->val) {
        prev->next = curr->next;
        curr->next = nullptr;
        delete temp;
      } else {
        prev = curr;
      }
      curr = prev->next;
    }
    return head;
  }
};

// Cleaner implementation
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* current = head;

        while (current && current->next) {
            if (current->next->val == current->val) {
                current->next = current->next->next;
            } else {
                current = current->next;
            }
        }
        return head;
    }
};
```

## Related
