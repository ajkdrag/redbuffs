---
{"publish":true,"created":"2024-10-22T15:38:29.066+05:30","tags":["status/done","type/zettel"],"cssclasses":""}
---



> [!Topics]
> - [[word2vec\|word2vec]]

In word2vec, the context window size $k$ determines how many surrounding words are considered as context. Taking the example of [[2 Zettels/skip-gram\|skip-gram]] algo, instead of using a fixed window size, dynamic window size means that for each center word, the window size $k'$ is **randomly sampled** between 1 and $k$ (the maximum window size)

> [!example]
> If $k=4$, then for the sentence `The quick brown fox jumps over the lazy dog`:
> - For the center word "fox", the model may sample $k'=1$, meaning it only considers the words "brown" and "jumps" (1 word on each side) as context
> - For some other word "over", it might sample $k'=2$, and include "fox", "jumps", "the", and "lazy" as the context

## Related
