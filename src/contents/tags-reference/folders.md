---
title: folders
category: tag
template: default.html
---

# folders

The **folders** tag can be used to enumerate the virtual folders that have been defined for a template.

Please see [**Core Concepts - Folders**](../../concepts/using-folders.html) for an in-depth discussion of this tag.

## Parameters

*   masterpage
*   root
*   childof
*   hierarchical
*   depth
*   orderby
*   order
*   exclude
*   extended\_info

### masterpage

This parameter can be used to specify the template the folders of which are to be enumerated. If skipped, the template this tag is being used from is used.

### root

Only a sub-section of the folders tree can be enumerated by specifying a folder as this parameter. The folder specified as the root is returned along with all its children.

### childof

Only a sub-section of the folders tree can be enumerated by specifying a folder as this parameter. Only the children of the specified folder are returned.

### hierarchical

By setting this parameter the **folders** tag can be made to enumerate the folders in their hierarchical order. If skipped, the folders are enumerated in the alphabetical order of their names.

### depth

This parameter can be set to specify the maximum level in hierarchy (i.e. depth) that will be reached during enumeration. This can be used, for example, to list only the top folders in the tree by setting the depth to 1\. A depth of 0 means unlimited depth.

### orderby

This parameter can be set to order the enumerated folders according to the following- _name_, _title_, _id_, _count_ or _weight_. If skipped, _name_ is used as default.

### order

Can be set to specify whether the enumerated folders are ordered in the ascending order or in descending order. Valid values are _asc_ and _desc_. Default is _asc_.

### exclude

Folders can be excluded from being enumerated by specifying them with this parameter. If an excluded folder has children, they are excluded too.<br/>
If multiple folders are to be excluded, separate them with comma.

### extended_info

If this parameter is set, additional variables get set to report the changes in hierarchy encountered by the **folders** tag, as it traverses through the folder tree. Please see the **Variables** section below.

## Variables

The following variables are set to provide information about each folder that gets enumerated

*   k\_folder\_id
*   k\_folder\_name
*   k\_folder\_title
*   k\_folder\_desc
*   k\_folder\_link
*   k\_folder\_pagecount
*   k\_folder\_totalpagecount
*   k\_level

If the _hierarchical_ parameter is set to '1', the following variables also get set to indicate the current position in the hierarchy as this tag enumerates the folders -

*   k\_level\_start
*   k\_element\_start
*   k\_element\_end
*   k\_level\_end

You can use these variables to easily create HTML ordered or unordered lists. Please see **Folders** in **Core Concepts**.

## Related Tags

*   [folder](../folder.html)
*   [listfolders](../listfolders.html)
*   [dropdownfolders](../dropdownfolders.html)
*   [parentfolders](../parentfolders.html)
*   [is\_ancestor](../is_ancestor.html)
*   [breadcrumbs](../breadcrumbs.html)
*   [pages](../pages.html)
*   [archives](../archives.html)
*   [templates](../templates.html)
*   [comments](../comments.html)
