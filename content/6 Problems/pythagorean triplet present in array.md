---
{"publish":true,"created":"2025-02-16T09:58:16.170+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/frequency array\|frequency array]]
> - [[c++ STL\|c++ STL]]

Given an array `arr`, return true if there is a **triplet (a, b, c)** from the array (where a, b, and c are on different indexes) that satisfies $a^2+b^2=c^2$, otherwise return false.

**Constraints:**  
1 <= `arr.size()` <= $10^5$  
1 <= `arr[i]` <= $10^3$

## Idea

Because of constraints, we can't do straightforward $O(n^2)$ using two loops. There are 2 ways to do this:

### Approach 1

Since `arr[i] <= 1000`, we can dump the array to a set and for every element, find 2 numbers such that $\sqrt{a^2 + b^2}$ equals it. We can use [[2 Zettels/two pointers at opposite ends\|two pointers at opposite ends]] technique (e.g. 2 sum). Let k = num unique values in the given array (atmost 1000). This is correct since duplicates can't be there in a [[pythagorean triplet\|pythagorean triplet]].

**Time Complexity**: $O(k^2)$

1. Creating set (sorted in C++) from array: O(n log k), converting set to vector: O(k)
2. For each unique value in set (at most k iterations):
   - Two pointer traversal: O(k)
   - Total per iteration: O(k)
3. Total: O(k \* k) = O(1000000) Which is actually much better than $O(n^2)$ since k << n

**Space Complexity**: $O(k)$

1. Set storage: O(k) since at most 1000 unique values
2. Vector created from set: O(k)
3. Other variables: O(1)

### Approach 2

The idea is to generate all possible pairs `(a, b)` within the range of *max element* in the input array using nested loops. For each pair, calculate the value of `c` required to form a [[pythagorean triplet\|pythagorean triplet]] and check if `c` exists in the input array. We can check if c exists or not in constant time by marking all the elements of input array in a visited array.

Here, we only need to mark the elements and not store their "frequency" because for all valid triplets of positive integers `(a, b, c)` no two elements can be equal.

## Code

```cpp
// Approach 1
class Solution {
public:
  Solution() {}

  int get_c(ll a, ll b) {
    ll c_squared = a * a + b * b;
    return c_squared;
  }

  bool pythagoreanTriplet(vector<int> &arr) {
    set<ll> values(all(arr));
    vector<ll> sorted_vals(values.begin(), values.end());
    int n = sorted_vals.size() - 1;

    for (ll i : values) {
      int left = 0;
      int right = n - 1;
      ll target = i * i;
      while (left < right) {
        if (get_c(sorted_vals[left], sorted_vals[right]) < target) {
          left++;
        } else if (get_c(sorted_vals[left], sorted_vals[right]) > target) {
          right--;
        } else {
          return true;
        }
      }
    }
    return false;
  }

  bool pythagoreanTripletV2(vector<int> &arr) {
    int maxEle = 0;
    for (int ele : arr)
      maxEle = max(maxEle, ele);

    vector<bool> vis(maxEle + 1, 0);

    for (int ele : arr)
      vis[ele] = true;

    for (int a = 1; a < maxEle + 1; a++) {

      if (vis[a] == false)
        continue;

      for (int b = 1; b < maxEle + 1; b++) {

        if (vis[b] == false)
          continue;

        int c = sqrt(a * a + b * b);

        // If c^2 is not a perfect square or c exceeds the
        // maximum value
        if ((c * c) != (a * a + b * b) || c > maxEle)
          continue;

        if (vis[c] == true) {
          return true;
        }
      }
    }
    return false;
  }
};

```

## Related
