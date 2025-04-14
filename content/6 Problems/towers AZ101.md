---
{"publish":true,"tags":["type/problem"],"platform":"AlgoZenith","link":null,"PassFrontmatter":true,"created":"2025-03-06T11:32:36.163+05:30"}
---


> [!Topics]
>
> - [[c++ STL\|c++ STL]]
> - [[binary search\|binary search]]
> - [[2 Zettels/greedy algorithms\|greedy algorithms]]

You are given N blocks. You have to build towers by placing blocks on top of each other with the condition that the upper block must be smaller than the lower block. You have to process the blocks in the given order. Find the minimum possible number of towers you can create.

## Idea

When we consider a new block, we look at the topmost blocks of all existing towers. If there is any tower whose topmost block is strictly larger than the current block, we can place the current block on top of it. To make the best use of existing towers and potentially accommodate future blocks as well, a **greedy approach** works: find the tower whose top block is **just larger** than the current block.

The key insight is that when we have multiple choices of where to place a new block, we should always choose the smallest valid tower top. This is optimal because: If we chose a larger tower top instead (say tower A over tower B), we'd waste a "more valuable" large space that could potentially accommodate a larger block in the future, while leaving a "less valuable" small space unused. Later, if we encounter a block that fits tower B but not tower A, we would have to create an extra tower unnecessarily.

To find the smallest valid tower top, we can use binary search on the tower tops. In fact, we can use a **multiset** to store the tower tops and call `lower_bound(x+1)` to find the destination. If all tower tops are `<=` current block, we have to create a new tower with the current block.

**Time Complexity:** $O(n \log n)$
**Space Complexity:** $O(n)$

## Code

```cpp
void solve() {
  int n;
  cin >> n;
  multiset<int> ms;
  int x;
  int res = 0;
  while (n--) {
    cin >> x;
    if (ms.empty()) {
      ms.insert(x);
      res++;
    } else {
      auto it = ms.lower_bound(x + 1);
      if (it == ms.end()) {
        res++;
      } else {
        ms.erase(it);
      }
      ms.insert(x);
    }
  }
  cout << res << endl;
}
```

## Related
