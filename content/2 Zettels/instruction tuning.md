---
{"publish":true,"tags":["type/zettel","status/done"],"aliases":["instruction fine-tuning"],"PassFrontmatter":true,"created":"2025-04-24T16:49:30.836+05:30"}
---


> [!Topics]
>
> - [[LLM\|LLM]]
> - [[fine-tuning\|fine-tuning]]

Instruction tuning bridges gap between pre-trained [[2 Zettels/language models\|language models]] and human expectations. Unlike [[pre-training\|pre-training]] which teaches general language patterns, instruction tuning specializes models for task execution **by following instructions**. Key components include:

- **Data construction**: Human-written (`instruction, output`) pairs covering diverse tasks (QA, summarization, coding). Quality varies by dataset - FLAN focuses on reasoning, Alpaca on general instructions
- **Training**: Standard [[supervised fine tuning\|supervised fine tuning]] (SFT) with [[cross-entropy loss\|cross-entropy loss]] and [[2 Zettels/teacher forcing\|teacher forcing]]. Typically uses smaller learning rate than pre-training
- **Effects**: Dramatically improves instruction following even with modest data (~1000 examples). Also impacts:
    - Response style (concise vs verbose)
    - Safety mitigations
    - Format adherence (JSON, lists etc)

> [!Note]  
> Instruction tuning alone doesn't guarantee alignment. Often combined with [[RLHF\|RLHF]] (for [[preference tuning\|preference tuning]]) to get better results.

On HuggingFace, there are instruct versions of popular LLMs, for example `tiiuae/falcon-40b-instruct` and `mosaicml/mpt-7b-instruct`. Even if models don't include the work `instruct`, they often are fine-tuned via instructions, for example `meta-llama/Llama-2-70b-chat-hf` and `google/flan-t5-xxl`.

Few advanced variants:

- [[multi-task instruction tuning\|multi-task instruction tuning]] (trains on mixed datasets)
- cross-modal tuning (for vision-language models)

## Related

- [[prompt engineering\|prompt engineering]]
- [[catastrophic forgetting\|catastrophic forgetting]]
- [[instruction tuning vs task fine-tuning\|instruction tuning vs task fine-tuning]]
- [[preference tuning\|preference tuning]]
