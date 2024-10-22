---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/why the name skip-gram.md","permalink":"/2-zettels/why-the-name-skip-gram/","PassFrontmatter":true}
---


> [!Topics]
> - [[3 Topics/skip-gram\|skip-gram]]

It's like a traditional n-gram model but with the key difference that it skips words rather than using continuous sequences.

For example, given the sentence `The quick brown fox jumps`, a Skip-gram model might learn from pairs like:

- (quick → fox) - skipping `brown`
- (quick → jumps) - skipping `brown` and `fox`
- (brown → the) - skipping `quick`

This skipping behavior allows the model to capture broader context relationships between words, even when they're not directly adjacent.


## Related
- [[2 Zettels/why the name CBOW\|why the name CBOW]]