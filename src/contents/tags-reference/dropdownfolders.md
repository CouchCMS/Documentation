---
title: dropdownfolders
category: tag
template: default.html
---

# dropdownfolders

The **dropdownfolders** tag can be used to create a quick-n-dirty HTML dropdown list of the folders belonging to a template.

```
<cms:dropdownfolders masterpage='news.php' />
```

## Parameters

Supports the same parameter as the **folders** tag. In addition, takes one more parameter - _show\_count_.

*   masterpage
*   root
*   childof
*   hierarchical
*   depth
*   orderby
*   order
*   exclude
*   extended\_info
*   show\_count

Please see the [**folders**](../folders.html) documentation for an explanation of these parameters.

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [folder](../folder.html)
*   [folders](../folders.html)
*   [listfolders](../listfolders.html)
*   [parentfolders](../parentfolders.html)
*   [is\_ancestor](../is_ancestor.html)
*   [breadcrumbs](../breadcrumbs.html)
