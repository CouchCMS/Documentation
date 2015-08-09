---
title: Folders
category: concept
template: default.html
---

# Folders

Couch allows you to create 'virtual folders' to place your cloned pages in.<br/>
The primary purpose of this feature is to have super SEO friendly urls for your pages and the true power of this feature can be tapped only if you have enabled [**pretty-urls**](../pretty-urls.html).

Cloned pages in Couch, just like real pages on a hard-disk, can be placed in only one folder at a time.<br/>
The folders themselves, just like real folders, can be nested within another folder which in turn might itself be within another folder.<br/>
By judiciously creating an hierarchy of folders, almost any url structure can be mimicked in Couch.

As an example, suppose for a clonable template named _news.php_, we require the following folder hierarchy for arranging the cloned pages representing the news items -

```
News (news.php) (root folder)
    |---World News (sub-folder)
    |   |---North American News (sub-sub-folder)
    |   |   |---United States News (sub-sub-sub-folder)
    |   |       |---Ohio News (sub-sub-sub-sub-folder)
    |   |       |---Nevada News (sub-sub-sub-sub-folder)
    |   |---Asian News (sub-sub-folder)
    |       |---China News (sub-sub-sub-folder)
    |       |---Japan News (sub-sub-sub-folder)
    |---Sports News (sub-folder)
    |---Music News (sub-folder)
    |---Entertainment News (sub-folder)
```

For creating folders in Couch we use the [__*folder*__](../../tags-reference/folder.html) tag. Hierarchy can be created by nesting one [__*folder*__](../../tags-reference/folder.html) tag (the child) within another (the parent).<br/>
To create the folder structure mentined above, place the following snippet anywhere within the _news.php_ template, and visit _news.php_ in your browser while being logged-on as super-admin.

```
<cms:folder name="world" title="World News">
    <cms:folder name="north-america" title="North American News">
        <cms:folder name="united-states" title="United States News">
            <cms:folder name="ohio" title="Ohio News" />
            <cms:folder name="nevada" title="Nevada News" />
        </cms:folder>
    </cms:folder>
    <cms:folder name="asia" title="Asian News">
        <cms:folder name="china" title="China News" />
        <cms:folder name="japan" title="Japan News" />
    </cms:folder>
</cms:folder>
<cms:folder name="sports" title="Sports News" />
<cms:folder name="music" title="Music News" />
<cms:folder name="entertainment" title="Entertainment News" />
```

<p class="notice">These tags can be placed anywhere as they have no output of their own. However it is a good practice to define all the folders of a template (along with all the editable regions) within the [__*template*__](../../tags-reference/template.html) tag placed somewhere at the top of the template.</p>

<p class="success">**UPDATE:** From version 1.1 Couch supports creation of folders from within the admin panel. Please see [**Dynamic Folders**](../../miscellaneous/dynamic-folders.html) for details.</p>

Note how, as is the case with most of the Couch tags, the _name_ parameter has to be unique for a folder. The _name_ parameter is the unique identifier for a folder while the _title_ is for display only and can have duplicate values.

Now if a cloned page of _news.php_ is edited in the admin panel, clicking on the 'Advanced settings' buttom at the top will reveal a dropdown list that will show these folders.

Any one of the folders can be selected to place the page within it. If none of the folders is selected, the page is considered to be residing in the root folder i.e. _news.php_ itself.

For example, following are the urls of a cloned page of _news.php_, named '_a-hot-news_', as it is moved from folder to folder (we assume pretty-urls feature has been activated).

#### No folder selected -

http&#58;//www.yoursite.com/news/a-hot-news.html

#### Placed within the Music News folder -

http&#58;//www.yoursite.com/news/music/a-hot-news.html

#### Placed within the Asian News folder -

http&#58;//www.yoursite.com/news/world/asia/a-hot-news.html

#### Placed within the Nevada News folder -

http&#58;//www.yoursite.com/news/world/north-america/united-states/nevada/a-hot-news.html

You can see how the page's url reflects with full fidelety its folder hierarchy.<br/>
We are sure you'll agree that if you are looking for SEO friendly urls, it cannot get any more friendly than this.

