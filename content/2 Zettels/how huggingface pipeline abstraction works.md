---
{"publish":true,"created":"2025-04-15T01:01:55.407+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[huggingface transformers\|huggingface transformers]]

Let's take the task of [[sentiment analysis\|sentiment analysis]]. We pass some input text `I love HuggingFace!` through the model's associated tokenizer (e.g., `DistilBertTokenizer` for the default sentiment model). This involves normalization, [[tokenization\|tokenization]], adding special tokens, converting to IDs, and creating an attention mask, resulting in tensors ready for the model.

The tokenized inputs (IDs, attention mask) are fed into the `forward` pass of the underlying model (e.g., `DistilBertForSequenceClassification`). The model outputs raw scores called **logits** for each possible class (e.g., `[-2.5, 3.1]` representing scores for "NEGATIVE" and "POSITIVE").

Finally, we do postprocessing to [[convert logits to probabilities using softmax\|convert logits to probabilities using softmax]]. In order to obtain corresponding "target labels", the pipeline uses `model.config.id2label`, e.g., index 1 maps to "POSITIVE", and 0 maps to "NEGATIVE". The final output is formatted nicely: `[{'label': 'POSITIVE', 'score': 0.997...}]`. Thus, it encapsulates these three steps (tokenization, forward pass, postprocessing) for many common tasks, providing a simple, high-level interface. 

Using pipeline abstraction:

```python
from transformers import pipeline

# default model for "sentiment-analysis" pipeline at the time of writing: 
# distilbert-base-uncased-finetuned-sst-2-english
classifier = pipeline("sentiment-analysis")
print(classifier("I love HuggingFace!"))
```

 Without using pipeline (same result, longer code):

```python
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch.nn.functional as F


model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = DistilBertTokenizer.from_pretrained(model_name)
model = DistilBertForSequenceClassification.from_pretrained(model_name)

inputs = tokenizer("I love HuggingFace!", return_tensors="pt")
with torch.no_grad():
    logits = model(**inputs).logits

predicted_class_id = logits.argmax().item()
print(model.config.id2label[predicted_class_id])

# getting probs
probabilities = F.softmax(logits, dim=-1)
print(probabilities)
```

To summarize, the pipeline high-level API automatically:

- downloads that model and the associated tokenizer,
- tokenizes your input text,
- feeds it through the model,
- applies softmax to get probabilities,
- and returns the result with labels

The pipeline API supports many tasks. A lot more can be read in the [docs](https://huggingface.co/docs/transformers/en/main_classes/pipelines)

## Related
