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

> Formula is related to [[pointwise mutual information\|pointwise mutual information]] (PMI). This tends to merge pairs that co-occur more than you'd expect by chance.

### Algorithm (Training)

1. Initialize Vocabulary: Vocab consists of unique characters in training data. Each character initially its own token (standard WordPiece is not like [[2 Zettels/byte-level BPE\|byte-level BPE]])
2. Count Pairs: Count occurrences of all adjacent pairs of tokens
3. Apply scoring func on pairs: Find the pair of tokens that have highest score
4. Merge Pair: Create new token by merging the most frequent pair, add to vocabulary
5. Replace Pairs: Replace all occurrences of the most frequent pair with the new merged token
6. Repeat: Repeat steps 2-5 for some $n$ steps, or until desired vocabulary size is reached

Most of the steps are same as in BPE, only the scoring func is different here. Additionally, any subword that's added to the vocab is prefixed with `##` if it's a "continuation". Example: for "hug", we initially have: `['h', '##u', '##g']` in the vocab, then say we end up merging `##u` and `##g`, our updated vocab will be: `['h', '##u', '##g', '##ug']` and so on. This is nice because it indicates if a subword is prefix or suffix of any word: `predict` (prefix) and `##predict` (suffix) are different subwords.

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

- [[simplified wordpiece implementation\|simplified wordpiece implementation]]
