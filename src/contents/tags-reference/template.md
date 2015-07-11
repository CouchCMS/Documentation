---
title: template
category: tag
template: default.html
---

# template

The **template** tag can be used to modify the attributes of the template this tag is used on.<br/>
It is customary to place this tag somewhere at the beginning of a template. This tag outputs nothing and this makes it a good place to put the structural Couch tags, like **editable** and **folders**, within it.

## Parameters

*   title
*   clonable
*   access\_level
*   executable
*   commentable
*   hidden
*   order

### title

This parameter is used to set the display name of the template in Couch admin panel.<br/>
If this parameter is skipped, the name of the template (will have the .php extension) is used instead.

### clonable

This parameter needs to be set to '1' in order to declare a template clonable i.e. allow multiple pages to be cloned out of it.

### access_level

This parameter can be set to restrict the access to the template and all its cloned pages to users of certain access level. For details, please see 'Template level access' in [Users and Access Control](../../concepts/users.html).

### executable

If this parameter is set to '0', non-super-admin users will be unable to access the template and all its cloned pages via their URLs. This is usually done when a template is used only to define editable regions that will be used to capture data in the admin panel. The captured data is then usually displayed on other templates by the use of either [**pages**](../pages.html) tag or [**get\_custom\_field**](../get_custom_field.html) tag.

### commentable

To allow users to comment on pages of this template, this parameter has to be set to '1'. See [**Comments**](../../concepts/using-comments.html).

### hidden

Certain templates, like the ones used for RSS feeds and custom 404 page, might not contain any editable regions at all. Since there is nothing that the non-super-admins are supposed to enter in these templates as data, it is advisable to hide the names of such templates from them in the admin panel. This can be done by setting this parameter to '1'.

### order

By default, all the templates defined for a web site are displayed in the admin panel in the order of their creation, the oldest one being on the top. This order can be manipulated by setting this parameter for each template. The smaller the number set as the order, the higher up the template appears in the list.

## Variables

Does not set any variables of its own.

## Related Tags

*   [templates](../templates.html)
