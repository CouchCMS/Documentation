---
title: get_custom_field
category: tag
template: default.html
---

# get_custom_field

The **get\_custom\_field** tag can be used to fetch the value contained within any editable region defined within any template.

It is an alternative method to using the **pages** tag and is well suited for fetching values from single fields (as opposed to the **pages** tag that fetches values of all the editable regions in a page).

```
<cms:get_custom_field 'site_name' masterpage='globals.php' />
```

## Parameters

*   var
*   masterpage
*   page

### var

The name of the editable region the value of which is to be fetched.

### masterpage

The name of the template that defines the editable region. This parameter is mandatory.

### page

The name of the page that contains the editable region.<br/>
For non-clonable pages this parameter can be skipped.

```
<cms:get_custom_field var='content' masterpage='blog.php' page='my_test_page' />
```

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [show](../show.html)
*   [get](../get.html)
*   [set](../set.html)
*   [pages](../pages.html)
