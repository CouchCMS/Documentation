---
title: decr
category: tag
template: default.html
---

# decr

The **decr** tag accepts as its first parameter a variable and decreases the value contained within the variable by the value contained within the second optional parameter. If the second parameter is not provided, a value of 1 is assumed.

```
<cms:set my_value='11' />
<cms:show my_value />
```

In the snippet above, value of variable my\_value is output as 11\.

```
<cms:decr my_value '2' />
<cms:show my_value />
```

The value of variable my\_value now becomes 9\.

```
<cms:decr my_value />
<cms:show my_value />
```

The value of variable my\_value now becomes 8\.

## Parameters

Expects a maximum of two parameters.

The first parameter has to be a variable. The second parameter is optional and its value is used to decrease the value of the variable passed as the first parameter. A default value of 1 is assumed if the second parameter is not specified.

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [add](../add.html)
*   [sub](../sub.html)
*   [mul](../mul.html)
*   [div](../div.html)
*   [mod](../mod.html)
*   [incr](../incr.html)
