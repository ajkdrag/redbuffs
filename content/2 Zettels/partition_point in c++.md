---
{"publish":true,"created":"2025-03-27T19:58:40.351+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[c++ STL\|c++ STL]]
> - [[binary search\|binary search]]

`std::partition_point` is a standard algorithm in C++ that efficiently finds the **partition point** of a partitioned range. A partitioned range is one where all elements satisfying a certain predicate appear before all elements that do not satisfy it. `partition_point` helps locate the boundary between these two partitions.

**In essence:** Given a range `[first, last)` that is already partitioned according to a predicate `p`, `std::partition_point` returns an iterator to the first element in the range that does *not* satisfy the predicate `p`. If all elements in the range satisfy `p`, it returns `last`.

`std::partition_point` performs approximately $O(\log N)$ predicate applications, where $N$ is the distance between `first` and `last`. This logarithmic complexity makes it very efficient for large ranges as it uses a binary search-like approach.


```cpp
// Example
int main() {
  vector<int> v = {2, 4, 6, 8, 1, 3, 5, 7, 9};

  auto it =
      partition_point(v.begin(), v.end(), [](int n) { return n % 2 == 0; });

  cout << "Partition point index: " << distance(v.begin(), it)
       << endl; // Output: 4 (index of first odd num)
  cout << "Element at partition point: " << *it
       << endl; // Output: 1 (first odd num)

  cout << "Even numbers (first partition): ";
  for (auto current = v.begin(); current != it; ++current) {
    cout << *current << " ";
  }
  cout << endl; // Output: [2, 4, 6, 8]

  cout << "Odd numbers (second partition): ";
  for (auto current = it; current != v.end(); ++current) {
    cout << *current << " ";
  }
  cout << endl; // Output: [1, 3, 5, 7, 9]

  return 0;
}
```
## Related
