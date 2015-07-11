---
title: nested_pages
category: tag
template: default.html
---

# nested_pages

The **nested\_pages** tag is used to list [nested-pages](../../concepts/nested-pages-aka-menu-maker.html).

Since the primary purpose of nested-pages (as explained in the [Core Concepts](../../concepts/nested-pages-aka-menu-maker.html)) is to create a hierarchy of pages that can be represented as the site's menu, you'll find that usually the '[menu](../menu.html)' tag will suffice for the purpose of creating a menu.<br/>
However, sometimes you'll need more control over the generated menu than what the '[menu](../menu.html)' tag offers.<br/>
For such cases, the 'nested\_pages' tag can be used as it is a lower level tag (in fact, the '[menu](../menu.html)' tag uses the 'nested\_pages' internally).

To illustrate the use of 'nested\_pages', we'll use the same sample hierarchy of elements that we used in the '[folders](../../concepts/using-folders.html)' section. The difference being that in this case the elements represent pages instead of folders.<br/>
We'll assume that a template named 'index.php' has been used to create the nested-pages.

```
index.php
    |---World News
    |   |---North American News
    |   |   |---United States News
    |   |       |---Ohio News
    |   |       |---Nevada News
    |   |---Asian News
    |       |---China News
    |       |---Japan News
    |---Sports News
    |---Music News
    |---Entertainment News
```

The simplest way to list the nested-pages would be as follows -

```
<cms:nested_pages masterpage='index.php'>
   <a href="<cms:show k_nestedpage_link />"><cms:show k_nestedpage_title /></a><br />
</cms:nested_pages>
```

The output -

```
World News
North American News
United States News
Ohio News
Nevada News
Asian News
China News
Japan News
Sports News
Music News
Entertainment News
```

Notice how the hierarchical relationship between the pages has been preserved.

As is the norm with other similar tags in Couch, the 'nested\_pages' tag too, as it iterates through the pages within the tree, makes available all the information pertaining the page it is currently on by setting various variables.<br/>
Place a _&lt;cms:dump /&gt;_ statement inside the loop and you'll see that Couch provides all the information that was inputted in the admin-section for each nested-page.

```
<cms:nested_pages masterpage='index.php'>
   <cms:dump />
   <a href="<cms:show k_nestedpage_link />"><cms:show k_nestedpage_title /></a><br />
</cms:nested_pages>
```

These, for example, are the variables that get set for page 'United States News' -

```
* k_level: 2
* k_nestedpage_id: 1595
* k_nestedpage_name: united-states-news
* k_nestedpage_title: United States News
* k_nestedpage_is_active: 1
* k_nestedpage_comments_count: 0
* k_nestedpage_parent_id: 1594
* k_nestedpage_weight: 1
* k_show_in_menu: 1
* k_menu_text:
* k_is_pointer: 0
* k_pointer_link:
* k_open_external: 0
* k_masquerades: 0
* k_is_active: 1
* k_is_current: 1
* k_immediate_children: 2
* k_total_children: 2
* k_nestedpage_link: http://www.yourdomain.com/?p=1595
* k_menu_link: http://www.yourdomain.com/?p=1595
* k_menu_title: United States News
```

As you can see, all the information that would be needed to create manually a menu markup is available.<br/>
Let us use is to create one.

### Creating menu using 'nested_pages' tag

A menu is normally created using nested &lt;UL&gt;/&lt;OL&gt; and &lt;LI&gt; elements. To make the task of doing so easy, the 'nested\_pages' tag, like the '[folders](../folders.html)' tag, supports the 'extended\_info' parameter. Setting the 'extended\_info' parameter to '1' makes the 'nested\_pages' tag provide additional information that can be used to output the closing and opening &lt;UL&gt;/&lt;OL&gt; and &lt;LI&gt; tags without any pain.

```
<cms:nested_pages masterpage='index.php' extended_info='1' >
   <cms:if k_level_start ><ul></cms:if>
   <cms:if k_element_start ><li>
      <cms:show k_nestedpage_title />
   </cms:if>
   <cms:if k_element_end ></li></cms:if>
   <cms:if k_level_end ></ul></cms:if>
</cms:nested_pages>
```

Output -

