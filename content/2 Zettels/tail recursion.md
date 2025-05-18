---
{"publish":true,"created":"2025-01-29T10:55:34.163+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[recursion\|recursion]]


A function is **tail recursive** if the **recursive call is the last statement** executed in the function:
- No additional computation occurs after the recursive call.
- The function's return value is exactly the result of the recursive call (often directly returned).

A classic example is computing the factorial of `n`:
```cpp
ll factorial_tail_recursive(ll n, ll accumulator) {
  if (n <= 1) {
    return accumulator;
  }
  return factorial_tail_recursive(n - 1, n * accumulator);
}
```

Here, the function calls itself with `n-1` and accumulates the result at each recursive call.

> [!Tip]
> You can [[2 Zettels/replace tail-recursion with a loop\|replace tail-recursion with a loop]]. The loop essentially tracks the same parameters you would have passed to the recursive call.

## Related
