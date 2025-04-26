---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-26T20:35:50.636+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/subword tokenization\|subword tokenization]]

Unigram tokenization is a [[2 Zettels/subword tokenization\|subword tokenization]] algorithm used in models like [[ALBERTA\|ALBERTA]], [[T5\|T5]], [[mBART\|mBART]], and [[XLNet\|XLNet]], often implemented via [[sentencepiece\|sentencepiece]]. Unlike _additive methods_ like [[2 Zettels/byte pair encoding\|BPE]] or [[2 Zettels/wordpiece\|wordpiece]] that build tokens, Unigram is _subtractive_. It starts with a large potential vocabulary and iteratively removes tokens to reach a target size, aiming to keep tokens minimizing corpus representation cost.

### Training Algorithm

The training is iterative, reducing vocabulary size over steps.

- **Initialization:** Start with a large vocabulary. This typically includes all base characters (ensuring full coverage), common substrings, or even the result of a BPE run with a high vocabulary size. Frequencies of these tokens ($\in V$) are counted across the training corpus
- **Iteration:** Repeat until target vocabulary size is met:
    - **Calculate Loss:** Using the current vocabulary $V$, estimate token probabilities based on frequencies. $P(t) = f(t) / \sum_{t' \in V} f(t')$. Tokenize the training corpus _optimally_ using the current vocabulary and probabilities (explained below). Calculate the total [[negative log likelihood\|negative log likelihood]] of the corpus under this [[unigram language model\|unigram language model]] assumption. This is our current "loss"
    - **Calculate Removal Scores:** For each token $t \in V$ (excluding base characters), calculate how much the total loss would _increase_ if $t$ were removed
    - **Pruning:** Remove a small percentage (e.g., 10%) of tokens whose removal causes the _smallest_ loss increase. These are the least valuable tokens for minimizing the loss

After pruning, probabilities and scores ($-\log P$) for remaining tokens are recalculated using the new, smaller vocabulary. The corpus is re-tokenized, total loss re-evaluated, and the iteration repeats.

### Tokenization (Inference)

Once training is complete and the final vocabulary $V_{final}$ obtained, tokenization for new text works as follows:

Unigram assumes tokens are independent within a sequence. The probability of a token sequence $[t_1, ..., t_k]$ is $\prod P(t_i)$. Token probability $P(t)$ comes from the final trained model frequencies. To find the best segmentation for a word or text span, Unigram seeks the sequence of tokens from $V_{final}$ that maximizes this product probability. This is equivalent to minimizing the sum of negative log probabilities (scores): $\sum -\log P(t_i)$.

The [[viterbi algorithm\|viterbi algorithm]], a [[dynamic programming\|dynamic programming]] technique, efficiently finds the single optimal segmentation with the lowest total score. It essentially builds a graph of possible token splits and finds the lowest-cost path through the text.

### Example Calculation

This is taken from HuggingFace example. Consider a small corpus:

```
("hug", 10), ("pug", 5), ("pun", 12), ("bun", 4), ("hugs", 5)
```

and an initial vocabulary:

```
h: 15, u: 36, g: 20, hu: 15, ug: 20, p: 17, pu: 17, n: 16, un: 16, b: 4, bu: 4, s: 5, hug: 15, gs: 5, ugs: 5
```

Total Frequency Sum = $210$. Token probabilities $P(t)$ are derived from corpus frequencies, and scores are $-\log P(t)$.

E.g., for $P(\text{"hug"}) = 15 / 210 \approx 0.0714$. Score = $-\log(0.0714) \approx 2.639$. Similarly:

- Score("hug") $\approx 2.64$
- Score("hu") $\approx 2.64$
- Score("g") $\approx 2.35$
- Score("pu") $\approx 2.51$
- Score("ug") $\approx 2.35$

Tokenizing "hug" (from corpus) with initial vocabulary (this is the part that's compute intensive since iterating through all possible splits is mad, hence we use [[viterbi algorithm\|viterbi algorithm]]):

- Option 1: `["hug"]`. Score: Score("hug") $\approx 2.64$
- Option 2: `["hu", "g"]`. Score: Score("hu") + Score("g") $\approx 2.64 + 2.35 = 4.99$
- **Best (lowest score)**: `["hug"]`

Tokenizing "pug" with initial vocabulary:

- Option 1: `["p", "u", "g"]`. Score: Score("p") + Score("u") + Score("g") $\approx 2.51 + 1.76 + 2.35 = 6.62$. (Need scores for "p", "u")
- Option 2: `["p", "ug"]`. Score: Score("p") + Score("ug") $\approx 2.51 + 2.35 = 4.86$
- Option 3: `["pu", "g"]`. Score: Score("pu") + Score("g") $\approx 2.51 + 2.35 = 4.86$
- **Best (lowest score)**: `["p", "ug"]` or `["pu", "g"]` (tie, pick first one)

**Corpus Loss Calculation:** Calculate optimal segmentation score for each word/text in the corpus based on current vocabulary. Total corpus loss is the sum of best scores for all words in the corpus (weigh by frequency of that word)

$$
\begin{align*}
\text{Loss} &= 10 \times \text{Score("hug")} + 5 \times \text{Score("pug")} + 12 \times \text{Score("pun")} \\
&+ 4 \times \text{Score("bun")} + 5 \times \text{Score("hugs")}
\end{align*}
$$

Loss Increase Calculation for removing a token, say "hug":

1.  Assume "hug" is removed from vocabulary
2.  Re-tokenize only the parts of the corpus affected (those using "hug": "hug" and "hugs"). E.g., "hug" must now be `["hu", "g"]` with score $\approx 4.99$
3.  Recalculate total corpus loss using the new tokenizations and _recalculated scores_ for the smaller vocabulary
4.  Loss Increase = New Total Loss - Old Total Loss

Comparing loss increases helps identify tokens whose removal hurts the corpus representation least. These are the tokens **pruned** in that iteration

### Post-Pruning Steps

After removing the lowest-scoring tokens (10% say) in an iteration:

1.  The vocabulary $V$ shrinks to $V'$
2.  Probabilities $P(t)$ and scores $-\log P(t)$ for all _remaining_ tokens $t \in V'$ are recalculated. The denominator (total frequency sum) decreases, so probabilities increase slightly, and scores decrease slightly
3.  Words in the corpus are re-evaluated using [[viterbi algorithm\|viterbi algorithm]] with the updated scores and vocabulary $V'$. Optimal segmentations might change even for words that didn't use the removed tokens
4.  The total corpus loss $\mathcal{L}$ is recalculated based on the new segmentations and scores. This becomes the baseline for the next pruning iteration
5.  The process repeats: calculate removal scores for tokens in $V'$, prune the lowest-scoring ones, update vocabulary, scores, segmentations, and loss

This cycle continues until the target vocabulary size is achieved.

## Related
