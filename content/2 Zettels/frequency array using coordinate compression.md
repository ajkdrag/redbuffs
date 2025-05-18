---
{"publish":true,"created":"2025-02-11T13:45:47.170+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/frequency array\|frequency array]]
> - [[2 Zettels/coordinate compression\|coordinate compression]]

Coordinate compression is a technique used to reduce the range of values in a dataset while preserving the relative order of the elements. It's particularly useful when you have a problem where the actual values don't matter as much as their relative positions.

### How it Works (with Frequency Arrays)

1. **Create a Sorted Set of Unique Values**: Extract all unique values from your input data and store them in a sorted set (like `std::set` in C++). This automatically removes duplicates and sorts the values
2. **Map Original Values to Compressed Coordinates**: Create a mapping (e.g., using `std::map` or an array) from the original values to their compressed coordinates. The compressed coordinates will be in the range `[0, number of unique values - 1]`
3. **Build the Frequency Array**: Now, instead of using the original values as indices in your frequency array, use the compressed coordinates

## Example: Range Query Counter

You are given `N` ranges `[L₁, R₁], [L₂, R₂], ..., [Lₙ, Rₙ]` where `1 ≤ N ≤ 5000` and `-10⁹ ≤ Lᵢ, Rᵢ ≤ 10⁹`. For each range `[Lᵢ, Rᵢ]`, you need to count maximum number of ranges covering any point

### Idea

Sure there are simple ways to solve the problem, but we will showcase how coordinate compression can be used in conjunction with frequency arrays. Observe that:

1. The actual values of coordinates don't matter, only their relative positions matter
2. The range of possible coordinates (-10⁹ to 10⁹) is too large for a direct frequency array

### Algorithm

1. Use coordinate compression to map the original coordinates to a smaller range
2. For each compressed range:
    - Add 1 to all positions in the frequency array from L to R
    - This indicates that all these positions L to R are coverd by a range
    - Track running max: `ans = max(freq[pos], ans)`

### Code

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;

  vector<pair<int, int>> ranges(n);
  set<int> coords; // Will store unique coordinates

  // Read input and collect unique coordinates
  for (int i = 0; i < n; i++) {
    cin >> ranges[i].first >> ranges[i].second;
    coords.insert(ranges[i].first);
    coords.insert(ranges[i].second);
  }

  // Create mapping from original coordinates to compressed ones
  map<int, int> coord_map;
  int idx = 0;
  for (int coord : coords) {
    coord_map[coord] = idx++;
  }

  // Convert original ranges to compressed ranges
  vector<pair<int, int>> compressed_ranges(n);
  for (int i = 0; i < n; i++) {
    compressed_ranges[i].first = coord_map[ranges[i].first];
    compressed_ranges[i].second = coord_map[ranges[i].second];
  }

  // Create frequency array using compressed coordinates
  vector<int> freq(coords.size(), 0);

  // Mark range coverages
  int res = 0;
  for (int i = 0; i < n; i++) {
    for (int j = compressed_ranges[i].first; j <= compressed_ranges[i].second;
         j++) {
      freq[j]++;
      res = max(res, freq[j]);
    }
  }

  cout << res << "\n";

  return 0;
}
```

```
Input:
5
1 4
2 3
3 6
5 7
-1000 1001

Output:
4
```

**Time Complexity**

- Coordinate compression: O(N log N) (since C++ sets and maps have log N insert)
- Processing ranges: O(N \* K) where K is the number of unique coordinates
- Overall: O(N \* K) where K ≤ 2N (since each range contributes at most 2 unique coordinates)

**Space Complexity**

- O(N) for storing ranges and frequency array

## Related
