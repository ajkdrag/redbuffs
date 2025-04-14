---
{"publish":true,"tags":["type/problem"],"platform":"AtCoder","link":"https://atcoder.jp/contests/abc170/tasks/abc170_e","PassFrontmatter":true,"created":"2025-03-01T11:22:20.252+05:30"}
---


> [!Topics]
>
> - [[c++ STL\|c++ STL]]

In this problem, we need to maintain a dynamic structure for infants in kindergartens where each infant has a rating, and each kindergarten's "power" is defined as the maximum rating of its infants. After every transfer of an infant between kindergartens, we must output the minimum among all kindergartens' maximum ratings (i.e. the "evenness").

## Idea

We use a vector of multisets—one for each kindergarten—to maintain the ratings and a global multiset to keep track of each kindergarten's current maximum rating. This allows us to update both the local and global structures in logarithmic time after every transfer.

During each transfer, only 2 kindergartens are affected. We remove the affected kindergartens' maximum ratings from the global multiset, update their respective rating multisets by removing and adding the transferred infant's rating, and then re-insert the updated maximum ratings back into the global multiset. The "evenness" is then simply the minimum element of the global multiset, ensuring each transfer and query is processed in O(log N) time.

**Time Complexity:** $O((n + q) \log n)$ (initializing + querying)
**Space Complexity:** $O(n + K)$ where $K$ is max no of kindergartens

> [!Note]
> Although we maintain a vector of multisets of size K and a global multiset with at most K elements, the total number of ratings stored is only n (each infant is stored exactly once), so the overall space usage remains linear with respect to n plus the overhead for K kindergartens.

## Code

```cpp
void solve() {
  int n, q;
  cin >> n >> q;

  const int MAX_K = 200001; // kindergartens indexed from 1 to 200000
  vector<multiset<int>> kgs(MAX_K);
  vector<pii> infants(n); // {rating, kindergarten}
  multiset<int> global;

  for (int i = 0; i < n; ++i) {
    int a, b;
    cin >> a >> b;
    infants[i] = {a, b};
    kgs[b].insert(a);
  }

  // Build global multiset of max ratings.
  for (int i = 1; i < MAX_K; ++i) {
    if (!kgs[i].empty())
      global.insert(*kgs[i].rbegin());
  }

  while (q--) {
    int c, d;
    cin >> c >> d;
    c--; // adjust to 0-indexed

    int rating = infants[c].first;
    int oldKg = infants[c].second;

    // Update old kindergarten: Remove its current max from global.
    global.erase(global.find(*kgs[oldKg].rbegin()));

    // Remove one instance of rating from the old kindergarten.
    kgs[oldKg].erase(kgs[oldKg].find(rating));

    // If there are still infants in the old kindergarten, update global.
    if (!kgs[oldKg].empty())
      global.insert(*kgs[oldKg].rbegin());

    // Update new kindergarten: Remove its current max if it exists.
    if (!kgs[d].empty())
      global.erase(global.find(*kgs[d].rbegin()));

    kgs[d].insert(rating);
    global.insert(*kgs[d].rbegin());

    infants[c].second = d;
    cout << *global.begin() << "\n";
  }
}
```

## Related
