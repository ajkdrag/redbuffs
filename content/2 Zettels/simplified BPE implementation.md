---
{"publish":true,"created":"2025-04-24T11:51:52.744+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[2 Zettels/byte pair encoding\|byte pair encoding]]

A really simplified version of BPE (for understanding purposes only). Here we use a pre-tokenized corpus (words are split already) and omit encoding/decoding steps.

```python
# Example: Learn BPE merges on a tiny corpus
corpus = ["low", "lower", "newest", "widest"]
# Step 1: Start with character tokens for each word
words = [list(w) + ["</w>"] for w in corpus]  # adding </w> end-of-word marker for clarity
# Function to get pair frequencies
from collections import Counter
def get_pair_freq(words):
    pairs = Counter()
    for tokens in words:
        for i in range(len(tokens)-1):
            pair = (tokens[i], tokens[i+1])
            pairs[pair] += 1
    return pairs

# Learn BPE merges
vocab = set(ch for tokens in words for ch in tokens)
print("Initial vocab:", vocab)
for merge_round in range(5):
    pairs = get_pair_freq(words)
    if not pairs:
        break
    most_freq_pair, freq = pairs.most_common(1)[0]
    if freq < 2:
        break
    new_token = most_freq_pair[0] + most_freq_pair[1]
    print(f"Merge {merge_round+1}: merge {most_freq_pair} -> '{new_token}'")
    # Merge the most frequent pair in all words
    new_words = []
    for tokens in words:
        merged = []
        i = 0
        while i < len(tokens)-1:
            if (tokens[i], tokens[i+1]) == most_freq_pair:
                merged.append(new_token)
                i += 2
            else:
                merged.append(tokens[i])
                i += 1
        # append last token if not merged
        if i < len(tokens):
            merged.append(tokens[i])
        new_words.append(merged)
    words = new_words
    vocab.add(new_token)
print("Final vocab:", vocab)
print("Transformed words:", words)
```

Running this code would show the iterative merges (for instance, merging `('l','o') -> 'lo'`, `('est','w</w>') -> 'est</w>'`, etc.):

```
Initial vocab: {'w', 'r', 'n', 's', 't', '</w>', 'o', 'i', 'e', 'd', 'l'}
Merge 1: merge ('l', 'o') -> 'lo'
Merge 2: merge ('lo', 'w') -> 'low'
Merge 3: merge ('e', 's') -> 'es'
Merge 4: merge ('es', 't') -> 'est'
Merge 5: merge ('est', '</w>') -> 'est</w>'
Final vocab: {'w', 'r', 'n', 's', 't', 'est</w>', '</w>', 'est', 'o', 'i', 'e', 'lo', 'low', 'es', 'd', 'l'}
Transformed words: [['low', '</w>'], ['low', 'e', 'r', '</w>'], ['n', 'e', 'w', 'est</w>'], ['w', 'i', 'd', 'est</w>']]
```

After training, tokenizing a new word means applying these merges. In practice, one would store the merge table and then use a deterministic _greedy longest-match_ algorithm to split input text into the longest possible tokens from the vocab (which is equivalent to applying merges). Most BPE implementations use this greedy matching for encoding.

## Related
