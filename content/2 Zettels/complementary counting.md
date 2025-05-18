---
{"publish":true,"created":"2025-02-14T22:34:58.332+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[combinatorics\|combinatorics]]

Sometimes it's easier to count the elements that are NOT in your target set and subtract that from the total number of possible elements (the universal set), rather than counting your target set directly. This is especially useful when:

1. The complement set has fewer elements or
2. The complement set has a simpler structure that makes it easier to count
3. The direct counting of the target set involves many complex cases

> [!Tip]
> A large hint that complementary counting may lead to a quick solution is the phrase "not" or "at least" within a problem statement.


Mathematically, if $B$ is a subset of $A$, we can exploit the property that $|B|=|A|-|B^c|$ where $B^c$ is the complement of $B$ and finding $A$ and $B^c$ is easier.

> [!Example]
> If you want to count how many 4-digit numbers have at least one digit repeated, it's often easier to:
> 
> 1. First count all possible 4-digit numbers (universal set)
> 2. Then subtract the number of 4-digit numbers with all digits different (complement) 
>    
> Rather than directly counting numbers with repeats.

## Related
