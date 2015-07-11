---
title: Smart embed - an alternative method of structuring sites
category: miscellaneous
template: default.html
---

# Smart embed - an alternative method of structuring sites

If you have been using Couch for anytime now, you are no doubt familiar with the various [**views**](../../concepts/views.html) encountered while dealing with clonable pages.

A typical (skeletal) code handling the views in a template could go something like this

```
<cms:if k_is_page >
    <!-- Page view - display current page here -->
<cms:else />
    <!-- List view- display a list of ALL pages cloned from this template here -->
</cms:if>
```

or

```
<cms:if k_is_page >
    <!-- Page view - display current page here -->
<cms:else />
    <!-- List view - handle the sub views separately -->
    <cms:if k_is_folder >
        <!-- Folder view - display a list of pages belonging to this folder here -->
    </cms:if>

    <cms:if k_is_archive >
        <!-- Archive view - display a list of pages belonging to this time period here -->
    </cms:if>

    <cms:if k_is_home >
        <!-- Neither a folder view nor archive view - display a list of ALL pages cloned from this template here -->
    </cms:if>
</cms:if>
```

In the above approach, a prudent way of coding up the various views is to create separate snippets for each of them and then [**embedding**](../../tags-reference/embed.html) at the appropriate place.

So, for example, if we had snippets named 'page\_view.html', 'folder\_view.html' etc. for the respective views, the snippet given above would now become

```
<cms:if k_is_page >
    <!-- Page view - display current page here -->
    <cms:embed 'page_view.html' />
<cms:else />
    <!-- List view - display a list of ALL pages cloned from this template here -->
    <cms:embed 'list_view.html' />
</cms:if>
```

or

```
<cms:if k_is_page >
    <!-- Page view - display current page here -->
    <cms:embed 'page_view.html' />
<cms:else />
    <!-- List view - handle the sub views separately -->
    <cms:if k_is_folder >
        <!-- Folder view - display a list of pages belonging to this folder here -->
        <cms:embed 'folder_view.html' />
    </cms:if>

    <cms:if k_is_archive >
        <!-- Archive view- display a list of pages belonging to this time period here -->
        <cms:embed 'archive_view.html' />
    </cms:if>

    <cms:if k_is_home >
        <!-- Neither a folder view nor archive view - display a list of ALL pages cloned from this template here -->
        <cms:embed 'home_view.html' />
    </cms:if>
</cms:if>
```

Since all the embedded snippets are kept at a single location, if there was another template in the site and the approach outlined above was followed for it too, it is obvious that the snippets used for the second template would have to named differently to disambiguate them from the snippets of the first template.

The 'smart\_embed' tag makes it easier for us to implement the outlined approach by making it possible to replace the snippets above with this single line of code -

```
<cms:smart_embed />
```

That's right. Only a single line of code is required.

<p class="success">
    The 'smartness' of the smart\_embed tag lies in its capability to look into the snippets folder and then **automatically choose the snippet best matching the current view and then embed it**.<br/>
    All we have to do is follow a simple file-naming convention to help smart\_embed in figuring out the right snippet to template.
</p>

The 'smart\_embed' takes into consideration two values as it goes looking for the right snippet - the current view and the current template.<br/>
For example, if the current template is 'movies.php' and it is being accessed in home-view, 'smart\_embed' tag will

1.  Check if the snippets folder contains a file named '_movies-home_' (this search is extension agnostic. You can use whatever extension you desire). Notice how the name 'movies-home' combines both the name of the template as well as the view. If, for example, a snippet named 'movies-home.html' (or 'movies-home.txt' - the extension is not important) is indeed available in the snippets folder it would be used for embedding. However if no file of such name is found the tag now moves on to
2.  Check if a snippet named '_movies-list_' is available. Notice now that the 'view' part of the name changes from 'home' to 'list' i.e. from specific to generic - home-view being a specialized view of the more generic list-view. If no such file is found the tag moves on to
3.  Check if a snippet named '_movies-default_' is available. The 'default' is a catch-all term and a snippet with this name can be used for all possible views of 'movies.php' template. If no such file is found the tag moves on to
4.  Check if a snippet named '_home_' is available. Notice now that the template name is dropped from the search. This makes it possible to use a single snippet that is common across all the templates. If no such file is found the tag moves on to
5.  Check if a snippet named '_list_' is available. Once again the search moves on from specific to generic. No template name is involved so if, for example, a snippet named 'list.html' is available it can be used in all templates. Finally, if no such file is found the tag moves on to
6.  Check if a snippet named '_default_' is available.

