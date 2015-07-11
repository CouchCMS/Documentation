---
title: reverse_related_pages
category: tag
template: default.html
---

# reverse_related_pages

Please see [**Documentation - Core concepts - Relationships**](../../concepts/relationships.html#displaying-the-related-pages) for a detailed explanation of this type of region.

## Parameters

This tag is very closely related to the [**pages**](../pages.html) tag and supports all the parameters acceptable to the [**pages**](../pages.html) tag.<br/>
Please see [**Documentation - Tags - Pages**](../pages.html#parameters) for a complete list of all the supported parameters.

Additionaly, the following parameters are also supported

*   field (default)
*   masterpage

### field

This parameter specifies the name of the editable region of type [**relation**](../editable/relation.html) that is used to create the associations between pages.<br/>
If not specified, the first [**relation**](../editable/relation.html) type editable region defined in the template would be used.

### masterpage

This parameter specifies the template that defines the editable region of type 'relation' specified in the 'field' parameter above.<br/>
This parameter is mandatory.

## Variables

As mentioned, this tag is very closely related to the [**pages**](../pages.html) tag and sets exactly the same variables as the [**pages**](../pages.html) tag.<br/>
Please see [**Documentation - Tags - Pages**](../pages.html#variables) for a complete list of all the variables set by this tag.

## Related Tags

*   [related\_pages](../related_pages.html)
