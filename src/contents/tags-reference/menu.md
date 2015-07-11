---
title: menu
category: tag
template: default.html
---

# menu

The **menu** tag is used to quickly generate the HTML markup representing the nested-pages of a site in the form of a dropdown menu.

Please see [**Core Concepts - Nested Pages**](../../concepts/nested-pages-aka-menu-maker.html) for details about nested-pages.

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


*   menu\_class
*   menu\_id
*   first\_class
*   last\_class,
*   no\_selected
*   selected\_class
*   no\_active\_trail
*   active\_trail\_class
*   list\_type

To illustrate the use of 'menu' tag, we'll use the same sample hierarchy of elements that we used in the '[folders](../../concepts/using-folders.html)' section. The difference being that in this case the elements represent pages instead of folders.

```
menu.php
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

### masterpage

This parameter is used to specify the template behind the nested-pages tree used to create the menu.<br/>
If left empty, the template of the currently executing page is assumed (which is unlikely to be correct as you'll usually want to display the menu on all sections (templates) of your site - typically by using '[embed](../embed.html)' tag).

```
<cms:menu masterpage='menu.php'/>
```

### depth

This parameter can be set to specify the maximum level in hierarchy (i.e. depth) that will be displayed in the menu.<br/>
This can be used, for example, to list only the top-level pages in the tree by setting the depth to 1\. A depth of 0 means unlimited depth.

```
<cms:menu masterpage='menu.php' depth='1' />
```

Output:

```
* World News
* Sports News
* Music News
* Entertainment News
```

### orderby

By default the menu-items get displayed in the order they are arranged in the admin-panel.<br/>
This parameter can be set to order them according to the following criteria - name, title, id.

```
<cms:menu masterpage='menu.php' depth='2' orderby='title' />
```

Output:

```
* Entertainment News
* Music News
* Sports News
* World News
      o Asian News
      o North American News
```

### order

Can be set to specify whether the menu-items are ordered in the ascending order or in descending order.<br/>
Valid values are 'asc' and 'desc'. Default is 'asc'.

```
<cms:menu masterpage='menu.php' depth='2' orderby='title' order='desc' />
```

Output:

```
* World News
      o North American News
      o Asian News
* Sports News
* Music News
* Entertainment News
```

### exclude

Pages can be excluded from the menu by specifying their names using this parameter.<br/>
If an excluded page has children, they are excluded too.<br/>
If multiple pages are to be excluded, separate them using comma.

```
<cms:menu masterpage='menu.php' exclude='united-states-news, china-news' />
```

Output:

```
* World News
      o North American News
      o Asian News
            + Japan News
* Sports News
* Music News
* Entertainment News
```

### ignore_show_in_menu

The 'Advanced Settings' of each nested-page has a checkbox labeled 'Show in menu'.<br/>
If that is unchecked, the page (an all its child pages) is not included by default in the menu.<br/>
You can override this by setting 'ignore\_show\_in\_menu' parameter to '1'.

```
<cms:menu masterpage='menu.php' ignore_show_in_menu='1' />
```

### root

Only a sub-section of the nested-pages tree can be displayed in the menu by specifying the name of a nested-page as this parameter.<br/>
The nested-page specified as the root is displayed along with all its children (compare with 'childof' parameter below where only the children are displayed).

```
<cms:menu masterpage='menu.php' root='united-states-news' />
```

Output:

```
* United States News
      o Ohio News
      o Nevada News
```

### childof

Only a sub-section of the nested-pages tree can be displayed in the menu by specifying the name of a nested-page as this parameter.<br/>
Only the children of the nested-page specified are displayed (compare with 'root' parameter above where the specified nested-page is also included in the display).

<p class="notice">If both 'childof' and 'root' are set, the 'root' parameter gets precedence.</p>

```
<cms:menu masterpage='menu.php' childof='united-states-news' />
```

Output:

```
* Ohio News
* Nevada News
```

<div class="notice">
    <h4 id="dynamic-menu">Dynamic Menu</h4>
    <br/>
    Occasionally, you'll come across sites where there is more than one menu on a single page with each of the discrete menus being inter-dependant.<br/>
    Thus we could have, for example, a top menu that shows only the top level pages of the site while another menu in the sidebar shows only the pages that occur immediately below the page currently selected in the top menu. There could be yet another menu in the footer that shows the pages below the page selected (if any) in the sidebar menu.<br/>
    The sidebar and the footer menu in the case above are examples of dynamic menus because their 'root' keeps on dynamically changing depending on the current page being visited.<br/>
    <br/>
    To help easily create such menus the 'childof' and 'root' parameter accept some special keywords. At runtime, the 'menu' tag dynamically calculates their values taking into consideration the current page.<br/>
    <br/>
    The special keywords are -<br/>
    **@n** (where n is a number starting from 1 e.g. @1, @2 etc.)<br/>
    <br/>
    By setting either the 'childof' and 'root' parameter to '@n', we ask Couch to use as the 'root' or 'childof' the page that is parent number 'n' of the current page being visited.<br/>
    <br/>
    For example -<br/>
    <br/>
    ```
