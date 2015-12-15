---
title: Diving deep - the Blog (Part 1)
category: tutorial
subCategory: portfolio-site
template: default.html
---

# Diving deep - the Blog (Part 1)

Before beginning this section, please allow us to clarify the distinction between two terms you'll come across very often in Couch - _page_ and _template_.

[<img alt="" src="../../assets/img/contents/download.png" style="border: 0; float: right;"/>](http://www.couchcms.com/docs/code/blog.zip)

The way we use both the terms, a page of a web site is what we access using a distinct address or URL. A template, on the other hand, is a physical php file (containing regular HTML and some Couch tags) that is used to generate a page.

Thus, taking the example of the _about us_ page that we built in the previous section, page is what gets displayed in the browser when we access the URL _http&#58;//www.mytestsite.com/about.php_. The template in this case is the _about.php_ file, which is used to generate the page.<br/>
Since in this case, the template is associated with only one page, the distinction might seem superfluous. However a template can be used to create any number of pages, which is when it becomes necessary to make a distinction between the two.<br/>
The blog section of any web site, for example, comprises of several blog entries. Each blog entry is usually a page in itself (i.e. has a distinct URL).<br/>
To build such a blog section using Couch, we can use a single php file as a template and then use it to generate as many pages as desired. In Couch terminology, this is known as '**cloning**' the template.

With this distinction having been made, let us now move on to building the _blog_ section of Aurelius.<br/>
Looking at the files that came with Aurelius, you'll find that that the _blog_ section is represented by two separate html files - _blog.html_ and _single.html_.<br/>
The _single.html_ represents a discrete blog entry while the _blog.html_ merely lists the already existing blog pages.

### The template

Since _single.html_ is the actual blog entry, we'll use it as the template to define the editable regions required for capturing the data for each blog entry and for displaying each entry.

Rename _blog.html_ to *blog\_list.html* and then rename _single.html_ to _blog.html_.<br/>
Access _http&#58;//www.mytestsite.com/blog.html_.<br/>
Note the various components that we'll have to build -

![](../../../../assets/img/contents/portfolio-site-20.png)

**a.** The blog entry itself, comprising of its title, content, categories, date and number of comments.<br/>
**b.** A list of comments and a form to submit comment.<br/>
**c.** A list of blog categories in the right sidebar.<br/>
**d.** A list of 'Latest News' (this seems to be the latest four blog entries)<br/>
**e.** Finally a list of archive periods containing blog entries.

We'll ignore the list of comments and comment submission form for now (don't worry, we'll get back to them once all other pieces are in place) and concentrate on the blog entry per se.

### Identifying the editable regions

Let us identify the editable regions we'll need for each blog entry.

As noted above, each blog entry comprises of - title, content, categories, date and number of comments.<br/>
The title won't require an editable region because each cloned page has a mandatory title field in Couch (we'll see that soon)<br/>
The content can be captured by creating a richtext type editable region.<br/>
The categories can be represented by the folders in Couch, so no editable regions required for them.<br/>
The date field is also already present in each cloned page, so it doesn't need an editable region.<br/>
The number of comments will be dynamically provided by Couch for each commentable page.

So we are left with only the content portion to deal with.<br/>
The content of each blog entry in Aurelius has a 610px x 150px image.<br/>
To make it easy for the client to set such an image for each entry, we'll define a second editable region of type image.<br/>
It can be set to crop the uploaded image to the specified dimensions thus making things easier for the client.

Having decided upon the editable regions to create, let us now move on to actually doing so.<br/>
The following steps should now be familiar (we took them while creating the _about us_ section).<br/>
Rename _blog.html_ to _blog.php_.<br/>
Enclose the entire contents of the file with the boilerplate PHP code -<br/>
Place

```
<?php require_once( 'couch/cms.php' ); ?>
```

at the very top and

```
<?php COUCH::invoke(); ?>
```

at the very end.

Access _http&#58;//www.mytestsite.com/blog.php_ while logged on as the super-admin.<br/>
Visit the admin section to find _blog.php_ added to the list of templates managed by Couch.

![](../../../../assets/img/contents/portfolio-site-21.png)

Clicking on _blog.php_ in the sidebar will reveal the template has no editable regions defined so far.

![](../../../../assets/img/contents/portfolio-site-22.png)

### Creating the editable regions

