---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/reflection tuning LLMs.md","permalink":"/2-zettels/reflection-tuning-ll-ms/","PassFrontmatter":true}
---



> [!Topics]
> - [[LLM fine-tuning\|LLM fine-tuning]]

A fine-tuning technique in which model reflects on the generated content, detects errors in its reasoning, evaluates the accuracy, and then makes corrections before finally giving the results to the user. This entire process is also called *reflection* or *self-correction*.
It employs the use of new tokens such as `thinking`, `reflection`. Synthetic data is mainly used, e.g. **Glaive,** a data generation company was employed for Reflection 70B tuning.
> [!note] A Note on Reflection 70B
> This model claimed to be very good but tests showed that it’s often inferior to even the base model LLama 3.1 70B; as a result of which it's facing scrutiny regarding validity of its performance claims.

## Related
