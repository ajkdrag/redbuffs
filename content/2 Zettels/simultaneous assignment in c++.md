---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-03T13:24:35.384+05:30"}
---


> [!Topics]
> - [[c++ STL\|c++ STL]]

In Python, we can do simultaneous assignment without any temp variable like this:
```python
a, b = b, a%b
```

In C++, we can achieve the same using `std::tie` and `std::make_tuple`, which are part of the C++ Standard Template Library (STL) (under `<tuple>` header).

```cpp
 // Simultaneously assigns b to a, and a%b to b
std::tie(a, b) = std::make_tuple(b, a % b);
```
## Related
