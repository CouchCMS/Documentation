---
title: get_cookie
category: tag
template: default.html
---

# get_cookie

The **get\_cookie** tag can be used to fetch value contained within any cookie set by the **set\_cookie** tag.

```
<cms:get_cookie 'my_test_cookie' />
```

The snippet above will retrieve the value set within the cookie named 'my\_test\_cookie'

## Parameters

*   name

### name

The name of the cookie the value of which is to be retrieved.

## Variables

This is a self closing tag and sets no variables of its own.

## Related Tags

*   [set\_cookie](../set_cookie.html)
*   [delete\_cookie](../delete_cookie.html)
