---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/beam search vs greedy search.md","permalink":"/2-zettels/beam-search-vs-greedy-search/","PassFrontmatter":true}
---



> [!Topics]
> - [[3 Topics/beam search\|beam search]]
> - [[3 Topics/greedy decoding\|greedy decoding]]

- Beam search strikes a compromise between the efficiency of greedy search and the optimality of [[exhaustive search\|exhaustive search]], at the expense of introducing one hyper-parameter $\beta$, the number of paths (*beam_size*) we keep while running a beam search
- Beam search will always find an output sequence with higher probability than greedy search, but is not guaranteed to find the most likely output
- When $\beta=1$, the beam search becomes the greedy search. When $\beta$ is not limited, it becomes an exhaustive search

## Related
