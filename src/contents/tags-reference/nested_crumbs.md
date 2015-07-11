---
title: nested_crumbs
category: tag
template: default.html
---

# nested_crumbs

The **nested\_crumbs** tag can be used to easily create breadcrumbs out of [nested-pages](../../concepts/nested-pages-aka-menu-maker.html).

<p class="notice">
    There is another tag named '[breadcrumbs](../breadcrumbs.html)', which is used with the folder hierarchy associated with normal cloned pages.<br/>
    'nested\_crumbs' on the other hand works with nested-pages only.
</p>

### Usage

This tag can be used in two ways -

**1\.** As self-closing tag. e.g.

```
<cms:nested_crumbs masterpage='index.php' />
```

where 'masterpage' points to the template behind the nested-pages tree.

**2\.** As a tag-pair for better control over the generated breadcrumbs markup. e.g.

```
<cms:nested_crumbs masterpage='index.php' ignore_show_in_menu='1' prepend='<ul class="breadcrumb">' append='</ul>'>
   <li><a href="<cms:show k_crumb_link />"><cms:show k_crumb_text /></a><cms:if k_crumb_is_last='0'> &raquo; </cms:if></li>
</cms:nested_crumbs>
```

## Parameters

*   masterpage
*   ignore\_show\_in\_menu
*   prepend
*   append

### masterpage

This parameter is used to specify the template behind the nested-pages used to create the breadcrumbs.<br/>
If left empty, the template of the currently executing page is assumed.

### ignore_show_in_menu

The 'Advanced Settings' of each nested-page has a checkbox labeled 'Show in menu'.<br/>
If that is unchecked, the page is not included by default in the breadcrumbs.<br/>
You can override this by setting 'ignore\_show\_in\_menu' parameter to '1'.

### prepend

While using the tag as a tag-pair (see Usage above), this parameter can be used to output anything before the first crumb.

### append

While using the tag as a tag-pair (see Usage above), this parameter can be used to output anything after the last crumb.

## Variables

When used as a self-closing tag, this tag sets no variables.

When used as a tag-pair, the following variables are set for each crumb -

*   k\_crumb\_id
*   k\_crumb\_name
*   k\_crumb\_text
*   k\_crumb\_link
*   k\_crumb\_is\_nested\_page
*   k\_crumb\_is\_folder
*   k\_crumb\_open\_external
*   k\_crumb\_is\_last

## Related Tags

*   [menu](../menu.html)
*   [breadcrumbs](../breadcrumbs.html)
*   [nested\_pages](../nested_pages.html)
