---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-02-20T10:53:55.579+05:30"}
---


> [!Topics]
> - [[2 Zettels/hockey-stick identity\|hockey-stick identity]]

The Hockey Stick Identity: $\sum_{k=r}^n \binom{k}{r} = \binom{n+1}{r+1}$ can be proven combinatorially by [[2 Zettels/double counting\|double counting]]. Imagine you want to make a small group, a committee, of $r+1$ people from a larger group of $n+1$ people. The number of ways to do this is given by the right side of the identity, $\binom{n+1}{r+1}$. Now, let's think of another way to count the same committees. Imagine we line up all $n+1$ people from shortest to tallest. When we pick a committee of $r+1$ people, one of them will be the tallest person in that committee. Let's think about the position of this tallest person in the height line. Suppose we decide that the tallest person in our committee is at a certain position, say the $(k+1)^{th}$ position in the height line (meaning there are $k$ people shorter than them). If this person is the tallest in our committee, it means the other $r$ people in the committee must be chosen from the $k$ people who are shorter. The number of ways to choose these $r$ people from the $k$ shorter people is $\binom{k}{r}$. We can do this for every possible position of the tallest person in the height line, starting from the position where it's even possible to form a committee of $r+1$, i.e. range for the tallest member is $[r+1, n+1]$. If we add up the number of ways for each possible position of the tallest person, we get the left side of the identity, $\sum_{k=r}^n \binom{k}{r}$. Since both ways are just counting the total number of possible committees of $r+1$ people, the two sides must be equal, which proves the Hockey Stick Identity.

## Related
- [[2 Zettels/hockey-stick identity stars and bars proof\|hockey-stick identity stars and bars proof]]