---
{"publish":true,"created":"2025-03-31T22:36:41.747+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[bit manipulation\|bit manipulation]]

In arithmetic, if you know the sum of several numbers (say, `a + b + c = x`) and you know some of the numbers (say, `a`), you can easily find the sum of the remaining numbers (`b + c`) by subtracting: `b + c = x - a`. Addition is **invertible** in this sense.

However, bitwise OR operation does not have this property. If you know `a | b | c = x` and you know `a`, you **cannot** reliably determine `b | c` from `x` and `a`.

**Example:** 
Let's say: 
- `a = 5` (binary `0101`) 
- `b = 3` (binary `0011`) 
- `c = 10` (binary `1010`)

Then `a | b | c = 5 | 3 | 10 = 15` (binary `1111`). Now, if you only know that `a | b | c = 15` and `a = 5`, you can't find `b | c` just from this information.

For instance, consider another set of numbers: 
- `a = 5` (binary `0101`) - same `a` 
- `b = 0` (binary `0000`) 
- `c = 15` (binary `1111`) 

Here, `a | b | c = 5 | 0 | 15 = 15` (binary `1111`), which is the same result. But in this case, `b | c = 0 | 15 = 15`, while in the first example, `b | c = 3 | 10 = 11`.

This is because the bitwise OR operation is **not invertible**. Once a bit is set to 1 through OR, you *lose information* about which operand(s) originally caused it to be 1.
## Related
