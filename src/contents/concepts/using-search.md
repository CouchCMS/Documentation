---
title: Search
category: concept
template: default.html
---

# Search

Given a single word or several words, Couch supports searching for them through all the defined [**editable regions**](../editable-regions.html) of your templates (and a few of the system fields - namely the _title_ and _name_ fields) and give back all the pages that contain these words.

<p class="notice">
    Couch uses MySQL's **Fulltext search** for this purpose. An advantage of this is that Couch can assign different weightages to words apprearing at different places in a page and fetch back pages ordered according to their calculated relevance.<br/>
    <br/>
    Thus a page that contains the searched word in its title will be considered more relavant than another page that has the same word somewhere in an editable region. Similarly a page that contains the searched word multiple times is considered more relevant to the one containing it only once.<br/>
    <br/>
    Fulltext search also has a few drawbacks that you need to be aware of -<br/>
    It cannot be used to search for words that are less than four characters in length (considers them unimportant).<br/>
    Also fulltext search does not match partial words.
</p>

The tag that Couch uses to find pages containing the searched word/words is the [_**search**_](../../tags-reference/search.html) tag.<br/>
This tag is very similar to the [_**pages**_](../../tags-reference/pages.html) tag discussed before in the way it fetches the relevant pages and then steps through each of them setting up variables that describe the current page.

Two of the parameters supported by this tag are - _masterpage_ and _limit_.<br/>
By default, the [_**search**_](../../tags-reference/search.html) tag searches through pages of all the available templates. If you wish to set up search for only a section of your website, use the _masterpage_ parameter to make Couch search only certain templates or exclude certain templates.

_Limit_ parameter can be set to display only a limited number of pages that were found. The rest of the pages can be displayed in a paginated manner (See [**Pagination**](../pagination.html)).

As noted above, this tag iterates through all the found pages setting up variables pertaining to each page as it steps through it. Thus the following snippet -

```
<cms:search masterpage='blog.php' limit='10' >
    <h3><a href="<cms:show k_page_link />"><cms:show k_search_title /></a></h3>
    <cms:show k_search_excerpt />
</cms:search>
```

\- will fetch the top 10 blog pages that fulfill the current search.

For each page all the variables normally available in its _page-view_ will be available. Apart from these, the following variables are also made available -

*   k\_search\_title
*   k\_search\_content
*   k\_search\_excerpt

_k\_search\_content_ is the the entire content of the page that was searched while _k\_search\_excerpt_ consists of very short snippets from various parts of the page where each searched word was found.<br/>
You'll normally be displaying the _k\_search\_excerpt_ as search results because it also has the additional feature of showing all the searched words in a highlighted state.<br/>
_k\_search\_title_ also shows the searched word/words (if any present in it) in a highlighted manner and hence is preferable to use instead of the regular _k\_page\_title_ variable.

Which brings up the question - what exactly was being searched above?

There are two different ways of indicating this to the **search** tag

**1\.** [_**Search**_](../../tags-reference/search.html) tag is hardwired to get the search terms from a parameter named 's' in the querystring (the part after the '?' in the URL) of the page the tag is invoked from.<br/>
In the code snippet given above, the **search** tag is expecting the search terms to be passed to it via the querystring.<br/>
Thus if the following URL is used to invoke the page the search snippet was placed on, two words - 'hello' and 'world' will be searched by the **search** tag -<br/>
_http&#58;//www.yoursite.com/search.php?s=hello+world_

**2\.** You can set the _keywords_ parameter of the **search** tag to the terms to be searched. This method makes possible the use of variables for specifying the search terms. In fact, we can even get values from the querystring of URL and pass it on to the **search** tag via the _keywords_ parameter -

```
<cms:search masterpage='blog.php' limit='10' keywords="<cms:gpc 's' />" >
    <h3><a href="<cms:show k_page_link />"><cms:show k_search_title /></a></h3>
    <cms:show k_search_excerpt />
</cms:search>
```

In the example above, we are using the [**gpc**](../../tags-reference/gpc.html) tag to get a querystring parameter named 's' from the URL and set its value as the keywords to be searched, thus making the example behave exactly as that with the **search** tag not having any keywords explicitly specified.

### Search Forms

Of the two different ways of specifying the search terms to the search tag, that we mentioned above, normally the first method of setting the search terms as a parameter named 's' in the querystring should suffice for most cases.

We can set this parameter in the querystring by using a HTML form that has a textfield named 's'. Upon submission of this form, any content of the textfield will be automatically added to the querystring and passed on to the page handling the submission.

Couch has a simple tag named [_**search\_form**_](../../tags-reference/search_form.html) that generates such a form for you that has a textfield named 's' -

```
<cms:search_form />
```

The snippet above will generate a search form that when submitted will invoke the same page the snippet was called from, after putting the searched terms in the querystring.<br/>
Of course you are expected to place a [_**search**_](../../tags-reference/search.html) tag on the same page to handle the search.

<p class="success">You can create and use your own form instead of using the one created by [_**search\_form**_](../../tags-reference/search_form.html) tag. Just make sure that the textbox, within which the keywords will be inputted by the users, is named 's'.</p>

Sometimes one wishes to initiate the search from one page and display the results in another page.<br/>
For example you might wish to place the search form on the homepage (_index.php_) of the website but want that on submitting this form the user is taken to another page (_search.php_) that then displays the result of the search.<br/>
You can do this by placing the [_**search\_form**_](../../tags-reference/search_form.html) tag within _index.php_ and placing the [_**search**_](../../tags-reference/search.html) tag snippet within _search.php_.<br/>
To make the [_**search\_form**_](../../tags-reference/search_form.html) tag invoke _search.php_ (instead of _index.php_) upon form submssion, its _processor_ parameter can be set in the following manner -

```
<cms:search_form msg='Enter keywords' processor="<cms:show k_site_link />search.php" />
```

The _msg_ parameter is used to display some message inside the search box. The default text is 'Search'.

As a final example, following is a snippet that can be placed on a search page -

```
<cms:search_form />

<cms:search limit='10' >
    <cms:if k_paginated_top >
        <div>
            <cms:if k_paginator_required >
                Page <cms:show k_current_page /> of <cms:show k_total_pages /><br>
            </cms:if>
            <cms:show k_total_records /> Pages Found -
            displaying: <cms:show k_record_from />-<cms:show k_record_to />
        </div>
    </cms:if>

    <h3><a href="<cms:show k_page_link />"><cms:show k_search_title /></a></h3>
    <cms:show k_search_excerpt />
    <hr>

    <cms:paginator />

</cms:search>
```

See [**Pagination**](../pagination.html) for details about the other variables used in the snippet.
