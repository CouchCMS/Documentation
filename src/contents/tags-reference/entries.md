---
title: entries
category: tag
template: default.html
---

# entries

The **entries** tag is a special tag that works only within the **calendar** tag - specifically within the **days** tag present within the **calendar** tag.

This tag enumerates all the pages published on the day being enumerated by the **days** tag. The pages will belong to the template specified by the _masterpage_ parameter of the calendar tag.

Please see [**Core Concepts - Events Calendar**](../../concepts/events-calendar.html) for a working example of this tag in action.

## Parameters

*   limit
*   skip\_custom\_fields

### limit

This parameter limits the number of pages that this tag enumerates.

### skip_custom_fields

As it enumerates the fetched pages, by default this tag makes available all the variables associated with every page - this includes the editable regions too.<br/>
If you simply require to display the names and links of the pages, the values contained within the editable regions of the pages can be skipped from being fetched by setting this parameter. This will result in a performance boost.

## Variables

As this tag iterates through the pages, at each iteration it sets all the variables that one normally finds set when that page is accessed in a _page-view_ (see [**Variables available in Views**](../../concepts/variables-in-views.html)).

## Related Tags

*   [calendar](../calendar.html)
*   [weeks](../weeks.html)
*   [days](../days.html)
