---
{"publish":true,"created":"2025-04-08T09:38:08.750+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/sliding window with variable window size\|sliding window with variable window size]]
> - [[c++ STL\|c++ STL]]

The local library is organizing an exposition of books by a famous writer, Berlbury. The goal is to include as many books as possible while ensuring the height difference between the lowest and highest books does not exceed $k$ millimeters.

Find the maximum number of books that can be included in the exposition and identify the periods of Berlbury's creative work that these books cover.

In the first line of the output data print two numbers `a` and `b` (separate them by a space), where `a` is the maximum amount of books the organizers can include into the exposition, and `b` — the amount of the time periods, during which Berlbury published `a` books, and the height difference between the lowest and the highest among these books is not more than $k$ milllimeters.

## Idea

The problem requires finding the maximum length subarrays where the difference between maximum and minimum elements is $\le k$. This fits perfectly with the [[2 Zettels/sliding window with variable window size (snake framework)\|sliding window with variable window size (snake framework)]] approach. The key observation is that if a window `[L, R]` satisfies the height difference condition, any subwindow `[L+1, R]` will also satisfy it (since removing an element can only decrease the max or increase the min, thus maintaining or improving the difference). This satisfies the [[2 Zettels/sliding window with variable window size (snake framework)#Applicability Condition\|sliding window applicability condition]].

We maintain a `multiset` to efficiently track the current window's min and max. The head pointer expands rightwards as long as adding the next book maintains the height difference $\le k$ (verified via the `check()` function). When we can't expand further, we record the window if it's the longest found so far, then move the tail forward while updating the multiset.

**Time Complexity:** $O(n \log n)$ (multiset ops)
**Space Complexity:** $O(n)$ (multiset storage + storing indices for printing)

## Code

```cpp
bool check(multiset<int> &seen, int height, int k) {
  if (seen.empty())
    return true;
  // if we add book with height, is (max - min) still <= k?
  // case 1: in <= height <= max, then no problem
  // case 2: height < min, check if max - height <= k
  // case 3: height > max, check if height - min <= k
  int curr_min = *seen.begin();
  int curr_max = *seen.rbegin();
  if (height < curr_min) {
    return curr_max - height <= k;
  } else if (height > curr_max) {
    return height - curr_min <= k;
  } else {
    return true;
  }
}

void solve() {
  // Problem: Exposition
  int n, k;
  cin >> n >> k;

  vector<int> h(n);
  for (int i = 0; i < n; ++i) {
    cin >> h[i];
  }

  multiset<int> seen;
  int tail = 0, head = -1;
  int ans = 0;

  vector<pii> indices;
  while (tail < n) {
    while (head < n - 1 and check(seen, h[head + 1], k)) {
      head++;
      seen.insert(h[head]);
    }

    // process answer only if window is valid
    if (head - tail + 1 != 0) {
      if (head - tail + 1 > ans) {
        indices.clear();
        indices.pb({tail + 1, head + 1});
        ans = head - tail + 1;
      } else if (head - tail + 1 == ans) {
        indices.pb({tail + 1, head + 1});
      }
    }

    if (tail <= head) {
      seen.erase(seen.find(h[tail]));
    }

    tail++;
    head = max(head, tail - 1);
  }

  cout << ans << " " << indices.size() << endl;
  for (auto &[l, r] : indices) {
    cout << l << " " << r << endl;
  }
}
```

## Related
