---
title: pages
category: tag
template: default.html
---

# pages

**Pages** tag can be used to list all pages belonging to a template.

```
<cms:pages masterpage='blog.php'>
     <!-- All the variables of each page cloned out of this template are available here -->
     <cms:show k_page_title /><br>
</cms:pages>
```

\- the snippet given above will fetch all pages cloned out of _blog.php_ template.<br/>
The _masterpage_ parameter stands for the template's name. If this parameter is omitted, the name of the current template (i.e. the template this snippet is placed in) will be used.

This tag iterates through each of the fetched page and makes available all the data associated with the page as variables. The variables are exactly the same as those made available had the page been accessed discretly via its URL (i.e. in its [_page-view_](../../concepts/variables-in-views.html)).

**Pages** tag supports a number of parameters that can be used to fine tune the actual pages that get fetched.

## Parameters

*   masterpage
*   id
*   page\_name
*   limit
*   paginate
*   offset
*   startcount
*   folder
*   include\_subfolders
*   start\_on
*   stop\_before
*   show\_future\_entries
*   orderby
*   order
*   custom\_field

### masterpage

```
<cms:pages masterpage='blog.php'></cms:pages>
```

This example would fetch all pages cloned from blog.php.

If this parameter is skipped, the template being currently executed is used instead. Thus -

```
<cms:pages></cms:pages>
```

This example would fetch all pages cloned from the template being currently executed.

### id

```
<cms:pages masterpage='blog.php' id='14'></cms:pages>
```

This example would fetch only page with id of 14 that has been cloned from blog.php.

```
<cms:pages masterpage='blog.php' id='14, 13'></cms:pages>
```

This example would fetch only pages with id of 14 or 13 that have been cloned from blog.php.

```
<cms:pages masterpage='blog.php' id='NOT 14, 13'></cms:pages>
```

This example would fetch all pages cloned from blog.php except the two with the ids of 14 or 13\.

### page_name

```
<cms:pages masterpage='blog.php' page_name='my_first_entry'></cms:pages>
```

This example would fetch the page named 'my\_first\_entry' that has been cloned from blog.php.

```
<cms:pages masterpage='blog.php' page_name='my_first_entry, my_another_entry'></cms:pages>
```

This example would fetch pages named 'my\_first\_entry' or 'my\_another\_entry' that have been cloned from blog.php.

```
<cms:pages masterpage='blog.php' page_name='NOT my_first_entry, my_another_entry'></cms:pages>
```

This example would fetch all pages cloned from blog.php except the two named 'my\_first\_entry' or 'my\_another\_entry'.

### limit

```
<cms:pages masterpage='blog.php' limit='5'></cms:pages>
```

This example would fetch five pages cloned from blog.php. (Since no 'orderby' and 'order' parameters specified, the default values of these parameters will be used and the most recent five pages will be fetched.)

### paginate

```
<cms:pages masterpage='blog.php' limit='5' paginate='1'></cms:pages>
```

This example would fetch ALL pages cloned from blog.php but show only 5 at one time. To move to the next 5 or the previous 5 pages, pagination code has to be used (see [**Pagination**](../../concepts/pagination.html)).

### offset

```
<cms:pages masterpage='blog.php' offset='2'></cms:pages>
```

This example would fetch pages cloned from blog.php after skipping the first two.

### startcount

```
<cms:pages masterpage='blog.php' startcount='0'></cms:pages>
```

The _k\_count_, _k\_record\_from_, _k\_current\_record_ and _k\_record\_to_ variables (see [**Pagination**](../../concepts/pagination.html)) start by default from '1'. This can be changed to any other value by setting this parameter.

### folder

```
<cms:pages masterpage='blog.php' folder='classic-bikes'></cms:pages>
```

This example would fetch pages cloned from blog.php and belonging to folder named 'classic-bikes'.

```
<cms:pages masterpage='blog.php' folder='classic-bikes, super-bikes'></cms:pages>
```

This example would fetch pages cloned from blog.php and belonging to folders named 'classic-bikes' or 'super-bikes'.

```
<cms:pages masterpage='blog.php' folder='NOT classic-bikes, super-bikes'></cms:pages>
```

This example would fetch all pages cloned from blog.php except those belonging to folders named 'classic-bikes' or 'super-bikes'.

By default Couch will only fetch pages that lie DIRECTLY within the given folder(s).<br/>
To include the pages that are within the subfolders of the given folder(s), set the _include\_subfolders_ parameter as well.<br/>
See below.

In the _folder-view_ (see [**Views**](../../concepts/views.html)), the _k\_folder\_name_ variable is set to the name of the current folder. It can be used to list the right pages -

```
<cms:pages folder=k_folder_name include_subfolders='1'></cms:pages>
```

### include_subfolders

```
<cms:pages masterpage='blog.php' folder='classic-bikes' include_subfolders='1'></cms:pages>
```

