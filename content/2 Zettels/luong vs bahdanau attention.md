---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-19T01:54:15.570+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/attention mechanism\|attention mechanism]]

Some history: before the advent of the [[2 Zettels/transformer\|transformer]], [[2 Zettels/attention mechanism\|attention mechanism]] was primarily developed to enhance [[2 Zettels/RNN based encoder-decoder architecture\|RNN based encoder-decoder architecture]], particularly for neural machine translation (NMT). Two influential approaches from this era are [[2 Zettels/bahdanau attention\|bahdanau attention]] (**additive** attention, proposed by Bahdanau et al.) and [[2 Zettels/luong attention\|luong attention]] (**multiplicative** attention explored by Luong et al.).

Their core difference lies in the alignment score computation strategy: an MLP for additive versus simpler multiplicative functions for Luong; and the timing of decoder state usage (previous $s_{t-1}$ vs current $s_t$​).

> [!Tip]
> For larger dimensions, additive attention might outperform unscaled dot-product attention, highlighting the importance of the _scaling factor_ introduced later in SDPA.

| Feature                        | Bahdanau (Additive) Attention                           | Luong (Multiplicative) Attention                                                 |
| ------------------------------ | ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Primary Score Function Type    | Feed-forward Network (MLP)                              | Dot Product / Bilinear 31                                                        |
| Decoder State Used for Scoring | Previous state                                          | Current state                                                                    |
| Complexity                     | Higher computational cost, more parameters              | Lower computational cost, fewer parameters                                       |
| Key Performance Aspects        | Models complex alignments well, good for long sequences | Simpler, faster, less prone to overfitting, flexible score functions             |
| Typical Encoder                | Bidirectional RNN                                       | Unidirectional RNN (common variant)                                              |
| Decoder Integration Point      | Context vector ct​ influences calculation of $s_t$      | Context vector $c_t$​ combined with $s_t$​ to form $\tilde{s}_t$​ for prediction |

The exploration of different scoring functions by Luong et al., particularly the dot-product, foreshadowed the [[2 Zettels/scaled dot product attention\|scaled dot product attention]] that became central to the [[2 Zettels/transformer\|transformer]] architecture. While both Bahdanau and Luong attention significantly improved RNN capabilities, they remained bound by the sequential nature of RNNs.

## Related
