---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-29T15:49:45.168+05:30"}
---


> [!Topics]
> - [[2 Zettels/linked lists\|linked lists]]

Linked list problems often require precise pointer manipulation to avoid errors and edge cases. Below are key strategies to simplify your implementations and write robust code.
### 1. Optimal Use of Pointers  
Use fewer pointers when possible. The idea is that for problems where we are only checking elements in front of us, we don't need `prev` pointers. 

**Example**: [[6 Problems/remove duplicates from sorted linked list\|remove duplicates from sorted linked list]]
```cpp
ListNode* deleteDuplicates(ListNode* head) {
    ListNode* current = head;
    while (current && current->next) {
        if (current->val == current->next->val) {
            current->next = current->next->next; // Skip duplicate
        } else {
            current = current->next;
        }
    }
    return head;
}
```
Here, a single `current` pointer checks ahead (`current->next`) to skip duplicates, avoiding the need for a `prev` pointer.  

**When to use multiple pointers:**  Problems like [[2 Zettels/reversing a linked list\|reversing a linked list]] require tracking `prev`, `current`, and `next` pointers.  
```cpp
ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *current = head, *next;
    while (current) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    return prev;
}
```

### 2. Dummy Nodes Simplify Edge Cases  
Good tip to [[2 Zettels/use dummy node for linked list problems\|use dummy node for linked list problems]] when the head might be modified (e.g., deletions, insertions at head).

**Example:** Remove all nodes with value `x`.  
```cpp
ListNode* removeElements(ListNode* head, int x) {
    ListNode dummy(-1);
    dummy.next = head;
    ListNode* current = &dummy;
    
    while (current->next) {
        if (current->next->val == x) {
            current->next = current->next->next;
        } else {
            current = current->next;
        }
    }
    return dummy.next;
}
```
The dummy node avoids special cases when the head itself needs removal.

### 3. Memory Management Awareness  
- In coding contests: Focus on logic; skipping `delete` is often acceptable
- In production: Deallocate memory to prevent leaks; [[memory management\|memory management]] required

**Example with deletion:**  
```cpp
if (prev && prev->val == current->val) {
    prev->next = current->next;
    delete current; // Free memory
    current = prev->next;
}
```

### 4. Handle Edge Cases Explicitly  
Always test for:  
- Empty lists (`head == nullptr`).  
- Single-node lists.  
- All nodes being duplicates (or matching the target).  

**Example:** Check for empty list at the start:  
```cpp
if (!head) return nullptr;
```

### 5. Fast and Slow Pointers  
Useful for cycle detection, finding the middle, or nth node from the end.  

**Find the middle node:**  
```cpp
ListNode* slow = head, *fast = head;
while (fast && fast->next) {
    slow = slow->next;
    fast = fast->next->next;
}
return slow;
```

### 6. Avoid Null Pointer Dereferences  
Always check `current` and `current->next` before accessing nested pointers.  

```cpp
// BAD PRACTICE
while (current->next->next) {} // May crash if current->next is null!

// OK
while (current && current->next && current->next->next) {}
```

### 7. Common Pitfalls  
- **Losing reference to nodes:** Always store `next` before modifying pointers.  
- **Incorrect head updates:** Use dummy nodes to avoid missing head changes.  
- **Infinite loops:** Ensure loop conditions terminate (e.g., update pointers correctly).  

## Related