<p class="success">
    SEO friendlyness has been uppermost in our minds.<br/>
    As an example - changing the location of an existing page is, quite understandably, considered a serious SEO faux pas. The original URL (link) of the page that has been recorded by Google will no longer be valid and you'll stand to lose all the PR ratings the page had garnered so far.<br/>
    <br/>
    One solution is to place a dummy page at the original url and make it send back a 'HTTP 301 Permenantly Moved' message to anyone accessing it and also informing him about the page's new location.<br/>
    Another solution is to add an entry for it in .htaccess file.<br/>
    All in all, the solutions are pretty messy and time consuming.<br/>
    <br/>
    Couch handles this situation automatically behind the scenes. You can freely change the location of your pages. Anytime a page is accessed via a url that is no longer valid, Couch sends back the visitor to the new loaction by using the 'HTTP 301 Permenantly Moved' message.<br/>
    Try it by changing the folder of a page in the admin panel and accessing it through the previous url.
</p>

### LISTING FOLDERS

We have seen how folders are defined in Couch.<br/>
There are times when your code needs to list the folders defined for a template. This could be to create a menu or breadcrumbs or a sitemap or simply a listing of folders that allows visitors to directly access pages placed within the folders (in the so-called _folder-view_).

The [__*folders*__](../../tags-reference/folders.html) tag is used to get a list of all the folders in a template.

<p class="success">Notice the 's' suffixed to the tag. The [__*folder*__](../../tags-reference/folder.html) tag creates folders while the [__*folders*__](../../tags-reference/folders.html) tag lists folders.</p>

To illustrate the use of this tag we'll continue with the folder hierarchy created for _news.php_ above.

```
<cms:folders>
    <cms:show k_folder_title /> <br>
</cms:folders>
```

The above snippet, when placed within the template _news.php_, will produce this output -

```
Asian News
China News
Entertainment News
Japan News
Music News
Nevada News
North American News
Ohio News
Sports News
United States News
World News
```

Since the [__*folders*__](../../tags-reference/folders.html) tag was provided with no information about which template's folders it should enumerate, it by default did so for the template it was called from, i.e. _news.php_.<br/>
However it can be made to enumerate folders of any template by setting its _masterpage_ parameter to the name of that template. Thus the following will also result in the same output as shown above -

```
<cms:folders masterpage='news.php'>
    <cms:show k_folder_title /> <br>
</cms:folders>
```