This example would fetch all pages cloned from blog.php that belong to 'classic-bikes' or any of its sub-folders.

This parameter augments the _folder_ parameter given above which only fetches pages that lie DIRECTLY within the given folder(s).

### start_on

```
<cms:pages masterpage='blog.php' start_on='2010-02-01'></cms:pages>
```

This example would fetch all pages cloned from blog.php that have been published on or after the 1st of February, 2010\.

### stop_before

```
<cms:pages masterpage='blog.php' stop_before='2010-03-01'></cms:pages>
```

This example would fetch all pages cloned from blog.php that have been published before the first of March, 2010\.

The parameters _start\_on_ and _stop\_before_ can be combined to fetch pages published betwen a particular time period. Thus -

```
<cms:pages masterpage='blog.php' start_on='2010-02-01' stop_before='2010-03-01'></cms:pages>
```

This example would fetch all pages cloned from blog.php that have been published on or after the first of February, 2010 but before the first of March, 2010\. (i.e. only during the month of February of 2010)

In the _archive-view_ (see [**Views**](../../concepts/views.html)), the _k\_archive\_date_ and the _k\_next\_archive\_date_ are set to the first day of the archive and the first day of the next archive (month). These can be used to easily fetch pages that belong to only that archive period -

```
<cms:pages start_on=k_archive_date stop_before=k_next_archive_date ></cms:pages>
```

### show_future_entries

```
<cms:pages masterpage='blog.php' show_future_entries='0'></cms:pages>
```

This example would fetch only those pages cloned from blog.php that have been published on or before the current date (i.e. skip those pages the publication date of whom fall in the future).

### orderby

The pages fetched can be sorted and ordered according to the following fields -

*   publish\_date (_default_)
*   page\_name
*   page\_title
*   modification\_date
*   comments\_count
*   random

Thus -

```
<cms:pages masterpage='blog.php' orderby='page_name'></cms:pages>
```

Apart from the three fields mentioned above, any of the custom field defined in the template (i.e. the editable regions contained within the template) may be used for sorting the fetched pages. Thus, for example if the template 'blog.php' has three editable regions - _my\_blog\_text_, _my\_blog\_image_ and _my\_blog\_author_, the following snippet -

```
<cms:pages masterpage='blog.php' orderby='my_blog_author'></cms:pages>
```

will sort the fetched pages by the custom field named 'my\_blog\_author'.

<p class="notice">**IMP.** Though any type of editable region can be used as the orderby field, it is the 'text', 'textarea', 'dropdown' and 'radio' types that are best suited for ordering the pages.</p>

Multiple fields can be used together for sorting e.g.

```
<cms:pages masterpage='blog.php' orderby='modification_date, page_name'></cms:pages>
```

### order

```
<cms:pages masterpage='blog.php' orderby='publish_date' order='desc'></cms:pages>
```

This example would fetch all pages cloned from blog.php and arrange them in descending order of 'publish\_date'.

If _order_ parameter is not set, the default value used is 'desc'. Since the default value used for _orderby_ is 'publish\_date', the above snippet is equivalent to the following -

```
<cms:pages masterpage='blog.php'></cms:pages>
```

If multiple fields have been used in the _orderby_ parameter, separate sort orders can be set for each of the _orderby_ field. Thus -

```
<cms:pages orderby='my_custom_field_1, my_custom_field_2' order='asc, desc'></cms:pages>
```

The above will first sort pages in ascending order of 'my\_custom\_field\_1'. The pages having the same value for 'my\_custom\_field\_1' will then be sorted in descending order of 'my\_custom\_field\_2'.

### custom_field

The editable regions defined for a template can be used to fetch cloned pages that contain certain values within those editable regions (custom fields) -

```
<cms:pages masterpage='blog.php' custom_field='my_blog_author=jeffrey'></cms:pages>
```

This example would fetch all cloned pages of blog.php where the editable region 'my\_blog\_author' contained the word 'jeffrey' anywhere within it.

To fetch those pages where the editable region 'my\_blog\_author' exactly matches the term 'jeffrey', use '==' instead of '='. Thus -

```
<cms:pages masterpage='blog.php' custom_field='my_blog_author==jeffrey'></cms:pages>
```

```
<cms:pages masterpage='blog.php' custom_field='my_blog_author==jeffrey, arthur'></cms:pages>
```

This example would fetch all cloned pages of blog.php where the editable region 'my\_blog\_author' exactly matches either the term 'jeffrey' or 'arthur'.

