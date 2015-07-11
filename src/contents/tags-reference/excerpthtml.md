---
title: excerptHTML
category: tag
template: default.html
---

# excerptHTML

The **excerptHTML** tag can be used to create an excerpt of any HTML content that is enclosed within its opening and closing tags.<br/>
Unlike the **excerpt** tag,  excerptHTML preserves the HTML formatting of the truncated contents (except for the HTML tags specified in its _ignore_ parameter).

Examples -

```
<cms:excerptHTML><cms:show content /></cms:excerptHTML>
```

```
<cms:excerptHTML count='130' ignore='img'>
    <cms:show content />
</cms:excerptHTML>
```

The snippets are outputting an excerpt of the value contained within the _content_ variable.

## Parameters

*   count
*   ignore
*   trail

### count

The maximum number of words that the excerpt can contain. The default value is 50 words.

### ignore

The HTML elements to weed out of the excerpt. For example, you might not want to have any images in the excerpt.<br/>
If you wish to ignore multiple tags, separate the tagnames by using comma e.g.

```
ignore='img, table'
```

### trail

By default the produced excerpt is appended with '...' (three ellipses). You can change this by using this parameter.

```
<cms:excerptHTML trail="&nbsp;(<a href=\"<cms:show k_page_link />\">read more..</a>)"><cms:show blog_content /></cms:excerptHTML>
```

The snippet above will append a '_read more.._' link leading to the page-view of the item being shown in excerpted form.

## Variables

This tag does not set any variables of its own.

## Related Tags

*   [excerpt](../excerpt.html)
