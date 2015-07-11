---
title: gpc
category: tag
template: default.html
---

# gpc

The **gpc** tag stands for **G**ET-**P**OST-**C**OOKIES and can be used to fetch values from variables contained in these.

```
<cms:gpc 'my_parameter' />
```

```
<cms:gpc 'my_parameter' method='post' />
```

If the method parameter is not specified, this tag will look into all the three sources.

<p class="error">**M.IMP:** Never, never use variables from GET, POST or COOKIES by using raw PHP code. The **gpc** tag sanitizes all variables and helps in preventing XSS attacks, something that your code will be susceptible of if you choose to do it manually and do not sanitize the values.</p>

## Parameters

*   var
*   method

### var

Name of the variable to fetch the value of.

### method

This can be one of the following - _get_, _post_, _cookie_.<br/>
If this parameter is not specified, all the three are searched.

## Variables

This tag is self-closing and does not set any variables of its own.
