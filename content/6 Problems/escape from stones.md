---
{"publish":true,"created":"2025-04-14T11:52:05.305+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/two pointers technique\|two pointers technique]]
> - [[2 Zettels/linked lists\|linked lists]]

Squirrel Liss starts at interval `[0, 1]`. Stones fall from a mountain, and Liss escapes to the left or right. The stones are numbered from 1 to n. Given a string s of length n, where 'l' or 'r' indicates the direction Liss escapes when a stone falls, find the sequence of stones' numbers from left to right after all n stones fall.

```
input: llrlr
output: 3 5 4 2 1

Explanation:
Initially, interval: [0, 1]

Stone 1: interval: [0, S1, 1], Liss escapes to the left
Stone 2: interval: [0, S2, S1, 1], Liss escapes to the left
Stone 3: interval: [0, S3, S2, S1, 1], Liss escapes to the right
Stone 4: interval: [0, S3, S4, S2, S1, 1], Liss escapes to the left
Stone 5: interval: [0, S3, S5, S4, S2, S1, 1], Liss escapes to the right

Thus, final sequence: 3 5 4 2 1
```

## Idea

When first stone falls, it effectively makes our interval `[0, S1, 1]` where `S1` is the stone that falls. Liss escapes to the left or right depending on the direction given. For next stone, our "input" interval is either `[0, S1]` (if Liss doged to the left) or `[S1, 1]` (if Liss dodged to the right). When next stone falls, we insert it between the left and right pointers again and this repeats. This can be simulated using:

1. [[2 Zettels/doubly linked list\|doubly linked list]]: Maintain two pointers representing the left and right boundaries. Insert new nodes between these pointers.
2. [[2 Zettels/two pointers at opposite ends\|two pointers at opposite ends]]: Maintain a single array and two pointers (left and right). For each stone:

   - If direction is 'r', place at current left position and increment left pointer
   - If direction is 'l', place at current right position and decrement right pointer

   This works because:

   - 'r' stones need to appear before all subsequent stones (so we place them left-to-right)
   - 'l' stones need to appear after all subsequent stones (so we place them right-to-left)

   The pointers naturally maintain correct ordering by tracking insertion points from both ends.

> [!Tip]
>
> When we dodge to the left, current stone will effectively be to the right of all future stones and vice versa

Example for `llrlr` using two pointers:

```
arr: [x, x, x, x, x]
left: 1, right: 5

l: [x, x, x, x, 1]
left: 1, right: 4

l: [x, x, x, 2, 1]
left: 1, right: 3

r: [3, x, x, 2, 1]
left: 2, right: 3

l: [3, x, 4, 2, 1]
left: 2, right: 2

r: [3, 5, 4, 2, 1]
left: 3, right: 2
```

**Time Complexity:** $O(n)$  
**Space Complexity:** $O(n)$

## Code

```cpp
class ListNode {
public:
  int val;
  ListNode *next;
  ListNode *prev;
  ListNode(int x) : val(x), next(NULL), prev(NULL) {};
};

class DLL {
public:
  ListNode *head;
  ListNode *tail;
  DLL() : head(NULL), tail(NULL) {};
  DLL(ListNode *head, ListNode *tail) : head(head), tail(tail) {};

  void insertBetween(ListNode *prev, ListNode *next, ListNode *node) {
    node->next = next;
    node->prev = prev;
    prev->next = node;
    next->prev = node;
  }
};

// Approach 1: (Doubly Linked List)
void solve() {
  string s;
  cin >> s;

  ListNode *head = new ListNode(-1);
  ListNode *tail = new ListNode(-1);
  head->next = tail;
  tail->prev = head;

  DLL *dll = new DLL(head, tail);

  // dummy nodes
  ListNode *left = head;
  ListNode *right = tail;

  for (int i = 0; i < int(s.size()); ++i) {
    ListNode *node = new ListNode(i + 1);
    dll->insertBetween(left, right, node);

    if (s[i] == 'l') {
      right = node;
    } else {
      left = node;
    }
  }

  ListNode *curr = head->next;
  while (curr != tail) {
    cout << curr->val << " ";
    curr = curr->next;
  }
  cout << endl;
}

// Approach 2: (Optimized Two Pointers)
void solve() {
  string s;
  cin >> s;
  int n = s.size();
  vector<int> ans(n + 2); // 1-based indexing
  int left = 1, right = n;

  for (int i = 0; i < n; ++i) {
    if (s[i] == 'l') {
      ans[right--] = i + 1; // Place 'l' stones from right
    } else {
      ans[left++] = i + 1;  // Place 'r' stones from left
    }
  }

  for (int i = 1; i <= n; ++i) {
    cout << ans[i] << " ";
  }
  cout << endl;
}
```

## Related
