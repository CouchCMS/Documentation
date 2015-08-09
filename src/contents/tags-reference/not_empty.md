---
title: not_empty
category: tag
template: default.html
---

# not_empty

The **not\_empty** tag can be used to find out whether or not an editable region contains any value.

It returns a '1' if the variable representing the editable region contains some value (i.e. is not empty) else it returns a '0'.<br/>
This property makes it possible to use it with conditional tags, like **if** and **else**.

```
<cms:if "<cms:not_empty my_content />" >
   .. do something..
</cms:if>
```

The snippet above, where we are checking if the editable region named *my\_content* contains any value,  could have been written in the following simpler manner -

```
<cms:if my_content >
   .. do something..
</cms:if>
```

\- however, if the editable region is of type _richtext_, the CKEditor sometimes inserts some spurious &lt;BR /&gt; or empty &lt;P&gt; tags into it even if nothing is entered into the editable region by the user. This will cause the simple test above to fail with _richtext_ types. The **not\_empty** strips off all HTML tags from the variable it is testing and then returns the result, thus making it useful for such cases.

## Parameters

This tag takes no parameters.

## Variables

This tag is self-closing and does not set any variables of its own.
