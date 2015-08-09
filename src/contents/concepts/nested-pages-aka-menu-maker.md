---
title: Nested Pages (AKA Menu Maker)
category: concept
template: default.html
---

# Nested Pages (AKA Menu Maker)

A typical website usually consists of two kind of pages -

1.  Pages that can be grouped together under a common section e.g. all the pages belonging to the blog section or portfolio section.
2.  Standalone single pages that are distinct enough to form a section of their own e.g. About-us, Contact-us or Privacy-policy etc.

In Couch we handle the first kind of pages mentioned above by cloning them out of a single template e.g. all the pages of the blog section will actually use only a single physical template 'blog.php' (see: [Cloned Pages](../cloned-pages.html)).

We handle the second kind of pages by using a separate template for each of such pages e.g. About-us section might use 'about-us.php' while Contact-us uses 'contact.php'.

Very often we find that the two kind of pages mentioned have an hierarchical relation with each other e.g. the following could be the site-map of a typical website -

![](../../assets/img/contents/nested-pages-1.png)

The hierarchical relation between the pages usually manifests itself in these ways -<br/>
**1\.** In the menu - where the hierarchical structure is represented by having menus that in turn have submenus.<br/>
**2\.** The breadcrumbs - where the crumbs represent the hierarchy of pages leading up to the page being visited.<br/>
**3\.** The URL of a page - where the page's hierarchy in the site-tree shows up as segments of the URL (if prettyURLs are used).

<p class="success">
    Creating a menu that reflects the site structure is the more pressing demand that is encountered.<br/>
    A related requirement that often crops up with building a site's menu may be cited here - it is the site-owner's demand to be able to manipulate the menu himself i.e. to decide which pages show up in the menu and at which location.
</p>

If a site having the structure shown above was to be built in Couch, we already know how to create each of the sections. Creating the hierarchical relation between them, however, would not be so straightforward.

One way could be by placing the templates within physical folders that mimic the structure.<br/>
Apart from being a little convoluted, this approach also rules out granting the site-owner the ability to manage the site menu by himself. Also, creating a new standalone page would entail expecting him to be able to place a physical template on his website.<br/>
Clearly, a better way is required.<br/>
Couch version 1.2 introduces 'Nested Pages' feature to provide such a way.

### So what is a nested page?

A nested-page, internally, is just a variation of the regular cloned-page in Couch that you are already familiar with.

<p class="error">If not, please first take a look at the '[Cloned Pages](../cloned-pages.html)' documentation. Much of the current discussion will not make much sense unless you are familiar with the regular cloned pages in Couch.</p>

It is almost identical to the regular cloned page except for the following characteristics -

**1\.** A nested-page allows another nested-page (cloned out of the same template) to be placed below it as its child page. The child page in its turn can have another nested-page as its child and so on. This allows us to create the hierarchical relation between the pages that we were looking for.

**2\.** The position of a nested-page in the hierarchy gets reflected in its URL (if prettyURLs are used) with its parent pages listed before it.<br/>
E.g. if the URL of a nested-page is _http&#58;//www.yoursite.com/one/two/three/_, 'three' would be the page itself with 'two' and 'one' being its parent nested-pages.

**3\.** Nested-pages do not have a folder-view.<br/>
Regular cloned-pages (i.e. non-nested) use 'folders' to create the hierarchical structure. Since for nested-pages, the pages themselves fulfill this task a folder-view is redundant.<br/>
In fact, if you look closely at the sample URL of a nested-page given in the point above<br/>
_http&#58;//www.yoursite.com/one/two/three/_<br/>
you'll notice that had this URL been of a regular cloned template (i.e. non-nested), it would represent a folder-view - with 'one', 'two' and 'three' being folders of the template. For a nested-page, the 'three' becomes the name of the page (notice that unlike regular cloned pages, there is no '.html' extension).

### How do we create nested pages?

As mentioned above, a nested-page is just a variation of the regular cloned page. We create a nested-page exactly the same way a normal page gets created.<br/>
The process, as usual, begins by declaring the template as 'clonable'.

```
<cms:template clonable='1'> ... </cms:template>
```

The key is that we additionally also declare this clonable template as supporting nested-pages by using this new parameter -

```
<cms:template clonable='1' nested_pages='1'> ... </cms:template>
```

![](../../assets/img/contents/nested-pages-2.png)

