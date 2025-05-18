---
{"publish":true,"created":"2025-02-11T16:07:30.288+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/printing patterns\|printing patterns]]
> - [[modular arithmetic\|modular arithmetic]]

```
Input:
3
3 4 3
4 2 1
3 1 3

Output:
*****************
*\..*../*\..*../*
*.\.*./.*.\.*./.*
*..\*/..*..\*/..*
*****************
*../*\..*../*\..*
*./.*.\.*./.*.\.*
*/..*..\*/..*..\*
*****************
*\..*../*\..*../*
*.\.*./.*.\.*./.*
*..\*/..*..\*/..*
*****************

*****
*\*/*
*****
*/*\*
*****
*\*/*
*****
*/*\*
*****

*****
*\..*
*.\.*
*..\*
*****
*../*
*./.*
*/..*
*****
*\..*
*.\.*
*..\*
*****
```

## Idea

The overall grid dimensions can be computed as:

$$
\begin{align*}
\text{rows} &= n \times (p+1) + 1, \\
\text{cols} &= m \times (p+1) + 1
\end{align*}
$$

The extra row and column come from the fact that every cell contributes its bottom and right boundaries, and the grid has an initial top and left border.

### Drawing the Borders

Any row or column that corresponds to a boundary is printed as a line of `*` characters. In particular, for every coordinate $(i,j)$ we print a border character if:

$$
i \bmod (p+1) = 0 \quad \text{or} \quad j \mod (p+1) = 0
$$

This neatly partitions the grid into cells of size $(p+1) \times (p+1)$.

### Drawing the Interior Pattern

> Modulo arithmetic is used to determine the periodicity of the pattern

For the positions that lie inside the cells (i.e. not on the borders), the pattern is determined by the following rules:

- **Backslash Pattern:** Print a backslash `\` if $(i - j) \bmod \bigl(2(p+1)\bigr) = 0$
- **Forward Slash Pattern:** Print a forward slash `/` if $(i + j) \bmod \bigl(2(p+1)\bigr) = 0$
- **Otherwise:** Print a dot `.`

Note that classic diagonal conditions are: $i=j$ and $i+j=\text{num\_cols}-1$ respectively. The mod helps us deal with the periodicity. We can observe that the diagonals repeat after certain intervals and derive a relation analytically.

## Code

```cpp
void print(int i, int j, int p) {
  if (i % (p + 1) == 0 or j % (p + 1) == 0) {
    cout << "*";
  } else if ((i - j) % (2 * (p + 1)) == 0) {
    cout << "\\";
  } else if ((i + j) % (2 * (p + 1)) == 0) {
    cout << "/";
  }
  else
    cout << ".";
}

void solve() {
  int n, m, p;
  cin >> n >> m >> p;

  int rows, cols;
  rows = n * (p + 1) + 1;
  cols = m * (p + 1) + 1;

  for (int i = 0; i < rows; ++i) {
    for (int j = 0; j < cols; ++j) {
      print(i, j, p);
    }
    cout << endl;
  }
}
```

## Related
