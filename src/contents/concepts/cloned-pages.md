---
title: Cloned Pages
category: concept
template: default.html
---

# Cloned Pages

Some templates represent one single page of a website, e.g. _about-us.php_ and _contact-us.php_.<br/>
To make these pages updatable by the users, it is sufficient to mark out the updatable HTML areas in the templates using the [__*editable*__](../../tags-reference/editable.html) tags and Couch will make them editable.

Some other templates, e.g. _blog.php_ or _property.php_, cannot possibly represent one single page.<br/>
A website will have several blog pages, each page representing a single blog entry. Similarly, there will be several property pages where each page would stand for a single property.

We'll take the example of _blog.php_ to illustrate the point we are trying to make.<br/>
Suppose we created three editable regions, named *my\_blog\_text*, *my\_blog\_image* and *my\_blog\_author*, within _blog.php_ template.<br/>
The user edits the contents within these areas and after saving his changes visits the template in his browser -<br/>
_http&#58;//www.yoursite.com/blog.php_

As expected, the changes he made should be visible on this page. But this is one single page.<br/>
Any number of times he edits the contents of this template in the admin panel, it is only this page that will reflect the changes.<br/>
How can he create a second blog page that is identical to this page in all respects, has the same editable regions and allows him to update its content independent of the first page?

Couch's answer is to 'clone' the new page out of the original _blog.php_ template.

### CLONABLE TEMPLATE FOR CLONED PAGES

To create cloned pages out of a template, the template first needs to be marked as being _clonable_.

A template can be marked as being clonable by using the [__*template*__](../../tags-reference/template.html) tag somewhere within it and setting its _clonable_ parameter to '1'.<br/>
Place the following snippet somewhere at the begining of the template (within the HEAD tag will do just fine) -

```
<cms:template clonable='1' > </cms:template>
```

As always, persist your changes by visiting _blog.php_ in your browser (needless to repeat that you must be logged on as super-admin).

Now when you visit the admin panel, you'll notice that Couch has added a new page below _blog.php_ -<br/>
'Default page for blog.php \* PLEASE CHANGE THIS TITLE \*'.

Importantly note that Couch no longer allows you to edit _blog.php_ directly. What is going on? And what is this new page? We did not ask to create a new page, did we?

To find out, click the newly created page to edit it.<br/>
You'll find that **ALL** the data that was inputted in the _blog.php_ template when it was not declared clonable, has been moved into this new page.<br/>
The same three editable regions are present but in addition to them a few new fields have been added - namely the _Title_ and _Name_ field.

### CLONABLE - THE SCHIZOPHRENIC TEMPLATE

There is a very important concept of Couch that we need to understand here so please pay attention to the following discussion -

Let us change the title of the newly created page to 'My First Page' and its name to 'my-first-page'.<br/>
Scroll to the bottom of the page and you'll find the 'View' button adjacent to the 'Save' button.<br/>
Clicking it will bring up the new page in the browser. It should be IDENTICAL to what we used to see on visiting blog.php before it became clonable.<br/>
Take a look at the URL displayed in the address-bar of the browser. It should be something like -<br/>
_http&#58;//www.yoursite.com/blog.php?p=12_<br/>
Notice the addition of the '?p=' followed by a number after blog.php.

Let us now add a new cloned page.<br/>
Going back to the dashboard, create a new page from _blog.php_ and we'll be shown the same three editable regions (along with the _Name_ and _Title_ fields).<br/>
Edit and place new contents within all regions. Name this page as 'My Second Page' and save it.<br/>
Click 'View' to visit this page. You should see a new page with the data we entered into it. The URL should be something like -<br/>
_http&#58;//www.yoursite.com/blog.php?p=13_<br/>
Notice how the number after '?p=' is different from the first page.

So now we have two blog pages. One was created by default and contained the data that was originally placed within the not-yet-clonable blog.php while the second page was created by us.

