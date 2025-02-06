---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[recursion\|recursion]]


A function is **tail recursive** if the **recursive call is the last statement** executed in the function:
- No additional computation occurs after the recursive call.
- The function's return value is exactly the result of the recursive call (often directly returned).

A classic example is computing the factorial of `n`:
```cpp
ll factorial_recursive(ll n) {
  if (n <= 1)
    return 1;

  return n * factorial_recursive(n - 1);
}
```

Here, the function calls itself with `n-1` and multiplies the return value by `n`.

> [!Tip]
> You can [[2 Zettels/replace tail-recursion with a loop\|replace tail-recursion with a loop]]. The loop essentially tracks the same parameters you would have passed to the recursive call.

## Related