In the previous chapter, we defined the editable regions in _about.php_ by enclosing the relevant HTML blocks by Couch editable tags. While this approach will work for _blog.php_ too, we'll take another tack for defining the editable regions in _blog.php_.<br/>
The reason is that, unlike _about.php_, _blog.php_ will eventually be used as a clonable template to create several pages. As such, as you'll see a little latter, it is going to be a tad more complex than the non-clonable _about.php_. For clonable templates it is better to use the following approach -

#### Defining the editable regions within the Template tag

You'll recall using the template tag while building the _About Us_ section where we used it to change the display name of the template.<br/>
This tag can also be used to enclose structural Couch tags like editable, folder etc.

In _blog.php_ add a template tag pair at the top of the document -

![](../../../../assets/img/contents/portfolio-site-23.png)

Next we'll place the editable tags defining the two editable regions we identified above within this template tag -

![](../../../../assets/img/contents/portfolio-site-24.png)

Notice how we are instructing the image tag to crop the uploaded image to fit a dimension of 610x150\.

Refresh _blog.php_ in your browser (needless to say now that you must be logged in as the super-admin) and then visit the admin panel.<br/>
Clicking the bog section should reveal that Couch has created the two editable regions for us -

![](../../../../assets/img/contents/portfolio-site-25.png)

Try placing some content in the richtext editor and saving the page.<br/>
Access _http&#58;//www.mytestsite.com/blog.php._<br/>
Nothing will seem to change. The content you added in the editor will not appear on the page.<br/>
The reason is that, unlike about.php where we defined the editable regions by placing the editable tags right where we wanted the edited content to appear, placing the editable tags within the template tag will only create the editable regions. To display the edited content we'll need to use the show tag with the name of the editable region as parameter.

In _blog.php_, find the place where the blog entry's content is showed -

![](../../../../assets/img/contents/portfolio-site-26.png)

and replace the text shown as content by a show tag -

![](../../../../assets/img/contents/portfolio-site-27.png)

Notice the<br/>
*&lt;cms:show blog\_content /&gt;*

Upload an image into the image type editable region.<br/>
In _blog.php_, find the place where the image is showed -

![](../../../../assets/img/contents/portfolio-site-28.png)

and replace the src attribute of the image tag with the content of the editable region named *blog\_image* using the show tag -

```
<img class="thumb" src="<cms:show blog_image />" alt=""/>
```

![](../../../../assets/img/contents/portfolio-site-29.png)

Access _http&#58;//www.mytestsite.com/blog.php_ again. Your edited contents should appear on the page now.

![](../../../../assets/img/contents/portfolio-site-30.png)

### Cloning the template

What we have succeeded in doing so far is make a single page _blog.php_ editable.<br/>
The _blog_ section, however, will require several such pages - one for each new blog entry.<br/>
We can use the _blog.php_ template to create more than one page by declaring it as clonable.<br/>
The way to do so is setting the _clonable_ parameter within the template tag -

![](../../../../assets/img/contents/portfolio-site-31.png)

Access _http&#58;//www.mytestsite.com/blog.php_ as super-admin to refresh it and make your changes take effect.<br/>
Visit the admin section - _http&#58;//www.mytestsite.com/couch/_<br/>
Click on _Blog_ in the list of templates in the sidebar.<br/>
Whereas previously clicking on the blog entry immediately showed the editable regions ready for editing in the right panel, once you declared it to be clonable the right panel will now show you a list of all the pages cloned from this template.<br/>
Clicking on any of these pages will show the editable regions.

For now notice that in the list of pages cloned from _blog.php_ in the right panel, Couch is showing one cloned page that it has created automatically -

![](../../../../assets/img/contents/portfolio-site-32.png)

It has named this page '_Default page for blog.php \* PLEASE CHANGE THIS TITLE \*_'.<br/>
Click on this new page -

![](../../../../assets/img/contents/portfolio-site-33.png)

Notice how the two editable regions that we had defined for blog.php are present in the panel that opens up.<br/>
Also notice that the two regions have the same data that we had entered into _blog.php_ when it was not clonable. Whenever a template is declared as being clonable, Couch creates a default page as the first cloned page of the template by moving all the editable data that was previously allocated to the non-clonable template.

Further notice that apart from these two editable regions, Couch has added two more regions - _Title_ and _Name_.<br/>
Since multiple pages can now be created from the clonable template, each cloned page needs to have a unique identification. The _Name_ field is this unique id.<br/>
Every cloned page will always have the _Name_ and _Title_ fields associated with it. Difference between the two is that the _Name_ field has restrictions on the characters that you can use within it (only alpha-numeric, hyphen and underscore). The _Title_ field, on the other hand, has no such restrictions.

