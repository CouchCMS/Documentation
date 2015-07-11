---
title: redirect
category: tag
template: default.html
---

# redirect

The **redirect** tag can be used to redirect the user to a new location.

```
<cms:redirect url='http://www.google.com/' />
```

```
<cms:redirect url="<cms:link masterpage=k_template_name page='test' />" />
```

In the last example above, the user is being redirected to a page named _test_ that is a cloned page of the same template as the page this code is executed from (the **link** tag is being used to get the target URL).

## Parameters

*   url
*   permanently

### url

This is the URL of the location being redirected to.

### permanently

By default, the **redirect** tag causes the server to send back a HTTP 302 redirection code. Setting this parameter to 1 will cause it to send back HTTP 301 (moved permanently) code instead.

```
<cms:redirect url="<cms:link masterpage=k_template_name page='test' />" permanently='1' />
```

## Variables

This tag is self-closing and does not set any variables of its own.