<br/>

To summarize, for **home-view** of template 'movies.php', this is the sequence of the file-names that are searched for -

*   movies-home
*   movies-list
*   movies-default
*   home
*   list
*   default

For **archive-view** of template 'movies.php', the sequence becomes -

*   movies-archive
*   movies-list
*   movies-default
*   archive
*   list
*   default

For **folder-view** let us assume that we have two folders 'asian' and 'chinese' where 'chinese' is a child-folder of 'asian'.<br/>
While visting folder 'asian' of template 'movies.php', the sequence becomes -

*   movies-folder\_ex-asian
*   movies-folder-asian
*   movies-folder
*   movies-list
*   movies-default
*   folder
*   list
*   default

While visting folder 'chinese' of template 'movies.php', the sequence becomes -

*   movies-folder\_ex-chinese
*   movies-folder-chinese
*   movies-folder-asian
*   movies-folder
*   movies-list
*   movies-default
*   folder
*   list
*   default

Notice how for a child folder, all the parent folders are also taken into consideration. Thus a snippet meant for folder 'asian' e.g. 'movies-folder-asian.html' will also be valid for the child folder 'chinese' as seen above.

If, however, we wish to use a snippet exclusively for a particular parent folder only and not for its child folders we can use the term 'folder\_ex' with it. In the examples above the snippet 'movies-folder\_ex-asian.html', if present, will only be used only for the 'asian' folder and not for the 'chinese' folder which is its child folder.

For **page-view**, e.g. while visting a page named 'harpoon' of template 'movies.php', the sequence becomes -

*   movies-page-harpoon
*   movies-page
*   movies-default
*   page
*   default

[**Nested pages**](../../concepts/nested-pages-aka-menu-maker.html) behave more or less like folders.<br/>
For example, if we have a nested-page named 'harpoon' that is nested below another pages named 'chinese', this is the sequece of search while visiting 'harpoon' -

*   movies-page\_ex-harpoon
*   movies-page-harpoon
*   movies-page-chinese
*   movies-page
*   movies-default
*   page
*   default

Like folders, a snippet can be used exclusively with a nested-page without making it available for the child-pages by using the '\_ex' with 'page' (as in the 'movies-page\_ex-harpoon' above).

Finally, while visiting a non-clonable template (for our example below let us assume it is named 'settings.php') the sequence of search is -

*   settings-default
*   default

## CHUNKING

The real power of 'smart\_embed' tag comes to fore when we combine it whith the practice of 'chunking' up of templates.<br/>
By 'chunking' I mean the ubiqutous practice of breaking up templates into re-usable parts e.g. header.html, menu.html, footer.html etc and then using the parts on multiple templates.

The 'smart\_embed' tag accepts a second (optional) parameter using which we can specify the folder where the tags searches for the matching snippets.<br/>
For example, in the following code

```
<cms:smart_embed 'header' />
```

the 'smart\_embed' searches for the suitable snippet within a sub-folder named 'header' within the snippets folder.

We can use this feature to organize our chunks within the snippets folder. For example this could be one way of doing so -<br/>
snippets (folder)

```
|_header  (folder)
  |_default.html (file)
|_menu    (folder)
  |_default.html (file)
|_content (folder)
  |_default.html (file)
|_footer  (folder)
  |_default.html (file)
```

In the example above, we have created separate folders for the chunks.<br/>
The chunks we had (header.html, menu.html and footer.html) are all named 'default.html' and placed within the appropriate folders (the default.html within 'contents' folder can be an empty file for now).

Now to test out the flexibility of this feature, use a couple of templates from your site - let us begin with index.php.<br/>
Place the following code within it -

```
<?php require_once( 'couch/cms.php' ); ?>
<cms:template>
    <!-- Editable regions unique to this template can be defined here -->
    <cms:editable name='content' type='textarea' />
</cms:template>

<cms:smart_embed 'header' />
<cms:smart_embed 'menu' />
<cms:smart_embed 'content' />
<cms:smart_embed 'footer' />

<?php COUCH::invoke(); ?>
```

Notice how the template contains no HTML markup within it at all. All the work is done by using snippets.<br/>
Run this snippet and you'll find that the 'smart\_embed' tag outputs the 'default.html' snippets for each chunk area.<br/>
Nothing spectacular so far - we know the tag searched for

*   index-default.\*
*   default.\*

within the specified folders and output the one it found.

Let us take one other template - 'about.php'. Place the following within it -