<p class="success">If you fill the _Title_ field, you can leave the _Name_ field empty and Couch will generate a name for the page based on the title you entered.</p>

Change the _title_ to something friendlier and leave the name blank -

![](../../../../assets/img/contents/portfolio-site-34.png)

Press the save button at the bottom.

![](../../../../assets/img/contents/portfolio-site-35.png)

Couch will save the changes and refresh the page. Notice how a name was generated by Couch using the _title_ field.

![](../../../../assets/img/contents/portfolio-site-36.png)

Click the view button to see this page in browser -

![](../../../../assets/img/contents/portfolio-site-37.png)

Notice the address of the page in the address bar -

![](../../../../assets/img/contents/portfolio-site-38.png)

It has an additional '_?p-2_' after the _blog.php_<br/>
_http&#58;//www.mytestsite.com/blog.php?p=2_<br/>
Compare it with how uptil now (that is uptil _blog.php_ was not declared clonable), we accessed _blog.php_ using the following address -<br/>
_http&#58;//www.mytestsite.com/blog.php_

Every cloned page has the additional '_?p=x_' after the non-clonable URL where 'x' is a unique number that denotes the cloned page that is being displayed.

Let us create a second cloned page to illustrate the point further.<br/>
Click on the button that has been added on the top that says 'Add New' -

![](../../../../assets/img/contents/portfolio-site-39.png)

Save the page after filling in the fields.

![](../../../../assets/img/contents/portfolio-site-40.png)

Press view and the second page should show up -

![](../../../../assets/img/contents/portfolio-site-41.png)

Once again notice the address of this page -<br/>
_http&#58;//www.mytestsite.com/blog.php?p=3_

Clearly, the '_?p=2_' and '_?p=3_' after the _blog.php_ signal to Couch to generate a page using _blog.php_ as template and filling in the editable regions with data associated with the page specified with the number given.<br/>
So what happens if we access_blog.php_ without any '_?p=n_' appended? Let us try.<br/>
Access _http&#58;//www.mytestsite.com/blog.php_ and the following page should appear -

![](../../../../assets/img/contents/portfolio-site-42.png)

As you can see, a page has been generated using _blog.php_ as the template. However, since no cloned page was specified, the two editable regions come up empty.<br/>
So if no page's data is associated with the address _http&#58;//www.mytestsite.com/blog.php_, is this address useless for clonable templates?<br/>
Not at all. We can use it to show a listing of all the pages cloned from the template or display information about this section or do whatever you wish.<br/>
Couch, on its part, will signal to you whether or not a cloned page's data is available. This it does by setting up certain variables that you can test and take action accordingly.

URLs of clonable templates that have the '_?p=n_' appended are considered by Couch to be the '_page-views_' (i.e. displaying cloned pages) while the URLs without this information are considered as being the '_list-views_' \[see [Views](../../../../concepts/views.html) in documentation\].<br/>
In page-view, you'll find set a variable named *k\_is\_page* while in list-view a variable named *k\_is\_list* will be found set (see [Variables available in Views](../../../../concepts/variables-in-views.html)).

### Using the conditionals

We can use Couch's conditional tags (if and else) to test the presence of the two variables mentioned above and then change the output of our template accordingly depending on the view we are in.

Enclose the HTML part of the _blog.php_ with Couch's if tags the following way -<br/>
Place the opening if tag *&lt;cms:if k\_is\_page &gt;* before the HTML part -

![](../../../../assets/img/contents/portfolio-site-43.png)

and place the closing if tag &lt;/cms:if&gt; after the HTML

![](../../../../assets/img/contents/portfolio-site-44.png)

What we are doing is checking if variable *k\_is\_page* is set (i.e. a cloned page is being viewed). If it is, we output the full template. Test it by accessing both the cloned pages.<br/>
But what happens if *k\_is\_page* is not set (as when in the list-view)?<br/>
Check it by accessing _http&#58;//www.mytestsite.com/blog.php_ and you'll face a blank page. Not surprising because we were displaying the template only in page-view.<br/>
Let us handle the list-view now.<br/>
Add an else tag before the ending if tag.

![](../../../../assets/img/contents/portfolio-site-45.png)

Anything placed after the else tag will be output when *k\_is\_page* is not set - i.e. when _blog.php_ is accessed without being associated with a cloned page.<br/>
As a quick and dirty test, place an arbitrary message in this block -

![](../../../../assets/img/contents/portfolio-site-46.png)

