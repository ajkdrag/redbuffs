---
{"publish":true,"tags":["status/done","type/zettel"],"PassFrontmatter":true,"created":"2024-10-22T15:38:28.822+05:30"}
---



> [!Topics]
> - [[3 Topics/beam search\|beam search]]
> - [[3 Topics/greedy decoding\|greedy decoding]]

- Beam search strikes a compromise between the efficiency of greedy search and the optimality of [[exhaustive search\|exhaustive search]], at the expense of introducing one hyper-parameter $\beta$, the number of paths (*beam_size*) we keep while running a beam search
- Beam search will always find an output sequence with higher probability than greedy search, but is not guaranteed to find the most likely output
- When $\beta=1$, the beam search becomes the greedy search. When $\beta$ is not limited, it becomes an exhaustive search

## Related
