---
title: folder
category: tag
template: default.html
---

# folder

The **folder** tag is used to create virtual folders for a template. The **folder** tags support nesting within each other thus allowing the creation of an hierarchy of virtual folders.

Please see [**Core Concepts - Folders**](../../concepts/using-folders.html) for a detailed explanation of this tag.

## Parameters

*   name
*   title
*   desc
*   weight

### name

The mandatory name of the folder. Has to be unique for the template.<br/>
Only lowercase\[a-z\], numerals\[0-9\] hyphen and underscore permitted

### title

The more user friendly displayable title. Can be duplicate unlike name.

### desc

Description.

### weight

A folder can be given a number as its weight. This parameter then can be used to list the folders in any desired order while enumerating them using Couch **folders** tag. The bigger the number (the heavier the weight), the lower down a folder appears in the sort order. Default weight is 0\. You can specify a negative number to make a folder appear higher up.

## Variables

This tag sets no parameters of its own.

## Related Tags

*   [folders](../folders.html)
*   [listfolders](../listfolders.html)
*   [dropdownfolders](../dropdownfolders.html)
*   [parentfolders](../parentfolders.html)
*   [is\_ancestor](../is_ancestor.html)
*   [breadcrumbs](../breadcrumbs.html)