```
<ul>
    <li>
        Asian News
        <ul>
            <li>China News</li>
            <li>Japan News</li>
        </ul>
    </li>
    <li>
        North American News
        <ul>
            <li>
                United States News
                <ul>
                    <li>Nevada News</li>
                    <li>Ohio News</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
```

Following is a complete example that makes use of the variables mentioned before to create a functioning menu -

```
<cms:nested_pages masterpage='index.php' extended_info='1' >
   <cms:if k_level_start >
      <cms:if k_level='0'>
          <ul class="my-menu-class-1 my-menu-class-2" id="my-menu-id">
      <cms:else />
          <ul>
      </cms:if>
   </cms:if>

   <cms:if k_element_start >
      <li id="item-<cms:show k_nestedpage_name />" class="level-<cms:show k_level/><cms:if k_total_children> has-submenu</cms:if><cms:if k_first_child> first</cms:if><cms:if k_last_child> last</cms:if><cms:if k_is_active> active</cms:if><cms:if k_is_current> current</cms:if>">
      <a href="<cms:show k_menu_link />"><cms:show k_menu_title /></a>
   </cms:if>

   <cms:if k_element_end ></li></cms:if>
   <cms:if k_level_end ></ul></cms:if>
</cms:nested_pages>
```

The example shown above is equivalent to the following using '[menu](../menu.html)' tag -

```
<cms:menu masterpage='index.php' menu_class='my-menu-class-1 my-menu-class-2' menu_id='my-menu-id' first_class='first' last_class='last' active_trail_class='active' selected_class='current' />
```

### Creating a paginated listing using 'nested_pages' tag

Apart from being used to create a menu, the 'nested\_pages' tag may also be used to create a conventional listing of pages, complete with pagination etc., the way it is usually done using the '[pages](../pages.html)' tag with normal (i.e. non nestable) pages.

If you are familiar with the '[pages](../pages.html)' tag, the following snippet will seem familiar -

```
<cms:nested_pages masterpage='index.php' extended_info='1' paginate='1' limit='5' >
   <cms:if k_paginated_top>
     <cms:if k_paginator_required >
         Page <cms:show k_current_page /> of <cms:show k_total_pages /><br>
     </cms:if>
     <cms:show k_total_records /> records Found.
     Displaying: <cms:show k_record_from />-<cms:show k_record_to />
     <br /><hr />
   </cms:if>

    <a href="<cms:show k_nestedpage_link />"><cms:show k_nestedpage_title /></a><br />

    <cms:paginator />

</cms:nested_pages>
```

Output -

```
Page 1 of 3
11 records Found. Displaying: 1-5

World News
North American News
United States News
Ohio News
Nevada News

« prev 1 2 3 next »
```

Some points to note -

1.  With 'paginate' set to '1', the 'extended\_info' is automatically turned off - i.e. only the conventional linear listing is possible.
2.  For performance reasons, data from the custom fields (i.e. the editable regions defined for the nested-pages template) is not made available by default. You can set the 'include\_custom\_fields' parameter to '1' to make the custom fields available.

<p class="notice">
    **IMPORTANT:** Since, as you just saw, the nested pages can be listed in the conventional manner (like the one produced by the 'pages' tag), it is perfectly possible to create entire sections of a website using nested-pages instead of the regular cloned pages.<br/>
    One feature of the nested-pages that might make doing so more desirable is the ability to set their display order from the admin panel using simple up-down arrows (for regular pages this usually entailed tweaking their publish-dates).<br/>
    <br/>
    However, it is necessary to emphasize here that the nested-pages have been created (and hence optimized) for creating loose stand-alone pages in a site. Such pages, as opposed to the cloned pages within discrete sections like blog or portfolio, are not likely to be in very large numbers.<br/>
    You can definitely have hundreds of them, but if the number of pages is likely to reach into the thousands please use the regular cloned pages as they are optimized for handling larger numbers.
</p>

## Parameters

*   masterpage
*   depth
*   orderby
*   order
*   exclude
*   ignore\_show\_in\_menu
*   root
*   childof
*   extended\_info
*   include\_custom\_fields
*   paginate
*   limit
*   offset
*   startcount

### masterpage

This parameter is used to specify the template behind the nested-pages tree.<br/>
If left empty, the template of the currently executing page is assumed.

### depth

This parameter can be set to specify the maximum level in hierarchy (i.e. depth) that will be listed by this tag.<br/>
This can be used, for example, to list only the top-level pages in the tree by setting the depth to 1\. A depth of 0 means unlimited depth.

