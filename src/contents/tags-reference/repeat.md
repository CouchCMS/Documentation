---
title: repeat
category: tag
template: default.html
---

# repeat

The **repeat** tag can be used to unconditionaly repeat all contents contained within its opening and closing tags the number of times specified by its _count_ parameter. This can be used to create HTML tables etc.

```
<TABLE>
<cms:repeat count='4' >
    <TR>
        <cms:repeat count='6' startcount='1' >
            <TD>
                <cms:show k_count />
            </TD>
        </cms:repeat>
    </TR>
</cms:repeat>
</TABLE>
```

In the example above, we are using the **repeat** tag twice to create a table with 4 rows each having 6 cells. The _startcount_ parameter is used to make the *k\_count* variable, set by this tag to denote the number of the current iteration, to start from 1 instead of the default 0\.

## Parameters

*   count
*   startcount

### count

Sets the number of times this tag repeats

### startcount

This tag sets a variable named *k\_count* that increases with each iteration. By default, the first iteration is numbered 0\. The _startcount_ parameter can be used to make *k\_count* begin from any arbitrary number.

## Variables

*   k\_count

### k_count

This variable is increased by one each time the **repeat** tags repeats the loop. See the _startcount_ parameter above.

## Related Tags

*   [each](../each.html)
*   [zebra](../zebra.html)
