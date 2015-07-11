---
title: comments
category: tag
template: default.html
---

# comments

Please see [**Core Concepts - Comments**](../../concepts/using-comments.html) for a full discussion of the Comments tag.

## Parameters

*   masterpage
*   page\_id
*   page\_name
*   limit
*   paginate
*   offset
*   order

Normally _comments_ tag will fetch all the available approved comments.<br/>
It can be constrained into fetching comments from only certain pages by setting the _masterpage_, _page\_id_ and _page\_name_ parameters.

### masterpage

```
<cms:comments masterpage='blog.php'></cms:comments>
```

Fetch comments of only the pages that have been cloned out of blog.php.

```
<cms:comments masterpage='blog.php, testimonial.php'></cms:comments>
```

Fetch comments of only the pages that have been cloned out of blog.php or testimonial.php.

```
<cms:comments masterpage='NOT blog.php, testimonial.php'></cms:comments>
```

Fetch comments of all the pages except those that have been cloned out of blog.php or testimonial.php.

### page_id

```
<cms:comments page_id='13'></cms:comments>
```

Fetch comments of only the page with the id of '13'.

```
<cms:comments page_id='13, 17'></cms:comments>
```

Fetch comments of only the pages that have an id of '13' or '17'.

```
<cms:comments page_id='NOT 13, 17'></cms:comments>
```

Fetch comments of all the pages except the pages that have an id of '13' or '17'.

### page_name

```
<cms:comments page_name='my_first_entry'></cms:comments>
```

Fetch comments of only the page named 'my\_first\_entry'.

```
<cms:comments page_name='my_first_entry, my_another_entry'></cms:comments>
```

Fetch comments of only the pages named 'my\_first\_entry' or 'my\_another\_entry'.

```
<cms:comments page_name='NOT my_first_entry, my_another_entry'></cms:comments>
```

Fetch comments of all the pages except the pages named 'my\_first\_entry' or 'my\_another\_entry'.

### limit

```
<cms:comments limit='5'></cms:comments>
```

Fetch five approved comments. (Since 'order' is not specified, the default value of 'desc' will be used and the latest 5 comments will be fetched.

### paginate

```
<cms:comments limit='5' paginate='1'></cms:comments>
```

Fetch ALL approved comments but show only 5 at one time. To move to the next 5 or the previous 5 comments, pagination code has to be used (see [**paginator**](../paginator.html)).

### offset

```
<cms:comments limit='5' offset='2'></cms:comments>
```

Fetch five approved comments after skipping the first two.

### order

Comments are always ordered by their dates. The order in which they are displayed can be made either ascending or descending by setting this parameter to 'asc' or 'desc' respectively. If omitted, 'desc' (latest first) is assumed.

```
<cms:comments order='asc'></cms:comments>
```

Fetch all approved comments and order them in ascending order (oldest first) of their dates.

## Variables

*   k\_comment\_id
*   k\_comment
*   k\_comment\_author\_id
*   k\_comment\_author
*   k\_comment\_author\_email
*   k\_comment\_author\_website
*   k\_comment\_date
*   k\_comment\_link
*   k\_comment\_page\_id
*   k\_comment\_page\_title
*   k\_comment\_page\_name
*   k\_comment\_template\_name

In addition to these variables, the pagination related variables that describe the current status of the loop are also set. Please see [**paginator**](../paginator.html) for details.

## Related Tags

*   [process\_comment](../process_comment.html)
*   [pages](../pages.html)
*   [folders](../folders.html)
*   [archives](../archives.html)
*   [templates](../templates.html)
