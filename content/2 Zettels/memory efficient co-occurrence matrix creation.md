---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/memory efficient co-occurrence matrix creation.md","permalink":"/2-zettels/memory-efficient-co-occurrence-matrix-creation/","PassFrontmatter":true}
---


Topics: [[matrices\|matrices]] | [[GloVe\|GloVe]]
Links:

If we count all cooccurring pairs in one scan, we will likely run out of memory, as the number of distinct (word `i` index, word `j` index) pairs can be enormous. Let’s say the vocabulary has 100,000 distinct tokens. If we count all pairs in one scan, the number of distinct pairs can be as large as $10^{10}$. Instead, we can count all pairs in 10 scans. In the first scan, we limit word `i`'s index to be in between 0 and 9999; in the second scan, we limit it to be in betweeen 10000 and 19999; in the third scan, we limit it to be in between 20000 and 29999, so on and so forth. And after each scan finishes, we save the counts to disk. Now in each scan, the number of distinct pairs can be as large as $10^9$, which is *one tenth* of the original number!

![](https://res.cloudinary.com/dcameztw9/image/upload/v1727761797/yscsfr2ixycpbkzt7uqr.png)

Also, when we create the vocabulary with the most frequent tokens, the index of these tokens are **ordered**. Index 0 corresponds to the most frequent token, index 1 corresponds to the second most frequent token, so on and so forth. If we continue with the example of 100,000 tokens, in the first scan we would count pairs of the 10000 most frequent tokens, and the number of distinct pairs would be huge. While in the remaining scans, the number of distinct pairs would be much smaller. This leads to *memory usage imbalance* between scans. By shuffling the vocabulary, the distinct pairs are distributed evenly across scans and the memory usage is balanced.

**Pros**
- Scalable as the size of vocab increases
- Memory efficient
- Parallelizable

**Cons**
- Runtime will also increase (if not parallelized)