Access _http&#58;//www.mytestsite.com/blog.php_ and you'll see '_Hi! You are seeing the list-view_' greeting you.<br/>
Of course, you'll want to do something more useful than this in this view.<br/>
Listing out all the pages that have been cloned from _blog.php_ here is not a bad idea.<br/>
Remember the *blog\_list.html* (the original _blog.html_ showing a list of blog entries that we had renamed to *blog\_list.html*)?<br/>
We'll display this in the list-view.

### Embedding snippets

Couch has a very powerful feature that allows us to keep chunks of HTML code (along with any Couch tags that might be within them) in separate files as snippets, and then use these snippets anywhere using the Couch embed tag.

We'll use the embed tag to display *blog\_list.html* in the list-view.<br/>
Move *blog\_list.html* into the snippets folder found within the couch folder (this is not mandatory, but files kept in this folder are kept safe from being accessed directly by the _.htaccess_ file present within the folder and hence is desirable).<br/>
See [embed](../../../../tags-reference/embed.html) tag for snippets folder customization instructions.<br/>
Now replace the silly message we were displaying in list-view with the following embed tag -

![](../../../../assets/img/contents/portfolio-site-47.png)

Access _http&#58;//www.mytestsite.com/blog.php_ once again and you should see the contents of *blog\_list.html* being displayed.

![](../../../../assets/img/contents/portfolio-site-48.png)

In a way, *blog\_list.html* has become a part of the _blog.php_ template only that it is displayed in list-view.

Of course, what is being displayed is the hard coded HTML within *blog\_list.html* and is not a list of the cloned pages of _blog.php_ but we'll change that soon.

Before we set out to dynamically display a list of our cloned pages in the list-view, there is still work to be done in the page-view.<br/>
With what we have done so far, for each page we are only displaying the *blog\_content* and the *blog\_image*.<br/>
The blog entry's title, the categories, date and number of comments need to be handled too.

![](../../../../assets/img/contents/portfolio-site-49.png)

In the step where we decided on the number of editable regions to create, we had discussed that these items are present in other ways within a page and do not need the creation of editable regions to capture them.<br/>
Take a look at the '[Variables available in Views](../../../../concepts/variables-in-views.html)' in the documentation for a list of variables that become available in the various views.

<p class="success">**TIP:** You can use *&lt;cms:dump\_all /&gt;* or _&lt;cms:dump /&gt;_ to get a quick list of all the variables that are available for use at any particular place.</p>

Variables *k\_page\_title*, *k\_page\_date* and *k\_comments\_count* present in the page-view are what we require.<br/>
With _blog.php_ open in your editor, find the place where title of the blog entry is displayed

![](../../../../assets/img/contents/portfolio-site-50.png)

and replace it with

```
<cms:show k_page_title />
```

![](../../../../assets/img/contents/portfolio-site-51.png)

The titles are currently linked to 'single.html'. Let us change this to link them back to the current page.<br/>
We'll use the variable *k\_page\_link*, which is always available to give the link of the current page.<br/>
Replace 'single.html'

![](../../../../assets/img/contents/portfolio-site-52.png)

with

```
<cms:show k_page_link />
```

![](../../../../assets/img/contents/portfolio-site-53.png)

Access the cloned pages to see their title being shown instead of the ipsum lorem stuff having the right link.

![](../../../../assets/img/contents/portfolio-site-54.png)

![](../../../../assets/img/contents/portfolio-site-55.png)

Moving on to fix the date, first find the date in the template

![](../../../../assets/img/contents/portfolio-site-56.png)

and replace it with

![](../../../../assets/img/contents/portfolio-site-57.png)

Accessing any cloned page to see the change

![](../../../../assets/img/contents/portfolio-site-58.png)

The date that appears, although recognizable, hardly matches the '_31st Sep, 09_' format originally in place.<br/>
This is because *k\_page\_date* shows date in the internal raw format of its storage (yyyy-mm-dd hh:mm:ss).<br/>
To make it display in the desired format we'll have to use the Couch date tag that takes a format parameter which can be used to modify the display.<br/>
Place the following in place of the show tag -

```
<cms:date k_page_date format='jS M, y'/>
```

This results in the following display -

![](../../../../assets/img/contents/portfolio-site-59.png)

The comments count can be similarly fixed by finding and replacing the count

![](../../../../assets/img/contents/portfolio-site-60.png)

with *k\_comments\_count* variable

![](../../../../assets/img/contents/portfolio-site-61.png)

