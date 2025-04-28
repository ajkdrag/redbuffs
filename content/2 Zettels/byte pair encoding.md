---
{"publish":true,"tags":["type/zettel","status/done"],"aliases":["BPE"],"PassFrontmatter":true,"created":"2025-04-24T09:27:21.472+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/subword tokenization\|subword tokenization]]

BPE was used in NLP for machine translation (2016). It strikes a balance between [[2 Zettels/character tokenization\|character tokenization]] and [[word-based tokenization\|word-based tokenization]] by learning a vocabulary of common substrings. Originally used [[2 Zettels/BPE as a compression algorithm\|BPE as a compression algorithm]] in 1994. Here's the core idea:

- start with base vocabulary (individual bytes/chars)
- iteratively merge **most frequent adjacent pairs** of tokens into larger tokens
- repeat this for some $n$ steps or until a desired vocabulary size is reached

> It's like building a vocabulary from the ground up – instead of having every single word in the language as a token (which would be a massive vocabulary, including rare words and typos), or just using individual characters (which would small vocab but result in very long sequences), BPE learns commonly occurring combinations of characters.

### Algorithm (Training)

1. Initialize Vocabulary: Vocab consists of unique characters in training data. Each character initially its own token
2. Count Pairs: Count occurrences of all adjacent pairs of tokens
3. Identify Most Frequent Pair: Find the pair of tokens that appears most frequently
4. Merge Pair: Create new token by merging the most frequent pair, add to vocabulary
5. Replace Pairs: Replace all occurrences of the most frequent pair with the new merged token
6. Repeat: Repeat steps 2-5 for some $n$ steps, or until desired vocabulary size is reached

> [!Example]
>
> Suppose our tiny corpus is: `["hug", "pug", "pun", "bun", "hugs"]`. Initial tokens: each letter: `["b", "g", "h", "n", "p", "s", "u"]` (7 unique letters here)
>
> - Most frequent pair: "u" + "g" appears often ("hug", "pug", "hugs"). Merge "u"+"g" → **"ug"**. Now "hug" becomes ["h","ug"], "pug"->["p","ug"], "hugs"->["h","ug","s"]
> - Next frequent pair: perhaps "h"+"ug" or "u"+"n". Say "u"+"n" appears 2 times ("pun", "bun"). Merge to **"un"**. Now "pun"->["p","un"], "bun"->["b","un"]
> - Next merge: maybe "h"+"ug" (in "hug","hugs"). Merge to **"hug"**. Now we have tokens ["hug","s"], etc
> - After a few merges, the vocabulary might include tokens like "ug", "un", "hug", etc., representing common subword units
>
> Refer [[2 Zettels/simplified BPE implementation\|simplified BPE implementation]] for details.

### Algorithm (Encoding)

The merge operations can be stored as rules in order. Tokenization of new text (encoding) is done by greedily applying those merges: start with characters, then merge wherever possible following the learned rules. If a word can't be fully matched by known merges, typically it falls back to characters.

**Pros:**

- Manageable Vocabulary Size
- Captures Subword Information

**Cons:**

- Merging on frequency (doesn't capture linguistic structure) is a suboptimal strategy

## Related

- [[2 Zettels/byte-level BPE\|byte-level BPE]]
- [[2 Zettels/wordpiece\|wordpiece]]
- [[2 Zettels/unigram tokenization\|unigram tokenization]]
