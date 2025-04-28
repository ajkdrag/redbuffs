---
{"publish":true,"tags":["type/zettel","status/done"],"PassFrontmatter":true,"created":"2025-04-27T12:45:19.057+05:30"}
---


> [!Topics]
>
> - [[design pattern\|design pattern]]

Helps to abstract out algorithms with a Strategy Pattern. Instead of calling the algorithm directly, we will wrap it with a class and call a class member function (say `algo_1.execute()`) to get the output. This allows using different implementations, by simply passing a different class/strategy: `algo_2.execute()`.

> The caller function takes input the "strategy" and "executes" it.

```python
import spacy

"""Step 1: move code to a new class"""
class SpacyLemmatizer(BaseLemmatizer):
    def __init__(self, modelName):
        self.spacyModel = spacy.load(modelName)

    def get_lemmas(self, text):
        return [token.lemma_ for token in self.spacyModel(text)]

class Process:
    """Step 2: add new class as a member variable"""
    def __init__(self, articleLoader: BaseLoader, lemmatizer: BaseLemmatizer):
        self.articleLoader = articleLoader
        self.lemmatizer = lemmatizer

    def run(self):
        articles = self.articleLoader.get_articles()
        for text in articles['text']:
            """Step 3: refactor usage"""
            lemmas = self.lemmatizer.get_lemmas(text)

def main(param: str):
    """Step 4: create a lemmatizer at usage time"""
    process = Process(
        articleLoader=CSVArticleLoader(filePath='articles.csv')
        lemmatizer=SpacyLemmatizer(modelName='en_core_web_sm')
    )
    process.run()

if __name__ == "__main__":
    typer.run(main)
```

If we decide that you would like to use StanfordNLP's lemmatizer instead of Spacy's, then `Process` doesn't need to be changed. Simply create a new class `StanfordNLPLemmatizer` with same method `get_lemmas`, but different implementation.

## Related
