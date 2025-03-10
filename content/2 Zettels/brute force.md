---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-27T09:44:35.362+05:30"}
---


> [!Topics]
> - [[algorithmic paradigm\|algorithmic paradigm]]

> Try out all the possibilities to find the one that satisfies the problem's criteria. 

Let us illustrate this with the example problem of find all pairs of numbers `abcde` and `fghij` such that they are formed from digits 0 to 9 and they satisfy `abcde/fghij = N` for a given `N`, e.g. for `N=62`, we have: `(79546, 01283), (94736, 01528)`, etc.

There are two ways of implementing brute force:

**Approach 1: Generate and Check**

1. **Generate**: We create all possible candidate solutions. In our example, this corresponds to generating all possible ways of assigning the digits 0−9 to the variables `a, b, c, d, e, f, g, h, i, j`. One way to do so it by [[2 Zettels/using next_permutation STL\|using next_permutation STL]] to get a permutation and take first 5 digits and call it `abcde` and remaining 5 as `fghij`.
2. **Check**: Here, we test each candidate solution to see if it satisfies the given conditions. For our problem, we would check if the ratio abcde/fghij equals N and if all the digits assigned are unique.

This approach has a time complexity of $O(k!)$ where $k=10!$.

**Approach 2: Loop and Check**

1. **Loop**: This approach involves iterating through a range of possible values. For instance, we might loop through all 5-digit numbers for `fghij`. For each `fghij`, we calculate the corresponding `abcde` by multiplying `fghij` by `N`.
2. **Check**: Similar to the first approach, we then check if the generated `abcde` and `fghij` satisfy the problem's conditions, namely if their ratio is `N` and if all digits are unique.

This approach has a time complexity of $O(m!)$ where $m=10^5$ since `98765` can be the largest 5 digit number that's valid as per problem and `01234` the smallest.

> [!Note]
> We can see from the number of operations that Approach 2 is faster. In brute force it's crucial to understand which of the several approach is feasible.

```cpp
void solve1(int n) {
  string s = "0123456789";
  do {
    int numer = stoi(s.substr(0, 5));
    int denom = stoi(s.substr(5, 5));
    if (numer % denom == 0 && numer / denom == n) {
      cout << numer << " " << denom << endl;
    }
  } while (next_permutation(s.begin(), s.end()));
}

void solve2(int n) {
  for (int fghij = 01234; fghij <= 98765 / n; fghij++) {
    int abcde = n * fghij;
    set < int > st;

    int temp = abcde;
    for (int i = 0; i < 5; i++) {
      st.insert(temp % 10);
      temp /= 10;
    }

    temp = fghij;
    for (int i = 0; i < 5; i++) {
      st.insert(temp % 10);
      temp /= 10;
    }

    if (st.size() == 10) {
      cout << abcde << " " << fghij << endl;
    }
  }
}
```

## Related
