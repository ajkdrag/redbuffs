---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true}
---


> [!Topics]
> - [[c++ concepts\|c++ concepts]]

**cerr** - object of ostream
- It is used to display error messages
- It is an un-buffered standard error stream stream
    - As cerr is unbuffered so it is used when we need to display the error message immediately

**clog** - object of ostream
- It is also used to display error messages
- Unlike cerr the error is first inserted into a buffer and is stored in the buffer until it is not fully filled

## Related
