---
title: is_ancestor
category: tag
template: default.html
---

# is_ancestor

The **is\_ancestor** tag can be used to find whether or not a folder is the ancestor of another folder.<br/>
Outputs '1' if true, else outputs '0'. This makes it possible to use this tag with the conditional **if** tag.

```
<cms:if "<cms:is_ancestor parent=folder1 child=folder2 />" >
    ..
</cms:if>
```

Please see [**Core Concepts - Folders**](../../concepts/using-folders.html#parents-and-children) for more info.

## Parameters

*   masterpage
*   parent
*   child

### masterpage

This parameter specifies the template the two folders belong to. If skipped, the template of the executing page is assumed.

### parent

The purported parent folder.

### child

The child folder.

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [folder](../folder.html)
*   [folders](../folders.html)
*   [listfolders](../listfolders.html)
*   [dropdownfolders](../dropdownfolders.html)
*   [parentfolders](../parentfolders.html)
*   [breadcrumbs](../breadcrumbs.html)
