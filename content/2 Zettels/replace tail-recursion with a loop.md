---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[recursion\|recursion]]

General Approach to replace [[2 Zettels/tail recursion\|tail recursion]] with a loop:
- **Identify the parameters** that get updated at each recursive call.
- **Initialize** those parameters before the loop using the initial arguments.
- **Convert the recursion condition** (base case) to a loop condition.
- **Update the parameters** at the end of the loop body to mirror what happens in the tail-recursive call.
- **Return** the result once the termination condition is reached.

Classic example of computing factorial of a number `n`:
```cpp
ll factorial_iterative(ll n) {
  ll res = 1;
  while (n > 1) {
    res *= n;
    n--;
  }
  return res;
}

ll factorial_recursive(ll n) {
  if (n <= 1)
    return 1;

  return n * factorial_recursive(n - 1);
}
```

Another interesting example is computing $n^{th}$ fibonacci number:
```python
def fib_naive(n):
    if n < 2:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

def fib_tail(n, a=0, b=1):
    if n == 0:
        return a
    if n == 1:
        return b
    return fib_tail(n - 1, b, a + b)

def fib_iter(n):
    if n == 0:
        return 0
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
```

Note how we converted `fib_naive` to `fib_tail`:  a **tail-optimized** version by keeping track of the last two computed values. After that it's straightforward to create the iterative version.
## Related
