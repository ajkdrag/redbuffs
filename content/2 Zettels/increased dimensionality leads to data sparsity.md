---
{"publish":true,"created":"2025-04-27T12:25:39.542+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[curse of dimensionality\|curse of dimensionality]]

As the dimensionality increases, the number of data points required for good performance of any machine learning algorithm increases exponentially. The reason is that, we would need more number of data points for any given combination of features, for an ML model to be valid.

### Data Sparsity

Sparsity of data occurs when moving to higher dimensions. The volume of the space represented grows so quickly that the data cannot keep up and thus becomes sparse

![](https://res.cloudinary.com/dcameztw9/image/upload/v1745737158/increased%20dimensionality%20leads%20to%20data%20sparsity-jx5ffk.webp)

As the data space seen above moves from one dimension to two dimensions and finally to three dimensions, the given data fills less and less of the data space (becomes sparse). In order to maintain an accurate representation of the space, the amount of needed data for analysis grows exponentially.

### Example

Let’s say that for a model to perform well, we need at least 10 data points for each combination of feature values. If we assume that we have one binary feature, then

- For its $2^1$ unique values (0 and 1) we would need $2^{1}\times{10}=20$ data points.
- For $k$-number of binary features we would need $2^{k}\times{k}$ data points.

> Hughes (1968) in his study concluded that with a fixed number of training samples, the predictive power of any classifier first increases as the number of dimensions increase, but after a certain value of number of dimensions, the _performance deteriorates_. Thus, the phenomenon of curse of dimensionality is also known as **Hughes phenomenon**.
> ![](https://res.cloudinary.com/dcameztw9/image/upload/v1745737237/increased%20dimensionality%20leads%20to%20data%20sparsity-put32n.webp)

## Related
