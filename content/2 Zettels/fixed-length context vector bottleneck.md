---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-19T10:09:27.229+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/encoder-decoder architecture\|encoder-decoder architecture]]
> - [[neural information retrieval\|neural information retrieval]]

Traditional [[2 Zettels/encoder-decoder architecture\|encoder-decoder architecture]] for [[seq2seq modeling\|seq2seq modeling]] compresses entire input sequence $X = (x_1, ..., x_{T_x})$ into single fixed-length context vector $c$.

Encoder processes input sequence, produces final hidden state $h_{T_x}$. This $h_{T_x}$ serves as context vector $c$:
$$c = h_{T_x} = \text{Encoder}(x_1, ..., x_{T_x})$$
Decoder uses fixed vector $c$ as initial state or conditioning input at each time step to generate output $Y = (y_1, ..., y_{T_y})$.

Decoder equations:

$$s_t = f(s_{t-1}, y_{t-1}, c)$$
$$y_t = g(s_t, c)$$

$s_t$ is decoder hidden state at time $t$. $f$ is decoder RNN cell. $g$ is output layer.

Problems with fixed-length context vector:

- **Information Loss**: Mapping variable-length input to fixed vector limits information retention. Capacity of $c$ limited, especially for long inputs $T_x$
- **Difficulty with Long Sequences**: Performance degrades as input length $T_x$ grows. Fixed $c$ struggles to encode all relevant information for long output sequence generation. Decoder relies on single compressed representation for all output steps
- Inability to Focus: Fixed context vector provides global input summary. Does not allow decoder to focus on specific input parts most relevant for current output generation. All input parts treated equally during compression

The [[2 Zettels/attention mechanism\|attention mechanism]] addresses this bottleneck. Introduced in models like [[2 Zettels/bahdanau attention\|bahdanau attention]], [[2 Zettels/luong attention\|luong attention]] and later "widespread" via the [[2 Zettels/transformer\|transformer]]. Allows decoder to compute context vector $c_t$ at each decoding step $t$.

$c_t$ is _weighted_ sum of encoder hidden states $h_1, ..., h_{T_x}$:

$$c_t = \sum_{i=1}^{T_x} \alpha_{ti} h_i$$

Weights $\alpha_{ti}$ are dynamically computed based on _relevance_ of each encoder state $h_i$ to current decoder hidden state $s_{t-1}$. This allows decoder to focus on most pertinent input information for each output token, mitigating information bottleneck.