Of course for now all blog entries will show a count of 0 because they have no comments yet.

We can now move on to handle the categories of blog entries.

### Virtual Folders

Couch supports the notion of virtual folders. Virtual folders can be created for a clonable template and then its cloned pages may be placed in any one such folder.<br/>
The real value of virtual folders is seen when pretty-urls are enabled in Couch (after which the '_?p=n_' in the URL of a cloned page gets replaced by the name of the page, making the url more user-friendly). With pretty-urls enabled, if a cloned page resides within a virtual folder or a hierarchy of virtual folders (they can be nested), the names of the folders show up in the URL of the page, making it appear as if the page is physically located within such folders.<br/>
Since the virtual folders are designed to mimic the physical folders of a file system, a cloned page can only reside within one folder.

The categories of the blog section can be handled using virtual folders but please keep in mind that you'll only be able to place a blog entry in a single category.

Creation of a virtual folder requires placing the Couch folder tag within the template the virtual folder is defined for.<br/>
The template tag is an ideal place within which these folder tags may be placed.

For our _blog.php_, we'll create unnested folders to match the following categories visible in the Aurelius template -<br/>
_Philosophy_, _History_, _Jobs_, _Staff_ and _Clients_

Place the following tags within the template tag already placed at the beginning of_blog.php_ -

![](../../../../assets/img/contents/portfolio-site-62.png)

Refresh _blog.php_ in your browser by visiting it while still being logged-on as the super-admin.<br/>
Visit the _blog_ section in Couch admin and you should find a drop-down list being added to it -

![](../../../../assets/img/contents/portfolio-site-63.png)

![](../../../../assets/img/contents/portfolio-site-64.png)

Let us now add the first blog entry to a folder.<br/>
Click on '_My first blog entry_' to edit it.<br/>
Click on the '_Advanced Settings_' found at the top right -

![](../../../../assets/img/contents/portfolio-site-65.png)

It will expand to reveal several advanced settings. A list of the virtual folders defined for the template is one of them.

![](../../../../assets/img/contents/portfolio-site-66.png)

Select one, let us say '_clients_', and save.

Now to display this folder in the blog entry -<br/>
As you know, Couch provides information about the page being accessed by setting up variables. *k\_page\_foldertitle* is the variable that contains the title of the folder a cloned page resides in (remains blank if the page does not reside in any folder) \[see [Variables available in Views](../../../../concepts/variables-in-views.html)\].

<p class="success">Once again, when in any doubt about which variables are available for use, place _&lt;cms:dump /&gt;_ or *&lt;cms:dump\_all /&gt;* temporarily within the template. On accessing a page, these tags will spill out all the variables (along with their values) that are available.</p>

Find the place where the template displays the name of the categories -

![](../../../../assets/img/contents/portfolio-site-67.png)

Replace it with -

![](../../../../assets/img/contents/portfolio-site-68.png)

Notice how we have eliminated the second category because we can only have one.

Visit '_My first blog entry_' to see the change being reflected on the web page -

![](../../../../assets/img/contents/portfolio-site-69.png)

Now visit '_My second blog entry_' -

![](../../../../assets/img/contents/portfolio-site-70.png)

Nothing is displayed for the folder as this page was not placed in any folder but the blank looks awkward.<br/>
We'd like to display '_Uncategorised_' for such pages that do not reside in any folder.

To do so, instead of directly using the *k\_page\_foldertitle*, we'll use a variable of our own to display the folder title.

<p class="notice">You might recall from the documentation that apart from the variables set up by Couch (the system variables that are all prefixed by a 'k\_'), we can define our own variables. \[see [Variables](../../../../concepts/variables.html)\]</p>

If *k\_page\_foldertitle* is not blank, we'll set our variable to the folder title but if *k\_page\_foldertitle* is blank, we'll set it to '_Uncategorised_'. This is how it can be done -

![](../../../../assets/img/contents/portfolio-site-71.png)

Notice how we are now using *my\_category*, instead of *k\_page\_foldertitle*, to display the folder title,

Visiting '_My second blog entry_' now will show -

![](../../../../assets/img/contents/portfolio-site-72.png)

That about wraps up the page-view part of _blog.php_ (one that displays a single blog entry).<br/>
A few minor points still remain unattended but we'll get back to them after we configure the other parts.<br/>
Let us now move on to the list-view of _blog.php_ - where we display a paginated list of all cloned pages i.e. blog entries.

[Diving deep - the Blog (Part 2)](../../blog-2.html)
