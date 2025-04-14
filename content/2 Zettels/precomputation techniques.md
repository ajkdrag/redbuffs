---
{"publish":true,"tags":["type/zettel","status/active"],"PassFrontmatter":true,"created":"2025-03-21T12:34:21.747+05:30"}
---


> [!Topics]
> - [[algorithmic paradigm\|algorithmic paradigm]]
> - [[optimization\|optimization]]
> - [[competitive programming\|competitive programming]]

Precomputation techniques are a powerful [[algorithmic paradigm\|algorithmic paradigm]] used to optimize solutions in [[competitive programming\|competitive programming]]. They involve pre-calculating and storing results to reduce the time complexity of repeatedly used calculations. The core idea is a time-space trade-off: we use extra memory to store precomputed values, allowing us to answer queries faster.

## When to Use Precomputation

- When the same calculations are needed multiple times
- When multiple queries need to be processed on the same dataset
- When a [[2 Zettels/complete search\|complete search]] approach leads to TLE (Time Limit Exceeded) errors

## Common Precomputation Techniques

### 1. Prefix/Suffix Sums
- **Concept:**  Compute cumulative sums (aka [[2 Zettels/prefix sums\|prefix sums]]), or other operations like XOR, product, from the beginning or end of an array
- **Use Cases:**
    - Calculating the sum/XOR/product of elements within a given range in O(1) time
    - Finding the minimum/maximum element on the left/right of any index
- **Example:** To find the sum of elements from index L to R: `sum[R] - sum[L-1]`
- **Related:** [[2 Zettels/two pointers + prefix sums array\|two pointers + prefix sums array]] for optimizing subarray problems

### 2. Prime Number Precomputation
- **Technique:** Use the [[sieve of eratosthenes\|sieve of eratosthenes]] to precompute a list of prime numbers or the smallest prime factor for each number up to a certain limit
- **Use Cases:**
    - Checking primality of a number in O(1) time
    - Finding the smallest prime factor of a number in O(1) time

### 3. Factorials and Inverse Factorials
- **Concept:** [[2 Zettels/precomputing factorials and inverse factorials\|precomputing factorials and inverse factorials]] modulo a prime number
- **Use Cases:** Calculating [[binomial coefficient\|binomial coefficient]] (nCr) efficiently, especially when dealing with many queries
- **Optimization**: Uses [[binary exponentiation\|binary exponentiation]] for calculating modular inverses efficiently

### 4. String Precomputation
- **Concept:** Create prefix arrays to store the counts of character occurrences
- **Use Cases:** Efficiently determining the number of occurrences of a character within a given range in a string.
- **Example:** In the problem: [[6 Problems/they are everywhere\|they are everywhere]], we use string precomputation to check if a substring has all the necessary characters

### 5. Tree Precomputation
- **Concept:** Store information about subtrees at each node
- **Use Cases:**
    -   Finding the [[lowest common ancestor\|lowest common ancestor]] (LCA)
    -   Performing range queries using [[segment trees\|segment trees]]

## Related
- [[dynamic programming\|dynamic programming]]
- [[2 Zettels/complete search\|complete search]]