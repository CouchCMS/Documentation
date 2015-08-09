---
title: days
category: tag
template: default.html
---

# days

The **days** tag works only within the **weeks** tag and enumerates all the seven days of each week.

Please see [**Core Concepts - Events Calendar**](../../concepts/events-calendar.html) for a working example of this tag.

## Parameters

*   pad\_with\_zeroes

### pad_with_zeroes

If set to '1' will pad all single digit days in variable *k\_day* with a leading zero.

## Variables

*   k\_date
*   k\_day
*   k\_month
*   k\_year
*   k\_day\_of\_week
*   k\_position
*   k\_count\_entries
*   k\_timeline\_position

### k_date

Date of the day. e.g. 2010-10-31

### k_day

Number representing the day - ranges from 1 to 31

### k_month

Number representing the month - ranges from 1 - 12

### k_year

The year. e.g. 2010

### k_day_of_week

Number representing the week - ranges from 0 (Sun) to 6 (Sat)

### k_position

A calendar grid can contain days that belong to the month being shown as well as the previous and the next month. Depending on which month a day belongs to, its position is denoted by this parameter as one of these three values -

*   previous\_month
*   current\_month
*   next\_month

### k_count_entries

The count of pages published on this day.

### k_timeline_position

Denotes the position of the day in timelime (relative to today). Can be one of these three values -

*   past
*   present
*   future

## Related Tags

*   [calendar](../calendar.html)
*   [weeks](../weeks.html)
*   [entries](../entries.html)