That is it. Define all required editable regions and follow it all up with the mandatory visit to the template while logged-in as super-admin to add the template in Couch.<br/>
Returning back to the admin-panel we'll find that, as happens with regular templates, Couch creates a default cloned page for the template.

![](../../assets/img/contents/nested-pages-3.png)

We can rename the default page to create our first nested-page.

![](../../assets/img/contents/nested-pages-4.png)

So far everything is exactly the same as happens with the regular cloned pages.<br/>
Create another cloned page and edit it to find the first difference.

![](../../assets/img/contents/nested-pages-5.png)

Nested-pages get an additional system field - a dropdown that lists all the existing pages of the same template.<br/>
We can choose to place the page being created/edited below another page. We have only one existing page so far so that is the only entry available to choose.

![](../../assets/img/contents/nested-pages-6.png)

Place the new second page below the first one we created and save.<br/>
Create a third page in a similar fashion and also place it below the first page. So now the first page becomes the parent of the next two pages.

The admin page that lists cloned nested-pages looks a little different than what we are used to seeing.

![](../../assets/img/contents/nested-pages-7.png)

You'll find that Couch indicates the hierarchical relation between the pages by using indentation.<br/>
Also notice that the two sibling pages at the same level have these little arrows added. You can use them to easily change their display order below their parent.

![](../../assets/img/contents/nested-pages-8.png)

Also there is no dropdown showing the folders (as nested-pages do not support and actually ignore any folders defined for the template).

Apart from these minor differences, there are a few more that lie hidden in the 'Advanced settings' dropdown. We'll describe them in the next section when we actually make use of them.

So, as you can see, handling nested-pages is not much different from handling regular pages that we are familiar with.

Let us now put the nested-pages feature into action by using it to implement the hierarchical site structure we came across at the top.

### Putting nested-pages into action

Please take a look at the proposed site-map again.

![](../../assets/img/contents/nested-pages-9.png)

As we already mentioned, the blog and portfolio sections can be implemented using the regular cloned pages.

![](../../assets/img/contents/nested-pages-10.png)

Get them done first using clonable templates e.g. blog.php and portfolio.php.

<p class="notice">We assume you already know how to create regular cloned pages. [Please see the documentation](../cloned-pages.html) if you need a refresher.</p>

With those sections done we can move on to the isolated standalone pages.<br/>
It is these pages that we'll implement using the nested-pages feature.

![](../../assets/img/contents/nested-pages-11.png)

This is the plan -<br/>
We'll declare our index.php as clonable (and as supporting nested-page) and then create all the standalone pages as cloned pages of index.php.<br/>
By using index.php as the template we'll benefit from the URL structure that will emerge with prettyURLs turned on (the word 'index' gets removed from the URL).<br/>
For example, the URL of 'about-us' page will become<br/>
_http&#58;//www.yoursite.com/about-us/_<br/>
while that of 'testimonials' will become<br/>
_http&#58;//www.yoursite.com/about-us/what-we-do/testimonials/_

It is easy to see that when the URL _http&#58;//www.yoursite.com/about-us/_ is visited, the 'about-us' in the URL will indicate to Couch to load the 'about-us' page.<br/>
Same applies for the 'testimonials' in _http&#58;//www.yoursite.com/about-us/what-we-do/testimonials/_.<br/>
However which page do you think will get loaded for this URL? -<br/>
_http&#58;//www.yoursite.com/_

