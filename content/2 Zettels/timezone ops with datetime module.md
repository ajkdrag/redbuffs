---
{"publish":true,"created":"2025-06-08T13:27:19.935+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
>
> - [[python internals\|python internals]]

We can use the `datetime` and `zoneinfo` built-in modules to reliably convert between times and dates in different time zones. The `zoneinfo` built-in module contains a full database of every time zone definition you might need:

```python
from zoneinfo import ZoneInfo
from datetime import datetime

arrival_nyc = "2024-03-10 03:31:18"
time_format = "%Y-%m-%d %H:%M:%S"
eastern = ZoneInfo("US/Eastern")
utc = ZoneInfo("UTC")

nyc_dt_naive = datetime.strptime(arrival_nyc, time_format)
nyc_dt = nyc_dt_naive.replace(tzinfo=eastern)

utc_dt = nyc_dt.astimezone(utc)

print("EDT:", nyc_dt) # EDT: 2024-03-10 03:31:18-04:00
print("UTC:", utc_dt) # UTC: 2024-03-10 07:31:18+00:00
```

In the code above, we basically parse string to datetime using `strptime`. Since the string didn't have any timezone info, `print(nyc_dt_naive.tzinfo)` will give us `None`. However, we know it's a NYC datetime, so we can set the `tzinfo` explicitly by `.replace(tzinfo=eastern)`, where `eastern` is a `ZoneInfo` object.

> [!Tip]
>
> To use zoneinfo effectively, you should always convert local times to UTC first. Perform any datetime operations you need on the UTC values (such as offsetting). Then, convert to local times as a final step.
>
> ```python
> nepal = ZoneInfo("Asia/Katmandu")
> utc_dt = nyc_dt.astimezone(utc)
> nepal_dt = utc_dt.astimezone(nepal)
>
> print("UTC:", utc_dt)
> print("NPT", nepal_dt)
> ```

## Related
