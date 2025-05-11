---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-05-08T17:49:29.498+05:30"}
---


> [!Topics]
>
> - [[rust\|rust]]

In Rust, code can be separated into *blocks*, which can be treated as the single statement or expression they evaluate to. This means we can assign variables to a block of code:

```rust
let sum = {
    let number_1 = 11;
    let number_2 = 31;
    number_1 + number_2
};

println!("{sum}");
```

If we look closely, we can see that functions are actually just callable, named blocks:

```rust
fn sum() -> u32 {
    let number_1 = 11;
    let number_2 = 31;
    number_1 + number_2
}
```

## Related
