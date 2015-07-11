---
title: Pagination
category: concept
template: default.html
---

# Pagination

[_**Pages**_](../../tags-reference/pages.html), [_**search**_](../../tags-reference/search.html) and [_**comments**_](../../tags-reference/comments.html) tags can fetch many more items than that set by the _limit_ parameter.<br/>
In such cases, it is normal to display the items in a paginated manner i.e. split across several pages with navigational buttons provided to access the pages.<br/>
These tags, apart from the variables set to describe the current item being iterated through, set several variables that provide information about the current status of the tag's loop. Many of these variables can be used to display the fetched items in a paginated fashion.

To explain these variables, we'll use the following snippet -

```
<cms:pages masterpage='blog.php' limit='10' paginate='1'>
    <!-- All the variables can be accessed here -->
</cms:pages>
```

<p class="notice">Although we are using the example of a [_**pages**_](../../tags-reference/pages.html) tag to explain pagination, please keep in mind that the following discussion holds equally good for the [_**search**_](../../tags-reference/search.html) and [_**comments**_](../../tags-reference/comments.html) tags as well.</p>

Suppose a total of 23 records have been fetched by the given snippet.<br/>
Since the limit has been set to 10, splitting up the total in chunks of 10 records will result in requiring 3 pages to display all the records.

The following variables get set as the tag iterates through each item fetched -

#### k_total_records

Total records fetched - 23 in our example

#### k_count

Will range from 1 to 10 on each page. Thus it points to the relative position of the current record on the page.<br/>
Can be changed by setting 'startcount' parameter.<br/>
Thus if 'startcount' is set to 0, _k\_count_ will range from 0-9 on each page.

#### k_record_from

First record on page. Thus it will be 1 for page 1, 11 for page 2 and 21 for page 3\.<br/>
Can be changed by setting 'startcount' parameter.<br/>
Thus if 'startcount' is set to 0, _k\_record\_from_ will be 0 for page 1, 10 for page 2 and 20 for page 3\.

#### k_current_record

Will range from 1-10 for page 1, 11-20 for page 2 and 21-23 for page 3\.<br/>
Thus it always points to the absolute position of the current record.<br/>
Can be changed by setting 'startcount' parameter.<br/>
Thus if 'startcount' is set to 0, _k\_current\_record_ will range from 0-9 for page 1, 10-19 for page 2 and 20 to 22 for page 3\.

#### k_record_to

Last record on page. Thus it will be 10 for page 1, 20 for page 2 and 23 for page 3\.<br/>
Can be changed by setting 'startcount' parameter.<br/>
Thus if 'startcount' is set to 0, _k\_record\_to_ will be 9 for page 1, 19 for page 2 and 22 for page 3\.

#### k_total_pages

Total pages - 3 in our example.

#### k_current_page

Current page number - will change from 1 to 3 in our example.

#### k_paginated_top

'Pages' tag loops through 10 records on each page in our example.<br/>
_k\_paginated\_top_ gets set for the first record of each page.<br/>
It can be used to output something at the very start of the loop.

#### k_paginated_bottom

'Pages' tag loops through 10 records on each page in our example.<br/>
_k\_paginated\_bottom_ gets set for the last record of each page.<br/>
It can be used to output something at the very end of the loop.

#### k_paginator_required

When the total number of pages fetched exceeds the maximum set by the 'limit' parameter,<br/>
(and 'paginate' parameter is also set), the fetched set of pages is split across pages and<br/>
_k\_paginator\_required_ gets set to indicate this.<br/>
It can be used to figure out when to display text that makes sense only in such situation<br/>
for example - the 'next' and 'forward' links or the 'Page 1 of 3'.

#### k_paginate_link_next

Link to the next page (if any)

#### k_paginate_link_prev

Link to the previous page (if any)

### EXAMPLES:

```
<cms:pages masterpage='blog.php' limit='10' paginate='1'>
    <cms:if k_paginated_top>
        <cms:if k_paginator_required >
            Page <cms:show k_current_page /> of <cms:show k_total_pages /><br>
        </cms:if>
        <cms:show k_total_records /> Pages Found.
        Displaying: <cms:show k_record_from />-<cms:show k_record_to />
    </cms:if>

    <!-- All the page variables can be accessed here -->

    <cms:if k_paginated_bottom >
        <cms:if k_paginate_link_prev >
            <a href="<cms:show k_paginate_link_prev />">prev</a>
        </cms:if>
        <cms:if k_paginate_link_next >
            <a href="<cms:show k_paginate_link_next />">next</a>
        </cms:if>
    </cms:if>
</cms:pages>
```

Instead of manually coding the 'next' and 'prev' buttons for navigating through the pages, the [_**paginator**_](../../tags-reference/paginator.html) tag can be used instead -

```
<cms:pages masterpage='blog.php' limit='10' paginate='1'>
    <cms:if k_paginated_top>
        <cms:if k_paginator_required >
            Page <cms:show k_current_page /> of <cms:show k_total_pages /><br>
        </cms:if>
        <cms:show k_total_records /> Pages Found.
        Displaying: <cms:show k_record_from />-<cms:show k_record_to />
    </cms:if>

    <!-- All the page variables can be accessed here -->

    <cms:paginator />
</cms:pages>
```

If the [_**paginator**_](../../tags-reference/paginator.html) tag is used to generate the navigation buttons, the following CSS code may be used to properly style the buttons -

```
/*
    Paginator -
    Source: http://www.strangerstudios.com/sandbox/pagination/diggstyle.php (strangerstudios.com)
*/

div.pagination {
    padding: 3px;
    margin: 3px;
}

div.pagination a {
    padding: 2px 5px 2px 5px;
    margin: 2px;
    border: 1px solid #AAAADD;
    zoom: 100%;
    text-decoration: none; /* no underline */
    color: #000099;
}
div.pagination a:hover, div.pagination a:active {
    border: 1px solid #000099;

    color: #000;
}
div.pagination span.page_current {
    padding: 2px 5px 2px 5px;
    margin: 2px;
    border: 1px solid #000099;

    * zoom: 100%;

    font-weight: bold;
    background-color: #000099;
    color: #FFF;
}
div.pagination span.page_disabled {
    padding: 2px 5px 2px 5px;
    margin: 2px;
    border: 1px solid #EEE;

    * zoom: 100%;

    color: #DDD;
}

* span.elipsis {zoom:100%}
```

The following is a sample output of the [_**paginator**_](../../tags-reference/paginator.html) tag

![](../../assets/img/contents/pagination.png)
