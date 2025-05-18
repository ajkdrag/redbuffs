---
{"publish":true,"created":"2025-04-01T10:21:38.591+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/ternary search\|ternary search]]
> - [[calculus\|calculus]]

The problem asks us to find the minimum time for Takahashi to reach the ground. He has two actions:

1.  Increase gravity `g` by 1, which takes `B` seconds. Initially, `g = 1`.
2.  Jump from the building. The falling time is given by `A / sqrt(g)`.

`A` and `B` are provided as inputs. We need to decide how many times Takahashi should increase the gravity to minimize the total time.

## Idea

Let's say Takahashi increases the gravity `g_inc` times. The total time will be:

$$
\begin{align*}
T &= (\text{time to increase gravity}) + (\text{time to fall}) \\
&= g_{inc} \cdot B + \frac{A}{\sqrt{1 + g_{inc}}}
\end{align*}
$$

Our goal is to minimize this function $T$ with respect to $g_{inc}$, where $g_{inc}$ is a non-negative integer.

### Approach 1: Using Calculus (Derivatives)

We can treat $g_{inc}$ as a continuous variable and find the minimum of the function using derivatives. To find the minimum, we differentiate $T$ with respect to $g_{inc}$ and set the derivative to zero:

$$
\frac{dT}{dg_{inc}} = B - \frac{1}{2} A (1 + g_{inc})^{-3/2} = 0
$$

Solving for $g_{inc}$:

$$
\begin{align*}
B &= \frac{1}{2} A (1 + g_{inc})^{-3/2} \\
(1 + g_{inc})^{3/2} &= \frac{A}{2B} \\
1 + g_{inc} &= \left(\frac{A}{2B}\right)^{2/3} \\
g_{inc} &= \left(\frac{A}{2B}\right)^{2/3} - 1
\end{align*}
$$

Since $g_{inc}$ must be an integer, we can take the _ceiling_ of this value, or check the integers around this value to find the optimal integer $g_{inc}$.

**Time Complexity:** $O(1)$
**Space Complexity:** $O(1)$

### Approach 2: Ternary Search

Observe that the function $T(g_{inc})$ is **unimodal**. For small values of $g_{inc}$, increasing $g_{inc}$ reduces the falling time significantly, thus decreasing the total time. However, for large values of $g_{inc}$, the decrease in falling time becomes smaller, while the time to increase gravity keeps increasing. Thus, there exists a minimum value.

We can use ternary search to efficiently find the integer value of $g_{inc}$ that minimizes $T(g_{inc})$ within a certain range. Since the constraints are up to $10^{18}$, a wide search range needs to be considered, but time complexity will still be logarithmic.

**Time Complexity:** $O(\log D)$ where $D$ is the search range $\approx 10^{18}$
**Space Complexity:** $O(1)$

## Code

```python
def func(a, b, g):
    # g should be an int, but for calc, convert to float
    g *= 1.0
    return b*g + a*((g+1)**(-0.5))


# Approach 1 (O(1) using derivates)
def solve_direct(a, b):
    g = -1 + (a/(2*b))**(2/3)
    g = math.ceil(g)
    return func(a, b, g)


# Approach 2 (log t.c using ternary search)
def ternary_search(low, high, f):
    low, high = int(low), int(high)
    while high - low > 3:
        m1 = low + (high - low) // 3
        m2 = high - (high - low) // 3
        if f(m1) < f(m2):
            high = m2
        else:
            low = m1
    return min(range(low, high+1), key=f)


def solve(a, b):
    low, high = 0, (a//b) + 5
    f = partial(func, a, b)
    g = ternary_search(low, high, f)
    return f(g)
```

## Related