Finally, visit one more time the blog.php page as we used to do before making it clonable -<br/>
_http&#58;//www.yoursite.com/blog.php_<br/>
Notice that just as before we are not suffixing blog.php with anything at all.

You might be surprised to see that all the data that we had previously placed into the editable regions of blog.php is GONE. The HTML elements of the template are all there but the updatable regions are all empty.

And this brings us to the important concept we mentioned above.<br/>
When a template is non-clonable (the default), it represents one single page of the website and so all the data that is entered in its editable regions belongs to it.<br/>
Thus a non-clonable template like _about-us.php_, when visited like this -<br/>
_http&#58;//www.yoursite.com/about-us.php_<br/>
\- is unequivocally one single page.

In contrast, as in the case with _blog.php_ above, once a template is declared clonable, it can now represent one to any number of pages that might be cloned out of it. Thus<br/>
_http&#58;//www.yoursite.com/blog.php?p=12_ is one page while<br/>
_http&#58;//www.yoursite.com/blog.php?p=13_ is a totally different page.

<p class="success">
    It becomes even more distinct when we use pretty urls (see).<br/>
    Then the URLs for the above two pages will become -<br/>
    _http&#58;//www.yoursite.com/blog/my-first-page.html_<br/>
    _http&#58;//www.yoursite.com/blog/my-second-page.html_
</p>

Notice how in each of the instances above, the template is the same (_blog.php_) but the page is different.<br/>
However when _blog.php_ is accessed in the following manner -<br/>
_http&#58;//www.yoursite.com/blog.php_<br/>
\- _blog.php_ is not representing any page (there is no '?=p' present). It is, well, simply itself.<br/>
And this is the point that we were trying to make -

<p class="error">**V.IMP** - A clonable template acquires a split personality - it can represent a cloned page or it can be simply itself.</p>

Once a template becomes clonable it has NO DATA OF ITS OWN. Whatever data was associated to it, before being clonable, is moved into a new first page that gets created automatically.<br/>
This should explain the page that appeared out of nowhere and why it is identical to the not cloned blog.php of yore.

### INTRODUCING THE VIEWS

Each of the page (including the default first page) that gets cloned out of _blog.php_ has its own editable data.<br/>
When _blog.php_ is visited as<br/>
_http&#58;//www.yoursite.com/blog.php?p=12_<br/>
the number after '?p=' provides it with information as to which cloned page it is representing and thus it displays the data that belongs to that cloned page.

It should be easy to see that when a clonable template is accessed in a stand-alone manner (i.e. not providing it with any information about the cloned page it could stand for e.g. -<br/>
_http&#58;//www.yoursite.com/blog.php_<br/>
\- _blog.php_ is clueless about which cloned page's data it should display and since it has no data of its own, the updatable regions come up empty.

So is the URL<br/>
_http&#58;//www.yoursite.com/blog.php_<br/>
useless?

Not at all. By default Couch displays nothing here but it is totally upto you as to what you wish to show on this page.<br/>
This page is ideal for displaying a list of all pages that have been cloned out of this template.<br/>
You might want to display the contents of a particular page here or maybe a list of the latest pages cloned from a different template altogether (see [**listing pages**](../listing-pages.html)).

<p class="notice">In fact, Couch recognizing the fact that a clonable template can be viewed in two different contexts - as a cloned page and as simply itself where possibly a listing of its cloned pages will be displayed, calls the first scenario a 'Page View' and the second a 'List View'.</p>

Couch indicates to your template which 'view' it is executing in by setting certain variables (see [**Views**](../views.html)).<br/>
Your template can test these variables and display whatever you wish accordingly (see [**Variables available in Views**](../variables-in-views.html)).

<p class="error">
    **V.IMP** - If you have turned on the [**pretty-urls**](../pretty-urls.html) feature, every time you declare a template to be clonable, make sure to recreate your .htaccess file else the cloned pages will NOT be accessible.<br/>
    As a temporary measure, you can turn off pretty-urls in _config.php_ till you are done with the testing.
</p>
