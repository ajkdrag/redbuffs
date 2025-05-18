---
{"publish":true,"created":"2025-03-19T14:30:35.728+05:30","tags":["type/problem"],"cssclasses":""}
---


> [!Topics]
>
> - [[recursion\|recursion]]
> - [[2 Zettels/complete search\|complete search]]

You are given two positive integers $N$ and $M$ without leading zeroes. You can perform an operation on these integers any number of times, in which you can delete a digit of the given number such that the resulting number does _not_ have leading zeroes. let $N'$ and $M'$ be two number that were formed after performing operations on $N$ and $M$ respectively.

You have to find all the unique pairs of $N'$ and $M'$ whose XOR is zero.

**Note**: Two pairs of numbers $(A, B)$ and $(C, D)$ are considered different if and only if $A \ne C$ or $B \ne D$.

```
Input:
1
12 102

Output:
3
```

**Explanation:** pairs $(1,1),(2,2),(12,12)$ have XOR equal to 0.
**Constraints:** $N$ and $M$ are integers upto $10^{12}$.

## Idea

The core idea is to apply brute-force: generate all possible subsequences (non-empty and without leading zeros) of both input numbers, $N$ and $M$, and then find the common subsequences. The count of these common subsequences represents the number of pairs with an XOR of zero. This is feasible since $N$ and $M$ are 12 digits each at most.

We can achieve this using recursion. The `generateSubsequences` function recursively explores two choices at each digit: either _exclude_ the current digit or _include_ it in the current subsequence. The base case is when we reach the end of the input string. We add the `current` subsequence to a set (to ensure uniqueness) only if it's not empty and doesn't start with '0'. After generating all subsequences for both $N$ and $M$, we find the intersection of the two sets. The size of the intersection is our answer.

Alternatively, we could [[2 Zettels/use bitmasking for generating subsequences\|use bitmasking for generating subsequences]]. Each bit in a mask of length equal to the number of digits would represent whether to include a digit (1) or not (0). We would iterate through all possible masks (from 1 to $2^{\text{length}} - 1$) and construct the subsequences accordingly, again checking for leading zeros.

**Time Complexity:** $O(2^n + 2^m + min(2^n, 2^m))$, where $n$ and $m$ are the number of digits in $N$ and $M$ respectively. Generating subsequences takes exponential time, and finding the intersection takes time proportional to the size of the smaller set.
**Space Complexity:** $O(2^n + 2^m)$ in the worst case, to store the sets of subsequences.

## Code

```cpp
void generateSubsequences(const string &num, int index, string current, unordered_set<string> &subsequences) {
  if (index == int(num.length())) {
    if (!current.empty() && (current[0] != '0')) {
      subsequences.insert(current);
    }
    return;
  }

  generateSubsequences(num, index + 1, current,
                       subsequences); // Exclude current digit
  generateSubsequences(num, index + 1, current + num[index],
                       subsequences); // Include current digit
}

void solve() {
  string n, m;
  cin >> n >> m;

  unordered_set<string> nSubsequences;
  unordered_set<string> mSubsequences;

  generateSubsequences(n, 0, "", nSubsequences);
  generateSubsequences(m, 0, "", mSubsequences);

  int intersection = 0;
  if (nSubsequences.size() > mSubsequences.size()){
    swap(nSubsequences, mSubsequences);
  }
  for (const string &s : nSubsequences) {
    if (mSubsequences.count(s)) {
      intersection++;
    }
  }

  cout << intersection << endl;
}
```

## Related
