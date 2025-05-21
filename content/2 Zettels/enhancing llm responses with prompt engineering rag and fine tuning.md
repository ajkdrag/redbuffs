---
{"publish":true,"created":"2025-04-27T10:00:18.382+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[LLM\|LLM]]
> - [[prompt engineering\|prompt engineering]]
> - [[RAG\|RAG]]
> - [[LLM fine-tuning\|LLM fine-tuning]]

Improving the quality, relevance, style, and consistency of Large Language Model (LLM) outputs often involves techniques like [[prompt engineering\|prompt engineering]], [[RAG\|RAG]], and [[LLM fine-tuning\|LLM fine-tuning]].

### Prompt Engineering

This involves carefully crafting the input prompt given to the LLM to guide its response generation process effectively.

- **Priming**: Setting the context or persona (e.g., "You are a helpful assistant specializing in topic X")
- **Style/Tone**: Explicitly instructing the desired output style (e.g., "Use layman terms," "Respond formally")
- **Error Handling**: Defining how the LLM should behave with edge cases or irrelevant inputs (e.g., "If the question is off-topic, politely decline")
- **Dynamic Content**: Incorporating user input or _variables_ into the prompt structure
- **Output Formatting**: Specifying the desired output structure (e.g., "Respond in valid JSON format: `{'response': '...'}`")

### Retrieval Augmented Generation (RAG)

RAG enhances LLM responses by providing relevant, _up-to-date external knowledge_ directly within the prompt context. This combats hallucination and grounds the response in specific data.

- **Preparation**:
    - Collect relevant documents (corpus)
    - Split documents into manageable, meaningful chunks
    - Generate vector embeddings for each chunk using an embedding model
    - Store chunks and their embeddings in a vector database for efficient searching
- **Retrieval Process**:
    - Embed the user's query using the _same_ embedding model
    - Search the vector database for the top N chunks most similar (semantically relevant) to the query embedding
    - Construct an augmented prompt including the original query and the retrieved knowledge chunks (e.g., "Answer the query `'{inquiry}'` using this information if relevant: `'{knowledge}'`")
    - Feed the augmented prompt to the LLM to generate the final response
- **Advanced RAG**: [[2 Zettels/vanilla RAG problems\|vanilla RAG problems]], so few [[2 Zettels/tips for better RAG performance\|tips for better RAG performance]]:
    - **Query Pre-processing**: Use an LLM to refine or simplify the user query before embedding
    - **Filtering**: After initial retrieval, use an LLM to assess which retrieved chunks are most applicable to the specific query
    - **Self-Reflection**: After generation, ask the LLM (can be same or different) to evaluate its own answer for accuracy and helpfulness, potentially rewriting it if needed

### Fine Tuning LLMs

Fine-tuning involves further training a pre-trained foundational LLM on a dataset of specific prompt-completion examples relevant to a particular task or domain.

- **Use Cases**:
    - Teaching nuanced tasks or intuition difficult to capture in prompt instructions alone
    - Consistently enforcing a specific style, tone, or format (baking it into the model)
    - Reducing the length and complexity of prompts needed during inference
    - Training _smaller_, more specialized models to perform well on specific tasks, optimizing for speed/cost
    - Constraining the model's output to a narrower, desired range
- **Strategies**:
    - **Quality Focus**: Fine-tune a larger, more capable base model on high-quality examples
    - **Speed/Cost Focus**: Fine-tune a smaller base model on a larger dataset of examples

> [!Note]
>
> A popular technique named [[few-shot prompting\|few-shot prompting]] involves providing examples directly within the prompt's context window. In fine-tuning, we move these examples into a training dataset, which scales better for numerous scenarios and avoids increasing prompt length and cost during inference.

### Combining Retrieval and Tuning

Using RAG with a fine-tuned model often yields the best results. The fine-tuning helps the model understand the task, style, and format implicitly, while RAG provides the necessary external knowledge dynamically at inference time.

## Related
