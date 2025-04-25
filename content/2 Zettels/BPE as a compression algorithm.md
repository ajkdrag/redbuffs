---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-25T14:06:20.467+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/byte pair encoding\|byte pair encoding]]
> - [[data compression\|data compression]]

BPE can be viewed as a compression algorithm that minimizes the number of tokens needed to represent a corpus while preserving information. Let’s formalize the process:

1. **Corpus Representation**:

    - Corpus $C = \{w_1, w_2, \ldots, w_n\}$, where each word $w_i$ is a sequence of tokens (initially characters)
    - Word frequency: $f(w_i)$ is the count of word $w_i$

2. **Pair Frequency**:

    - For each word $w_i = t_1 t_2 \ldots t_k$, count pairs $(t_j, t_{j+1})$
    - Pair frequency: $f(p) = \sum_{w_i \text{ containing } p} f(w_i)$

3. **Merge Operation**:

    - Select pair $p = (t_a, t_b)$ with maximum $f(p)$
    - Replace $t_a t_b$ with new token $t_{ab}$ in all words
    - Update vocabulary: $V \leftarrow V \cup \{t_{ab}\}$

4. **Objective**:

    - Minimize sequence length: $\sum_{w_i} f(w_i) \cdot \text{len}(w_i)$, where $\text{len}(w_i)$ is the number of tokens after merges
    - Constraint: Vocabulary size $|V| \leq V_{\text{max}}$

5. **Encoding**:

    - For input word $w$, apply merge rules in order: $w \rightarrow t_1 t_2 \ldots t_m$
    - Map tokens to IDs: $t_i \rightarrow \text{vocab}[t_i]$

6. **Decoding**:
    - Reverse mapping: $\text{ID}_i \rightarrow t_i$
    - Join tokens, removing `</w>`: $t_1 t_2 \ldots t_m \rightarrow \text{string}$

This is a [[2 Zettels/greedy algorithm\|greedy algorithm]], as it always merges the most frequent pair, which is not guaranteed to be globally optimal but is effective in practice.

## Related