<cms:menu masterpage='menu.php' root='@1' />
    ```
    In the snippet above we are instructing Couch to find out all the parents of the current page and then use the top most parent (first parent) as the value for the 'root' parameter.<br/>
    Thus, if the page being visited was<br/>
    'Nevada News' (http&#58;//www.yoursite.com/world-news/north-american-news/united-states-news/nevada-news/)<br/>
    the first parent would be 'world-news' and that is the value that would be used as the 'root' parameter.<br/>
    Whereas, in the following snippet<br/>
    <br/>
    ```
<cms:menu masterpage='menu.php' root='@2' />
    ```
    the value used for the 'root' parameter would be 'north-american-news' as that is the second parent of the current page.<br/>
    <br/>
    **@current**<br/>
    <br/>
    By setting either the 'childof' and 'root' parameter to '@current', we ask Couch to use as the 'root' or 'childof' the current page itself that is being visited.<br/>
    <br/>
    For example -<br/>
    <br/>
    ```
<cms:menu masterpage='menu.php' root='@current' />
    ```
    In the snippet above, if the page being visited was<br/>
    'North American News' (http&#58;//www.yoursite.com/world-news/north-american-news/)<br/>
    the value used for the 'root' parameter would be 'north-american-news'.<br/>
    <br/>
    **@current-n** (where n is a number starting from 1 e.g. @current-1, @current-2 etc.)<br/>
    <br/>
    By setting either the 'childof' and 'root' parameter to '@current-n', we ask Couch to use as the 'root' or 'childof' the parent page that is 'n' level above the page being visited.<br/>
    <br/>
    For example -<br/>
    <br/>
    ```
<cms:menu masterpage='menu.php' root='@current-1' />
    ```
    In the snippet above, if the page being visited was<br/>
    'Nevada News' (http&#58;//www.yoursite.com/world-news/north-american-news/united-states-news/nevada-news/)<br/>
    the value used for the 'root' parameter would be 'united-states-news' while for the following snippet<br/>
    <br/>
    ```
<cms:menu masterpage='menu.php' root='@current-2' />
    ```
    the value used would be 'north-american-news'.<br/>
    <br/>
    Using these special keywords some very complex menu can be easily created without involving any programming.
</div>

<br/>

### list_type

By default the HTML list element used to create the menu is &lt;UL&gt;.<br/>
It can be set to &lt;OL&gt; but using this parameter.

```
<cms:menu masterpage='menu.php' list_type='ol' />
```

### menu_class

This parameter can be used to add class names to the outermost list container (&lt;UL&gt; or &lt;OL&gt;) of the menu.<br/>
This is useful for styling the menu using CSS.

```
<cms:menu masterpage='menu.php' menu_class='sf-menu' />
```

```
<cms:menu masterpage='menu.php' menu_class='sf-menu sf-navbar' />
```

Notice that in the second example we are applying two classes to the menu.

### menu_id

This parameter can be used to apply an ID to the outermost list container (&lt;UL&gt; or &lt;OL&gt;) of the menu.<br/>
This is useful for styling the menu using CSS.

```
<cms:menu masterpage='menu.php' menu_id='top-menu' />
```

### first_class

The default behavior of the menu tag is to apply a special class 'first' to the very first menu-item at each level.<br/>
This is useful for styling the menu using CSS.<br/>
A different class name can be set by using this parameter.

```
<cms:menu masterpage='menu.php' first_class='begin' />
```

### last_class

The default behavior of the menu tag is to apply a special class 'last' to the last menu-item at each level.<br/>
This is useful for styling the menu using CSS.<br/>
A different class name can be set by using this parameter.

```
<cms:menu masterpage='menu.php' first_class='begin' last_class='end' />
```

### no_selected

The default behavior of the menu tag is to apply a special class 'current' (can be changed using the 'selected\_class' parameter) to the menu-item that matches the page being visited. This behavior can be turned off by setting the 'no\_selected' parameter to '1'.

```
<cms:menu masterpage='menu.php' no_selected='1' />
```

### selected_class

The default behavior of the menu tag is to apply a special class 'current' to the menu-item that matches the page being visited.<br/>
A different class name can be set by using this parameter.

```
<cms:menu masterpage='menu.php' selected_class='selected' />
```

### no_active_trail

The default behavior of the menu tag is to apply a special class 'active' to all the menu-items leading up to (and including) the menu-item that matches the current page - thus marking out an 'active-trail' that can be used for CSS styling.<br/>
This behavior can be turned off by setting the 'no\_active\_trail' parameter to '1'.

```
<cms:menu masterpage='menu.php' no_active_trail='1' />
```

### active_trail_class

The default behavior of the menu tag is to apply a special class 'active' to all the menu-items leading up to (and including) the menu-item that matches the current page - thus marking out an 'active-trail' that can be used for CSS styling.<br/>
A different class name can be set by using this parameter.

```
<cms:menu masterpage='menu.php' active_trail_class='selected-parent' />
```

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [nested\_pages](../nested_pages.html)
*   [nested\_crumbs](../nested_crumbs.html)
