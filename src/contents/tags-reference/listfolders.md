---
title: listfolders
category: tag
template: default.html
---

# listfolders

The **listfolders** tag can be used to create a quick-n-dirty HTML unordered list of the folders belonging to a template.

```
<cms:listfolders masterpage='news.php' />
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

Please see the [**folders**](../folders.html#parameters) documentation for an expanation of these parameters.

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [folder](../folder.html)
*   [folders](../folders.html)
*   [dropdownfolders](../dropdownfolders.html)
*   [parentfolders](../parentfolders.html)
*   [is\_ancestor](../is_ancestor.html)
*   [breadcrumbs](../breadcrumbs.html)
