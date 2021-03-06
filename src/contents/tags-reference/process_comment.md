---
title: process_comment
category: tag
template: default.html
---

# process_comment

The **process\_comment** tag is meant to be used at the successful submission of a comments form.<br/>
It simply tries to insert the submitted comment into the database. If it is successful in inserting the comment, the tag sets the *k\_process\_comment\_success* variable otherwise it sets the *k\_process\_comment\_error* variable in the context of its parent tag.

Please see [**Core Concepts - Comments**](../../concepts/using-comments.html) for an example of this tag's usage.

## Parameters

This tag does not accept any parameters.

## Variables

This tag is self-closing and does not set any variables of its own except the *k\_process\_comment\_success* and *k\_process\_comment\_error* variables that it sets in the context of the calling tag to signal the result of its operation.

## Related Tags

*   [comments](../comments.html)
