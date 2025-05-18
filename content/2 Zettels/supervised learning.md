---
{"publish":true,"created":"2025-04-30T17:05:09.805+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[ml paradigm\|ml paradigm]]

SL is about learning mapping from input X to output Y. It uses labeled training data `(X, Y)`.

- **Goal:** predict Y for new, unseen X accurately
- **Core tasks:**: Classification (predict discrete category, e.g., spam/not spam), Regression (predict continuous value, e.g., price)

It contrasts [[unsupervised learning\|unsupervised learning]] (no labels, finds patterns) & [[reinforcement learning\|reinforcement learning]] (learns via rewards/penalties). The reliance on _labeled_ data is SL's defining feature. Data quality, labeling effort are critical prerequisites. Classification/regression distinction is fundamental: dictates algorithm choice and evaluation metrics.

**Common algorithms:** [[2 Zettels/logistic regression\|logistic regression]], [[2 Zettels/support vector machines\|support vector machines]] (SVM), K-Nearest Neighbors ([[KNN algorithm\|KNN algorithm]]), [[decision trees\|decision trees]] (DT), [[bagging\|bagging]] ([[random forests\|random forests]] - RF), [[boosting\|boosting]] ([[adaboost\|adaboost]] - AB, [[gradient boosting\|gradient boosting]] - GB) etc.

High-level comparison of fundamental supervised algorithms:

| Algorithm           | Key Idea                                                            | Core Math Concept(s)                                            |
| :------------------ | :------------------------------------------------------------------ | :-------------------------------------------------------------- |
| Logistic Regression | Model probability of binary outcome via sigmoid function            | Sigmoid, Log Loss, [[gradient descent\|gradient descent]]                         |
| SVM                 | Maximize margin between classes (Classification)                    | Hyperplane, Margin, Hinge Loss, Kernels, Quadratic Programming  |
| KNN                 | Classify/predict based on K nearest neighbors                       | [[distance metrics\|distance metrics]] (Euclidean, Manhattan), Majority Vote/Avg. |
| Decision Tree       | Recursive partitioning of data based on feature tests               | Entropy, Gini Impurity, Information Gain, Variance Reduction    |
| Random Forest       | Ensemble of DTs via bagging + feature randomness                    | Bagging, Decision Trees, Feature Importance, OOB Error          |
| AdaBoost            | Sequential ensemble, weights misclassified points higher            | Boosting, Weak Learners, Weighted Voting, Exponential Loss      |
| Gradient Boosting   | Sequential ensemble, fits new models to residual errors (gradients) | Boosting, Weak Learners, Gradient Descent, Loss Functions       |

## Related

- [[unsupervised learning\|unsupervised learning]]
- [[reinforcement learning\|reinforcement learning]]
- [[semi-supervised learning\|semi-supervised learning]]
