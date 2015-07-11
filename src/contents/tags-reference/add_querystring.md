---
title: add_querystring
category: tag
template: default.html
---

# add_querystring

The **add\_querystring** tag can be used to add parameters to the query string portion of URLs (i.e. the portion that contains data to be passed to other pages).

This tag takes care to prefix the provided querystring by a '?' if there are no existing parameters in the URL, else it prefixes an '&'. It is difficult to do so manually if the URL we are adding the parameters to is contained within a variable, which is where this tag comes in handy.

```
<a href="<cms:add_querystring k_page_link 'param1=some_value' />" >Some link</a>
```

```
<a href="<cms:add_querystring k_page_link 'param1=some_value&param2=other_value' />" >Some link</a>
```

## Parameters

*   link
*   querystring

### link

The URL to append the querystring to.

### querystring

The querystring to be appended to the link. It there are multiple parameters in the querystring, separate them by '&'.

## Variables

This tag is self-closing and does not set any variables of its own.