<p class="notice">
    Since a comma ',' is being used to separate two values, if any of the values contains a comma<br/>
    within itself you'll have to 'escape' the comma by prepending it with a backward slash -<br/>
    'my\_blog\_text=veni, vidi, veci'  - contains any of the terms veni, vidi or veci<br/>
    'my\_blog\_text=veni\\, vidi\\, veci' - contains the phrase 'veni, vidi, veci'.<br/>
    <br/>
    Similarly if any of the values contains a single quote ''' or double quote '"', it can be escaped likewise.
</p>

```
<cms:pages masterpage='blog.php' custom_field='my_blog_author!=jeffrey'></cms:pages>
```

This example would fetch all cloned pages of blog.php where the editable region 'my\_blog\_author' DOES NOT contain the word 'jeffrey' anywhere within it.

```
<cms:pages masterpage='blog.php' custom_field='my_blog_author!==jeffrey'></cms:pages>
```

This example would fetch all cloned pages of blog.php where the editable region 'my\_blog\_author' DOES NOT exactly match the term 'jeffrey'.

```
<cms:pages masterpage='blog.php' custom_field='my_blog_author!=jeffrey, arthur'></cms:pages>
```

This example would fetch all cloned pages of blog.php where the editable region 'my\_blog\_author' DOES NOT contain the words 'jeffrey' and 'arthur' anywhere within it.

<p class="error">
    The above snippet might seem a little counter-intuitive.<br/>
    It does not mean fetch all pages that contain neither jeffrey nor arthur. It means fetch only those pages that do not<br/>
    have both jeffrey and arthur in the same field.<br/>
    For how to fetch pages that contain neither jeffrey nor arthur, use the multiple fields examples given below.
</p>

Multiple custom fields may be combined together with a pipe '|' character (The pipe stands for a boolean AND) -<br/>
The same custom field may be repeated.

```
<cms:pages masterpage='blog.php' custom_field='my_blog_author!=jeffrey | my_blog_author!=arthur'></cms:pages>
```

This example would fetch all pages that do not contain 'jeffrey' AND do not contain 'arthur' anywhere within 'my\_blog\_author' (i.e. have neither jeffrey nor arthur).

```
<cms:pages masterpage='blog.php' custom_field='my_blog_author=jeffrey | my_blog_author=arthur'></cms:pages>
```

This example would fetch all pages that contain 'jeffery' AND contain 'arthur' somewhere within 'my\_blog\_author' (i.e. contain both jeffery as well as arthur).

```
<cms:pages masterpage='blog.php' custom_field='my_blog_author=jeffrey | my_blog_text=fellow countrymen'></cms:pages>
```

This example would fetch all pages that contain 'jeffery' within 'my\_blog\_author' AND contain 'fellow countrymen' within 'my\_blog\_text'

Custom fields can also be used for comparisions other than the equality and non-equality described above.<br/>
For example, we can fetch pages that have the value of a certain editable region 'greater than' or 'less than' a particular value.

<p class="notice">
    Please bear in mind that if an editable region will contain values that you plan to compare in this manner<br/>
    (i.e. test whether the value is greater or less than some value), most probably the value will be a 'number' -<br/>
    age &lt; 35<br/>
    salary &gt; 12500<br/>
    distance &gt;= 23.56<br/>
    price = 355.39<br/>
    <br/>
    Telephone number, though it might contain all numeric values, is not a 'number' because you are unlikely to do something like -<br/>
    telephone\_number &lt; 234567878<br/>
    <br/>
    For all such cases where the values will be numbers and you'd want to use them in the _custom\_field_ parameter, MAKE SURE to set the _search\_type_ parameter of the editable regions to either 'integer' (for values that will not be fractional e.g. number of bathrooms) or 'decimal' (for values that can be fractional e.g. price).<br/>
    <br/>
    Remember that only editable regions of types 'text', 'radio' and 'dropdown' can be made of 'integer'/'decimal' search\_type.
</p>

As an example of numeric fields -

```
<cms:pages custom_field='distance<50 | price>=1000000 | price<=3000000'></cms:pages>
```

This example would fetch all pages with custom field distance containing a value less than 50<br/>
AND custom field price 'greater than or equal to' 1000000<br/>
AND custom field price 'less than or equal to' 3000000 (i.e. price between 1000000 and 3000000)

The following comparisions can be done with numeric fields -

*   = (equal to)
*   != (not equal to)
*   <= (less than or equal to)
*   &gt;= (greater than or equal to)
*   &lt;&gt; (not equal to)
*   &lt; (less than)
*   &gt; (greater than)

## Variables

As this tag iterates through all the fetched pages, at each iteration it sets all the variables that one normally finds set when that page is accessed in a _page-view_ (see [**Variables available in Views**](../../concepts/variables-in-views.html)).<br/>
Apart from this, several variables are also set that indicate the current status of the loop.<br/>
These variables can be used to show the fetched pages in a paginated manner.<br/>
See [**Pagination**](../../concepts/pagination.html).

## Related Tags

*   [folders](../folders.html)
*   [archives](../archives.html)
*   [templates](../templates.html)
*   [comments](../comments.html)
