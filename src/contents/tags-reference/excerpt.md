---
title: excerpt
category: tag
template: default.html
---

# excerpt

The **excerpt** tag can be used to create an excerpt of any content that is enclosed within its opening and closing tags.<br/>
Unlike the **excerptHTML** tag, the **excerpt** tag strips off all HTML tags (except those specified by its _allow_ parameter) from the excerpt it creates.

## Parameters

*   count
*   allow
*   trail
*   truncate\_chars

### count

The maximum number of words/characters that the excerpt can contain. The default value is 50\.<br/>
By default, this parameter is applied to the number of words in the excerpt.<br/>
By setting the 'truncate\_chars' parameter (see below)  to '1', it can be made to apply to the number of characters in the excerpt instead.

### allow

The HTML elements you wish to preserve in the excerpt.<br/>
If you wish to preserve multiple tags, separate the tagnames by using comma e.g.

```
allow='i, b'
```

### trail

By default the produced excerpt is appended with '...' (three ellipses). You can change this by using this parameter.

### truncate_chars

By default, the 'count' paramater is considered to be the number of words the excerpt can contain.<br/>
By setting the 'truncate\_chars' to '1', the 'count' becomes the number of characters the excerpt can contain.

```
<cms:excerpt count='100' truncate_chars='1'>...blah blah...</cms:excerpt>
```

<p class="notice">Please note that if 'truncate\_chars' is set to '1', the 'allow' parameter is ignored and all the HTML tags are stripped off the input.</p>

## Variables

This tag does not set any variables of its own.

## Related Tags

*   [excerptHTML](../excerpthtml.html)
