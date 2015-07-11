---
title: search
category: tag
template: default.html
---

# search

Please see [**Core Concepts - Search**](../../concepts/using-search.html) for an in-depth discussion of this tag.

## Parameters

*   keywords
*   masterpage
*   limit

### keywords

This parameter can set to the terms to be searched. If skipped, the **search** tag will look for a GET parameter named 's' in the querystring for the search terms.

### masterpage

Normally pages of all available templates will be searched for the specified terms. You can set this parameter to limit he search to only some of the templates or to exclude certain templates from the search.

```
<cms:search masterpage='news.php' >..</cms:search>
```

This example would search only pages of news.php.

```
<cms:search masterpage='news.php, blog.php' >..</cms:search>
```

This example would search only pages of news.php and blog.php.

```
<cms:search masterpage='NOT news.php' >..</cms:search>
```

This example would search pages of all templates except news.php.

### limit

_Limit_ parameter can be set to display only a limited number of pages that were found. The rest of the pages can be displayed in a paginated manner (See [**Pagination**](../../concepts/pagination.html)).

## Variables

For each page found, all the variables normally available in its _page-view_ will be available. Apart from these, the following variables are also made available -

*   k\_search\_title
*   k\_search\_content
*   k\_search\_excerpt
*   k\_search\_query

Please see [**Core Concepts - Search**](../../concepts/using-search.html) for details.

## Related Tags

*   [search\_form](../search_form.html)
