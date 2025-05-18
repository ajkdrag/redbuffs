---
{"publish":true,"created":"2025-02-17T14:55:24.371+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[ad-hoc coding problems\|ad-hoc coding problems]]

The problem requires us to solve linear equations given as strings. These equations adhere to the following constraints:

- Numbers are integers with absolute values less than or equal to $10^9$
- Operators are '+', '-', and '='
- There is exactly one '=' sign in the equation
- There is exactly one variable 'X', appearing as either "+X" or "-X" (coefficient is always 1 or -1, no numeric coefficients)
- The equation is guaranteed to have a solution

Our goal is to find the value of 'X' for each given equation.

## Idea

The core idea is to **parse and evaluate** the left-hand side (LHS) and right-hand side (RHS) of the equation separately, then **isolate and calculate** the value of 'X'.

The solution uses a helper function `exp_solve(string s, int l, int r)` to evaluate an arithmetic expression within a string `s` from index `l` to `r`. This function iterates through the substring, accumulating numbers and applying signs based on '+' and '-' operators. It maintains a `sign` variable and a `buffer` to parse numbers correctly, effectively calculating the numerical value of a sub-expression.

The main `solve()` function works as follows:

1. **Locate '=' and 'X':** It finds the positions of the '=' and 'X' symbols in the input string to identify the equation's structure and variable location
2. **Evaluate Sub-expressions based on 'X' position:** It checks if 'X' is on the LHS (before '=') or RHS (after '='). Based on this, it calls `exp_solve` to evaluate the numerical parts of both sides _excluding_ 'X'
3. **Isolate 'X' and Calculate:** Let's consider 'X' on the LHS as an example. The code evaluates the numerical part of the LHS _before_ 'X' (`left`), the part _after_ 'X' but still on the LHS (`right`), and the entire RHS (`rhs`). The equation effectively becomes `left + (coefficient of X * X) + right = rhs`. Since the coefficient of X is always $\pm 1$, and we track its sign (`coeff_sign`), we rearrange to solve for X: `X = (rhs - right - left) * coeff_sign`. Similar logic applies when 'X' is on the RHS (swap LHS and RHS roles)

> [!Example]
> For `10+X-5=20`, `exp_solve` evaluates "10", "-5", and "20" appropriately. `solve` then correctly isolates X by calculating `(20 - (-5) - 10) * 1 = 15`.

## Code

```cpp
ll exp_solve(string s, int l, int r) {
  int sign = 1;
  ll buffer = 0;
  ll total = 0;
  ll sz = s.length();

  if (l > r)
    return 0;
  if (l < 0)
    return 0;
  if (r < 0)
    return 0;
  if (l >= sz)
    return 0;
  if (r >= sz)
    return 0;

  for (int i = l; i <= r; ++i) {
    char c = s[i];
    if (c == '+') {
      total += (sign * buffer);
      sign = 1;
      buffer = 0;
      continue;
    } else if (c == '-') {
      total += (sign * buffer);
      sign = -1;
      buffer = 0;
      continue;
    }

    buffer *= 10;
    buffer += (c - '0');
  }

  return total + (sign * buffer);
}

void solve() {

  string s;
  cin >> s;

  int equals = s.find("=");
  int x = s.find("X");

  int coeff_sign = 1;
  if (x < equals) {
    ll left = 0;
    ll rhs = exp_solve(s, equals + 1, s.length() - 1);
    if (x > 0) {
      if (s[x - 1] == '-')
        coeff_sign = -1;
      left = exp_solve(s, 0, x - 2);
    }

    ll right = exp_solve(s, x + 1, equals - 1);
    cout << (rhs - right - left) * coeff_sign << endl;
  }

  else {
    ll left = 0;
    ll lhs = exp_solve(s, 0, equals - 1);
    if (x > 0) {
      if (s[x - 1] == '-')
        coeff_sign = -1;
      left = exp_solve(s, equals + 1, x - 2);
    }


    ll right = exp_solve(s, x + 1, s.length() - 1);
    cout << (lhs - right - left) * coeff_sign << endl;
  }
}

```

## Related
