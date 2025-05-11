---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-05-01T19:59:48.242+05:30"}
---


> [!Topics]
>
> - [[2 Zettels/logistic regression\|logistic regression]]

```python
import numpy as np

class LogisticRegression:
    def __init__(self, learning_rate=0.01, n_iters=1000):
        self.lr = learning_rate
        self.n_iters = n_iters
        self.weights = None
        self.bias = None

    def _sigmoid(self, z):
        # Clip to avoid overflow/underflow
        z = np.clip(z, -500, 500)
        return 1 / (1 + np.exp(-z))

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0

        for _ in range(self.n_iters):
            # Linear model z = X.w + b
            linear_model = np.dot(X, self.weights) + self.bias
            # Apply sigmoid
            y_predicted_prob = self._sigmoid(linear_model)

            # gradients
            dw = (1 / n_samples) * np.dot(X.T, (y_predicted_prob - y))
            db = (1 / n_samples) * np.sum(y_predicted_prob - y)

            # Update params
            self.weights -= self.lr * dw
            self.bias -= self.lr * db

    def predict_proba(self, X):
        linear_model = np.dot(X, self.weights) + self.bias
        y_predicted_prob = self._sigmoid(linear_model)
        return y_predicted_prob

    def predict(self, X, threshold=0.5):
        y_predicted_prob = self.predict_proba(X)
        y_predicted_class = [1 if i > threshold else 0 for i in y_predicted_prob]
        return np.array(y_predicted_class)


from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification
from sklearn.preprocessing import StandardScaler


seed = 123
X, y = make_classification(n_samples=1000, n_features=3, n_redundant=0, n_informative=3, random_state=seed,
                           n_clusters_per_class=1)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=seed)

# Standardize features (important for GD)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = LogisticRegression(learning_rate=0.1, n_iters=100)
model.fit(X_train, y_train)
predictions = model.predict(X_test)

def accuracy(y_true, y_pred):
    accuracy = np.sum(y_true == y_pred) / len(y_true)
    return accuracy

print(f"LR classification accuracy: {accuracy(y_test, predictions)}")
```

## Related
