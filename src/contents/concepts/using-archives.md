---
title: Archives
category: concept
template: default.html
---

# Archives

For some types of templates, like _blog_ and _news_, it is useful to archive the cloned pages by certain time periods e.g. group together pages by years, months or days.<br/>
[_**Archives**_](../../tags-reference/archives.html) tag is used to find out all the past time periods (years, months and days) during which atleast one page has been published.

The following snippet will simply list all the monthly periods that contain alleast one published page -

```
<cms:archives masterpage='blog.php'>
    <cms:date k_archive_date format='F Y' /><br>
</cms:archives>
```

<p class="notice">
    The _k\_archive\_date_ variable is set in a machine readable format.<br/>
    The [_**date**_](../../tags-reference/date.html) tag converts it into a displayable format.
</p>

By default the archives tag will group together pages by month. You can set the _type_ parameter to either _yearly_, _monthly_ or _daily_ to specify the desired grouping. For example, the following snippet will create yearly archives of pages -

```
<cms:archives masterpage='blog.php' type='yearly'>
    <cms:date k_archive_date format='F Y' /><br>
</cms:archives>
```

### Variables set by archives tag

The following variables are set for each time period as it is iterated -

#### k_archive_date

Denotes the beginning of the time period.

#### k_next_archive_date

Denotes the end of the time period.

#### k_archive_link

Link to the _archive-view_ of the template.<br/>
A listing of all pages that belong to this period can be done here (see below).

#### k_archive_count

The number of published pages in this period.

#### k_count

Count of the current iteration.<br/>
Starts by default from '1' but this can be modified by the _startcount_ parameter.

Using the variables that get set for each time period, the following snippet could be used to create a side-bar menu that lists the latest 6 available monthly archives along with the count of pages in each period. Each entry is also hyperlinked to it's _archive-view_ page that should list all the contained pages.

```
<ul>
<cms:archives limit='6'>
    <li>
    <a href="<cms:show k_archive_link/>"><cms:date k_archive_date format='F Y' /></a>
    (<cms:show k_archive_count />)
    </li>
</cms:archives>
</ul>
```

The [_**archives**_](../../tags-reference/archives.html) tag is only the first step in arranging your pages in archives as it merely delineates the archive periods for us.<br/>
To list the pages belonging to any of these periods, we'll have to use the [_**pages**_](../../tags-reference/pages.html) tag which we have already discussed.

If you recall the [_**pages**_](../../tags-reference/pages.html) tag, pages belonging to a particular time period can be easily fetched by setting the _start\_on_ and _stop\_before_ parameters.<br/>
If we set these two parameters to the start and the end of an archive time period, a list of pages that were published during that period can be created.<br/>
We can use the _k\_archive\_date_ and _k\_next\_archive\_date_ variables set at each iteration of the archives tag to do so.

```
<ul>
<cms:archives masterpage='property.php'>
    <li>
    <b><cms:date k_archive_date format='F Y' /></b> (<cms:show k_archive_count />)
    <ul>
    <cms:pages masterpage='property.php' start_on=k_archive_date stop_before=k_next_archive_date>
        <li>
        <a href="<cms:show k_page_link />"><cms:show k_page_title /></a>
        <i><cms:date k_page_date /></i>
        </li>
    </cms:pages>
    </ul>
    </li>
</cms:archives>
</ul>
```

The snippet given above is great for listing out on one single page all the monthly archive periods along with the pages belonging to them (like in a site-map).

You can also create separate pages for each archive period.<br/>
In fact, Couch already does this for you.<br/>
You might recall that Couch supports a view of any clonable template that is dedicated to listing out pages belonging to a time period - the _archive-view_.<br/>
The _k\_archive\_link_ variable set by the archives tag points to this view for each time period.<br/>
Thus for a monthly period of July, 2010, the link of the _archive-view_ of _blog.php_ could be -<br/>
_http&#58;//www.yoursite.com/blog/2010/07/_

For an yearly period of 2010, the same link would be -<br/>
_http&#58;//www.yoursite.com/blog/2010/_

While for a daily period, the link would be -<br/>
_http&#58;//www.yoursite.com/blog/2010/07/31/_

By pointing your browser to these urls, you'll be accessing your _blog.php_ template in _archive-view_ (see: [**Views**](../views.html)).<br/>
In this view, apart from other variables that you normally find set, Couch sets the _k\_archive\_date_ and _k\_next\_archive\_date_ variables (see: [**Variables available in Views**](../variables-in-views.html)).<br/>
It shouldn't be difficult to set up the [_**pages**_](../../tags-reference/pages.html) tag to list pages belonging the archive period by using these variables (see: [**Listing Pages**](../listing-pages.html)).
