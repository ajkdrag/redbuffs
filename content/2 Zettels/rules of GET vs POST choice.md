---
{"publish":true,"created":"2025-06-04T14:44:26.506+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[web development\|web development]]

In the context of web development, GET and POST are [[HTTP methods\|HTTP methods]] used to request data from or send data to a server. Some key points are:

- POST is used when data is being created or modified
- GET is used when you are reading or searching things
- GET shouldn't be used to insert, update or delete data
- GET is supposed to be **indempotent**, i.e. same URL should give "same output" each time you access it
- GET has an upper limit on the number of bytes of params and values (~2K), POST request can carry much more data along with it
- In GET, you pass data as query params, whereas in POST, you send data in body
- Web search spiders will follow GET URLs but generally not the POST URLs

## Related
