---
title: type = 'relation'
category: tag
subCategory: editable
template: default.html
---

# type = 'relation'

Please see [**Documentation - Core concepts - Relationships**](../../../../concepts/relationships.html) for a detailed explanation of this type of region.

## Parameters

*   name
*   masterpage
*   has
*   reverse\_has
*   folder
*   include\_subfolders
*   orderby
*   order_dir

### name

Mandatory. Uniquely identifies an editable region.

### masterpage

This parameter specifies the template the cloned pages of which will be listed in this region.<br/>
This represents the 'other' end of the relationship.

```
<cms:editable type='relation' name='artist_albums' masterpage='albums.php' />
```

In the example above, the editable region will list all cloned pages of 'albums.php'

### has

This parameter specifies with how many of the listed pages can the page being edited be related to.<br/>
Acceptable values are 'one' and 'many' (where 'many' is the default).<br/>
If 'one' is specified, the listing is shown in a drop-drop allowing only a single selection, Whereas if 'many' is used, the listing gets shown as a series of check-boxes to allow multiple-selections.

### reverse_has

This parameter specifies with how many pages of the current template can the listed pages be related to.<br/>
Acceptable values are 'one' and 'many' (where 'many' is the default).<br/>
If 'one' is specified, the listing shows only the pages that have not yet been associated with any other page.

### folder

This parameter can be used to list only the page belonging to a particular folder (or folders).<br/>
Also supports negation (where pages of the specified folder(s) will be skipped).

```
<cms:editable type='relation' name='artist_albums' masterpage='albums.php' folder='classical' />
```

The example above will list only pages belonging to 'classical' folder (and its sub-folders).

```
<cms:editable type='relation' name='artist_albums' masterpage='albums.php' folder='classical, jazz' />
```

The example above will list only pages belonging to either 'classical' or 'jazz' folders (or their sub-folders).

```
<cms:editable type='relation' name='artist_albums' masterpage='albums.php' folder='NOT classical, jazz' />
```

The example above will list all pages of the template except those belonging to 'classical' or 'jazz' folders (and their sub-folders).

### include_subfolders

The default value of this parameter is '1' and this causes the 'folder' parameter mentioned above to list pages belonging to the specified folder AND all sub-folders in the hierarchy below it.<br/>
Setting 'include\_subfolders' to '0' will make this tag list only pages that are located directly within the specified folder.

```
<cms:editable type='relation' name='artist_albums' masterpage='albums.php' folder='classical' include_subfolders='1' />
```

The example above will list only pages belonging directly to 'classical' folder.

### orderby

The pages being listed can be sorted according to the following fields

*   publish\_date
*   page\_title
*   page\_name

If unspecified, 'publish\_date' is used as the default value.

### order_dir

This parameter sets the sort direction of the listed pages.<br/>
The acceptable values are

*   desc
*   asc

If unspecified, 'desc' is used as the default.

## Related Tags

*   [editable](../../../editable.html)
*   [editable (text)](../../text.html)
*   [editable (password)](../../password.html)
*   [editable (textarea)](../../textarea.html)
*   [editable (richtext)](../../richtext.html)
*   [editable (image)](../../image.html)
*   [editable (thumbnail)](../../thumbnail.html)
*   [editable (file)](../../file.html)
*   [editable (radio)](../../radio.html)
*   [editable (checkbox)](../../checkbox.html)
*   [editable (dropdown)](../../dropdown.html)
*   [editable (group)](../../group.html)
*   [editable (message)](../../message.html)
*   [editable (nicedit)](../../nicedit.html)
