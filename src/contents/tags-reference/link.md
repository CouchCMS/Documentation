---
title: link
category: tag
template: default.html
---

# link

The link tag can be used to dynamically generate appropriate links to the various views of a template.

<p class="error">Never hard code links yourself because the links are different depending on whether or not pretty-urls are enabled.</p>

### Home view

```
<a href="<cms:link masterpage='news.php' />" >Testing Link tag</a>
```

### Page view

```
<a href="<cms:link masterpage='news.php' page='first-news-item' />" >Testing Link tag</a>
```

### Folder view

```
<a href="<cms:link masterpage='news.php' folder='entertainment' />" >Testing Link tag</a>
```

### Archive view

```
<a href="<cms:link masterpage='news.php' year='2010' />" >Testing Link tag</a>

<a href="<cms:link masterpage='news.php' year='2010' month='8' />" >Testing Link tag</a>

<a href="<cms:link masterpage='news.php' year='2010' month='8' day='17' />" >Testing Link tag</a>
```

<p class="notice">If multiple parameters are given, the page-view will be given priority over the folder-view and the folder-view will be given priority over the archive-view. The home-view link will be generated only when no other parameter (except the mandatory _masterpage_) is given.</p>

## Parameters

*   masterpage
*   page
*   folder
*   year
*   month
*   day

## Variables

This tag is self-closing and does not set any variables of its own.
