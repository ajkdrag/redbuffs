---
{"publish":true,"tags":["status/done","type/zettel"],"path":"2 Zettels/contextual retrieval.md","permalink":"/2-zettels/contextual-retrieval/","PassFrontmatter":true}
---


Topics: [[RAG\|RAG]]
Links:

In [[2 Zettels/contextual retrieval vs standard RAG\|standard RAG]], documents are chunked and this can result in [[2 Zettels/vanilla RAG problems\|loss of context]]. A preprocessing step can be used where an LLM can create contexts for the chunks.
> [!example]
> - `original_chunk` = "The company's revenue grew by 3% over the previous quarter."
> - `contextualized_chunk` = "This chunk is from an SEC filing on ACME corp's performance in Q2 2023; the previous quarter's revenue was $314 million. The company's revenue grew by 3% over the previous quarter."

In the `original_chunk`, we have no idea which company is being referred to. So if there's similar sentence that talks about some other company's revenue growth, both of these will be close in the vector space and be retrieved, which is not desired. On the other hand, `contextualized_chunk` contains company name and is a better chunk.
Basically, we pass the chunk and the entire doc to the LLM and ask it to contextualize the chunk based on the doc. A sample prompt would look something like:
```xml
<document> {{WHOLE_DOCUMENT}} </document>
Here is the chunk we want to situate within the whole document 
<chunk> {{CHUNK_CONTENT}} </chunk> 
Please give a short succinct context to situate this chunk 
within the overall document for the purposes of improving 
search retrieval of the chunk.
Answer only with the succinct context and nothing else.
```

Anthropic reports that this technique reduced the top-20 [[2 Zettels/chunk retrieval failure rate\|chunk retrieval failure rate]] by ==35% (5.7% → 3.7%)== consistentently across domains: codebases, fiction, ArXiv papers, Science Papers.