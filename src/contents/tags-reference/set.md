---
title: set
category: tag
template: default.html
---

# set

The **Set** tag is used to put some value in a variable. The variable, if not already present, is created.<br/>
(This tag is the counterpart of [**Show**](../show.html) tag which is used to display set variables)

The following example will create a variable called 'greeting' and set its value to 'Hello'

```
<cms:set greeting='Hello' />
```

The following will create another variable known as 'message' and set its value to 'Hello'

```
<cms:set message=greeting />
```

As with all other tags, nested tags may be used in parameters (taking care to use double quotes).<br/>
The following will set the value of 'message' to 'Hello World'.
```
<cms:set message="<cms:show greeting /> World" />
```

<p class="notice">A valid variable name starts with a letter or underscore, followed by any number of letters, numbers, or underscores.</p>

<p class="error">**IMP.** **Set** cannot be used to set system variables (i.e. those that begin with prefix 'k\_').</p>

## Parameters

The first parameter, as illustrated above, is mandatory and is used to set a named variable to a certain value.<br/>
The tag also uses an optional unnamed (i.e. only the value can be provided) second parameter that defines the **scope** within which the variable will be set.

```
<cms:set message='hello' scope='global' />
```

The above is the same as

```
<cms:set message='hello' 'global' />
```

Here 'global' defines the scope of 'message' variable

The valid values for this second parameter are -

*   local
*   parent
*   global

## Variables

This tag does not set any variables of its own.

## Related Tags

*   [show](../show.html)
*   [get](../get.html)
*   [get\_custom\_field](../get_custom_field.html)
*   [pages](../pages.html)
