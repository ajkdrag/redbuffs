---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-25T17:57:51.418+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/subword tokenization\|subword tokenization]]

WordPiece was originally used by Google for machine translation, popularized by [[BERT\|BERT]]. It's very similar to [[2 Zettels/byte pair encoding\|BPE]] in that it builds a vocab of subwords by _merging_ characters into bigger units.

The core idea is that instead of always merging the _most frequent pair_, WordPiece chooses the pair that gives the best improvement in a language model likelihood of the corpus. In practice this is often approximated by a **scoring function:**

$$
\text{score}(w_a, w_b)=\frac{f(w_a,w_b)}{f(w_a)\cdot f(w_b)}
$$

where subword units $w_a$ and $w_b$ are merge candidates. $f(w_a, w_b)$ is the merged unit's frequency, while $f(w_a)$ and $f(w_b)$ are the individual frequencies.

> Formula is related to pointwise mutual information. This tends to merge pairs that co-occur more than you'd expect by chance, rather than just absolute frequency.

### Algorithm (Training)

- Start with individual characters (like vanilla BPE; [[2 Zettels/byte-level BPE\|byte-level BPE]] uses bytes)
    - Iteratively add the subword that maximizes the likelihood of the training corpus (using the scoring func) until vocab size is reached (similar to BPE)
- This tends to merge frequent pairs first anyway, but frequency is measured in terms of contributions to overall likelihood.

### Algorithm (Encoding)

During tokenization/encoding, it's **greedy longest-match**: for a given word, find the longest prefix of characters that is in the vocabulary. Emit that token (with `##` if it’s not the start), then repeat for the remainder. If a word cannot be _fully matched_, i.e. it's pieces aren't _all_ in vocab, the **whole word** becomes `[UNK]`. This part can be explained with following example:

```python
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")
tokenizer.tokenize("word") # ['word']
tokenizer.tokenize("word∫") # ['[UNK]']
```

Observe above that when input is `word∫`, the first piece that matches is `word`. The leftover subword is `∫` which isn't in the vocab:

```python
print(tokenizer.vocab.get("∫")) # None
```

As a result of this, we **do not** get: `['word', '[UNK]']`. Instead, we get `['[UNK]']`.

**Example:**

Let's say we want to tokenize: `unpredictably`, and we have the following vocab: `["un", "predict", "able", "##ably", "##pre", "##dict", "##ic", "##bly", "##un", "[UNK]"]`.

- Our ans list: `tokens = []`
- First we find longest prefix that's in vocab: `un` matches; `tokens=['un']`
- Next, we try finding longest prefix from `##predictably`
- Note that we have `predict`, but **not** `##predict` in our vocab (they're different)
- `##pre` is what we match; `tokens=['un', '##pre']`
- Next, we match `##dict`; tokens = `['un', '##pre', '##dict']`
- Finally, we match `##ably`; tokens = `['un', '##pre', '##dict', '##ably']`

We can verify this:

```python
tokenizer.tokenize("unpredictably")
# ['un', '##pre', '##dict', '##ably']
```

## Related
