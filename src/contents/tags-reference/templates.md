---
title: templates
category: tag
template: default.html
---

# templates

The **templates** tag can be used to enumerate all the templates that are managed by Couch.

Example -

```
<cms:templates show_hidden='1' order='desc'>
    <cms:dump />
</cms:templates>
```

## Parameters

*   show\_hidden
*   orderby
*   order

### show_hidden

By default the hidden templates are not enumerated. This can be changed by setting this parameter to 1\.

### orderby

The templates can be ordered by one of these attributes - _name_, _title_ or _order_. The default is _order_.

### order

Can be set to either _asc_ or _desc_.

## Variables

*   k\_total
*   k\_template\_id
*   k\_template\_name
*   k\_template\_title
*   k\_template\_desc
*   k\_template\_access\_level
*   k\_template\_is\_clonable
*   k\_template\_is\_commentable
*   k\_template\_is\_executable
*   k\_template\_is\_hidden
*   k\_template\_order
*   k\_template\_link

## Related Tags

*   [pages](../pages.html)
*   [folders](../folders.html)
*   [archives](../archives.html)
*   [comments](../comments.html)
