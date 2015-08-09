---
title: archives
category: tag
template: default.html
---

# archives

Please see [**Core Concepts - Archives**](../../concepts/using-archives.html) for an in-depth discussion of this tag.

## Parameters

*   masterpage
*   order
*   limit
*   start\_on
*   stop\_before
*   show\_future\_entries
*   type
*   startcount

### masterpage

The template to create the archives for. If skipped, the current executing page's template will be assumed.

### order

Can be set to either _asc_ or _desc_ for setting the sort order to ascending or descending.

### limit

Set this parameter to limit the number of archives listed.

### start_on

Can be set to list archives starting from this date.

### stop_before

Can be set not to list archives later than this date.

### show_future_entries

By default, the **archives** tag will ignore pages that have their publish date set to the future. This parameter can be set to '1' to change this behaviour.

### type

The type of the archives created - valid values are _yearly_, _monthly_ or _daily_. If skipped, _daily_ is assumed by default.

### startcount

As this tag enumerates the archives, it sets a variable named *k\_count* to the number of the current iteration. *k\_count* begins from '0' by default. It can be set to start from any other number by setting this parameter.

## Variables

*   k\_archive\_date
*   k\_next\_archive\_date
*   k\_archive\_link
*   k\_archive\_count
*   k\_count

Please see [**Core Concepts - Archives**](../../concepts/using-archives.html) for details of these variables.

## Related Tags

*   [pages](../pages.html)
*   [folders](../folders.html)
*   [templates](../templates.html)
*   [comments](../comments.html)
