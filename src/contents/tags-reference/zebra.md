---
title: zebra
category: tag
template: default.html
---

# zebra

The **zebra** tag, when used within any Couch tag that repeats its contents (e.g. repeat, while, pages, folders, templates etc.), outputs its first parameter at the first iteration, its second parameter at the second iteration and so on. If the number of iterations exceed the number of its parameters, it wraps around and starts from the first parameter.

The **zebra** tag can be used to output a different class to every alternate row of a table, thus creating a 'zebra' striping that gives this tag its name.

Some examples:

```
<cms:repeat count='5'>
    <cms:zebra 'one' 'two' 'three' /><br>
</cms:repeat>
```

The snippet above will output -

```
one
two
three
one
two
```

A more practical example -

```
<TABLE>
<cms:repeat count='4' >
    <TR class="<cms:zebra 'row' 'alternate_row' />">
        <cms:repeat count='6' startcount='1' >
            <TD>
                <cms:show k_count />
            </TD>
        </cms:repeat>
    </TR>
</cms:repeat>
</TABLE>
```

In the snippet above, we are using the repeat tag to create a table. The zebra tag will alternately output 'row' and 'alternate\_row' as class names for the table rows. This can be used to color alternate rows differently.

## Parameters

This tag can accept any number of unnamed parameters.

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [repeat](../repeat.html)
*   [each](../each.html)
