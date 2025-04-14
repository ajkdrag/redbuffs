---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-01-26T11:27:30.608+05:30"}
---


> [!Topics]
> - [[algorithmic paradigm\|algorithmic paradigm]]

This is a classic technique where you iterate through a data-structure (commonly arrays) using two indices. These "pointers" traverse the data structure, typically in opposite directions, in the same direction, or at varying paces depending on the problem (e.g. find pairs). It's effective for reducing time complexity from $O(n^2)$ to $O(n)$ or $O(n \log n)$. Note that it's often [[2 Zettels/two pointers vs sliding window\|confused ]]with a related technique named [[sliding window\|sliding window]]

> [!Note] When to use?
> Problems that involve finding pairs, subarrays, or segments satisfying certain conditions. It can be used in conjunction with other tricks such as [[2 Zettels/two pointers + binary search\|binary search]].
> - **Sorted Arrays/Linked Lists**: For problems involving pairs, triplets, or subarrays (e.g., two-sum, [[6 Problems/3 Sum\|3 Sum]], [[merging sorted arrays\|merging sorted arrays]])
> - **In-Place Operations**: Removing duplicates, partitioning arrays (e.g., [[dutch national flag algorithm\|dutch national flag algorithm]])
> - **Cycle Detection**: [[2 Zettels/floyd's cycle finding algorithm\|floyd's cycle finding algorithm]] for linked list cycles.
> - **Greedy Scenarios**: Interval scheduling, minimizing/maximizing values (e.g., [[6 Problems/container with most water\|container with most water]])
> 

**Step-by-Step Framework**

- Identify the Problem Type:
    - Look for keywords like "sorted," "subarray," "pair," or "sequence."
    - Check if brute-force approaches involve nested loops (indicating potential for optimization).
- Initialize Pointers:
    - [[2 Zettels/two pointers at opposite ends\|Opposite Ends]]: For sorted arrays (e.g., two-sum).
    - Same start + different speeds: [[2 Zettels/slow and fast pointers\|slow and fast pointers]] (e.g., remove duplicates, cycle detection).
    - [[two pointers + different sequences\|Different sequences]]: e.g. [[merging sorted arrays\|merging sorted arrays]], [[2 Zettels/intersection of two linked lists\|intersection of two linked lists]]
- Define Movement Conditions:
    - Move pointers based on comparisons (e.g., sum of elements vs. target).
- Termination Condition:
    - Typically when pointers cross (opposite ends) or the fast pointer reaches the end (slow/fast).
## Related
- [[sliding window\|sliding window]]
