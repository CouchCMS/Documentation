---
title: Listing Pages
category: concept
template: default.html
---

# Listing Pages

Couch has a powerful tag named [_**pages**_](../../tags-reference/pages.html) that can be used to list all pages belonging to a template.<br/>
For example -

```
<cms:pages masterpage='blog.php'>
     <!-- All the variables of each page cloned out of this template are available here -->
     <cms:show k_page_title /><br>
</cms:pages>
```

\- the snippet given above will fetch all pages cloned out of _blog.php_ template.<br/>
The _masterpage_ parameter stands for the template's name. If this parameter is omitted, the name of the current template (i.e. the template this snippet is placed in) will be used.

This tag iterates through each of the fetched page and makes available all the data associated with the page as variables. The variables are exactly the same as those made available had the page been accessed discretly via its URL (i.e. in its page-view).

[_**Pages**_](../../tags-reference/pages.html) tag supports a number of parameters that can be used to fine tune the actual pages that get fetched.<br/>
Please see the [**parameters**](../../tags-reference/pages.html#parameters) section for a comprehensive list.

### LISTING PAGES IN THE LIST-VIEWS (HOME-VIEW, FOLDER-VIEW AND ARCHIVE-VIEW)

As shown in the previous chapter, for clonable templates, Couch considers certain URLS as those meant for listing pages cloned out of the template being accessed.

For example:<br/>
_http&#58;//www.mysite.com/blog/_<br/>
\- is considered to be a **home-view** and a list to all the pages cloned out of _blog.php_ should be displayed in this view.

_http&#58;//www.mysite.com/blog/hobbies/_<br/>
\- is considered to be a **folder-view** and a list of all the pages cloned out of _blog.php_ that belong to 'hobbies' sub-folder should be displayed in this view.

_http&#58;//www.mysite.com/blog/2010/05/_<br/>
\- is considered to be an **archive-view** and a list of all the pages cloned out of _blog.php_ that have been published during the month of May in 2010 should be displayed in this view.

When a template is accessed using the URLs mentioned above, Couch recognizes the view and sets certain variables that can be used by you to list the pages as is expected for the particular view.<br/>
See: [**Variables available in views**](../variables-in-views.html).<br/>
It is ultimately upto you whether or not you choose to list pages in the expected manner.

### Handling home-view

The _k\_is\_home_ variable can be used to recognize this view and then the [_**pages**_](../../tags-reference/pages.html) tag can be used to list all pages cloned from the template being accessed.

```
<cms:if k_is_home >
    <cms:pages>
        <!-- All the variables of each page cloned out of this template are available here -->
    </cms:pages>
</cms:if>
```

### Handling folder-view

The _k\_is\_folder_ variable can be used to recognize this view. The _k\_folder\_name_ variable made available by Couch in this view can then be used as a parameter of the [_**pages**_](../../tags-reference/pages.html) tag to list pages belonging to that folder -

```
<cms:if k_is_folder >
    <cms:pages folder=k_folder_name include_subfolders='1' >
        <!-- All the variables of each page in this folder are available here -->
    </cms:pages>
</cms:if>
```

### Handling archive-view

The _k\_is\_archive_ can be used to recognize this view. In this view, Couch makes available the _k\_archive\_date_ and _k\_next\_archive\_date_ variables that denote the boundries of the archive's period. These two variables can then be used as parameters of the [_**pages**_](../../tags-reference/pages.html) tag to list pages belonging to that time period -

```
<cms:if k_is_archive >
    <cms:pages start_on=k_archive_date stop_before=k_next_archive_date >
        <!-- All the variables of each page belonging to this archive period are available here -->
    </cms:pages>
</cms:if>
```

### A unified way of handling all the listviews

The three list views can be handled separately if the way the pages and their contents are displayed differs between the views. However, if their is no difference in the way the list is displayed, the following is the preferred way of handling all the three list-views together -

```
<cms:if k_is_list >
    <cms:pages folder=k_folder_name include_subfolders='1' start_on=k_archive_date stop_before=k_next_archive_date >
        <!-- All the variables of each page belonging to this view are available here -->
    </cms:pages>
</cms:if>
```

<p class="success">The snippet given above can handle all the list-views because if the current view is a _home-view_, the _k\_folder\_name_, _k\_archive\_date_ and _k\_next\_archive\_date_ will not be set and hence these parameters will have no effect on the pages fetched. Similarly in the _folder-view_ the _k\_archive\_date_ and _k\_next\_archive\_date_ will not be set and in the archive-view the _k\_folder\_name_ will not be set.</p>
