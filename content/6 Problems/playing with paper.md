---
{"publish":true,"created":"2025-01-25T11:29:09.066+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/euclid's algorithm\|euclid's algorithm]]

## Idea

Euclid's algorithm like idea, where we keep forming `a/b` squares and then the remaining rectangle will be of size `(b, a%b)`. Repeat this recurrence until we exhaust the paper. Since this is a tail recurrence, it can be done iteratively as well.

## Code

```cpp
ll func(ll a, ll b) {
  if (a < b)
    swap(a, b);

  if (b == 0)
    return 0;

  return (a / b) + func(b, a % b);
}

void solve() {
  ll a, b;
  cin >> a >> b;
  ll res = func(a, b);
  cout << res << endl;
}

```

## Related