<p class="notice">
    *k\_folder\_title* is only one of the variables made available by this tag to provide information about the folder being enumerated.<br/>
    Another important variable is *k\_folder\_link*. It gives you the URL that Couch considers to be the _folder-view_ for the template.<br/>
    <br/>
    ```
<cms:folders masterpage='news.php'>
    <a href="<cms:show k_folder_link />"><cms:show k_folder_title /></a> <br>
</cms:folders>
    ```
    In the snippet given above, each folder will be hyper-linked to its _folder-view_ where you can display a list of all the pages that reside in this folder.<br/>
    See: [**Listing Pages**](../listing-pages.html).<br/>
    <br/>
    For a complete list of all the variables that get set by this tag please see the [reference](../../tags-reference/folders.html#parameters) or use Couch tags [__*dump*__](../../tags-reference/dump.html) or [__*dump\_all*__](../../tags-reference/dump_all.html) within the [__*folders*__](../../tags-reference/folders.html) tag.
</p>

Notice how the folders have simply been listed in the ascending alphabetical order of their names. Their hierarchical positions have not been preserved.<br/>
To list the folders in their hierarchical order, set the hierarchical parameter to 1\. Thus -

```
<cms:folders masterpage='news.php' hierarchical='1'>
    <cms:show k_folder_title /> (<cms:show k_level />) <br>
</cms:folders>
```

\- will yield -

```
Entertainment News [0]
Music News [0]
Sports News [0]
World News [0]
Asian News [1]
China News [2]
Japan News [2]
North American News [1]
United States News [2]
Nevada News [3]
Ohio News [3]
```

We have also printed out the 'level' of the folders in the hierarchy.

You can control what gets enumerated by the [__*folders*__](../../tags-reference/folders.html) tag by setting its various [**parameters**](../../tags-reference/folders.html#parameters).

To enumerate the hierarchy tree only upto a certain level, set the _depth_ parameter to the number of levels that should be traversed.<br/>
Thus the following snippet will enumerate only one level of the hierarchy -

```
<cms:folders masterpage='news.php' hierarchical='1' depth='1'>
    <cms:show k_folder_title /> [<cms:show k_level />] <br>
</cms:folders>
```

Outputs only the top level folders -

```
Entertainment News [0]
Music News [0]
Sports News [0]
World News [0]
```

<p class="notice">Setting the depth to 0 means no limits.</p>

To enumerate only a section of the hierarchy tree, set the _root_ parameter to the name of the parent folder -

```
<cms:folders masterpage='news.php' root='world' hierarchical='1'>
    <cms:show k_folder_title /> [<cms:show k_level />] <br>
</cms:folders>
```

```
World News [0]
Asian News [1]
China News [2]
Japan News [2]
North American News [1]
United States News [2]
Nevada News [3]
Ohio News [3]
```

To list only the subfolders of a folder, set the _childof_ parameter to the name of the parent folder -

```
<cms:folders masterpage='news.php' childof='world' hierarchical='1'>
    <cms:show k_folder_title /> [<cms:show k_level />] <br>
</cms:folders>
```

```
Asian News [0]
China News [1]
Japan News [1]
North American News [0]
United States News [1]
Nevada News [2]
Ohio News [2]
```

To exclude certain folder from the enumeration, set the _exclude_ parameter to the folder's name. If multiple folders are to be excluded, separate the names by a comma -

```
<cms:folders masterpage='news.php' hierarchical='1' exclude='music, asia'>
    <cms:show k_folder_title /> [<cms:show k_level />] <br>
</cms:folders>
```

The above snippet will exclude the 'music' folder and the 'asia' folder (along with its children) from the enumeration. The output -

```
Entertainment News [0]
Sports News [0]
World News [0]
North American News [1]
United States News [2]
Nevada News [3]
Ohio News [3]
```

### CREATING A MENU FROM FOLDERS

A common requirement is to list folders in an ordered or unordered HTML list (a sidebar menu is a good example). Those of you who might have tried producing, via code, a &lt;UL&gt;&lt;LI&gt; list out of an hierarchical structure will agree that the process is notoriously complex.<br/>
If the following is an unordered list that has to be produced, notice how the nested levels will need to be carefully tracked in order to properly close the tags.

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

[__*Folders*__](../../tags-reference/folders.html) tag makes it easy for you to create lists like above. Please notice in the HTML code above how a &lt;UL&gt; marks the beginning of a new nested level and how a &lt;LI&gt; marks the beginning of a new element (folder in our case).

Setting the *extended\_info* parameter to 1 will make the [__*folders*__](../../tags-reference/folders.html) tag provide extra information about every change in level as well as in current element. Our snippet simply has to respond to the reported changes.<br/>
Thus the following snippet can be used to create an unordered HTML list out of a folder hierarchy -

```
<cms:folders masterpage='news.php' childof='world' hierarchical='1' extended_info='1'>
    <cms:if k_level_start ><UL></cms:if>
    <cms:if k_element_start ><LI>
        <cms:show k_folder_title />
    </cms:if>
    <cms:if k_element_end ></LI></cms:if>
    <cms:if k_level_end ></UL></cms:if>
</cms:folders>
```

With *extended\_info* set, the [__*folders*__](../../tags-reference/folders.html) tag walks through the folder tree and sends back information about its current position in the hierarchy (by setting different variables). Simply outputting the HTML tag relevant to the current state will create a perfect list.

Incidently, if a simple list is all that is needed there is a much simpler option than the one above - the [__*listfolders*__](../../tags-reference/listfolders.html) tag -

```
<cms:listfolders masterpage='news.php' childof='world' hierarchical='1'/>
```

The snippet above will produce a similar list.<br/>
[__*Listfolders*__](../../tags-reference/listfolders.html) tag accepts the same parameters as [__*folders*__](../../tags-reference/folders.html) and is a quick way to get a generic list. The [__*folders*__](../../tags-reference/folders.html) tag, however, gives you absolute control over what needs to be output.

<p class="notice">[__*Listfolders*__](../../tags-reference/listfolders.html) takes one additional parameter - *show\_count*. Setting this to 1 will make it display the number of pages contained within the folders after the folder name.</p>

### PARENTS AND CHILDREN

Sometimes we need to find out if a folder (this could be the folder the current page resides in) is the child of a particular folder.<br/>
This often happens when designing an expandable sidemenu where by default only the top level folders are shown with only the one that is the ancestor of the page being viewed is shown expanded.

The following snippet adds a css class named 'selected' to all the LI elements that are ancestors of the currently viewed folder (if in _folder-view_) or the folder of the current page (if in _page-view_).<br/>
Using the appropriate CSS, this should be sufficient to highlight all ancestral folders of the current page or to expand only the immediate sub-tree of the folder while keeping collapsed the rest of the hierarchy.

```
<cms:if k_is_page || k_is_folder >
    <cms:if k_folder_name ><cms:set current_folder=k_folder_name /></cms:if>
    <cms:if k_page_foldername ><cms:set current_folder=k_page_foldername /></cms:if>
</cms:if>
<cms:folders hierarchical='1' extended_info='1'>
    <cms:if k_level_start ><UL></cms:if>
    <cms:if k_element_start >

        <cms:set my_class='' />
        <cms:if "<cms:is_ancestor parent=k_folder_name child=current_folder />" >
            <cms:set my_class='class="selected"' />
        </cms:if>

        <LI <cms:show my_class />>
        <span <cms:show my_class />><cms:show k_folder_title /></span>
    </cms:if>
    <cms:if k_element_end ></LI></cms:if>
    <cms:if k_level_end ></UL></cms:if>
</cms:folders>
```

Notice how we first set the variable *current\_folder* to the folder of the current page or the folder being viewed (variable *k\_folder\_name* gets set only in _folder-view_ while *k\_page\_foldername* gets set only in _page-view_ if the page resides in a folder).<br/>
Rest of the snippet is a modified form of the standard [__*folders*__](../../tags-reference/folders.html) tag code using *extended\_info*.

When *k\_element\_start* variable is found set, we output the enumerated folder's name as usual.<br/>
The only thing new is that we also find out if the folder (in *k\_folder\_name* variable) is one of the ancestors of the 'current\_folder' we saved above by using the [__*is\_ancestor*__](../../tags-reference/is_ancestor.html) tag.<br/>
If it is, we simply set a class of 'selected' to the LI and SPAN elements being output.

To list only the ancestors of a folder in the hierarchy, [__*parentfolders*__](../../tags-reference/parentfolders.html) tag can be used. It lists all the parents of a folder in sequence.

```
<cms:parentfolders folder='china' >
    <a href="<cms:show k_folder_link/>"><cms:show k_folder_title/></a>&nbsp;>
</cms:parentfolders>
```

The above snippet will output -

```
World News > Asian News > China News
```

### CREATING BREADCRUMBS FROM FOLDERS

Breadcrumbs is a common accessibility pattern used in web design where the folder hierarchy leading up to the page being viewed is displayed to the user.

Showing the folder hierarchy makes sense only when the template is in _folder view_ or _page view_ (i.e. when either the contents of a folder are displayed or a page itself is displayed).

The [__*breadcrumbs*__](../../tags-reference/breadcrumbs.html) tag can be used to quickly create a breadcrumb -

```
<cms:if k_is_page || k_is_folder >
    <cms:breadcrumbs separator='&nbsp;>&nbsp;' include_template='1'/>
</cms:if>
```

The snippet given above will output the following for a page in 'China News' folder -

```
News > World News > Asian News > China News
```

The *include\_template* parameter adds the current template ('News' in this case) as the first element.

The same output can be obtained by using the [__*parentfolders*__](../../tags-reference/parentfolders.html) tag mentioned above -

```
<cms:if k_is_page || k_is_folder >
    <a href="<cms:show k_template_link/>"><cms:show k_template_title/></a>&nbsp;>
    <cms:if k_folder_name ><cms:set my_folder=k_folder_name /></cms:if>
    <cms:if k_page_foldername ><cms:set my_folder=k_page_foldername /></cms:if>
    <cms:if my_folder >
        <cms:parentfolders folder=my_folder >
            <a href="<cms:show k_folder_link/>"><cms:show k_folder_title/></a>&nbsp;>
        </cms:parentfolders>
    </cms:if>
</cms:if>
```

Using [__*parentfolders*__](../../tags-reference/parentfolders.html) gives you greater control on the HTML that is generated for the breadcrumb.<br/>
Notice how in the snippet above we first check for the view we are in and then find the right folder name (_folder-view_ sets the *k\_folder\_name* variable to the name of the folder being listed while _page-view_ sets *k\_page\_foldername* variable to the folder \[if any\] the current page resides in **\[see [Views](../views.html)\]**). Finally once a folder is found, it is passed on to [__*parentfolders*__](../../tags-reference/parentfolders.html) tag to get a list of its ancestors.