### orderby

By default the pages are listed in the order they are arranged in the admin-panel.<br/>
This order can be changed by using the 'orderby' parameter. Valid values are: name, title, id.

### order

Can be set to specify whether the pages are ordered in the ascending order or in descending order.<br/>
Valid values are asc and desc. Default is asc.

### exclude

Pages can be excluded from being listed by specifying their names using this parameter.<br/>
If an excluded page has children, they are excluded too.<br/>
If multiple pages are to be excluded, separate their names using comma.

### ignore_show_in_menu

The 'Advanced Settings' of each nested-page has a checkbox labeled 'Show in menu'.<br/>
If that is unchecked, the page (an all its child pages) is not included by default in the listing.<br/>
You can override this by setting 'ignore\_show\_in\_menu' parameter to '1'

### root

Only a sub-section of the nested-pages tree can be listed by specifying the name of a page as this parameter.<br/>
The page specified as the root is displayed along with all its children (compare with 'childof' parameter below where only the children are displayed).

### childof

Only a sub-section of the nested-pages tree can be listed by specifying the name of a page as this parameter.<br/>
Only the children of the page specified are displayed (compare with 'root' parameter above where the specified page is also included in the display).

<p class="notice">If both 'childof' and 'root' are set, the 'root' parameter gets precedence.</p>

### extended_info

If this parameter is set, additional variables get set to report the changes in hierarchy encountered by the nested\_pages tag, as it traverses through the tree. Please see the Variables section below.

### include_custom_fields

By default, in a bid to enhance performance, the custom-field's data (i.e. data within the editable regions) are not made available as the nested\_pages tag traverses through the pages in the tree.<br/>
If the 'include\_custom\_fields' is set to '1', all the values within the editable regions of each page are made available as variables named after the regions.

### paginate

To list the nested-pages in conventional manner (i.e. the way the 'pages' tag lists the regular cloned pages), set this parameter to '1'.<br/>
One the 'paginate' parameter is set -<br/>
**a.** 'extended\_info' is automatically turned off so information about the changes in hierarchy levels in no longer available.<br/>
**b.** All the variables that help in creating the pagination buttons become available (see [Pagination](../../concepts/pagination.html))<br/>
**c.** The 'limit', 'offset' and 'startcount' parameters described below become effective.

### limit

This parameter takes effect only when the 'paginate' parameter is set to '1'.<br/>
It can be used to limit the number of pages listed before the pagination buttons leading to the next/prev set of pages appear.

### offset

This parameter takes effect only when the 'paginate' parameter is set to '1'.<br/>
it can be used to skip any number of pages before beginning the listing.

### startcount

This parameter takes effect only when the 'paginate' parameter is set to '1'.<br/>
The k\_count, k\_record\_from, k\_current\_record and k\_record\_to variables (see [Pagination](../../concepts/pagination.html)) start by default from '1'. This can be changed to any other value by setting this parameter.

## Variables

The following variables are set to provide information about each nested-page that gets enumerated -

*   k\_nestedpage\_id
*   k\_nestedpage\_name
*   k\_nestedpage\_title
*   k\_nestedpage\_is\_active
*   k\_nestedpage\_comments\_count
*   k\_nestedpage\_parent\_id
*   k\_nestedpage\_weight
*   k\_show\_in\_menu
*   k\_menu\_text:
*   k\_menu\_link
*   k\_menu\_title
*   k\_is\_pointer
*   k\_pointer\_link:
*   k\_open\_external
*   k\_masquerades
*   k\_is\_active
*   k\_is\_current
*   k\_immediate\_children
*   k\_total\_children
*   k\_first\_child
*   k\_last\_child
*   k\_nestedpage\_link

If the 'extended\_info' parameter is set to '1', the following variables also get set to indicate the current position in the hierarchy as this tag enumerates the pages -

*   k\_level\_start
*   k\_element\_start
*   k\_element\_end
*   k\_level\_end

If the 'include\_custom\_fields' parameter is set to '1', all the values within the editable regions of each page are made available as variables named after the regions.

If the 'paginate' parameter is set to '1', variables that help in creating the pagination buttons become available (see [Pagination](../../concepts/pagination.html))

## Related Tags

*   [pages](../pages.html)
*   [folders](../folders.html)
