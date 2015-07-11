---
title: ignore
category: tag
template: default.html
---

# ignore

The **Ignore** tag can be used to surround sections of code that you temporarily do not wish to execute (i.e. want to have the code present on the page yet not be executed).<br/>
This is somewhat akin to comenting out code in other languages to prevent execution.

For example -

```
<cms:show 'Hello ' />
<cms:ignore>
    <cms:show 'world' />
</cms:ignore>
```

will output only _Hello_ and ignore _world_.

## Parameters

This tag does not take any parameters.

## Variables

This tag does not set any variables of its own.

## Related Tags

*   [hide](../hide.html)
