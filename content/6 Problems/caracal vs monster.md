---
{"publish":true,"created":"2025-03-06T13:13:05.022+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[binary trees\|binary trees]]
> - [[recursion\|recursion]]

Caracal is fighting with a monster. The health of the monster is H.

Caracal can attack by choosing one monster. When a monster is attacked, depending on that monster's health, the following happens:

- If the monster's health is 1, it drops to 0
- If the monster's health, X, is greater than 1, that monster disappears. Then, two new monsters appear, each with the health of `X/2` (floor)
  Caracal wins when the healths of all existing monsters become 0 or below. Find the minimum number of attacks Caracal needs to make before winning.

## Idea

### Approach 1: Recursion

When you attack a monster with health $n$ (where $n>1$), you effectively replace it with two monsters that must be cleared later. This gives a recurrence:

$$
T(n) = 1 + 2 \cdot T\big(\lfloor n/2 \rfloor\big)
$$

with the base case $T(1) = 1$ (a monster with health 1 is cleared in one attack).

### Approach 2: Binary Tree representation

Think of each attack as a node in a binary tree:

- An attack on a monster with health $n>1$ creates two "child" attacks (one for each new monster)
- If a monster has health 1, it becomes a leaf in the tree since one attack finishes it

The height of this binary tree will be $h=\lfloor{\log_2(n)}\rfloor + 1$ (we keep dividing $n$ by 2 until we get 1). Example: $n=5$, root will be $5$, then children will be $2, 2$ and their children will be $1, 1, 1, 1$. Thus height of this binary tree is 3. Consequently, num of nodes in binary tree: $2^h - 1$.

Observe that $h$ is also the number of bits required to represent $n$ in binary. This can be efficiently calculated using: `(64 - __builtin_clzll(n))` (if $n$ is a long dtype).

## Code

```cpp
// Approach 1 O(log n)
ll attacks(ll health) {
  if (health <= 1)
    return 1;
  ll x = attacks(health / 2);
  return 1 + x + x;
}

void solve() {
  ll n;
  cin >> n;

  cout << attacks(n) << endl;
}

// Approach 2 O(1)
void solve() {
  ll n;
  cin >> n;
  if(n==1){
    cout << 1;
    return 0;
  }
  ll b = 1LL << (64- __builtin_clzll(n)); // 2^h
  cout << b-1 << endl;
}

```

## Related
