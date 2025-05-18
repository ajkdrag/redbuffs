---
{"publish":true,"created":"2025-02-25T10:57:38.697+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[combinatorics\|combinatorics]]

The problem asks us to find the number of ways to choose a group of exactly $t$ actors from $n$ boys and $m$ girls such that there are at least 4 boys and at least 1 girl in the group.

Constraints: $4\le n \le 30, 1 \le m \le 30, 5 \le t \le (n + m)$

## Idea

A direct approach to solve this problem is to consider the constraints and use combinations. Let's think about the [[2 Zettels/complementary counting\|complementary counting]] approach. It's often easier to calculate the total number of ways without any restrictions and then subtract the number of invalid ways.

The total number of ways to choose a group of $t$ actors from $n$ boys and $m$ girls, without any restrictions, is simply choosing $t$ people from a total of $n+m$ people. This can be calculated using combinations as $\binom{n+m}{t}$.

Now, we need to subtract the number of invalid groups, which are the groups that do _not_ satisfy the condition "at least 4 boys and at least 1 girl". The negation of this condition is "(less than 4 boys) OR (less than 1 girl)". Let's consider these invalid cases:

Case 1: The number of boys is less than 4. This means the number of boys can be 0, 1, 2, or 3.
Case 2: The number of girls is less than 1. This means the number of girls is 0.

Let's calculate the number of groups for each invalid case:

For Case 1 (number of boys is less than 4):

- If there are 0 boys, then there must be $t$ girls to make a group of size $t$. The number of ways is $\binom{n}{0} \times \binom{m}{t}$.
- If there is 1 boy, then there must be $t-1$ girls. The number of ways is $\binom{n}{1} \times \binom{m}{t-1}$.
- If there are 2 boys, then there must be $t-2$ girls. The number of ways is $\binom{n}{2} \times \binom{m}{t-2}$.
- If there are 3 boys, then there must be $t-3$ girls. The number of ways is $\binom{n}{3} \times \binom{m}{t-3}$.

For Case 2 (number of girls is 0):

- If there are 0 girls, then there must be $t$ boys. The number of ways is $\binom{n}{t} \times \binom{m}{0} = \binom{n}{t}$.

Are these cases **mutually exclusive**? Yes, they are. Case 2 (girls=0) implies all $t$ actors are boys. In Case 1, we are considering cases where the number of boys is 0, 1, 2, or 3. Since $t \ge 5$, there's no overlap.

Thus, the number of valid groups (groups with at least 4 boys and at least 1 girl) is the total number of groups minus the number of invalid groups:

$$
\binom{n+m}{t} - \left( \binom{n}{t} \binom{m}{0} + \sum_{i=0}^{3} \binom{n}{i} \binom{m}{t-i} \right)
$$

Also, since problem doesn't ask to any mod, we have to do [[2 Zettels/binomial coefficient without factorials in linear time\|binomial coefficient without factorials in linear time]]. We need to be careful with the constraints of combinations. $\binom{n}{r} = 0$ if $r > n$ or $r < 0$. Our code should naturally handle these cases in the `nCr` function.

## Code

```cpp
ll nCr(ll n, ll r) {
  if (r > n)
    return 0;
  if (r > n - r)
    r = n - r;
  ll res = 1;
  for (ll i = 0; i < r; ++i) {
    res *= (n - i);
    res /= (i + 1);
  }
  return res;
}

void solve() {
  ll n, m, t;
  cin >> n >> m >> t;

  ll total = nCr(n + m, t);
  ll sub = nCr(n, t);
  for (int i = 0; i <= 3; ++i) {
    sub += nCr(n, i) * nCr(m, t - i);
  }
  total -= sub;
  cout << total;
}
```

## Related
