---
{"publish":true,"created":"2025-02-28T14:05:07.216+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[c++ STL\|c++ STL]]

Problem is straightforward. You are given a string of size N and Q queries. Queries of Type 1 ask you replace a character with the provided character `c`, while Type 2 queires ask you to print the number of distinct characters in the given range `[l, r]`.

## Idea

This can be solved using advanced data structures such as [[segment trees\|segment trees]], but something like a C++ set (i.e [[balanced binary search trees\|balanced binary search trees]]) can be smartly used to solve this.

For each alphabet (26 total), we can store the indices where they occur in the string in a set. Type 1 queries can be processed in O(log N) using the `erase` and `insert` functions. For Type 2 queries, all we want to do is check for each alphabet if any of it's occurrences fall within the range or not. To do this, we can find the first occurrence of the character after the `l`-th position using the `lower_bound` function for each character and comparing that value with `r`. This will also take O(log N) time.

**Time Complexity:** $O(26\cdot Q \log N) = O(Q \log N)$
**Space Complexity:** $O(26 \cdot N) = O(N)$

## Code

```cpp
void solve() {
  int n;
  cin >> n;
  string s;
  cin >> s;

  vector<set<int>> occ(26);
  for (int i = 0; i < n; ++i) {
    occ[s[i] - 'a'].insert(i);
  }

  int q, t;
  cin >> q;

  while (q--) {
    cin >> t;
    if (t == 2) {
      // query
      int l, r;
      cin >> l >> r;
      l--, r--; // 0-based idx
      int count = 0;
      for (int i = 0; i < 26; ++i) {
        auto it = occ[i].lower_bound(l);
        if (it != occ[i].end() and *it <= r)
          count++;
      }
      cout << count << '\n';

    } else {
      // update
      int idx;
      char c;
      cin >> idx >> c;

      idx -= 1; // 0-based idx
      int curr = s[idx] - 'a';
      occ[curr].erase(idx);
      occ[c - 'a'].insert(idx);
      s[idx] = c;
    }
  }
}
```

## Related