```
<?php require_once( 'couch/cms.php' ); ?>
<cms:template>
    <!-- Editable regions unique to this template can be defined here -->
    <cms:editable name='content' type='textarea' />
    <cms:editable name='address' type='textarea' />
</cms:template>

<cms:smart_embed 'header' />
<cms:smart_embed 'menu' />
<cms:smart_embed 'content' />
<cms:smart_embed 'footer' />

<?php COUCH::invoke(); ?>
```

Notice how this differs from our first template only in the editable regions it defines.<br/>
What we are concerned with is that it uses \*exactly\* the same 'smart\_embed' statements.<br/>
Run this template and you'll find that it shows exactly the same content as index.php.<br/>
Please bear with me if you find this insipid. The real meat of the discussion comes now.

In all probability, the 'header', 'menu' and 'footer' chunks are common to both index.php as well as about.php.<br/>
The only part that differs is the 'content'.<br/>
Create the chunk that shows the content for about.php, name it 'about-default.html' and place it within snippets/content folder.<br/>
Access about.php again and we'll see that the new snippet is displayed for the content area while all the other snippets remain the same as used for index.php.

<p class="notice">The important thing to note is that **we have not modified** the about.php template at all. We can modify its output by simply placing the appropriately named snippets in the proper folders.</p>

You'll appreciate this flexibility when dealing with cloned templates. Let us assume that index.php is now made clonable.<br/>
The two views that we wish to handle are the 'list' view and the 'page' view.<br/>
Create the snippet that shows the page-view and name it 'index-page.html' and place it within 'content' folder.<br/>
Access index.php in page-view and the above snippet will be displayed. Access index.php in any other view (home, list, folder, archive) and you'll find that the 'default.html' gets loaded. Create a new snippet named 'index-list.html', place the listing code within it and place this snippet within 'content' folder to handle this template's list-view.

### Using smart_embed tag with embed tag

In certain situations, we can also combine the 'smart\_embed' with the regular [**embed**](../../tags-reference/embed.html) tag.<br/>
Let us suppose the 'header' chunk of about.php template is different from the common 'header/default.html' it shared with the other templates.<br/>
However, it differs in only a very minor way - say, it only adds a few HTML tags loading some additional JavaScript files.<br/>
We know that we can place a snippet named 'about-default.html' within the 'header' folder and this snippet will be automatically picked up for about.php.<br/>
We create this snippet but instead of putting in the entire header code (which will duplicate the one used in 'default.html' snippet) we can do the following -

```
<cms:embed 'header/default.html' />
<script type="text/javascript" src="<cms:show k_site_link />js/jquery-1.7.1.min.js"></script>
```

Notice how in the snippet above we used the 'embed' tag to load a specific snippet named 'header/default.html' and then added the additional markup to it to create the new snippet.

### Debugging

One drawback of using this method is that sometimes it gets confusing to know which embedded snippet gets called in which view.<br/>
An easy way to find this out is by using the 'debug' parameter of 'smart\_embed'. With this parameter set, the 'smart\_embed' goes about locating the most suitable snippet for the current view but instead of outputting the snippet, it outputs a list of all the canditate snippets that it looked for and the name of the snippet that it finally chose as being the most appropriate for displaying.

As an example, the following statement

```
<cms:smart_embed debug='1' />
```

will output the following for a template named 'movies.php' accessed in home-view

```
Looking for files in folder snippets:

    * movies-home
    * movies-list
    * movies-default
    * home *
    * list
    * default

Chosen file: home.html
```

<p class="success">
    **Tip:**<br/>
    I find it tedious to flip the debug parameter if there are multiple 'smart\_embed' statements in my template.<br/>
    I use the following code to use a variable to do so. This way I need to turn on/off the debug setting at only one place<br/>
    **&lt;cms:set my\_debug='0' 'global' /&gt;**<br/>
    **&lt;cms:smart\_embed 'header' debug=my\_debug /&gt;**<br/>
    **&lt;cms:smart\_embed 'menu' debug=my\_debug /&gt;**<br/>
    **&lt;cms:smart\_embed 'content' debug=my\_debug /&gt;**<br/>
    **&lt;cms:smart\_embed 'footer' debug=my\_debug /&gt;**
</p>

In conclusion, the 'smart\_embed' tag represents the '**convention over configuration (AKA also known as coding by convention)**' approach and can prove to be an absolute life saver for certain types of sites. The examples we used above were the extreme cases where we delegated the entire display logic from the main templates to the snippets by using multiple 'smart\_embed' tags. However, we can also use the 'smart\_embed' tag to handle only certain regions by adding it to our regular templates.
