---
title: breadcrumbs
category: tag
template: default.html
---

# breadcrumbs

The **breadcrumbs** tag outputs the hierarchy of folders leading upto the folder being shown (if folder\_view) or the folder within which the current page resides (if page\_view). This can be used too create a trail (breadcrumbs) leading upto the current page.

```
<cms:breadcrumbs />
```

Please see [**Core Concepts - Folders**](../../concepts/using-folders.html) for a discussion on this tag's usage.

## Parameters

*   separator
*   include\_template

### separator

Set the separator to show between each item in the breadcrumbs. The default separator is '_&amp;nbsp;&gt;&amp;nbsp;_'.

### include_template

By default, this tag only outputs the hierarchy of folders. To make it also list the template of the folders as the first item in the breadcrumbs, set this parameter to '1'.<br/>
If this parameter is set, remember to check that the current view is either _folder-view_ or _page-view_ before invoking this tag, because for any other views the folder hierarchy is irrelevant and **breadcrumbs** tag rightly does not output any folder names, however the *include\_template* parameter will cause the template's name to appear which might not be desirable.

```
<cms:if k_is_page || k_is_folder >
    <cms:breadcrumbs separator='&nbsp;>>&nbsp;' include_template='1' />
</cms:if>
```

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [folder](../folder.html)
*   [folders](../folders.html)
*   [listfolders](../listfolders.html)
*   [dropdownfolders](../dropdownfolders.html)
*   [parentfolders](../parentfolders.html)
*   [is\_ancestor](../is_ancestor.html)
