---
title: Variables available in Views
category: concept
template: default.html
---

# Variables available in Views

From what we have read so far, we know that a template can be either _clonable_ or _non-clonable_.<br/>
A _clonable_ template will necessarily have cloned pages associated with it hence it is said to be executing within a _page-view_ when a cloned page of it is accessed while it is said to be executing within a _list-view_ if it is accessed in a stand alone manner.

A _non-clonable_ template always represents one single page and hence it has no such views associated with it.

Depending on whether a template is clonable or non-clonable and upon the view it is being executed in, each time a template is accessed, Couch makes available certain variables that are relevant to the template's state.

For example, when executed in a _page-view_, a template is used to access a cloned page and hence all that cloned page's data (including all its editable region's contents) are made available by Couch for use by your script.

In contrast, when executed in a _list-view_, it is not any single page that is accessed and hence no such page specific data is made available. Instead, certain variables that describe the 'list-view' and make it easy for your script to actually 'list' the pages pertaining to the view, are made available.

A complete list of all the variables that become available during the above mentioned conditions are listed below.

For the sake of this example we make use of a template named _blog.php_ that has three editable regions defined within it - _my\_blog\_text_, _my\_blog\_image_ and _my\_blog\_author_ (these will be made available as variables with the same names. They are shown highlighted below).

The following variables are available in ALL the cases, irrespective of the clonable status of the template and the current view -

*   k\_page\_link
*   k\_admin\_link
*   k\_site\_link
*   k\_admin\_path
*   k\_site\_path
*   k\_template\_title
*   k\_template\_name
*   k\_template\_id
*   k\_template\_link
*   k\_prettyurls
*   k\_site\_charset
*   k\_email\_from
*   k\_email\_to
*   k\_is\_commentable

### NON-CLONABLE TEMPLATE -

If _blog.php_ is non-clonable, the only way it can be accessed is -<br/>
_http&#58;//www.mysite.com/blog.php_

\- and the available variables are -

*   k\_is\_list\_page
*   k\_comments\_count
*   k\_page\_date
*   k\_page\_modification\_date
*   **my\_blog\_text**
*   **my\_blog\_image**
*   **my\_blog\_author**

### CLONABLE TEMPLATE -

If _blog.php_ is made clonable, the different views it can be accessed in and the variables made available in each view are -

#### PAGE VIEW

e.g. _http&#58;//www.mysite.com/blog/some\_page\_name.html_<br/>
In this view, variables giving information about the current page, the containing folder (if the page resides in one) and the contents of the page's editable regions are made available.

The folowing variables carry information about the page in question -

*   k\_is\_page
*   k\_page\_title
*   k\_page\_name
*   k\_page\_id
*   k\_page\_date
*   k\_page\_modification\_date
*   k\_comments\_count

The following variables carry Information about the folder, if the page resides in one -

*   k\_page\_folderid
*   k\_page\_foldername
*   k\_page\_foldertitle
*   k\_page\_folderlink
*   k\_page\_folderpagecount
*   k\_page\_foldertotalpagecount

Finally the contents of editable regions -

*   **my\_blog\_text**
*   **my\_blog\_image**
*   **my\_blog\_author**

#### FOLDER VIEW

e.g. _http&#58;//www.mysite.com/blog/some\_subfolder/_<br/>
In this view, variables giving information about the folder mentioned in the URL are set.

*   k\_is\_list
*   k\_is\_folder
*   k\_folder\_id
*   k\_folder\_name
*   k\_folder\_title
*   k\_folder\_link
*   k\_folder\_pagecount (_Number of pages in the folder_)
*   k\_folder\_totalpagecount (_Total number of pages, including pages in subfolders_)

#### ARCHIVE VIEW

e.g. _http&#58;//www.mysite.com/blog/2010/05/_<br/>
In this view, variables giving information about the archive's time period (as given in the URL) are set.

*   k\_is\_list
*   k\_is\_archive
*   k\_archive\_date
*   k\_next\_archive\_date
*   k\_archive\_link
*   k\_day
*   k\_month
*   k\_year

#### HOME VIEW

e.g. _http&#58;//www.mysite.com/blog/_

*   k\_is\_list
*   k\_is\_home
*   k\_folder\_pagecount (_Number of pages. Remember home view is also the root folder_)
*   k\_folder\_totalpagecount (_Total number of cloned pages, including pages in subfolders_)

<p class="notice">**IMP.** Notice that for cloneable templates, the contents of the editable regions associated with a page are made available only in page view.</p>

<p class="success">**TIP:** You can use the Couch tags - [_**dump**_](../../tags-reference/dump.html) and [_**dump\_all**_](../../tags-reference/dump_all.html) to see for youself all the variables with their current values.</p>

Next is [**Listing Pages**](../listing-pages.html)
