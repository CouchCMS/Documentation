---
title: calendar
category: tag
template: default.html
---

# calendar

The **calendar** tag can be used to create a monthly calendar. It can be associated with a template to make it display cloned pages of the template as entries of the calendar.

The calendar tag works together with the **weeks**, **days** and **entries** tags to fulfill its functionality.<br/>
Please see [**Core Concepts - Events Calendar**](../../concepts/events-calendar.html) for a working example of this tag.

## Parameters

*   masterpage
*   date
*   week\_starts

Apart from these parameters, this tag also accepts all the arguments of the [**pages**](../pages.html) tag. This can be used to further refine the types of pages that are shown as entries of the calendar.

### masterpage

Setting this parameter to the name of a clonable template will cause the **entries** tag to fetch pages belonging to this template as entries of the day they are published on.

### date

This parameter sets the month that is displayed by the calendar. If skipped, the current date is shown.

### week_starts

This parameter sets the first day of the weeks as shown by the calendar.<br/>
It is a numeric value ranging from 0 (Sunday) to 6 (Saturday). If skipped, the default is 0 (Sunday).

## Variables

*   k\_count\_weeks
*   k\_calendar\_date
*   k\_calendar\_year
*   k\_calendar\_month
*   k\_next\_calendar\_date
*   k\_next\_calendar\_year
*   k\_next\_calendar\_month
*   k\_prev\_calendar\_date
*   k\_prev\_calendar\_year
*   k\_prev\_calendar\_month

## Related Tags

*   [weeks](../weeks.html)
*   [days](../days.html)
*   [entries](../entries.html)