If you are familiar with the regular cloned pages, you'll recognize that this is the 'list-view' \[see [cloned-pages](../cloned-pages.html) and [views](../views.html)\].<br/>
Since no page is indicated, none gets loaded. Only the empty template will show up (i.e. the HTML will appear but the editable regions will be empty).<br/>
We also know that in 'list-view', we usually list all the cloned pages of the template (we can choose to do any other thing we want to - point is we'll have to handle the view ourselves).<br/>
As with any other clonable template, we'll add the following logic to the index.php template -

```
<cms:if k_is_page>
    <!-- Single page being visited. Show contents of its editable regions -->
<cms:else />
    <!-- List view. Show a listing of pages -->
</cms:if>
```

This is all staple stuff we use with cloned pages. I am repeating it here to bring home the point that the 'home page' (http&#58;//www.yoursite.com/) of the site is not a 'page' that we can create but is a 'view' that has to be handled in template code.

Moving on, we now define the editable regions for index.php. Since all the cloned pages will share these editable regions, we'll create one that can be generically used in all the stand-alone pages. We'll create only a single region of type richtext and name it 'content'.

![](../../assets/img/contents/nested-pages-12.png)

<p class="success">Most of the standalone pages are usually similar and can share the same template and editable regions but what happens when one of them happens to differ from the rest (e.g. contact-us page will usually have a different markup than the others)?. Please read on. We'll illustrate how to handle that a little further down.</p>

With the preparations done, make the mandatory visit to index.php as super-admin. This will make Couch persist all the changes and add 'index.php' as a template managed by it.

Rest should be easy. Simply create a cloned page for each of the standalone pages. Use the 'Parents' dropdown list to set the appropriate parents and use the up/down arrows to set the order of their appearance.<br/>
Once we are through, this is how our tree should look like -

![](../../assets/img/contents/nested-pages-13.png)

Fine, but if we are supposed to use this tree structure to create the site's menu - where are the 'blog', 'portfolio' and the 'home' items?<br/>
This brings us to a feature of nested-pages that is not shared by the regular pages.

### Pointer pages

A nested-page, as we have seen so far, is no different from a regular page (except that it supports nesting).<br/>
However a nested-page has one more card up its sleeve - it can act as a _pointer_ to a different page or section.<br/>
When one visits a nested-page that is acting as a pointer, instead of seeing the nested-page's own data, one gets to see the data of the page that is being pointed to.

Try this out - we already have a discrete 'portfolio' section. Let us suppose its URL is _http&#58;//www.yoursite.com/portfolio/_ (assuming the template is 'portfolio.php' and prettyURLs are turned on).<br/>
To assimilate this section into the hierarchical tree of nested-pages that we have created so far, create a new cloned page of 'index.php' and name it 'portfolio'. Set the 'what-we-do' page as its parent to end up having this structure -

![](../../assets/img/contents/nested-pages-14.png)

The new page is now part of the hierarchy and can be accessed as _http&#58;//www.yoursite.com/about-us/what-we-do/portfolio/_.<br/>
Now for the fun part - edit this nested 'portfolio' page. Click on the 'Advanced settings'. You'll see that nested-pages have some new options in their advanced settings.

![](../../assets/img/contents/nested-pages-15.png)

We'll discuss them in detail when we create the menu - what we are interested in for now is the 'Points to another page' option.

![](../../assets/img/contents/nested-pages-16.png)

Click on this to set the check box. Close the "Advanced settings' dropdown. You'll see that the main body of the edit page now no longer shows the editable regions defined for the template. Instead this is what gets shown -

Before:

![](../../assets/img/contents/nested-pages-17.png)

After:

![](../../assets/img/contents/nested-pages-18.png)

Paste the URL of the actual portfolio section into the textbox

![](../../assets/img/contents/nested-pages-19.png)

<p class="error">**IMP:** always get the URL of any section being pointed to by visiting it and copying its URL from the address bar of the browser.</p>

Click save. Click on the 'View' button to visit this nested page of ours. You'll notice that, instead of _http&#58;//www.yoursite.com/about-us/what-we-do/portfolio/_ (this nested 'portfolio' page's canonical URL), we get redirected to _http&#58;//www.yoursite.com/portfolio/_.

#### MASQUERADING

In the example above, notice that the nested-page acting as pointer **redirected** us to the target page.

If _index.php_ is being used as the template for the nested-pages (as we are doing in this example), we get another option to set the method used by the pointer pages to show us the target page - **masquerading**.

Masquerading is a very powerful method that can be used to **make the pointer page behave as if it were the target section itself**.<br/>
By using this option we can virtually move an entire section anywhere within the nested-pages hierarchy, thus being able to choose any arbitrary URL for that section.

<p class="notice">Masquerading requires prettyURLs to be enabled. This is understandable because the whole purpose of masquerading is to impose a new URL structure (established by the pointer page's hierarchy) upon the section being masqueraded. Please see [Pretty URLS](../pretty-urls.html) section in documentation if you require information on how to enable this feature.</p>

A slight modification to the previous example should make the concept of masquerading clear.

Edit the nested 'portfolio' page we used above. This time, instead of the previously chosen 'Redirects' method, choose 'Masquerades'.

![](../../assets/img/contents/nested-pages-20.png)

Remember that the canonical URL of this nested-page is _http&#58;//www.yoursite.com/about-us/what-we-do/portfolio/_ and we are making it point to a separate portfolio section with the canonical URL of _http&#58;//www.yoursite.com/portfolio/_ (with prettyURLs enabled).

Save your changes and visit the nested page _http&#58;//www.yoursite.com/about-us/what-we-do/portfolio/_.<br/>
You'll find that this time, instead of redirecting to _http&#58;//www.yoursite.com/portfolio/_, the nested-page itself shows the same content that you would have seen had you visited _http&#58;//www.yoursite.com/portfolio/_.

If the portfolio section has links to its cloned pages and to its various views (i.e. page-view, folder-view, archive-view etc.), try clicking on them and you'll find that all the links of the portfolio section have now changed automatically and appear as _http&#58;//www.yoursite.com/about-us/what-we-do/portfolio/somepagename.html_, _http&#58;//www.yoursite.com/about-us/what-we-do/portfolio/some-folder/_ etc. instead of the original _http&#58;//www.yoursite.com/portfolio/somepagename.html_, _http&#58;//www.yoursite.com/portfolio/some-folder/_ etc.

**For all practical purposes, the portfolio section has been moved in its entirety** from _http&#58;//www.yoursite.com/portfolio/_ to _http&#58;//www.yoursite.com/about-us/what-we-do/portfolio/_ **without making any changes whatsover to the portfolio section!**<br/>
In fact, if now you try to access the portfolio section using its original URL (_http&#58;//www.yoursite.com/portfolio/_), it will send you back to its new URL _http&#58;//www.yoursite.com/about-us/what-we-do/portfolio/some-folder/_ with a 301 HTTP code that the page has moved to the new location.

A comparision between the two methods used by pointer pages may be in order:

| Redirection | Masquerading |
| :---------- | :----------- |
| Primarily meant to create menus (where menu-items, i.e. nested-pages, direct the visitors to proper sections of the website). | Primarily meant to relocate entire discrete sections at any desired location within the site's hierarchy. Also helps providing the site-owner a unified and compact interface to manage all the sections of the web-site. |
| Available in pages of all templates that support nested-pages | Available only in pages of _index.php_ template (if configured to support nested-pages) |
| Does not depend on prettyURLs to work. | Requires prettyURLs. |
| Multiple nested-pages of a template can point to the same section. E.g. one nested-page of a template may point to a particular page of 'portfolio' section while another nested-page of the same template may point to another page or folder of the same 'portfolio' section. | A template can be masqueraded only once by any of the nested-pages of _index.php_. E.g. if 'portfolio' section is masqueraded by a particular nested-page of _index.php_, no other nested-page of _index.php_ can masquerade 'portfolio' section again.<br/><br/>Also, the 'portfolio' section will be masqueraded in its entirety - i.e. all its pages and all its views will get masqueraded and hence their original URLs changed. |

### Moving on...

With the 'pointer page' concept understood, it should be easy to see how a menu of any complexity can be implemented using the nested-pages. Simply create a nested-page that reflects the desired hierarchical position and make it point to any page (hence the title 'AKA Menu maker').

Create a similar pointer-page for the 'blog' section and another one for the 'home' section.<br/>
Remember that the 'home' section' is actually a 'view' (as opposed to being a 'page'). That is perfectly okay. Just paste in the home page's URL _http&#58;//www.yoursite.com/_ in the 'points to' textbox. Uncheck the 'Mark as selected for all pages below this link' (this is important - we'll explain why a little later. For now just be sure to uncheck it).

![](../../assets/img/contents/nested-pages-21.png)

Visit and page and it will dutifully redirect to the site's home page.

The site structure we now have looks like this -

![](../../assets/img/contents/nested-pages-22.png)

Notice how the pointer pages have a 'hand' icon indicating that they are pointers. Also that you can access the pointed sections directly from the links that appear alongside.

We are almost there. Just implementing the 'contact-us' section remains and we can move on to create our site's menu using this tree structure of 'index.php'.

In the tree structure that we have now, all the standalone pages share the same HTML markup and the same editable regions - not surprising as that is how the cloned pages are supposed to be. The 'contact-us' page, however, needs a different HTML markup (will have an HTML form etc.).

Such pages can be implemented using the same method that was used with the 'portfolio' and 'blog' sections above.<br/>
Implement the 'contact-us' page as a section in itself by using a separate non-clonable template, say named 'contact-us.php' -

![](../../assets/img/contents/nested-pages-23.png)

Edit the nested-page named 'contact-us' (_http&#58;//www.yoursite.com/about-us/contact-us/_) that we have in our tree and make it a pointer page masquerading as the 'contact-us.php' we implemented above -

![](../../assets/img/contents/nested-pages-24.png)

Visit _http&#58;//www.yoursite.com/about-us/contact-us/_ and the contents of the original _http&#58;//www.yoursite.com/contact-us/_ should appear.

Our hierarchical tree structure is now complete.

![](../../assets/img/contents/nested-pages-25.png)

What remains now is to make Couch automatically generate a menu for the site that reflects this hierarchy.

### CREATING THE MENU

Typically, menu and breadcrumbs are the two elements on a web page that reflect the hierarchical structure of the website.<br/>
The tree we created above using nested-pages contains all the information that is needed to create such menus and breadcrumbs.<br/>
To help us with this task, Couch now has three new tags - '[nested\_pages](../../tags-reference/nested_pages.html)', '[menu](../../tags-reference/menu.html)' and '[nested\_crumbs](../../tags-reference/nested_crumbs.html)' that can iterate through our tree and output the desired markup.<br/>
'nested\_pages' is a rather low-level (but very powerful) tag that can be used to iterate through the hierarchy of nested-pages and output just about any kind of markup. The 'menu' and 'nested\_crumbs' are actually just thin veneers around the 'nested\_pages' tag but can be used to very quickly generate the typical markup associated with menus and breadcrumbs respectively.

More often than not, you'll find the 'menu' and 'nested\_crumbs' tags more than sufficient for working with typical menus and breadcrumbs of a website and will rarely need to resort to using 'nested\_pages' tag directly.<br/>
Here is how we use them.

#### Menu

Using the 'menu' tag is pretty straightforward. Following is a sample code -

```
<cms:menu masterpage='index.php' />
```

It couldn't get any simpler than that. Notice the mandatory 'masterpage' parameter to specify the template of the nested-pages tree.

This is the output we get -

```
<ul class="level-0">
   <li id="item-home" class="level-0 first "><a href="http://www.yoursite.com/index.php">Home</a></li>
   <li id="item-about-us" class="level-0 has-submenu active "><a href="http://www.yoursite.com/index.php?p=1">About Us</a>
      <ul class="level-1">
         <li id="item-what-we-do" class="level-1 has-submenu first active "><a href="http://www.yoursite.com/index.php?p=6">What we do</a>
            <ul class="level-2">
               <li id="item-portfolio" class="level-2 first "><a href="http://www.yoursite.com/portfolio.php">Portfolio</a></li>
               <li id="item-testimonials" class="level-2 last active current "><a href="http://www.yoursite.com/index.php?p=8">Testimonials</a></li>
            </ul>
         </li>
         <li id="item-our-team" class="level-1 "><a href="http://www.yoursite.com/index.php?p=9">Our Team</a></li>
         <li id="item-contact-us" class="level-1 last "><a href="http://www.yoursite.com/index.php?p=10">Contact Us</a></li>
      </ul>
   </li>
   <li id="item-blog" class="level-0 "><a href="http://www.yoursite.com/blog.php">Blog</a></li>
   <li id="item-privacy-policy" class="level-0 last "><a href="http://www.yoursite.com/index.php?p=12">Privacy Policy</a></li>
</ul>
```

As you can see, this is the typical _&lt;UL&gt;&lt;LI&gt;_ markup used to create menus.<br/>
Each of the nested-page we had in the tree is represented by a menu-item using the _&lt;LI&gt;_ element while the hierarchy is represented by creating nested sub-menus using the _&lt;UL&gt;_ element.

Each nested-page has certain settings in its 'Advanced Settings' that may be used to control its appearance in the menu markup generated by the 'menu' tag.

![](../../assets/img/contents/nested-pages-26.png)

*   Show in menu
*   Menu Text
*   Open in separate window
*   Points to another page

The settings should be self-explanatory.

#### Styling the menu

We now have the requisite HTML structure for our menu.<br/>
What remains now is putting in some CSS styling and we are done.

We could code up all the CSS required to shape up a good-looking dropdown menu ourselves or use any of the several very good off-the-shelf scripts that do the job for us.<br/>
For our example, we'll make use of a jQuery plugin - [Superfish](http://users.tpg.com.au/j_birch/plugins/superfish/) (http&#58;//users.tpg.com.au/j\_birch/plugins/superfish/).

Superfish is a set of CSS and JavaScript files that need to be included within our templates.<br/>
You can choose to either download the files from Superfish's site or [use the slightly modified version that we used for this example](http://www.couchcms.com/docs/code/superfish.zip) - \[[Download superfish.zip](http://www.couchcms.com/docs/code/superfish.zip)\].<br/>
For our example we have placed the Superfish folder within the site's root. If you choose to place the files elsewhere make sure to adjust the paths in the code that follows.

Since the menu is likely to be shown on all the templates of our website, instead of placing the menu related code in each of our site's templates,  we'll put it in a single snippet (name it 'menu.html') and then embed the snippet in our templates.

Create a snippet file named 'menu.html' placing it within the 'snippets' folder of Couch.<br/>
Place the following code within it -

```
<cms:set path_to_superfish="<cms:show k_site_link />/superfish/" />
<link rel="stylesheet" media="screen" href="<cms:show path_to_superfish />css/superfish.css" />

<script src="<cms:show path_to_superfish />js/jquery-1.2.6.min.js"></script>
<script src="<cms:show path_to_superfish />js/superfish.js"></script>

<script>

    $(document).ready(function(){
        $("ul.sf-menu").superfish();
    });

</script>

<div id="navwrap">
    <cms:menu masterpage='index.php' menu_class='sf-menu' />
</div>
```

As you can see, the snippet starts off with linking to the Superfish CSS and JavaScript files.<br/>
The portion that outputs the HTML markup for the menu using our cms:menu tag is at the end -

```
<div id="navwrap">
    <cms:menu masterpage='index.php' menu_class='sf-menu' />
</div>
```

and this is the portion that actually attaches Superfish with the markup -

```
$(document).ready(function(){
    $("ul.sf-menu").superfish();
});
```

Superfish needs to be informed about the classname of the menu's outermost list container (ul or ol). In our case we have indicated 'sf-menu'. Notice how we use the cms:menu tag's 'menu\_class' parameter to make the tag apply a classname of 'sf-menu' to the menu markup.

Finally, embed the menu snippet within each of our templates by placing the following line within each of them -

```
<cms:embed 'menu.html' />
```

Visit the site and this is the menu that should appear -

![](../../assets/img/contents/nested-pages-27.png)

Play around with this menu and you'll notice that not only does it automatically highlight the page being visited but also all the parent pages above the current page (if there are any). For example, in the image above, the page being visited is 'Testimonials'. As can be seen, both the parent pages of it are also highlighted.<br/>
By default, the 'menu' tag applies the classname 'current' to the current menu-item. It also applies the classname 'active' to all the parent menu-items leading to (and including) the current menu-item. We can use this behavior to set appropriate CSS styles for highlighting the selected items.

<p class="notice">
    How the 'menu' tag recognizes a menu-item to be current requires a little explanation.<br/>
    <br/>
    When a page is visited, the 'menu' tag iterates through its associated nested-pages tree testing each menu-item (i.e. nested-page) against the visited page to determine if they match.<br/>
    <br/>
    For normal menu-items (i.e. those that are not pointers to other pages) the process is straightforward - if the page being visited is the same as the menu-item, the menu-item is marked as 'current' and all menu-items leading to it (including the current menu-item) as 'active'.<br/>
    <br/>
    For menu-items that point to other pages, however, the 'menu' tag needs to apply a fair bit of intelligence to recognize if a menu-item is current.<br/>
    Let us say that a menu-item being tested by the 'menu' tag points to the following location -<br/>
    _http&#58;//www.yoursite.com/portfolio.php_ (_http&#58;//www.yoursite.com/portfolio/_ with prettyURL) - the home-view of template 'portfolio.php'.<br/>
    <br/>
    Now if the page being visited is _http&#58;//www.yoursite.com/portfolio.php_, it is perfect match and so the menu-item in question will be marked as 'current', its parents will be marked as 'active' and the process will end i.e. no further menu-items will be examined (there can be only one current page in the tree at any time). This was no different than what happens with non-pointer pages.<br/>
    <br/>
    However, consider if the page being visited happens to be a cloned page of 'portfolio.php'<br/>
    e.g. _http&#58;//www.yoursite.com/portfolio.php?p=34_ (_http&#58;//www.yoursite.com/portfolio/some-item.html_ with prettyURL).<br/>
    Or it happens to be a folder-view of 'portfolio.php'<br/>
    e.g. _http&#58;//www.yoursite.com/portfolio.php?f=2_ (_http&#58;//www.yoursite.com/portfolio/some-folder/_ with prettyURL).<br/>
    In both these cases, although the same template is involved (i.e. portfolio.php), the URL of the pages does not match that which the menu-item is pointing to.<br/>
    <br/>
    For such cases, by default, the 'menu' tag tries to figure out if the page being visited 'logically' falls below the page being pointed to.<br/>
    <br/>
    Thus, in the example above, both<br/>
    _http&#58;//www.yoursite.com/portfolio/some-item.html_<br/>
    as well as<br/>
    _http&#58;//www.yoursite.com/portfolio/some-folder/_<br/>
    logically are sub-pages of<br/>
    _http&#58;//www.yoursite.com/portfolio/_ (with prettyURL)<br/>
    and so the 'menu' tag goes ahead and marks the menu-item in question as 'current' and all its parents as 'active'.<br/>
    <br/>
    Now consider another menu-item - this one pointing to a folder-view<br/>
    e.g. _http&#58;//www.yoursite.com/portfolio.php?f=2_ (_http&#58;//www.yoursite.com/portfolio/some-folder/_ with prettyURL)<br/>
    In this case, the menu-item will be marked as 'current' only for the same folder<br/>
    _http&#58;//www.yoursite.com/portfolio/some-folder/_<br/>
    and any page that is below the folder<br/>
    e.g. _http&#58;//www.yoursite.com/portfolio/some-folder/some-item.html_<br/>
    but NOT for<br/>
    _http&#58;//www.yoursite.com/portfolio/_ or<br/>
    _http&#58;//www.yoursite.com/portfolio/some-item.html_ or<br/>
    _http&#58;//www.yoursite.com/portfolio/some-other-folder/_<br/>
    as they are logically not sub-pages of folder being pointed to.<br/>
    <br/>
    This is a powerful functionality and allows the menu to seamlessly blend with other discrete sections of the site, for example the portfolio section, as we saw above.<br/>
    <br/>
    Finally consider a point we touched upon earlier but deferred the explanation for later -<br/>
    in our tree, we have a 'Home' menu-item that points to the home-view of index.php (_http&#58;//www.yoursite.com_) and we have separate menu-items that represent other pages of index.php e.g. _http&#58;//www.yoursite.com/about-us/_ and _http&#58;//www.yoursite.com/about-us/what-we-do/_.<br/>
    <br/>
    Going by the logic we discussed above, if we visit _http&#58;//www.yoursite.com/about-us/_ or _http&#58;//www.yoursite.com/about-us/what-we-do/_, since in the tree the 'Home' menu-item physically comes before the menu-item representing the visited page, **it is the 'Home' menu-item that will always get selected although we have a menu-item that specifically represents the visited page**.<br/>
    <br/>
    For such cases we can configure the nested-page behind the menu-item NOT to be marked as current for the child-pages (i.e. be marked as current only for the page that is perfect match).
</p>

The 'menu' tag supports a rich set of parameters that can be used to create menus of almost any complexity.<br/>
Please see the tag's documentation for a full list of the parameters and their use.

### BREADCRUMBS

Another element on a typical web page that reflects the hierarchy of pages is the breadcrumb where the parent pages of the page being visited show up as crumbs.

The Couch tag that can be used to easily create breadcrumbs is the '[nested\_crumbs](../../tags-reference/nested_crumbs.html)' tag.

<p class="notice">
    There already is an existing tag named '[breadcrumbs](../../tags-reference/breadcrumbs.html)' which is used with the folder hierarchy associated with normal cloned pages.<br/>
    '[nested\_crumbs](../../tags-reference/nested_crumbs.html)' on the other hand works with nested-pages only.
</p>

#### Usage

**1\.** As self-closing tag. e.g.

```
<cms:nested_crumbs masterpage='index.php' />
```

where 'masterpage' points to the template behind the nested-pages tree.

**2\.** As a tag-pair for better control over the generated breadcrumbs markup. e.g.

```
<cms:nested_crumbs masterpage='index.php' ignore_show_in_menux='1' prepend='<ul class="breadcrumb">' append='</ul>'>
    <li><a href="<cms:show k_crumb_link />"><cms:show k_crumb_text /></a><cms:if k_crumb_is_last='0'> &raquo; </cms:if></li>
</cms:nested_crumbs>
```

Please see the '[nested\_crumbs](../../tags-reference/nested_crumbs.html)' tag's documentation for a full list of the parameters and their use.
