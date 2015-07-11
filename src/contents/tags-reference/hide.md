---
title: hide
category: tag
template: default.html
---

# hide

The hide tag is a very simple tag that can be used to prevent the output of code enclosed within it from being displayed.

```
<cms:hide>
   ...Everything here will get executed but the output will never appear on the webpage...
</cms:hide>
```

This is useful when you wish to execute some Couch tags but do not wish their outputs to get displayed.<br/>
Compare this with the **ignore** tag where the enclosed contents are not executed at all.

## Parameters

This tag takes no parameters. All enclosed contents serve as its input.

## Variables

This tag sets no variables of its own.

## Related Tags

*   [ignore](../ignore.html)
