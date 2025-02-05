---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[c++ internals\|c++ internals]]

Add some value to `int` or `long` beyond their max capacity, results in the excess offset from the minimum value. 

`INT_MAX + N = (INT_MAX + 1) + N - 1`
`INT_MAX + N = (-INT_MAX - 1) + (N - 1) = -INT_MAX + N - 2`

In above example, if we have `N=INT_MAX`, we get:

```cpp
int x = INT_MAX;
int N = INT_MAX;
cout << (x+N) << endl; // -2
```

In many coding contests, a nice way to deal with overflows is to use [[modular arithmetic\|modular arithmetic]] to keep value within `int`limit ([[2 Zettels/why modulo 1e9 + 7 is used in cp\|1e9 + 7 is a popular choice]] to mod with).
## Related
