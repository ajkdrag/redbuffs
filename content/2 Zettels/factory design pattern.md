---
{"publish":true,"created":"2025-04-27T12:40:33.141+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[design pattern\|design pattern]]

The Factory Pattern is about **generating objects**. You implement the Factory by declaring an **interface** and the caller (your code where you want to use the objects) uses this interface to get the data but is _not aware_ of where the data is coming from. This allows us to abstract/decouple object creation.

```python
class FrenchLocalizer:
    def __init__(self):
        self.translations = {"car": "voiture", "bike": "bicyclette",
                             "cycle":"cyclette"}
 
    def localize(self, msg):
        """change the message using translations"""
        return self.translations.get(msg, msg)
 
class SpanishLocalizer:
    def __init__(self):
        self.translations = {"car": "coche", "bike": "bicicleta",
                             "cycle":"ciclo"}
 
    def localize(self, msg):
        """change the message using translations"""
        return self.translations.get(msg, msg)
 
class EnglishLocalizer:
    def localize(self, msg):
        return msg
 
def Factory(language ="English"):
    """Factory Method"""

    localizers = {
        "French": FrenchLocalizer,
        "English": EnglishLocalizer,
        "Spanish": SpanishLocalizer,
    }
 
    return localizers[language]()
 
if __name__ == "__main__":
    f = Factory("French")
    e = Factory("English")
    s = Factory("Spanish")
 
    message = ["car", "bike", "cycle"]
 
    for msg in message:
        print(f.localize(msg))
        print(e.localize(msg))
        print(s.localize(msg))
```

We can easily add new localizers without disturbing the existing client code.

## Related
