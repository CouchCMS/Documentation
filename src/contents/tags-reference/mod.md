---
title: mod
category: tag
template: default.html
---

# mod

The **mod** tag accepts two parameters and returns as its output the remainder obtained after dividing the first parameter by the second.<br/>
The parameters may be literal strings, variables or output of other tags.

```
<cms:set my_count='23' />
<cms:mod my_count '5' />
```

The snippet above outputs '3', which is what remains after dividing 23 by 5.

## Parameters

The tag expects two parameters as the operands.

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [add](../add.html)
*   [sub](../sub.html)
*   [mul](../mul.html)
*   [div](../div.html)
*   [incr](../incr.html)
*   [decr](../decr.html)
